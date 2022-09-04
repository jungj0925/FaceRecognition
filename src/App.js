import React, { Component } from 'react';
import './App.css';
import NavBar from './Components/NavBar/NavBar'
import Signin from './Components/Signin/Signin'
import Register from './Components/Register/Register'
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm'
import Rank from './Components/Rank/Rank'
import FaceRecognition from './Components/FaceRecognition/FaceRecognition'


const initialState = {
    input: '',
    imageUrl: '',
    box: [],
    route: 'Signin',
    isSignedIn: false,
    user: {
      id: '',
      name: '',
      email: '',
      entries: 0,
      joined: ''
    }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: [],
      route: 'Signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
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
    fetch('https://mysterious-depths-68668.herokuapp.com/imageurl',{
      method: 'post',
      headers: { 'Content-Type' : 'application/json'},
      body: JSON.stringify({ 
          input: this.state.input
      })
    })
    .then(res => res.json())
    .then (res => {
      if (res) {
        fetch('https://mysterious-depths-68668.herokuapp.com/image',{
          method: 'put',
          headers: { 'Content-Type' : 'application/json'},
          body: JSON.stringify({ 
              id: this.state.user.id
          })
        })
        .then(response => response.json())
        .then(data => {
          this.setState(Object.assign(this.state.user, { entries: data.entries }))
        })
        .catch(console.log)
      }
      this.displayFaceBox(this.calculateFaceLocation(res))
    })
    .catch(err => console.log(err));
  }

  onRouteChange = (prop) => {
    if (prop === 'signout') {
      this.setState(initialState)
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
              <Rank name={this.state.user.name} entries={this.state.user.entries}/>
              <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit}/>
              <FaceRecognition url={imageUrl} boxes={box} />
            </div>
          : (
            this.state.route === 'Signin' 
            ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
          )
        }
      </div>
    )
  }
}

export default App;
