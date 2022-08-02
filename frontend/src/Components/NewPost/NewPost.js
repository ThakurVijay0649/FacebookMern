import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useAlert } from 'react-alert';
import "./NewPost.css"
import { createNewPost } from '../../Actions/Post';
import { loadUser } from '../../Actions/User';

const NewPost = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const { loading, error, message } = useSelector(state => state.like);
    const [caption, setCaption] = useState("");
    const [image, setImage] = useState("");
    const { user } = useSelector(state => state.user);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const Reader = new FileReader();
        Reader.readAsDataURL(file);
        Reader.onload = () => {
            if (Reader.readyState === 2) {
                setImage(Reader.result);
            }
        }

    }

    const submitHandler = async (e) => {
        e.preventDefault();
        await dispatch(createNewPost(caption, image));
        dispatch(loadUser());
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
    }, [alert, error, message, dispatch])

    return (
        <div className="newPostContainer">
            <h1>Create Post</h1>
            <hr />
            <div className="write-post-container">
                <div className="user-profile">
                    <Link to={`/user/${user._id}`} style={{ display: "flex", alignItems: "center" }}>
                        <div>
                            <img src={user.avatar.url} alt="" />
                        </div>
                        <p style={{
                            fontSize: "16px",
                            fontWeight: "bold",
                            marginTop: "-15px"
                        }}>{user.name}</p>
                    </Link>
                </div>
                <form className="post-input-container" onSubmit={submitHandler} >
                    <textarea rows="3" style={{ cursor: "pointer" }} value={caption} onChange={(e) => setCaption(e.target.value)} placeholder={`What's on your mind, ${user.name}?`}></textarea>
                    {image && <img src={image} alt="" className="post-img" />}
                    <input type="file" accept='image/*' onChange={handleImageChange} style={{ width: "100%", marginBottom: "1rem" }} />
                    <Button type="submit" variant="contained" disabled={loading}>Post</Button>
                </form>
            </div>
        </div>
    )
}

export default NewPost