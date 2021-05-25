import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import EventMap from '../../components/EventMap'
import { FaPencilAlt, FaTimes } from 'react-icons/fa'
import Layout from '../../components/Layout'
import { API_URL } from '../../config/index'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from '../../styles/Event.module.css'


export default function EventPage({ evt }) {

    const router = useRouter()


    // console.log(evt);
    return (
        <Layout>
            <div className={styles.event}>

                <span> {new Date(evt.date).toLocaleDateString('en-us')} at {evt.time} </span>
                <h1>{evt.name}</h1>
                <ToastContainer />
                {evt.image && (
                    <div className={styles.image}>
                        <Image
                            src={evt.image.formats.medium.url}
                            width={960}
                            height={600}
                        />
                    </div>
                )}

                <h3>Guest:</h3>
                <p>{evt.performers}</p>
                <h3>Description:</h3>
                <p>{evt.description}</p>
                <h3>Venue: {evt.venue}</h3>
                <p>{evt.address}</p>
                <EventMap evt={evt} />
                <Link href='/events'>
                    <a className={styles.backs}>{'<'} Go Back</a>
                </Link>
            </div>
        </Layout>
    )
}


export async function getStaticPaths() {

    const res = await fetch(`${API_URL}/events/`)
    const events = await res.json()

    const paths = await events.map(evt => ({
        params: { slug: evt.slug }
    }))

    return {
        paths, fallback: true
    }
}

export async function getStaticProps({ params }) {

    const res = await fetch(`${API_URL}/events?slug=${params.slug}`)
    const events = await res.json()

    return {
        props: {
            evt: events[0]
        },
        revalidate: 1
    }
}


// export async function getServerSideProps({query: {slug} }) {

//     const res = await fetch(`${API_URL}/api/events/${slug}`)
//     const events = await res.json()
//     console.log(events);

//     return {
//         props: {
//             evt: events[0]
//         }
//     }
// }

{/* <div className={styles.controls}>
                    <Link href={`/events/edit/${evt.id}`}>
                        <a>
                            <FaPencilAlt /> Edit Event
                        </a>
                    </Link>
                    <a href="#" className={styles.delete} onClick={deleteEvent}>
                        <FaTimes /> Delete Event
                    </a>
                </div> */}