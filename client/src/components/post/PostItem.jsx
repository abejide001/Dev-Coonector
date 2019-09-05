import React, { Component } from 'react'
import { connect } from 'react-redux';
import { deletePost, addLike, removeLike } from '../../actions/postActions'
 class PostItem extends Component {
    handleDelete = id => {
        this.props.deletePost(id)
		window.location.reload()
    }
    handleLike = id => {
        this.props.addLike(id)
    }
    handleUnLike = id => {
        this.props.removeLike(id)
    }
  render() {
      const { post, auth, showActions } = this.props;   
    return (
      <div className="card card-body mb-3">
              <div className="row">
                <div className="col-md-2">
                  <a href="profile.html">
                    <img className="rounded-circle d-none d-md-block" src={post.avatar}
                      alt="" />
                  </a>
                  <br />
                  <p className="text-center">{post.name}</p>
                </div>
                <div className="col-md-10">
                  <p className="lead">{post.text}</p>
                  {showActions ? (<span>
                    <button type="button" className="btn btn-light mr-1">
                    <i className="text-info fas fa-thumbs-up" onClick={() => this.handleLike(post._id)}></i>
                    <span className="badge badge-light">{post.likes.length}</span>
                  </button>
                  <button type="button" className="btn btn-light mr-1" onClick={() => this.handleUnLike(post._id)}>
                    <i className="text-secondary fas fa-thumbs-down"></i>
                  </button>
                  <a href={`/post/${post._id}`} className="btn btn-info mr-1">
                    Comments
                  </a>
                  {post.user._id === auth.user.userId._id ? (
                      <button type="button" className="btn btn-danger mr-1" onClick={() => this.handleDelete(post._id)}>
                      <i className="fas fa-times" />
                    </button>
                  ) : null}
                  </span>) : null}
                </div>
              </div>
            </div>
    )
  }
}
const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}
PostItem.defaultProps = {
    showActions: true
}
export default connect(mapStateToProps, { deletePost, addLike, removeLike })(PostItem)
