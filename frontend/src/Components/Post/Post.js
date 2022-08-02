import React, { useEffect, useState } from 'react'
import { AiFillLike, AiFillDelete, AiOutlineLike } from "react-icons/ai"
import { MdModeComment } from "react-icons/md"
import { ImCross } from "react-icons/im"
import CommentCard from '../CommentCard'
import { Button, Typography } from "@mui/material"
import { MoreVert } from "@mui/icons-material"
import "./Post.css"
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addCommentOnPost, deletePost, getMyPosts, likePost, updateCaption } from '../../Actions/Post'
import { getFollowingPosts, getUserPosts, loadUser } from '../../Actions/User'
import User from '../User'
const Post = ({
    postId,
    caption,
    postImage,
    likes = [],
    comments = [],
    ownerImage,
    ownerName,
    date,
    ownerId,
    isDelete = false,
    page = "home",
}) => {
    const [classList, setClassList] = useState('')
    const [liked, setLiked] = useState(false);
    const dispatch = useDispatch();
    const params = useParams()
    const { user } = useSelector(state => state.user)
    const [likeDisplay, setLikeDisplay] = useState("hideLikeListContainer");
    const [captionDisplay, setCaptionDisplay] = useState("hideLikeListContainer");
    const [commentValue, setCommentValue] = useState("");
    const [captionValue, setCaptionValue] = useState(caption);


    const toggleContainer = () => {
        if (classList === '') {
            setClassList('showCommentContainer')
        }
        else {
            setClassList('')
        }
    }


    const handleLike = async () => {
        setLiked(!liked)
        await dispatch(likePost(postId))

        if (page === "account") {
            dispatch(getMyPosts())
        }
        else if (page === "userProfile") {
            dispatch(getUserPosts(params.id))
        }
        else {
            dispatch(getFollowingPosts())
        }
    }

    const addCommentHandler = async (e) => {
        e.preventDefault();
        await dispatch(addCommentOnPost(postId, commentValue))
        if (page === "account") {
            dispatch(getMyPosts())
        }
        else if (page === "userProfile") {
            dispatch(getUserPosts(params.id))
        }
        else {
            dispatch(getFollowingPosts())
        }
    }

    const updateCaptionHandler = async (e) => {
        e.preventDefault();
        await dispatch(updateCaption(captionValue, postId))
        dispatch(getMyPosts())
    }

    const deletePostHandler = async () => {
        await dispatch(deletePost(postId));
        dispatch(getMyPosts());
        dispatch(loadUser())
    }

    useEffect(() => {
        likes.forEach(item => {
            if (item._id === user._id) {
                setLiked(true)
            }
        })
    }, [likes, user._id])

    return (
        <div className="post-container">
            <div className="post-row">
                <div className="user-profile">
                    <Link to={`/user/${user._id}`}>
                        <img src={user.avatar.url} alt="" />
                    </Link>
                    <div>
                        <p>{user.name}</p>
                        <span>{date.toString().split("T")[0]}</span>
                    </div>
                </div>
                {page === "account" ? <MoreVert onClick={() => setCaptionDisplay("showLikeListContainer")} style={{ cursor: "pointer" }} /> : null}
            </div>
            <p className="post-text">{caption}</p>
            <img src={postImage} alt="" className="post-img" />
            <div className="post-row">
                <div className="activity-icons">
                    <div >
                        <Button onClick={handleLike} style={{ padding: "0 !important", minWidth: "0 !important" }}>{liked ? <AiFillLike style={{ color: "#1876f2" }} /> : <AiOutlineLike style={{ color: "black" }} />}
                        </Button>
                        <Button onClick={() => setLikeDisplay("showLikeListContainer")} disabled={likes.length === 0 ? true : false}>{likes.length === 0 ? `No Likes` : likes.length === 1 ? `${likes.length} Like` : `${likes.length} Likes`}</Button>
                    </div>
                    <Button style={{ marginTop: "8px" }} onClick={toggleContainer}><MdModeComment style={{ fontSize: "1.5rem" }} /></Button>
                    <Button disabled={comments.length === 0 ? true : false}>{comments.length === 0 ? `No Comment` : likes.length === 1 ? `${comments.length} Comment` : `${comments.length} Comments`}</Button>
                    {

                        isDelete ? <Button style={{ marginTop: "5px" }} onClick={deletePostHandler}><AiFillDelete style={{ fontSize: "1.5rem" }} /></Button> : null
                    }
                </div>
            </div>
            <div id="commentContainer" className={classList}>
                <div className="writeComment">
                    <form onSubmit={addCommentHandler}>
                        <input type="text" value={commentValue} onChange={(e) => setCommentValue(e.target.value)} placeholder='Write something here' />
                        <Button type="submit" variant="contained">Add</Button>
                    </form>
                </div>
                {
                    comments.length > 0 ? comments.map(item => (
                        <CommentCard
                            key={item._id}
                            userId={item.user._id}
                            name={item.user.name}
                            avatar={item.user.avatar.url}
                            comment={item.comment}
                            commentId={item._id}
                            postId={postId}
                            page={page}
                        />
                    )) : <Typography>No Comments</Typography>
                }
            </div>

            <div className={`likeListContainer ${likeDisplay}`}>
                <div className="cross">
                    <h2>Liked By</h2>
                    <span onClick={() => setLikeDisplay("hideLikeListContainer")}><ImCross /></span>
                </div>
                {likes && likes.length > 0 ? likes.map((user) => (
                    <User
                        key={user._id}
                        userId={user._id}
                        name={user.name}
                        avatar={user.avatar.url}
                    />
                )) : <Typography variant="h6">No Likes</Typography>
                }
            </div>
            <div className={`likeListContainer ${captionDisplay}`}>
                <div className="cross">
                    <h2>Update Caption</h2>
                    <span onClick={() => setCaptionDisplay("hideLikeListContainer")}><ImCross /></span>
                </div>
                <form className="input" onSubmit={updateCaptionHandler}>
                    <input type="text" value={captionValue} onChange={(e) => setCaptionValue(e.target.value)} placeholder={`What is on your mind ${user.name}?`} />
                    <Button type="submit" variant="contained">Update</Button>
                </form>
            </div>

        </div >
    )
}

export default Post
