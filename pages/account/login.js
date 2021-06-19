import React, { useState, useEffect, useContext } from 'react'
import { FaUser } from 'react-icons/fa'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthContext from '../../context/AuthContext'
import Link from 'next/link'
import Layout from '../../components/Layout'
import styles from '../../styles/LoginPage.module.css'

export default function LoginPage() {

    // Destructuring login and error from context
    const { login, error } = useContext(AuthContext);
    const [getLogin, setGetLogin] = useState({
        userEmail: '',
        password: ''
    });


    // OnChange function 
    // Setting state from login form
    const handleChange = (e) => {
        setGetLogin({ ...getLogin, [e.target.name]: e.target.value })
    }

    // If error show error with toast error message
    useEffect(() => error && toast.error(error))

    // OnSubmit function
    // Grabbing the email and password from state
    // Try block assing email and password to context login function
    // Catch block catching and clg the error
    const handleSubmit = (e) => {
        e.preventDefault()
        // console.log(getLogin.user);
        // console.log(getLogin.password)
        try {
            const email = getLogin.userEmail
            const password = getLogin.password
            login({ email, password })
        } catch (err) {
            console.log(err, error);
        }
    }


    // UI
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
                            name='userEmail'
                            value={getLogin.userEmail}
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
