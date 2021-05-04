import React from 'react'
import Head from 'next/head'
import styles from '../styles/Layout.module.css'

export default function Layout({ title, keywords, description, children }) {
    return (
        <div>
            <Head>
                <title> {title} </title>
                <meta name='description' content={description} />
                <meta name='keywords' content={keywords} />
            </Head>
            <div className={styles.container}>
                {children}
            </div>
        </div>
    )
}

Layout.default = {
    title: 'Local events | Finds events',
    description: 'Find the latest local events happening in your area',
    keywords: 'local, events, town, local area'
}
