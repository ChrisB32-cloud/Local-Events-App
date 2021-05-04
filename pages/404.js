import React from 'react'
import { FaExclamationTriangle } from 'react-icons/fa'
import Link from 'next/link'
import styles from '../styles/404.module.css'
import Layout from '../components/Layout'

export default function NotFoundPage() {
    return (
        <Layout title='Page Not Found'>
            <div className={styles.error}>
                <h1>
                    <FaExclamationTriangle /> 404
                </h1>
                <h4>Sorry, Nothing Here</h4>
                <Link href='/'>GoBack</Link>
            </div>
        </Layout>
    )
}
