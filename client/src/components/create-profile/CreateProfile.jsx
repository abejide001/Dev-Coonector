import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from  'react-router-dom';
import { createProfile } from '../../actions/profileActions'
class CreateProfile extends Component {
	state = {
		data: {
			handle: '',
			company: '',
			website: '',
			location: '',
			status: '',
			skills: '',
			github: '',
			bio: '',
			twitter: '',
			facebook: '',
			instagram: '',
			youtube: ''
		},
        errors: '',
        displaySocialInput: false,
	}; 
	handleChange = (e) => {
		const data = { ...this.state.data };
		data[e.currentTarget.name] = e.currentTarget.value;
		this.setState({ data });
    };
    componentWillReceiveProps (nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors })
        }
    }
    
	handleSubmit = (e) => {
        e.preventDefault();
        const profileData = {
            handle: this.state.data.handle,
            company: this.state.data.company,
            website: this.state.data.website,
            location: this.state.data.location,
            status: this.state.data.status,
            skills: this.state.data.skills,
            githubusername: this.state.data.githubusername,
            bio: this.state.data.bio,
            twitter: this.state.data.twitter,
            facebook: this.state.data.facebook,
            linkedin: this.state.data.linkedin,
            youtube: this.state.data.youtube,
            instagram: this.state.data.instagram
          };
         this.props.createProfile(profileData, this.props.history)   
	};
	render() {
		// Select options for status
		const options = [
			{ label: '* Select Professional Status', value: 0 },
			{ label: 'Developer', value: 'Developer' },
			{ label: 'Junior Developer', value: 'Junior Developer' },
			{ label: 'Senior Developer', value: 'Senior Developer' },
			{ label: 'Manager', value: 'Manager' },
			{ label: 'Student or Learning', value: 'Student or Learning' },
			{ label: 'Instructor or Teacher', value: 'Instructor or Teacher' },
			{ label: 'Intern', value: 'Intern' },
			{ label: 'Other', value: 'Other' }
		];
		const selectOptions = options.map((option) => (
			<option key={option.label} value={option.value}>
				{option.label}
			</option>
		));
		const { errors, displaySocialInput } = this.state;
		let socialInput;
		if (displaySocialInput) {
			socialInput = (
                <div>
			 
                <div className="form-group">
                <input
					type="url"				    
                    className="form-control"
                    placeholder="enter facebook username"
                    onChange={this.handleChange}
					value={this.state.data.facebook}
					name="facebook"
                />
            </div>
            <div className="form-group">
					<input
					    type="url"					    
						className="form-control"
						placeholder="enter instagram username"
						onChange={this.handleChange}
						value={this.state.data.instagram}
						name="instagram"
					/>
				</div>
                <div className="form-group">
					<input
					    type="url"
						className="form-control"
						placeholder="enter youtube username"
						onChange={this.handleChange}
						value={this.state.data.youtube}
						name="youtube"
					/>
				</div>
            </div>
			);
		}
		return (
			<div className="create-profile">
				<div className="container">
					<div className="row">
						<div className="col-md-8 m-auto">
							<h3 className="display-4 text-center">Create Your Profile </h3>
							<p className="lead text-center">Let's get some info about you</p>
							<small className="d-block pb-3">* = required fields</small>
							<form onSubmit={this.handleSubmit}>
								<div className="form-group">
									<input
										type="text"
										placeholder="profile hanlde"
										name="handle"
										onChange={this.handleChange}
										value={this.state.data.handle}
										className="form-control"
									/>
								</div>
								<div className="form-group">
									<select
										className="form-control"
										onChange={this.handleChange}
										name="status"
										value={this.state.data.status}
									>
										{selectOptions}
									</select>
								</div>
								<div className="form-group">
									<input
										type="text"
										placeholder="company"
										name="company"
										onChange={this.handleChange}
										value={this.state.data.company}
										className="form-control"
									/>
								</div>
								<div className="form-group">
									<input
										type="text"
										placeholder="location"
										name="location"
										onChange={this.handleChange}
										value={this.state.data.location}
										className="form-control"
									/>
								</div>
								<div className="form-group">
									<input
										type="url"
										placeholder="website"
										name="website"
										onChange={this.handleChange}
										value={this.state.data.website}
										className="form-control"
									/>
								</div>
								<div className="form-group">
									<input
										type="text"
										placeholder="skills"
										name="skills"
										onChange={this.handleChange}
										value={this.state.data.skills}
										className="form-control"
									/>
								</div>
								<div className="form-group">
									<input
										type="text"
										placeholder="github"
										name="github"
										onChange={this.handleChange}
										value={this.state.data.github}
										className="form-control"
									/>
								</div>
								<div className="form-group">
									<textarea
										type="text"
										placeholder="bio"
										name="bio"
										onChange={this.handleChange}
										value={this.state.data.bio}
										className="form-control"
									/>
								</div>
								<div className="mb-3">
									<button
										onClick={() => {
											this.setState((prevState) => ({
												displaySocialInput: !prevState.displaySocialInput
											}));
										}}
                                        className="btn btn-light"
                                        type="button"
									>
										Add Social Networks
									</button>
									<span className="text-muted">Optional</span>
								</div>
                                {socialInput}
								<input type="submit" value="Submit" className="btn btn-success" />
							</form>
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
export default connect(mapStateToProps, { createProfile })(withRouter(CreateProfile));
