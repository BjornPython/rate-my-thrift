import logo from './logo.svg';
import { useState, useEffect } from 'react';
import './App.css';
import LoginPage from './comps/loginComps/LoginPage';
import Homepage from './comps/loggedInPage/Homepage';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, logout } from './firebase';

function App() {


  onAuthStateChanged(auth, (currentUser) => {
    console.log("currentUser: ",currentUser);
    if (currentUser.emailVerified) {
      console.log('Email is verified');
    }
    else {
      console.log('Email is not verified');
    }
  })

  useEffect(() => {
    logout()
  }, [])




  return (
    <div className="App">
      {/* <LoginPage /> */}
      <Homepage />
    </div>
  );
}

export default App;

