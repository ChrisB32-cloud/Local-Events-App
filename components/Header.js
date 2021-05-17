import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext'
import Link from 'next/link'
import SearchComp from './SearchComp'
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa'
import styles from '../styles/Header.module.css'


export default function Header() {


    const { user, logout } = useContext(AuthContext)

    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <Link href='/'><a>Local Events</a></Link>
            </div>
            <SearchComp />
            <nav>
                <ul>
                    <li>
                        <Link href='/events'><a>Events</a></Link>
                    </li>
                    {user ?

                        <>
                            <li>
                                <Link href='/events/add'>
                                    <a>Add Event</a>
                                </Link>
                            </li>
                            <li>
                                <Link href='/account/dashboard'>
                                    <a>Dashboard</a>
                                </Link>
                            </li>
                            <li>
                                <button className="btn-secondary btn-icon" onClick={logout}>
                                    <FaSignOutAlt />SignOut
                                </button>
                            </li>
                        </> : <><li>
                            <Link href='/account/login'>
                                <a className='btn-secondary'>
                                    <FaSignInAlt /> Login
                            </a>
                            </Link>
                        </li></>}


                </ul>
            </nav>
        </header>
    )
}
