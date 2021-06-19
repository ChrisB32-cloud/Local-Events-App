import cookie from 'cookie'
import { API_URL } from '../../config/index'

export default async (req, res) => {
    if (req.method === 'POST') {
        // If method is POST descructur identifier(email, have to use identifier with strapi) and
        // password
        const { identifier, password } = req.body

        // Making a POST request to /auth/local endpoint
        const strapiRes = await fetch(`${API_URL}/auth/local`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                identifier,
                password
            })
        })

        // Await the data
        const data = await strapiRes.json()


        if (strapiRes.ok) {
            // must do -> Set cookie
            // If request is good, we're setting the cookie

            res.setHeader('Set-Cookie', cookie.serialize('token', data.jwt, {
                httpOnly: true,
                secure: process.env.NODE_ENV !== 'development',
                maxAge: 60 * 60 * 24 * 7, // one week
                sameSite: 'strict',
                path: '/'
            }))

            // 200 status code responce with user data
            res.status(200).json({ user: data.user })
        } else {
            // Response with error message
            res.status(data.statusCode).json({ message: data.message[0].messages[0].message })
        }


    } else {
        // Only allowing POST request, all other request are not allowed
        res.setHeader('Allow', ['POST'])
        res.status(405).json({ message: `Method ${req.method} not allowed` })
    }
}