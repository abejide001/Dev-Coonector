import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom'
import store from './store'
import jwt_decode from 'jwt-decode'
import setAuthToken from './utils/setToken'
import { setCurrentUser, logoutUser } from './actions/authActions'
import { clearCurrentProfile} from './actions/profileActions'
import './App.css';
import NavBar from '../src/components/layout/Navbar';
import Footer from '../src/components/layout/Footer';
import Landing from '../src/components/layout/Landing';
import Login from '../src/components/auth/Login'
import Register from '../src/components/auth/Register'
import Dashboard from '../src/components/dashboard/Dashboard'
import Private from './components/common/PrivateRoutes'
import CreateProfile from './components/create-profile/CreateProfile';
import AddExperience from './components/add-credentials/AddExperience';
import AddEducation from './components/add-credentials/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import NotFound from './components/not-found/NotFound';
import Posts from './components/post/Posts';
import Post from './components/post-comment/Post';

// Check for token
if (localStorage.token) {
  // Set auth token header auth
  setAuthToken(localStorage.token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Clear current Profile
    store.dispatch(clearCurrentProfile());
    // Redirect to login
    window.location.href = '/login';
  }
}
class App extends Component {
  render() {
    return (
      <div className="App">
        <Provider store={store}>
        <NavBar/>
        <Switch>
        <Route exact path="/"  component={Landing}/>
        <div className="container">
        <Route exact path="/login"  component={Login}/>
        <Route exact path="/register"  component={Register}/>  
        <Private exact path="/dashboard"  component={Dashboard}/>
        <Private exact path="/create-profile"  component={CreateProfile}/> 
        <Private exact path="/add-experience"  component={AddExperience}/> 
        <Private exact path="/add-education"  component={AddEducation}/> 
        <Route exact path="/profiles" component={Profiles}/>
        <Route exact path="/profile/:handle" component={Profile}/>
        <Private exact path="/post" component={Posts}/>
        <Private exact path="/post/:id" component={Post}/>        
        <Route exact path="/not-found" component={NotFound}/>
        </div>
        </Switch>
        <Footer/>
        </Provider>
      </div>
    );
  }
}

export default App;
