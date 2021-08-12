import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'

export const AuthPage = () => {
    const auth = useContext(AuthContext)
    const message = useMessage()
    const [form, setForm] = useState({ email: '', password: '' })
    const { loading, request, error, clearError } = useHttp()

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', { email: form.email, password: form.password })
            message(data.message)
        } catch (e) { }
    }

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', { email: form.email, password: form.password })
            auth.login(data.token, data.userId)
        } catch (e) { }
    }

    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>Minimize your link!</h1>
                <div className="card blue accent-2">
                    <div className="card-content white-text">
                        <span className="card-title" style={{ marginBottom: 55, fontWeight: 'bolder' }}>Authorization</span>
                        <div>
                            <div className="input-field">
                                <input
                                    placeholder="Enter email"
                                    id="email"
                                    type="text"
                                    name="email"
                                    value={form.email}
                                    className="yellow-input pdmg"
                                    onChange={changeHandler}
                                />
                                <label htmlFor="email">Email</label>
                            </div>
                            <div className="input-field">
                                <input
                                    placeholder="Enter password"
                                    name="password"
                                    id="password"
                                    type="password"
                                    value={form.password}
                                    className="yellow-input pdmg"
                                    onChange={changeHandler}
                                />
                                <label htmlFor="password">Password</label>
                            </div>
                        </div>
                    </div>
                    <div className="card-action">
                        <button
                            className='btn yellow darken-4 bolder'
                            style={{ marginRight: 10 }}
                            onClick={loginHandler}
                            disabled={loading}
                        >Sign in</button>
                        <button
                            onClick={registerHandler}
                            disabled={loading}
                            className='btn grey lighten-1 black-text bolder'
                        >Sign up</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
