import React, { useState } from 'react'
import { useRouter } from 'next/router'
import styles from '../styles/SearchComp.module.css'

export default function SearchComp() {

    const router = useRouter()
    const [term, setTerm] = useState('')


    function handleChange(e) {
        setTerm(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()
        router.push(`events/search?term=${term}`)
        setTerm('')
    }

    // console.log(search);

    return (
        <div className={styles.search}>
            <form onSubmit={handleSubmit}>
                <input type="text" onChange={handleChange} placeholder='Search Events' />
            </form>
        </div>
    )
}
