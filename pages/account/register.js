import React, { useState, useEffect, useContext } from 'react'
import AuthContext from '../../context/AuthContext'
import { FaUser } from 'react-icons/fa'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link'
import Layout from '../../components/Layout'
import styles from '../../styles/LoginPage.module.css'

export default function RegisterPage() {

    // Destructuring register and error from context
    const { register, error } = useContext(AuthContext);

    // Create a getLogin varible for state
    const [getLogin, setGetLogin] = useState({
        userName: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    // If error show error with toast error message
    useEffect(() => error && toast.error(error))

    // OnChange function 
    // Setting state from login form
    const handleChange = (e) => {
        setGetLogin({ ...getLogin, [e.target.name]: e.target.value })
    }

    // OnSubmit function
    // If passwords not equal then show error from context
    // Show error in toast error
    // Reset State
    // Else pass state to register function from context
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
            return
        }


        const username = getLogin.userName;
        const email = getLogin.email;
        const password = getLogin.password
        register({ username, email, password })

    }



    // UI
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
                    <input type="submit" value='Register' className='btn' />
                </form>
                <p>
                    Have an account? <Link href='/account/login'>Click Here</Link>
                </p>
            </div>
        </Layout>
    )
}
