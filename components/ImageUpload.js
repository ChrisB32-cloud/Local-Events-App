import React, { useState } from 'react'
import { API_URL } from '../config/index'
import styles from '../styles/Form.module.css'

export default function ImageUpload({ evtId, ImageUploaded }) {

    const [image, setImage] = useState(null)

    const handleChange = (e) => {
        //
        // console.log(e.target.files[0]);
        setImage(e.target.files[0]);
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('files', image)
        formData.append('ref', 'events')
        formData.append('refId', evtId)
        formData.append('field', 'image')

        const res = await fetch(`${API_URL}/upload`, {
            method: 'POST',
            body: formData
        })

        if (res.ok) {
            ImageUploaded()
        }

    }

    console.log(image);

    return (
        <div className={styles.form}>
            <h1>Upload Event Image</h1>
            <form onSubmit={handleSubmit}>
                <div className={styles.file}>
                    <input type="file" onChange={handleChange} />
                </div>
                <input type="submit" value='Upload' className='btn' />
            </form>
        </div>
    )
}
