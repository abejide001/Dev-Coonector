import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from  'react-router-dom'
import { registerUser } from '../../actions/authActions'
class Register extends Component {
  state = {
      data: {
      name: "",
      email: "",
      password: "",
      password2: ""
      },
      errors: {}
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors })
    }
  }
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard')
    }
  }
  handleChange = (e) => {
    const data = {...this.state.data}
    data[e.currentTarget.name] = e.currentTarget.value
    this.setState({data})
  }
  handleSubmit = (e) => {
    e.preventDefault()
      const { name, email, password, password2 } = this.state.data
      this.props.registerUser({ name, email, password, password2 }, this.props.history)
      
  }
  render() {
    const { errors } = this.state
    return (
      <div>
         <div className="register">
    <div className="container">
      <div className="row">
        <div className="col-md-8 m-auto">
          <h1 className="display-4 text-center">Sign Up</h1>
          <p className="lead text-center">Create your DevConnector account</p>
          <form noValidate onSubmit={this.handleSubmit}>
            <div className="form-group">
              <input type="text" className={errors ? "is-invalid form-control form-control-lg" : "form-control form-control-lg"} placeholder="Name" name="name" onChange={this.handleChange} value={this.state.data.name}  />
              {errors && (
                <div className="invalid-feedback">{errors.messageName}</div>
              )}
            </div>
            <div className="form-group">
              <input type="email" className={errors ? "is-invalid form-control form-control-lg" : "form-control form-control-lg"} placeholder="Email Address" name="email" value={this.state.data.email} onChange={this.handleChange}/>
              {errors && (
                <div className="invalid-feedback">{errors.messageEmail}</div>
              )}
              <small className="form-text text-muted">This site uses Gravatar so if you want a profile image, use a Gravatar email</small>
            </div>
            <div className="form-group">
              <input type="password" className={errors ? "is-invalid form-control form-control-lg" : "form-control form-control-lg"}  placeholder="Password" name="password" value={this.state.data.password} onChange={this.handleChange} />
              {errors && (
                <div className="invalid-feedback">{errors.messagePassword}</div>
              )}
            </div>
            <div className="form-group">
              <input type="password" className="form-control form-control-lg" placeholder="Confirm Password" name="password2" value={this.state.data.password2} onChange={this.handleChange}  />
            </div>
            <input type="submit" className="btn btn-info btn-block mt-4" />
          </form>
        </div>
      </div>
    </div>
  </div>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    errors: state.errors
  }
}
Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}
export default connect(mapStateToProps, { registerUser })(withRouter(Register));
