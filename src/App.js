import logo from './logo.svg';
import { useState, useEffect } from 'react';
import './App.css';
import LoginPage from './comps/loginComps/LoginPage';
import Homepage from './comps/loggedInPage/Homepage';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, logout } from './firebase';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {

  const [user, setUser] = useState(null)

  onAuthStateChanged(auth, (currentUser) => {
    setUser(()=> {
      console.log("SETTING USER TO: ", currentUser);
      return currentUser
    })

  })

  // useEffect(() => {
  //   logout()
  // }, [])

  useEffect(() => {
    if(user) {
      console.log("USER UPDATED TO... ", user);
    }
  }, [user])





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

