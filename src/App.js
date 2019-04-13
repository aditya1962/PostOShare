/* eslint-disable */
import React, { Component } from 'react';
import {BrowserRouter, Route,Switch} from 'react-router-dom';

import Home from './Components/Home.js';
import EditProfile from './Components/EditProfile.js';
import Logout from './Components//Logout.js'
import Error from './Components/Error.js';


class App extends Component {


  render() {

    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" component = {Home} exact/>
          <Route path="/editprofile" component = {EditProfile} />
          <Route path="/logout" component={Logout} />
          <Route component={Error} />
        </Switch>
      </BrowserRouter>
    );
  }
}


export default App;
