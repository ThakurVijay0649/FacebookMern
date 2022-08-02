import React, { useEffect, useState } from 'react'
import logo from "../images/facebook.png"
import { useDispatch, useSelector } from "react-redux"
import { Button } from '@mui/material';
import "../Components/Login/Login.css"
import { useAlert } from 'react-alert';
import { resetPassword } from '../Actions/User';
import { Link, useParams } from 'react-router-dom';
const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const dispatch = useDispatch();
    const alert = useAlert();
    const params = useParams()
    const { loading, error, message } = useSelector(state => state.like);
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(resetPassword(params.token, newPassword))
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
                        <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Enter New Password" />
                        <Button type="submit" variant="contained" disabled={loading}>Reset Password</Button>
                        <Link to="/" style={{ marginTop: "2rem" }}>
                            <Button variant="contained">Login</Button>
                        </Link>
                        <Link to="/forgot/password" style={{ marginTop: "2rem" }}>
                            <Button variant="contained">Request New Link</Button>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword