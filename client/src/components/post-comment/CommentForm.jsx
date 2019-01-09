import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addComment } from '../../actions/postActions';
class CommentForm extends Component {
	state = {
		data: {
			text: ''
		},
		error: ''
	};
	handleChange = (e) => {
		const data = { ...this.state.data };
		data[e.currentTarget.name] = e.currentTarget.value;
		this.setState({ data });
	};
	handleSubmit = (e) => {
		e.preventDefault();
        const { userId } = this.props.auth.user;
        const { postId } = this.props;  
		const newComment = {
			text: this.state.data.text,
			name: userId.name
		};
		this.props.addComment(postId, newComment);
		this.setState({ text: '' });
		window.location.reload()
	};
	render() {
		return (
			<div className="post-form mb-3">
				<div className="card card-info">
					<div className="card-header bg-info text-white">Make a comment..</div>
					<div className="card-body">
						<form onSubmit={this.handleSubmit}>
							<div className="form-group">
								<textarea
									name="text"
									className="form-control form-control-lg"
									placeholder="Post comment"
									value={this.state.data.text}
                                    onChange={this.handleChange}
                                    required
								/>
							</div>
							<button type="submit" className="btn btn-dark">
								Submit Comment
							</button>
						</form>
					</div>
				</div>
			</div>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		auth: state.auth,
		errors: state.auth
	};
};
export default connect(mapStateToProps, { addComment })(CommentForm);
