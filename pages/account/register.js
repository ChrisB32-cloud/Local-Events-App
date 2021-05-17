import React, { useState, useEffect, useContext } from 'react'
import AuthContext from '../../context/AuthContext'
import { FaUser } from 'react-icons/fa'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link'
import Layout from '../../components/Layout'
import styles from '../../styles/LoginPage.module.css'

export default function RegisterPage() {

    const { register, error } = useContext(AuthContext);

    const [getLogin, setGetLogin] = useState({
        userName: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const handleChange = (e) => {
        setGetLogin({ ...getLogin, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (getLogin.password !== getLogin.confirmPassword) {
            toast.error(`Password Doesn't Match!!`)
            setGetLogin({
                userName: '',
                email: '',
                password: '',
                confirmPassword: ''
            })
        }

        try {
            register(getLogin)
        } catch (err) {
            console.log(err, error);
        }
    }



    return (
        <Layout title='User Login'>
            <div className={styles.auth}>
                <form onSubmit={handleSubmit}>
                    <h1>
                        <FaUser /> Create Account
                </h1>
                    <ToastContainer />
                    <div>
                        <label htmlFor="User" >User Name</label>
                        <input
                            type="text"
                            name='userName'
                            value={getLogin.userName}
                            onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="Email" >Email</label>
                        <input
                            type="text"
                            name='email'
                            value={getLogin.email}
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
                    <div>
                        <label htmlFor="Password" > Confirm Password</label>
                        <input
                            type="password"
                            name='confirmPassword'
                            value={getLogin.confirmPassword}
                            onChange={handleChange} />
                    </div>
                    <input type="submit" value='Login' className='btn' />
                </form>
                <p>
                    Have an account? <Link href='/account/login'>Click Here</Link>
                </p>
            </div>
        </Layout>
    )
}
