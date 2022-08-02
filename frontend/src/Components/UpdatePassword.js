import React, { useEffect, useState } from 'react'
import logo from "../images/facebook.png"
import { useDispatch, useSelector } from "react-redux"
import { Button } from '@mui/material';
import "../Components/Login/Login.css"
import { updatePassword } from '../Actions/User';
import { useAlert } from 'react-alert';
const UpdatePassword = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const dispatch = useDispatch();
    const alert = useAlert();
    const { loading, error, message } = useSelector(state => state.like);
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updatePassword(oldPassword, newPassword));
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
                        <input type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} placeholder="Enter Old Password" />
                        <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Enter New Password" />
                        <Button type="submit" variant="contained" disabled={loading}>Update Password</Button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default UpdatePassword