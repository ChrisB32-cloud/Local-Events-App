import cookie from 'cookie'
import { API_URL } from '../../config/index'

export default async (req, res) => {

    if (req.method === 'GET') {
        // If method is a GET request
        if (!req.headers.cookie) {
            // If we don't have a cookie responce status code is 403 
            // Not Authorized
            res.status(403).json({ message: 'Not Authorized' })
            return
        }

        // Getting the cookie (token)
        const { token } = cookie.parse(req.headers.cookie)

        // Making a GET request for the Bearer Token
        const strapiRes = await fetch(`${API_URL}/users/me`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        // Awaiting data
        const user = await strapiRes.json()

        if (strapiRes.ok) {
            res.status(200).json({ user })
        } else {
            res.status(403).json({ message: 'User forbidden' })
        }

    } else {
        res.setHeader('Allow', ['GET'])
        res.status(405).json({ message: `Method ${req.method} not allowed` })
    }
}