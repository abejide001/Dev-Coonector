const express = require('express');
const Post = require('../../controller/postController');
const Auth = require('../../middleware/verifyToken');
const ValidatePost = require('../../middleware/validatePost');
const ValidateComment = require('../../middleware/validateComment');

const router = express.Router();

router.post('/', Auth.verifyToken, ValidatePost.validatePost, Post.createPost);
router.get('/', Auth.verifyToken, Post.getPosts);
router.delete('/:id', Auth.verifyToken, Post.deletePost);
router.get('/:id', Auth.verifyToken, Post.getPost);
router.post('/like/:id', Auth.verifyToken, Post.likePost);
router.post('/comment/:id', Auth.verifyToken, ValidateComment.validateComment, Post.addComment);
router.delete('/comment/:id/:comment_id', Auth.verifyToken, Post.removeComment);

module.exports = router;
