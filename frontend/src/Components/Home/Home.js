import React, { useEffect } from 'react'
import news from "../../images/news.png"
import friends from "../../images/friends.png"
import group from "../../images/group.png"
import marketplace from "../../images/marketplace.png"
import advertisement from "../../images/advertisement.png"
import watch from "../../images/watch.png"
import shortcut1 from "../../images/shortcut-1.png"
import shortcut2 from "../../images/shortcut-2.png"
import shortcut3 from "../../images/shortcut-3.png"
import shortcut4 from "../../images/shortcut-4.png"
import liveVideo from "../../images/live-video.png"
import photo from "../../images/photo.png"
import feeling from "../../images/feeling.png"
import Post from '../Post/Post'
import User from '../User'
import "./Home.css"
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers, getFollowingPosts } from '../../Actions/User'
import Loader from '../Loader/Loader'
import { Typography } from '@mui/material'
import { useAlert } from 'react-alert'



const Home = ({
    userId
}) => {
    const dispatch = useDispatch();
    const alert = useAlert()
    const { loading, posts, error } = useSelector(state => state.postOfFollowing);
    const { loading: userLoading, users } = useSelector(state => state.allUsers);
    const { error: likeError, message } = useSelector(state => state.like);
    const { user } = useSelector(state => state.user)

    useEffect(() => {
        dispatch(getFollowingPosts())
        dispatch(getAllUsers())
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
        if (message) {
            alert.success(message)
            dispatch({ type: "clearMessage" })
        }
    }, [alert, error, message, dispatch, likeError]);


    return (
        loading === true || userLoading === true ? <Loader /> : (
            <>
                <div className="left-sidebar">
                    <div className="imp-links">
                        <Link to="/"><img src={news} alt="" />Latest News</Link>
                        <Link to="/"><img src={friends} alt="" />Friends</Link>
                        <Link to="/"><img src={group} alt="" />Group</Link>
                        <Link to="/"><img src={marketplace} alt="" />Marketplace</Link>
                        <Link to="/"><img src={watch} alt="" />Watch</Link>
                        <Link to="/">See More</Link>
                    </div>
                    <div className="shortcut-links">
                        <p>Your Shorcuts</p>
                        <Link to="/"><img src={shortcut1} alt="" />Web Developers</Link>
                        <Link to="/"><img src={shortcut2} alt="" />Web Design Course</Link>
                        <Link to="/"><img src={shortcut3} alt="" />Full Stack Development</Link>
                        <Link to="/"><img src={shortcut4} alt="" />Website Experts</Link>
                    </div>
                </div>
                <div className="main-content">
                    <Link to="/newpost" style={{ textDecoration: "none", color: "black" }}>
                        <div className="write-post-container">
                            <div className="user-profile">
                                <Link to="/account" style={{ display: "flex", alignItems: "center" }}>
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
                    <div className="allUserContainer">
                        {users && users.length > 0 ? users.map((user) => (
                            <User
                                key={user._id}
                                userId={user._id}
                                name={user.name}
                                avatar={user.avatar.url}
                            />
                        )) : <Typography variant="h6">No Users</Typography>
                        }
                    </div>
                    {posts && posts.length > 0 ? posts.map((post) => (
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
                            isDelete={false}
                            page="home"

                        />
                    )) : <Typography variant="h5" style={{ textAlign: "center" }}>No Posts</Typography>
                    }

                </div>
                <div className="right-sidebar">
                    <div className="sidebar-title">
                        <h4>Events</h4>
                        <a href="#">See All</a>
                    </div>
                    <div className="event">
                        <div className="left-event">
                            <h3>18</h3>
                            <span>March</span>
                        </div>
                        <div className="right-event">
                            <h4>Social Media</h4>
                            <p><i className="fa-solid fa-location-dot"></i> Willson Tech Park</p>
                            <a href="#">More Info</a>
                        </div>
                    </div>
                    <div className="event">
                        <div className="left-event">
                            <h3>22</h3>
                            <span>June</span>
                        </div>
                        <div className="right-event">
                            <h4>Mobile Marketing</h4>
                            <p><i className="fa-solid fa-location-dot"></i> Willson Tech Park</p>
                            <a href="#">More Info</a>
                        </div>
                    </div>
                    <div className="sidebar-title">
                        <h4>Advertisement</h4>
                        <a href="#">Close</a>
                    </div>
                    <img src={advertisement} alt="" className="sidebar-ads" />
                    <div className="sidebar-title">
                        <h4>Conversation</h4>
                        <a href="#">Hide Chat</a>
                    </div>
                    {users && users.length > 0 ? users.map((user) => (
                        <User
                            key={user._id}
                            userId={user._id}
                            name={user.name}
                            avatar={user.avatar.url}
                        />
                    )) : <Typography variant="h6">No Users</Typography>
                    }
                </div>
            </>
        )

    )
}

export default Home
