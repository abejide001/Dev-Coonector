import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addExperience } from '../../actions/profileActions';

class AddExperience extends Component {
	state = {
		data: {
			company: '',
			title: '',
			location: '',
			from: '',
			to: '',
			current: false,
			description: ''
		},
		errors: {},
		disabled: false
	};
	handleChange = (e) => {
		const data = { ...this.state.data };
		data[e.currentTarget.name] = e.currentTarget.value;
		this.setState({ data });
	};
	handleCheck = (e) => {
		this.setState({
			disabled: !this.state.disabled,
			current: !this.state.current
		});
	};
	handleSubmit = (e) => {
		e.preventDefault();

		const expData = {
			company: this.state.data.company,
			title: this.state.data.title,
			location: this.state.data.location,
			from: this.state.data.from,
			to: this.state.data.to,
			current: this.state.data.current,
			description: this.state.data.description
		};
		this.props.addExperience(expData, this.props.history);
    };
    componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			this.setState({ errors: nextProps.errors });
		}
	}
	render() {
		const { errors } = this.state;
		return (
			<div>
				<div className="section add-experience">
					<div className="container">
						<div className="row">
							<div className="col-md-8 m-auto">
								<a href="/dashboard" className="btn btn-light">
									Go Back
								</a>
								<h1 className="display-4 text-center">Add Your Experience</h1>
								<p className="lead text-center">
									Add any developer/programming positions that you have had in the past
								</p>
								<small className="d-block pb-3">* = required field</small>
								<form onSubmit={this.handleSubmit}>
									<div className="form-group">
										<input
											type="text"
											className="form-control form-control-lg"
											placeholder="* Job Title"
											name="title"
											required
											onChange={this.handleChange}
											value={this.state.data.title}
										/>
									</div>
									<div className="form-group">
										<input
											type="text"
											className="form-control form-control-lg"
											placeholder="* Company"
											name="company"
											required
											onChange={this.handleChange}
											value={this.state.data.company}
										/>
									</div>
									<div className="form-group">
										<input
											type="text"
											className="form-control form-control-lg"
											placeholder="Location"
											name="location"
											onChange={this.handleChange}
											value={this.state.data.location}
										/>
									</div>
									<h6>From Date</h6>
									<div className="form-group">
										<input
											type="date"
											value={this.state.data.from}
											className="form-control form-control-lg"
											name="from"
											onChange={this.handleChange}
										/>
									</div>
									<h6>To Date</h6>
									<div className="form-group">
										<input
											type="date"
											value={this.state.data.from}
											className="form-control form-control-lg"
											name="to"
											onChange={this.handleChange}
											disabled={this.state.disabled ? 'disabled' : ''}
										/>
									</div>
									<div className="form-check mb-4">
										<input
											className="form-check-input"
											type="checkbox"
											name="current"
											value=""
											id="current"
											onChange={this.handleCheck}
											value={this.state.data.current}
										/>
										<label className="form-check-label" for="current">
											Current Job
										</label>
									</div>
									<div className="form-group">
										<textarea
											className="form-control form-control-lg"
											placeholder="Job Description"
											name="description"
											onChange={this.handleChange}
											value={this.state.data.description}
										/>
										<small className="form-text text-muted">
											Some of your responsabilities, etc
										</small>
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

const mapStateToProps = (state) => {
	return {
		profile: state.profile,
		errors: state.errors
	};
};
export default connect(mapStateToProps, { addExperience })(withRouter(AddExperience));
