import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { forgotPassword } from '../Actions/User'
import logo from "../images/facebook.png"


const ForgotPassword = () => {
    const [email, setEmail] = useState('')
    const dispatch = useDispatch();
    const alert = useAlert()
    const { error, loading, message } = useSelector(state => state.like)
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(forgotPassword(email))
    }

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch({ type: "clearErrors" });
        }
        if (message) {
            alert.success(message);
            dispatch({ type: "clearMessage" });
        }
    }, [alert, error, dispatch, message])

    return (
        <div className=
            "login-container">
            <div className=
                "login-row">
                <div className=
                    "img">
                    <img src={logo} alt="" />
                    <p>Facebook helps you connect and share with the people in your life.</p>
                </div>
                <div className=
                    "login-form-container">
                    <form onSubmit={submitHandler}>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address" />
                        <Button type="submit" variant="contained" disabled={loading}>Send Link</Button>
                        <strong style={{ textAlign: "center", marginBottom: "1rem" }}>Or</strong>
                        <Link to="/">
                            <Button variant="contained">Login</Button>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword