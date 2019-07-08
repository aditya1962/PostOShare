/* eslint-disable */
import React, { Component } from 'react';
import {BrowserRouter, Route,Switch} from 'react-router-dom';

import Home from './Components/Home.js';
import Login from './Components/Login.js';
import Register from './Components/Register.js';
import ConfirmPassword from './Components/ConfirmPassword.js';
import PrivateRoute from './PrivateRoute';
import EditProfile from './Components/EditProfile.js';
import Logout from './Components//Logout.js';
import ProfileCookies from './Data/ProfileCookies.js';
import Error from './Data/Error.js';


class App extends Component {
  render() {
    window.addEventListener('offline',()=>alert("Error in Internet connection"))
    return (
      <BrowserRouter>
        <Switch>
          <PrivateRoute path="/" component={Home} exact />
          <PrivateRoute path="/editprofile" component={EditProfile} />
          <Route path="/confirmpassword" component={ConfirmPassword} />
          <Route path="/register" component={Register} />
          <Route path="/logout" component={Logout} />
          <Route path="/login" component={Login} />
          <Route component={Error} />
        </Switch>
      </BrowserRouter>
    );
  }
}


export default App;
