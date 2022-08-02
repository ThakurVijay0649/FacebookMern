import React, { useEffect } from 'react'
import { Button, Typography } from '@mui/material';
import liveVideo from "../images/live-video.png"
import photo from "../images/photo.png"
import feeling from "../images/feeling.png"
import { Link } from 'react-router-dom';
import Post from "../Components/Post/Post"
import { useDispatch, useSelector } from 'react-redux';
import { getMyPosts } from '../Actions/Post';
import Loader from "../Components/Loader/Loader";
import { useAlert } from 'react-alert';
import { deleteProfile, logoutUser } from '../Actions/User';

const Account = () => {

    const dispatch = useDispatch();
    const alert = useAlert()
    const { loading, error, posts } = useSelector(state => state.myPosts);
    const { error: likeError, message, loading: deleteLoading } = useSelector(state => state.like);
    const { user, loading: userLoading, error: loginError } = useSelector(state => state.user)

    const deleteProfileHandler = async () => {
        await dispatch(deleteProfile())
        dispatch(logoutUser())

    }

    useEffect(() => {
        dispatch(getMyPosts())
    }, [dispatch])

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch({ type: "clearErrors" })
        }
        if (likeError) {
            alert.error(likeError)
            dispatch({ type: "clearErrors" })
        }
        if (loginError) {
            alert.error(loginError)
            dispatch({ type: "clearErrors" })
        }
        if (message) {
            alert.success(message)
            dispatch({ type: "clearMessage" })
        }
    }, [alert, error, message, dispatch, likeError, loginError]);

    return (
        loading === true || userLoading === true ? <Loader /> : (
            <div className="profile-container">
                <div className="profile-details">
                    <div className="pd-left">
                        <div className="pd-row">
                            <img src={user.avatar.url} alt="" className="pd-image" />
                            <div>
                                <h3>{user.name}</h3>
                                <p>{user.followers.length === 0 ? `No friends` : user.followers.length === 1 ? `${user.followers.length} Friend` : `${user.followers.length} Friends`}</p>
                            </div>
                        </div>
                    </div>
                    <div className="pd-right">
                        <Button variant="contained">{user.posts.length === 0 ? `No Posts` : user.posts.length === 1 ? `${user.posts.length} Post` : `${user.posts.length} Posts`}</Button>
                        <Link to="/update/profile"><Button variant="contained">Edit Profile</Button></Link>
                        <Link to="/update/password"><Button variant="contained">Change Password</Button></Link>
                        <Button variant="contained" onClick={deleteProfileHandler} disabled={deleteLoading}>Delete My Profile</Button>
                    </div>
                </div>
                <div className="profile-info">
                    <div className="info-col">
                        <div className="profile-intro">
                            <div className="title-box">
                                <h3 style={{ marginBottom: "1rem" }}>Followers</h3>
                            </div>
                            <div className="friends-box">
                                {
                                    user && user.followers.length > 0 ? user.followers.map(follower => (
                                        <div key={follower._id}>
                                            <Link to={`/user/${follower._id}`}><img src={follower.avatar.url} alt="" />
                                                <p>{follower.name}</p>
                                            </Link>
                                        </div>
                                    )) : <Typography>No Followers</Typography>
                                }
                            </div>
                        </div>
                        <div className="profile-intro">
                            <div className="title-box">
                                <h3 style={{ marginBottom: "1rem" }}>Following</h3>
                            </div>
                            <div className="friends-box">
                                {
                                    user && user.following.length > 0 ? user.following.map(follow => (
                                        <div key={follow._id}>
                                            <Link to={`/user/${follow._id}`}><img src={follow.avatar.url} alt="" />
                                                <p>{follow.name}</p>
                                            </Link>
                                        </div>
                                    )) : <Typography>You are not following anyone</Typography>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="post-col">
                        <Link to="/newpost" style={{ textDecoration: "none", color: "black" }}>
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
                                <div className="post-input-container" >
                                    <textarea rows="3" style={{ cursor: "pointer" }} disabled placeholder={`What's on your mind, ${user.name}?`}></textarea>
                                    <div className="add-post-links">
                                        <Link to="/"><img src={liveVideo} alt="" />Live Video</Link>
                                        <Link to="/"><img src={photo} alt="" />Photo/Video</Link>
                                        <Link to="/"><img src={feeling} alt="" />Feeling/Activity</Link>
                                    </div>
                                </div>
                            </div>
                        </Link>
                        {posts && posts.length > 0 ? posts.map(post => (
                            <Post
                                postId={post._id}
                                caption={post.caption}
                                postImage={post.image.url}
                                likes={post.likes}
                                comments={post.comments}
                                ownerImage={post.owner.avatar.url}
                                ownerName={post.owner.name}
                                date={post.createdAt}
                                ownerId={post.owner._id}
                                isDelete={true}
                                page="account"
                                key={post._id}
                            />
                        )) : <div>No posts</div>
                        }
                    </div>
                </div>
            </div>
        )
    )
}

export default Account