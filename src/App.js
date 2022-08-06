import React, { Component } from 'react';
import './App.css';
import NavBar from './Components/NavBar/NavBar'
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm'
import Rank from './Components/Rank/Rank'
import Clarifai from 'clarifai'

const app = new Clarifai.App({
  apiKey: "74a474bbe474416fbe7881fa52630cab"
})

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
    }
  }

  onInputChange = (event) => {
    console.log(event.target.value);
  }

  onSubmit = () => {
    app.models.predict("74a474bbe474416fbe7881fa52630cab", "https://samples.clarifai.com/face-det.jpg").then(
      function (response) {
        
      },
      function (err) {
        
      }
    )
  }

  render() {
    return (
      <div className='App'>
        <NavBar />
        <Rank />
        <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit}/>
      </div>
    )
  }
}

export default App;
