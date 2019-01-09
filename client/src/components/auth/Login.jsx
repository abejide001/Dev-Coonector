import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions'

class Login extends Component {
	state = {
		data: {
			email: '',
			password: '',
    },
    errors: ''
  };
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
	  this.props.history.push('/dashboard')
	  window.location.reload()
    }
  }
	handleChange = (e) => {
		const data = { ...this.state.data };
		data[e.currentTarget.name] = e.currentTarget.value;
		this.setState({ data });
	};
	handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state.data
    this.props.loginUser({ email, password })
	};
	componentWillReceiveProps(nextProps) {
		if (nextProps.auth.isAuthenticated) {
			this.props.history.push('/dashboard');
		}
		if (nextProps.errors) {
			this.setState({ errors: nextProps.errors });
		}
	}
	render() {
    const { errors } = this.state;
		return (
			<div>
				<div className="login">
					<div className="container">
						<div className="row">
							<div className="col-md-8 m-auto">
								<h1 className="display-4 text-center">Log In</h1>
								<p className="lead text-center">Sign in to your DevConnector account</p>
								<form onSubmit={this.handleSubmit}>
								<div className="form-group">
										<input
											type="email"
											className={
												errors ? (
													'is-invalid form-control form-control-lg'
												) : (
													'form-control form-control-lg'
												)
											}
											placeholder="Email"
											name="email"
											value={this.state.data.email}
											onChange={this.handleChange}
										/>
										{errors && <div className="invalid-feedback">{errors.messageEmail}</div>}
										{errors.success === false ? <div className="invalid-feedback">{errors.message}</div> : ''}
									</div>
									<div className="form-group">
										<input
											type="password"
											className={
												errors ? (
													'is-invalid form-control form-control-lg'
												) : (
													'form-control form-control-lg'
												)
											}
											placeholder="Password"
											name="password"
											value={this.state.data.password}
											onChange={this.handleChange}
										/>
										{errors && <div className="invalid-feedback">{errors.messagePassword}</div>}
										{errors.success === false ? <div className="invalid-feedback">{errors.message}</div> : ''}
									</div>
									<input type="submit" className="btn btn-info btn-block mt-4" />
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
Login.propTypes = {
	loginUser: PropTypes.func.isRequired,
	auth: PropTypes.func.isRequired
};
const mapStateToProps = (state) => {
	return {
		auth: state.auth,
		errors: state.errors
	};
};
export default connect(mapStateToProps, { loginUser })(Login);
