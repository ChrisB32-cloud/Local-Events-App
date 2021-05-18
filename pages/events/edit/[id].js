import React, { useState } from 'react'
import Image from 'next/image'
import { FaImage } from 'react-icons/fa'
import { useRouter } from 'next/router'
import Modal from '../../../components/Modal'
import ImageUpload from '../../../components/ImageUpload'
import Link from 'next/link'
import { API_URL } from '../../../config/index'
import Layout from '../../../components/Layout'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment'
import styles from '../../../styles/Form.module.css'


export default function EditEventPage({ evt }) {

    // console.log(evt);

    const router = useRouter()
    const [values, setValues] = useState({
        name: evt.name,
        performers: evt.performers,
        venue: evt.venue,
        address: evt.address,
        date: evt.date,
        time: evt.time,
        description: evt.description
    });

    const [imagePreview, setImagePreview] = useState(evt.image ? evt.image.formats.thumbnail.url : null)

    const [showModal, setShowModal] = useState(false)

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        // Validation
        const hasEmptyFields = Object.values(values).some((ele) => ele === '')

        if (hasEmptyFields) {
            console.log('Please fill in all fields');
            // toast("Please fill in all fields");
            toast.error('Please fill in all fields', {
                // position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

        const res = await fetch(`${API_URL}/events/${evt.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })

        if (!res.ok) {
            toast.error('Send Request failed, Something is wrong')
        } else {
            const evt = await res.json()
            router.push(`/events/${evt.slug}`)
        }

    }

    const imageUploaded = async (e) => {
        //
        // console.log('Uploaded');
        const res = await fetch(`${API_URL}/events/${evt.id}`)
        const data = await res.json()
        setImagePreview(data.image.formats.thumbnail.url)
        setShowModal(false)
    }

    // console.log(values);

    return (
        <Layout title='Edit Events'>
            <Link href='/events'>Go Back</Link>
            <h1>Edit Event</h1>
            <ToastContainer />
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.grid}>
                    <div>
                        <label htmlFor="Name">Event Name</label>
                        <input
                            type="text"
                            id='name'
                            name='name'
                            value={values.name}
                            onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="Performers">Event Performers</label>
                        <input
                            type="text"
                            id='performers'
                            name='performers'
                            value={values.performers}
                            onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="Venue">Event Venue</label>
                        <input
                            type="text"
                            id='venue'
                            name='venue'
                            value={values.venue}
                            onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="Address">Event Address</label>
                        <input
                            type="text"
                            id='address'
                            name='address'
                            value={values.address}
                            onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="Date">Event Date</label>
                        <input
                            type="date"
                            id='date'
                            name='date'
                            value={moment(values.date).format('yyyy-MM-DD')}
                            onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="Name">Event Time</label>
                        <input
                            type="text"
                            id='time'
                            name='time'
                            value={values.time}
                            onChange={handleChange} />
                    </div>
                </div>
                <div>
                    <label htmlFor="Description">Event Description</label>
                    <textarea
                        type='text'
                        name="description"
                        id="description"
                        value={values.description}
                        onChange={handleChange}></textarea>
                </div>
                <input type='submit' value='Update Event' className='btn' />
            </form>
            <h2>Event Image</h2>
            {imagePreview ? <Image
                src={imagePreview}
                width={200}
                height={120}
            /> : <div><p>No Preview image</p></div>}
            <div>
                <button className="btn-secondary" onClick={() => setShowModal(true)}>
                    <FaImage /> Set Image
                </button>
            </div>
            <Modal show={showModal} onClose={() => setShowModal(false)}>
                <ImageUpload evtId={evt.id} imageUploaded={imageUploaded} />
            </Modal>
        </Layout>
    )
}


export async function getServerSideProps({ params: { id }, req }) {

    const res = await fetch(`${API_URL}/events/${id}`)
    const evt = await res.json()

    console.log(req.headers.cookie);

    return {
        props: {
            evt
        }
    }
}