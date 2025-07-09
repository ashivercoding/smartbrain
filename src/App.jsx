import { useState } from 'react'
import Navigation from './components/navigation/navigation'
import SignIn from './components/signin/signin'
import Register from './components/Register/register'
import Logo from './components/logo/logo'
import ImageLinkForm from './components/ImageLinkForm/imagelinkform'
import Rank from './components/rank/rank'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import ParticlesBg from 'particles-bg'
import './App.css'

function App() {
  const [input, setInput] = useState(null);
  // const [submit, setSubmit] = useState('');
  const [imageUrl, setImageUrl] = useState(null);
  const [faceData, setFaceData] = useState([]);
  const [route, setRoute] = useState('SignIn');
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState({
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  })

  const initialState = () => {
    setInput('')
    setImageUrl(null )
    setRoute('SignIn')
    setIsSignedIn(false)
    setUser({
      id:'',
      name:'',
      email:'',
      entries:'',
      joined:''
    })
  }

  const loadUser = (data) => {
    setUser({
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    })
  };

  const onInputChange = (event) => {
    setInput(event.target.value)
  }

  const onButtonSubmit = () => {
    if (!input) {
      console.log("Please enter a valid input value.");
      return;
    }
    setImageUrl(input);

    fetch('https://smartbrainapi-xmm5.onrender.com/imageurl', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        input: imageUrl
      })
    })
    .then(response => response.json())
    .then(result => {
      const calculateFaceLocation = () => {
        const image = document.getElementById("inputimage");
        const imageHeight = image?.height ?? 0;
        const imageWidth = image?.width ?? 0;
        return {
          topRow: result.top_row * imageHeight,
          leftCol: result.left_col * imageWidth,
          rightCol: imageWidth - result.right_col * imageWidth,
          bottomRow: imageHeight - result.bottom_row * imageHeight,
        }
      }
      setFaceData(calculateFaceLocation(result));
      
      
    })
    

    fetch('https://smartbrainapi-xmm5.onrender.com/image', {
      method: 'put',
      mode: 'cors',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        id: user.id
      })
    })
    .then(response => response.json())
    .then(count => {
      setUser(Object.assign(user,{entries: count}))
    })
    .catch(error => console.error('Error updating user entries: ', error));
  }

  const onRouteChange = (route) => {
    if (route === 'Home') {
      setIsSignedIn(true)
    } else if (route === 'signout') {
      initialState()
    }
    setRoute(route);
  };

  return (
      <div className='App'>
        <ParticlesBg num={75} color="#ffffff" type='cobweb' bg={true}/>
        <Navigation isSignedIn={isSignedIn} onRouteChange={onRouteChange}/>
        { route === 'Home' 
          ? <div>
              <Logo />
              <Rank 
              name={user.name}
              entries={user.entries}/>
              <ImageLinkForm 
                onInputChange={onInputChange} 
                onButtonSubmit={onButtonSubmit} 
              />
              <FaceRecognition
                faceData={faceData}
                imageUrl={imageUrl}/>
            </div>
          : (
            route === 'SignIn'
            ? <SignIn loadUser={loadUser} onRouteChange={onRouteChange}/>
            : <Register loadUser={loadUser} onRouteChange={onRouteChange} />
          )
      }
      </div>
  )
}

export default App;

