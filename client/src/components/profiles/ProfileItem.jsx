import React, { Component } from 'react'
import isEmpty from '../../validations/isEmpty';

export default class ProfileItem extends Component {
  render() {
  const { profile } = this.props;
    return (
      <div className="card card-body bg-light mb-3">
        <div className="row">
          <div className="col-2">
            <img src={profile.user.avatar} className="rounded-circle"/>
          </div>
          <div className="col-lg-6 col-md-4 col-8">
            <h4>{profile.user.name}</h4>
            <p>{profile.status} {isEmpty(profile.company) ? null : (<span>at {profile.company}</span>)}</p>
            <p>{isEmpty(profile.location ? null : (<span>at {profile.location}</span>))}</p>
            <a href={`/profile/${profile.handle}`} className="btn btn-info">View Profile</a>
          </div>
          <div className="col-md-4 none d-md-block">
            <h4>Skill set</h4>
            <ul className="list-group">
               {profile.skills.slice(0, 4).map(skill => (
                   <li  className="list-group-item">
                     <i className="fa fa-check pr-1"/>
                     {skill}
                   </li>
               ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
