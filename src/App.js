import React, { Component } from 'react';
import Post from './Components/Post';
import User from './Components/User'
import * as firebase from 'firebase'
import UserDetails from './Components/UserDetails'


class App extends Component {


  render() {

    return (
      <div className="App">
      	<User />
      	<div className="flexDiv">
      	<UserDetails />
      	<Post />
      	</div>
      </div>
    );
  }
}


export default App;
