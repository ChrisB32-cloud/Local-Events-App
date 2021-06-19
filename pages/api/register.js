import cookie from 'cookie'
import { API_URL } from '../../config/index'

export default async (req, res) => {
    if (req.method === 'POST') {
        // User registation
        // Pulling username, email and password from body
        const { username, email, password } = req.body

        // Making a POST request to the register endpoint
        const strapiRes = await fetch(`${API_URL}/auth/local/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                email,
                password
            })
        })

        // Awaiting data
        const data = await strapiRes.json()


        if (strapiRes.ok) {
            // must do -> Set cookie
            // If responce is ok setting cookie

            res.setHeader('Set-Cookie', cookie.serialize('token', data.jwt, {
                httpOnly: true,
                secure: process.env.NODE_ENV !== 'development',
                maxAge: 60 * 60 * 24 * 7, // one week
                sameSite: 'strict',
                path: '/'
            }))

            res.status(200).json({ user: data.user })
        } else {
            res.status(data.statusCode).json({ message: data.message[0].messages[0].message })
        }


    } else {
        res.setHeader('Allow', ['POST'])
        res.status(405).json({ message: `Method ${req.method} not allowed` })
    }
}