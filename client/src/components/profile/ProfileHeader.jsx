import React, { Component } from 'react'
import isEmpty from '../../validations/isEmpty'

export default class ProfileHeader extends Component {
  render() {
    const { profile } = this.props
    return (
          <div className="row">
            <div className="col-md-12">
              <div className="card card-body bg-info text-white mb-3">
                <div className="row">
                  <div className="col-4 col-md-3 m-auto">
                    <img className="rounded-circle" src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200" alt="" />
                  </div>
                </div>
                <div className="text-center">
                  <h1 className="display-4 text-center">{profile.handle.user.name}</h1>
                  <p className="lead text-center">{profile.handle.status} at {profile.handle.company}</p>
                  <p>{profile.handle.location}</p>
                  <p>
                    {isEmpty(profile.handle.website) ? null : (
                      <a className="text-white p-2" href={profile.handle.website} target="_blank">
                      <i className="fas fa-globe fa-2x"></i>
                    </a>
                    )}
                    <a className="text-white p-2" href="#">
                      <i className="fab fa-twitter fa-2x"></i>
                    </a>
                    <a className="text-white p-2" href="#">
                      <i className="fab fa-facebook fa-2x"></i>
                    </a>
                    <a className="text-white p-2" href="#">
                      <i className="fab fa-linkedin fa-2x"></i>
                    </a>
                    <a className="text-white p-2" href="#">
                      <i className="fab fa-instagram fa-2x"></i>
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
    )
  }
}
