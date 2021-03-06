import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";
import {AuthContext} from "../context/AuthContext";

export const AuthPage = () => {

    const {loading, error, request, clearError} = useHttp()
    const auth = useContext(AuthContext)

    const message = useMessage()
    const [form, setForm] = useState({
        email: '', password: ''
    })

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    const handleFormChange = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const handleUserRegistration = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form})
            console.log(data)
        } catch (e) {
        }
    }

    const handleUserLogin = async () => {
        try {
            const data = await request('/api/auth/login/', 'POST', {...form})
            console.log("data: ", {data})

            auth.login(data.token, data.userId)
        } catch (e) {}
    }
    return (
        <div className="row">

            <div className="col s6 offset-s3">
                <h1>Your Crypto Addresses</h1>
                <div className="card deep-orange darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Authentication</span>
                        <div className="input-field">
                            <input
                                // placeholder="Enter email"
                                id="email" type="email"
                                className="auth-input"
                                name="email"
                                onChange={handleFormChange}
                            />
                            <label htmlFor="email">Email</label>
                        </div>
                        <div className="input-field">
                            <input
                                // placeholder="Enter password"
                                name="password"
                                id="password" type="password"
                                className="auth-input"
                                onChange={handleFormChange}

                            />
                            <label htmlFor="password">Password</label>
                        </div>
                    </div>
                    <div className="card-action">
                        <button
                            className="btn yellow darken-4"
                            disabled={loading}
                            onClick={handleUserLogin}
                        >
                            Enter
                        </button>
                        <button
                            className="btn grey lighten-1 black-text"
                            onClick={handleUserRegistration}
                            disabled={loading}
                        >
                            Registration
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
