import React, { useState, useEffect, useContext } from 'react'
import { FaUser } from 'react-icons/fa'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link'
import Layout from '../../components/Layout'
import styles from '../../styles/LoginPage.module.css'

export default function LoginPage() {


    const [login, setLogin] = useState({
        user: '',
        password: ''
    })

    const handleChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(login.user);
        console.log(login.password)
    }


    return (
        <Layout title='User Login'>
            <div className={styles.auth}>
                <form onSubmit={handleSubmit}>
                    <h1>
                        <FaUser /> Login
                </h1>
                    <ToastContainer />
                    <div>
                        <label htmlFor="Email" >Email</label>
                        <input
                            type="text"
                            name='user'
                            value={login.user}
                            onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="Password" >Password</label>
                        <input
                            type="password"
                            name='password'
                            value={login.password}
                            onChange={handleChange} />
                    </div>
                    <input type="submit" value='Login' className='btn' />
                </form>
                <p>
                    Don't have an account? <Link href='/account/register'>Click Here</Link>
                </p>
            </div>
        </Layout>
    )
}
