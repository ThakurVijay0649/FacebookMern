const express = require('express');
const { createPost, likeAndUnlikePost, deletePost, getPostOfFollowing, updateCaption, addComment, deleteComment } = require('../controllers/post');
const { getMyPosts, getUserPosts } = require('../controllers/user');
const { isAuthenticated } = require('../middlewares/auth');
const router = express.Router();

router.route("/post/upload").post(isAuthenticated, createPost);
router.route("/post/:id").get(isAuthenticated, likeAndUnlikePost).delete(isAuthenticated, deletePost).put(isAuthenticated, updateCaption);
router.route("/my/posts").get(isAuthenticated, getMyPosts)
router.route("/userposts/:id").get(isAuthenticated, getUserPosts)
router.route("/posts").get(isAuthenticated, getPostOfFollowing);
router.route("/post/comment/:id").put(isAuthenticated, addComment).delete(isAuthenticated, deleteComment);


module.exports = router;