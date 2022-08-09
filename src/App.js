import React, { Component } from 'react';
import './App.css';
import NavBar from './Components/NavBar/NavBar'
import Signin from './Components/Signin/Signin'
import Register from './Components/Register/Register'
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm'
import Rank from './Components/Rank/Rank'
import FaceRecognition from './Components/FaceRecognition/FaceRecognition'
import Clarifai from 'clarifai'

const app = new Clarifai.App({
  apiKey: "74a474bbe474416fbe7881fa52630cab"
})

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: [],
      route: 'Signin',
      isSignedIn: false
    }
  }

  calculateFaceLocation = (res) => {
    const clarifaiBox = res.outputs[0].data.regions.map(i => i.region_info.bounding_box);
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    const box = clarifaiBox.map(data => {
      return {
        leftCol: data.left_col * width,
        topRow: data.top_row * height,
        rightCol: width - (data.right_col * width),
        bottomRow: height - (data.bottom_row * height),
      }
    });
    return box;
  }

  displayFaceBox = (box) => {
    this.setState({box: box})
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value})
  }

  onSubmit = () => {
    this.setState({imageUrl: this.state.input})
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    .then (res => this.displayFaceBox(this.calculateFaceLocation(res)))
    .catch(err => console.log(err));
  }

  onRouteChange = (prop) => {
    if (prop === 'signout') {
      this.setState({isSignedIn: false})
    } else if (prop === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({ route: prop })
  }
    

  render() {
    const { isSignedIn, imageUrl, box, route } = this.state;
    return (
      <div className='App' style={{mindWidth: '1000px'}}>
        <NavBar onRouteChange={this.onRouteChange} isSignedIn={isSignedIn}/>
        { route === 'home' ? 
          <div>
              <Rank />
              <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit}/>
              <FaceRecognition url={imageUrl} boxes={box} />
            </div>
          : (
            this.state.route === 'Signin' 
            ? <Signin onRouteChange={this.onRouteChange}/>
            : <Register onRouteChange={this.onRouteChange}/>
          )
        }
      </div>
    )
  }
}

export default App;
