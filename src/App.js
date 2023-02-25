import logo from './logo.svg';
import { useState, useEffect } from 'react';
import './App.css';
import LoginPage from './comps/loginComps/LoginPage';
import Homepage from './comps/loggedInPage/Homepage';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, logout } from './firebase';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { getPosts, addPost, getImages, uploadImage } from './apis/firestireDataQueryFuncs';
import background from "./images/background.jpg"
function App() {

  const [user, setUser] = useState(null)

  onAuthStateChanged(auth, (currentUser) => {
    setUser(()=> {
      return currentUser
    })

  })
  
  useEffect(() => {
    // addPost("test caption", "testUrl", "test title", "test user Id")
    // uploadImage(background)
}, [])








  return (
    <div className="App">
      <Router>
            <Routes>
            <Route path='/' element={<LoginPage user={user}  />} />
            <Route path='/home' element={<Homepage user={user} />} />
            </Routes>
      </Router >

    </div>
  );
}

export default App;

