import logo from './logo.svg';
import { useState, useEffect } from 'react';
import './App.css';
import LoginPage from './comps/loginComps/LoginPage';
import { onAuthStateChanged, sendEmailVerification } from 'firebase/auth';
import { auth, logout } from './auth/firebase';

function App() {

  const [user, setUser] = useState(null)

  onAuthStateChanged(auth, (currentUser) => {
    console.log("currentUser: ",currentUser);
    if (currentUser.emailVerified) {
      console.log('Email is verified');
    }
    else {
      console.log('Email is not verified');
      sendEmailVerification(currentUser)
    }
  })






  return (
    <div className="App">
      <LoginPage />
    </div>
  );
}

export default App;

