import React from 'react'
import { Link, useParams } from 'react-router-dom';
import { AiFillDelete } from "react-icons/ai"
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCommentOnPost, getMyPosts } from '../Actions/Post';
import { getFollowingPosts, getUserPosts } from '../Actions/User';

const CommentCard = ({
  userId,
  name,
  avatar,
  comment,
  commentId,
  postId,
  page
}) => {
  const { user } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const params = useParams();
  const deleteCommentHandler = async () => {
    await dispatch(deleteCommentOnPost(postId, commentId))
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
  return (
    <div className='commentCard'>
      <div className="user">
        <Link to={`/user/${userId}`} style={{ textDecoration: "none", color: "black" }}>
          <img src={avatar} alt={name} />
          <small>{name}</small>
        </Link>
      </div>
      <div className="comment">
        <p>{comment}</p>
      </div>
      {
        page === "account" ? <Button onClick={deleteCommentHandler}>
          <AiFillDelete />
        </Button> : userId === user._id ? <Button onClick={deleteCommentHandler}>
          <AiFillDelete />
        </Button> : null
      }
    </div>
  )
}

export default CommentCard