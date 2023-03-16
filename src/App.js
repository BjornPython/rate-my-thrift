import { useState, useEffect } from 'react';
import './App.css';
import LoginPage from './comps/loginComps/LoginPage';
import Homepage from './comps/loggedInPage/Homepage';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './apis/firebase';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {

  const [user, setUser] = useState(null)

  onAuthStateChanged(auth, (currentUser) => {
    console.log("USER CHANGED");
    setUser(()=> {
      return currentUser
    })

  })
  
  useEffect(() => {
    
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

