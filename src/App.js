import React, {useState, useEffect} from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Header from "./views/header/Header"
import Places from './views/places/Places';
import Login from './views/login/Login';
import {auth} from "./config/firebase.config";
import { onAuthStateChanged } from 'firebase/auth';

function App() {
  const [user, setUser] = useState(null);

  const getUser = (user) => {
    if (user !== null) {
      setUser(user);
    }
  };

  const clearUser = () => {
    setUser(null);
  }

  useEffect(() => {
    const suscribe = onAuthStateChanged(auth, getUser);
    return suscribe;
  }, []);

  return (
    <>
    {user !== null && <Header setUser={clearUser}/>}
    <Routes>
      {user !== null && <Route path='/' element={<Places/>} />}
      <Route path='/login' element={<Login />} />
      {user !== null ? <Route path='*' element={<Places/>}/> : <Route path='*' element={<Login />}/> }
    </Routes>
  </>
  );
}

export default App;
