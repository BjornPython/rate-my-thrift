import logo from './logo.svg';
import { useState, useEffect } from 'react';
import './App.css';
import LoginPage from './comps/loginComps/LoginPage';
function App() {

  const [user, setUser] = useState(null)

  useEffect(() => {
    setUser(window.localStorage.getItem("user"))
  }, [])

  return (
    <div className="App">
      <LoginPage />
    </div>
  );
}

export default App;
