import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addEducation } from '../../actions/profileActions';

class AddEducation extends Component {
	state = {
		data: {
			school: '',
			degree: '',
			fieldOfStudy : '',
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
			school: this.state.data.school,
			degree: this.state.data.degree,
			fieldOfStudy: this.state.data.fieldOfStudy,
			from: this.state.data.from,
			to: this.state.data.to,
			current: this.state.data.current,
			description: this.state.data.description
		};
		this.props.addEducation(expData, this.props.history);
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
								<a href="/dashboard " className="btn btn-light">
									Go Back
								</a>
								<h1 className="display-4 text-center">Add Your Education</h1>
								<p className="lead text-center">
									Add any Education that you have had in the past
								</p>
								<small className="d-block pb-3">* = required field</small>
								<form onSubmit={this.handleSubmit}>
									<div className="form-group">
										<input
											type="text"
											className="form-control form-control-lg"
											placeholder="* School"
											name="school"
											required
											onChange={this.handleChange}
											value={this.state.data.school}
										/>
									</div>
									<div className="form-group">
										<input
											type="text"
											className="form-control form-control-lg"
											placeholder="* Degree"
											name="degree"
											required
											onChange={this.handleChange}
											value={this.state.data.degree}
										/>
									</div>
									<div className="form-group">
										<input
											type="text"
											className="form-control form-control-lg"
											placeholder="fieldOfStudy"
											name="fieldOfStudy"
											onChange={this.handleChange}
											value={this.state.data.fieldOfStudy}
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
											Current Education
										</label>
									</div>
									<div className="form-group">
										<textarea
											className="form-control form-control-lg"
											placeholder="School Description"
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
export default connect(mapStateToProps, { addEducation })(withRouter(AddEducation));

