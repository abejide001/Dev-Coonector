import React, { Component } from 'react';
import CommentItem from './CommentItem';

export default class CommentField extends Component {
	render() {
        const { comments, postId } = this.props;
		return comments.map((comment) => <CommentItem key={comment._id} comment={comment} postId={postId} />);
	}
}
