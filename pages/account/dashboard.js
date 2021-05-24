import React from 'react'
import { useRouter } from 'next/router'
import { parseCookies } from '../../helpers/index'
import { API_URL } from '../../config/index'
import { ToastContainer, toast } from 'react-toastify';
import DashboardEvent from '../../components/DashboardEvent'
import Layout from '../../components/Layout'
import styles from '../../styles/Dashboard.module.css'


export default function DashboardPage({ events, token }) {

    const router = useRouter()

    const handleDelete = async (id) => {
        if (confirm('Are you sure')) {
            const res = await fetch(`${API_URL}/events/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`
                }

            })

            const data = await res.json()

            if (!res.ok) {
                if (res.status === 403 || res.status === 401) {
                    toast.error('Unauthorized')
                }
                toast.error(data.message)
            } else {
                router.reload()
            }
        }
    }

    return (
        <Layout title='User Dashboard'>
            <div className={styles.dash}>
                <h1>Dashboard</h1>
                <h3>My events</h3>
                {events.map(evt => (
                    <DashboardEvent key={evt.id} evt={evt} handleDelete={handleDelete} />
                ))}
            </div>
        </Layout>
    )
}

export async function getServerSideProps({ req }) {
    // Token
    const { token } = parseCookies(req)

    const res = await fetch(`${API_URL}/events/me`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    const events = await res.json()


    // console.log(events);

    return {
        props: {
            events,
            token
        }
    }
}