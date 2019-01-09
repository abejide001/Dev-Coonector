import React, { Component } from 'react';
import ProfileCreds from './ProfileCreds';
import ProfileHeader from './ProfileHeader';
import ProfileAbout from './ProfileAbout';
import ProfileGithub from './ProfileGithub';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getProfileByHandle } from '../../actions/profileActions';
import Spinner from '../common/Spinner';
class Profile extends Component {
	componentDidMount() {
		if (this.props.match.params.handle) {
			this.props.getProfileByHandle(this.props.match.params.handle);
		}
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.profile.profile === null && this.props.profile.loading) {
          this.props.history.push('/not-found');
        }
      } 
	render() {
        const { profile, loading } = this.props.profile;
        console.log(profile)
		let profileContent;
		if (profile === null || loading) {
			profileContent = <Spinner />;
		} else {
			profileContent = (
				<div className="container">
					<div className="row">
						<div className="col-md-6">
							<a href="/profiles ">Back to Profile</a>
						</div>
						<div className="col-md-6" />
						<ProfileHeader profile={profile}/>
						<ProfileAbout profile={profile}/>
						<ProfileCreds experience={profile.handle.experience} education={profile.handle.education}/> 
						<ProfileGithub />
					</div>
				</div>
			);
		}
		return (
            <div className="profile">
              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    {profileContent}
                  </div>
                </div>
              </div>
            </div>
        );
	}
}
const mapStateToProps = (state) => {
	return {
		profile: state.profile
	};
};
export default connect(mapStateToProps, { getProfileByHandle })(Profile);
