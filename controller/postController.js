/* eslint-disable no-underscore-dangle */
const PostModel = require('../model/Post');
const ProfileModel = require('../model/Profile');

class Post {
  static async createPost(req, res) {
    const { text, name } = req.body;
    const newPost = new PostModel({
      text,
      name,
      avatar: req.body.avatar,
      user: req.user.userId,
    });
    const result = await newPost.save();
    res.status(201).json({
      success: true,
      message: 'Post created',
      result,
    });
  }

  static async getPosts(req, res) {
    const posts = await PostModel.find().populate('user', ['name']);
    res.status(200).json({ success: true, posts });
  }

  static async deletePost(req, res) {
    ProfileModel.findOne({ user: req.user.userId._id })
      .then(() => {
        PostModel.findById(req.params.id)
          .then((post) => {
            if (post.user.toString() !== req.user.userId._id) {
              res.status(401).json({ success: false, message: 'not authorized ' });
              return;
            }
            post.remove().then(() => res.status(200).json({ success: true, message: 'post deleted' }));
          });
      });
  }

  static async getPost(req, res) {
    const post = await PostModel.findById(req.params.id);
    if (!post) {
      res.status(404).json({
        success: false,
        message: 'No post found',
      });
      return;
    }
    res.status(200).json({ success: true, post });
  }

  static likePost(req, res) {
    ProfileModel.findOne({ user: req.user.userId._id })
      .then(() => {
        PostModel.findById(req.params.id)
          .then((post) => {
            if (post.likes.filter(
              like => like.user.toString() === req.user.userId._id,
            ).length > 0) {
              res.status(400).json({ success: false, message: 'post already liked' });
              return;
            }
            post.likes.unshift({ user: req.user.userId._id });
            post.save().then(likePost => res.status(200).json(likePost));
          });
      });
  }


  static unlikePost(req, res) {
    ProfileModel.findOne({ user: req.user.userId._id })
      .then(() => {
        PostModel.findById(req.params.id)
          .then((post) => {
            if (
              post.likes.filter(
                like => like.user.toString() === req.user.userId._id,
              ).length === 0) {
              res.status(400).json({ success: false, message: 'you have not liked' });
              return;
            }
            const removeIndex = post.likes.map(item => item.user.toString())
              .indexOf(req.user.userId);
            post.likes.splice(removeIndex, 1);
            post.save().then(unlike => res.json(unlike));
          });
      });
  }

  static async addComment(req, res) {
    let post = await PostModel.findById(req.params.id);
    if (!post) {
      res.status(404).json({
        success: false,
        message: 'No post found',
      });
      return;
    }
    const newComment = {
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.userId,
    };
    post.comments.unshift(newComment);
    post = await post.save();
    res.status(200).json({ success: true, post });
  }

  static removeComment(req, res) {
    PostModel.findById(req.params.id)
      .then((post) => {
        if (post.comments.filter(
          comment => comment._id.toString() === req.params.comment_id,
        ).length === 0) {
          res.status(400).json({ success: false, message: 'comment does not exist' });
          return;
        }
        const removeIndex = post.likes.map(item => item._id.toString())
          .indexOf(req.params.comment_id);
        post.comments.splice(removeIndex, 1);
        post.save().then(postComment => res.json(postComment));
      });
  }
}
module.exports = Post;
