import React, { Component } from 'react';
import Post from './Components/Post'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Post />
        <Post />
      </div>
    );
  }
}

export default App;
