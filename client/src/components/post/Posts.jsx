import React, { Component } from 'react'
import { connect } from 'react-redux'
import Spinner from '../common/Spinner'
import PostForm from './PostForm'
import PostFeed from './PostFeed'
import { getPosts } from '../../actions/postActions';

class Posts extends Component {
  componentDidMount () {
    this.props.getPosts()
  }
  render() {
    const { posts } = this.props.posts.posts
    const { loading } = this.props
    let postContent;
    if (posts === undefined || loading) {
      postContent = <Spinner />;
    } else {
      postContent = <PostFeed posts={posts} />;
    }
    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
               <PostForm/>
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
    posts: state.post
  }
}
export default connect(mapStateToProps, { getPosts })(Posts)
