import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import {  getCurrentProfile, deleteAccount } from '../../actions/profileActions'
import ProfileActions from './ProfileActions'
import Spinner from '../common/Spinner'
import Experience from './Experience';
import Education from './Education';
class Dashboard extends Component {
 componentDidMount () {
     this.props.getCurrentProfile()
 }
 handleDelete = e => {
  this.props.deleteAccount()
 }
  render() {
      const { user } = this.props.auth;
      const { profile, loading} = this.props.profile;
      let dashboard;
      if (profile === null || loading) {
          dashboard = <Spinner/>
      } else {
        // check if user as empty profile
        if (Object.keys(profile).length > 0) {
          dashboard = (
            <div>
              <p className="lead text-muted">Welcome <a href={`/profile/${profile.handle}`}>{user.userId.name}</a></p>
              <ProfileActions/> 
              <Experience experience={profile.experience}/>
              <Education education={profile.education}/>
              <div>
                <button className="btn btn-danger" onClick={this.handleDelete}>Delete My Account</button>
              </div>
            </div>
          )
        }
        else {
          dashboard = (
            <div>
              <p className="lead text-muted">Welcome {user.userId.name}</p>
              <p>You need to set up profile</p>
              <a href="/create-profile" className="btn btn-info">Create Profile</a>
            </div>
          )
        }
      }
    return (
      <div className="dashboard">
        <div className="container">
         <div className="row">
          <div className="col-md-12">
            <h1 className="display-4">Dashboard</h1>
            {dashboard}
          </div>
         </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
    return {
        profile: state.profile,
        auth: state.auth
    }
}
Dashboard.propTypes = {
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}
export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard);
