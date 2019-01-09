import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import propTypes from 'prop-types'
import { logoutUser } from '../../actions/authActions'
import { clearCurrentProfile } from '../../actions/profileActions'

class Navbar extends Component {
  
  handleLogout = (e) => {
    this.props.clearCurrentProfile()
    this.props.logoutUser()
  }
  render() {
    const { isAuthenticated, user } = this.props.auth
    const authLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <a className="nav-link" href="/post">
            Post Feed
          </a>
        </li>
        <li className="nav-item">
          <a
            href=""
            onClick={this.handleLogout}
            className="nav-link"
          >
            <img
              className="rounded-circle"
              src={isAuthenticated ? user.userId.avatar : ''} alt={isAuthenticated ? user.userId.name : ''} style={{ width: '25px', marginRight: '5px' }}
              title="You must have a Gravatar connected to your email to display an image"
            />
            Logout
            <small> Welcome {isAuthenticated ? user.userId.name : ''}</small>
          </a>
        </li>
      </ul>
    );
    const guestLinks = (
      <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/register">Sign Up</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/login">Login</Link>
          </li>
        </ul>
    )
    return (
      <div>
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
    <div className="container">
      <Link className="navbar-brand" to="/">DevConnector</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="mobile-nav">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <a className="nav-link" href="/profiles"> Developers
            </a>
          </li>
        </ul>
        {isAuthenticated === true ? authLinks : guestLinks}
      </div>
    </div>
  </nav>
      </div>
    )
  }
}
Navbar.propTypes = {
  auth: propTypes.object.isRequired,
  logoutUser: propTypes.object.isRequired
}
const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}
export default connect(mapStateToProps, { logoutUser, clearCurrentProfile })(Navbar)