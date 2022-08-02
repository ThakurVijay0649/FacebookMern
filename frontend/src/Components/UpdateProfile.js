import { Avatar, Button } from '@mui/material';
import React, { useEffect, useState } from 'react'
import logo from "../images/facebook.png"
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { loadUser, updateProfile } from '../Actions/User';
import Loader from './Loader/Loader';

const UpdateProfile = () => {
    const { loading, error, user } = useSelector(state => state.user);
    const { loading: updateLoading, error: updateError, message } = useSelector(state => state.like);
    const dispatch = useDispatch();
    const alert = useAlert();
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [avatar, setAvatar] = useState("");
    const [avatarPrev, setAvatarPrev] = useState(user.avatar.url);


    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const Reader = new FileReader();
        Reader.readAsDataURL(file);
        Reader.onload = () => {
            if (Reader.readyState === 2) {
                setAvatarPrev(Reader.result);
                setAvatar(Reader.result);
            }
        }

    }
    const submitHandler = async (e) => {
        e.preventDefault();
        await dispatch(updateProfile(name, email, avatar));
        dispatch(loadUser());
    }

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch({ type: "clearErrors" });
        }
        if (updateError) {
            alert.error(updateError);
            dispatch({ type: "clearErrors" });
        }
        if (message) {
            alert.success(message);
            dispatch({ type: "clearMessage" });
        }
    }, [alert, error, dispatch, updateError, message])

    return (
        loading ? <Loader /> : (
            <div class="login-container">
                <div class="login-row">
                    <div class="img">
                        <img src={logo} alt="" />
                        <p>Facebook helps you connect and share with the people in your life.</p>
                    </div>
                    <div class="login-form-container">
                        <form onSubmit={submitHandler}>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <Avatar src={avatarPrev} sx={{ width: "3rem", height: "3rem" }} />
                                <input type="file" accept='image/*' onChange={handleImageChange} required style={{ width: "88%" }} />
                            </div>
                            <input required type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
                            <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address" />
                            <Button type="submit" variant='contained' disabled={updateLoading}>Update Profile</Button>
                        </form>
                    </div>
                </div>
            </div>
        )
    )
}

export default UpdateProfile