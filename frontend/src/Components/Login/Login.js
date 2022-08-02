import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import logo from "../../images/facebook.png"
import { useDispatch, useSelector } from "react-redux"
import { loginUser } from '../../Actions/User';
import { Button } from '@mui/material';
import "./Login.css"
import { useAlert } from 'react-alert';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const alert = useAlert()
    const { loading, error, message } = useSelector(state => state.user)

    const loginHandler = (e) => {
        e.preventDefault();
        dispatch(loginUser(email, password));

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
                    <form onSubmit={loginHandler}>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address" />
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                        <Button type="submit" variant="contained" disabled={loading}>Login</Button>
                        <Link to="/forgot/password" style={{ marginTop: "2rem" }}>forgotten password?</Link>
                        <hr style={{ marginTop: "2rem" }} />
                        <strong style={{ textAlign: "center", marginBottom: "1rem" }}>Or</strong>
                        <Link to="/register">
                            <Button className=
                                "signup">Create New Account</Button>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login