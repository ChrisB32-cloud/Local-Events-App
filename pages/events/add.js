import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { API_URL } from '../../config/index'
import Layout from '../../components/Layout'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from '../../styles/Form.module.css'
import { async } from 'q'


export default function AddEvetsPage() {

    const router = useRouter()
    const [values, setValues] = useState({
        name: '',
        performers: '',
        venue: '',
        address: '',
        date: '',
        time: '',
        description: ''
    })

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

        const res = await fetch(`${API_URL}/events`, {
            method: 'POST',
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

    // console.log(values);

    return (
        <Layout title='Add New Events'>
            <Link href='/events'>Go Back</Link>
            <h1>Add Event</h1>
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
                            value={values.date}
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
                <input type='submit' value='Add Event' className='btn' />
            </form>
        </Layout>
    )
}
