import React, { Component } from 'react'
import  { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getPost } from '../../actions/postActions'
import PostItem from '../post/PostItem'
import Spinner from '../common/Spinner'
import CommentForm from './CommentForm';
import CommentField from './CommentField';
class Post extends Component {
componentDidMount () {
    this.props.getPost(this.props.match.params.id)
}
  render() {
      const { post, loading } = this.props.post.posts;
      let postContent;
      if (post === undefined || loading || Object.keys(post).length === 0) {
          postContent = <Spinner/>
      } else {
          postContent = (
              <div>
                  <p className="lead">{post.text}</p>
              <CommentForm postId={post._id}/>
              <CommentField postId={post._id} comments={post.comments}/>
              </div>
          )
      }
    return (
      <div className="post">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <a href="/post" className="btn btn-light mb-3">
                 Back to Feed
              </a>
              {postContent}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
    return {
        post: state.post
    }
}
export default connect(mapStateToProps, { getPost })(Post)
