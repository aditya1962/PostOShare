import React, { Component } from 'react';
import Post from './Components/Post';
import * as firebase from 'firebase'


class App extends Component {


  render() {

    return (
      <div className="App">
      <Post />
      </div>
    );
  }
}


export default App;
