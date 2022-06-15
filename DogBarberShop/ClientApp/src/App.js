import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from './components/Home';
import { Login } from './components/Login';
import { SignUp } from './components/SignUp';
import { useSelector } from "react-redux";

export default function App() {
    const user = useSelector((state) => state.userlogin.user);
    console.log(user);
    return (
      <BrowserRouter >
        <Routes >
         <Route path='/' element={user ? <Home /> : <Login />} />
         <Route path='/login' element={<Login />} />
         <Route path='/signup' element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    );
}
