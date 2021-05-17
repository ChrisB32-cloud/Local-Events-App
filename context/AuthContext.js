import React, { useState, useEffect, createContext } from 'react'
import { useRouter } from 'next/router'
import { API_URL } from '../config/index'
import { async } from 'q'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [error, setError] = useState(null)

    // Register User
    const register = async (user) => {
        console.log(user);
    }

    // Sign In a User
    const login = async ({ email: identifier, password }) => {
        console.log({ identifier, password });
    }

    // Sign Out a User
    const logout = async () => {
        console.log('logout');
    }

    // Check if user is logged in
    const checkIfUserIsLoggedIn = ({ user }) => {
        console.log('Checked'), user;
    }

    return (
        <AuthContext.Provider value={{ user, error, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext