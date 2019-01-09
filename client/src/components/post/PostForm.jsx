import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addPost } from '../../actions/postActions';
class PostForm extends Component {
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
		const newPost = {
			text: this.state.data.text,
			name: userId.name,
			avatar: userId.avatar
		};
		this.props.addPost(newPost);
		this.setState({ text: '' });
		window.location.reload()
	};
	render() {
		return (
			<div className="post-form mb-3">
				<div className="card card-info">
					<div className="card-header bg-info text-white">Say Something...</div>
					<div className="card-body">
						<form onSubmit={this.handleSubmit}>
							<div className="form-group">
								<textarea
									name="text"
									className="form-control form-control-lg"
									placeholder="Create a post"
									value={this.state.data.text}
                                    onChange={this.handleChange}
                                    required
								/>
							</div>
							<button type="submit" className="btn btn-dark">
								Submit
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
export default connect(mapStateToProps, { addPost })(PostForm);
