import React, { Component } from 'react'

export default class ProfileAbout extends Component {
  render() {
    const { profile } = this.props
    const skills = profile.handle.skills.map(skill => (
      <div className="p-3">
         <i className="fa fa-check"/>{skill}
      </div>
    ))
    return (
      <div className="row">
      <div className="col-md-12">
        <div className="card card-body bg-light mb-3">
          <h3 className="text-center text-info">{profile.handle.user.name}</h3>
          <p className="lead">
           {profile.handle.bio}
          </p>
          <hr />
          <h3 className="text-center text-info">Skill Set</h3>
          <div className="row">
            <div className="d-flex flex-wrap justify-content-center align-items-center">
              {skills}
            </div>
          </div>
        </div>
      </div>
    </div>
    )
  }
}
