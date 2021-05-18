import React, { useState, useEffect, useContext } from 'react'
import { FaUser } from 'react-icons/fa'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthContext from '../../context/AuthContext'
import Link from 'next/link'
import Layout from '../../components/Layout'
import styles from '../../styles/LoginPage.module.css'

export default function LoginPage() {

    const { login, error } = useContext(AuthContext);
    const [getLogin, setGetLogin] = useState({
        user: '',
        password: ''
    });

    const handleChange = (e) => {
        setGetLogin({ ...getLogin, [e.target.name]: e.target.value })
    }

    useEffect(() => error && toast.error(error))

    const handleSubmit = (e) => {
        e.preventDefault()
        // console.log(getLogin.user);
        // console.log(getLogin.password)
        try {
            const email = getLogin.user
            const password = getLogin.password
            login({ email, password })
        } catch (err) {
            console.log(err, error);
        }
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
                            value={getLogin.user}
                            onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="Password" >Password</label>
                        <input
                            type="password"
                            name='password'
                            value={getLogin.password}
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
