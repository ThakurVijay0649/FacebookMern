import React, { useEffect } from 'react';
import './App.css';
import Home from "./Components/Home/Home"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Login from './Components/Login/Login';
import Register from './Components/Login/Register';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from './Actions/User';
import Account from './Components/Account';
import NewPost from './Components/NewPost/NewPost';
import UpdateProfile from './Components/UpdateProfile';
import UpdatePassword from './Components/UpdatePassword';
import Header from './Components/Header/Header';
import ForgotPassword from './Components/ForgotPassword';
import ResetPassword from './Components/ResetPassword';
import UserProfile from "./Components/UserProfile"
import Search from './Components/Search';
import Loader from './Components/Loader/Loader';

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(state => state.user);
  useEffect(() => {
    dispatch(loadUser())
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      document.title = "Facebook - Social Media App"
    }
    else {
      document.title = "Facebook - Login or Signup"
    }
  }, [isAuthenticated]);
  return (
    <Router>
      {isAuthenticated && <Header />}
      <div className="container">
        <Routes>
          <Route path="/" element={isAuthenticated ? <Home /> : <Login />} />
          <Route path="/account" element={isAuthenticated ? <Account /> : <Login />} />
          <Route path="/register" element={isAuthenticated ? <Home /> : <Register />} />
          <Route path="/newpost" element={isAuthenticated ? <NewPost /> : <Register />} />
          <Route path="/update/profile" element={isAuthenticated ? <UpdateProfile /> : <Register />} />
          <Route path="/update/password" element={isAuthenticated ? <UpdatePassword /> : <Login />} />
          <Route path="/forgot/password" element={isAuthenticated ? <UpdatePassword /> : <ForgotPassword />} />
          <Route path="/password/reset/:token" element={isAuthenticated ? <UpdatePassword /> : <ResetPassword />} />
          <Route path="/user/:id" element={isAuthenticated ? <UserProfile /> : <Login />} />
          <Route path="/search" element={isAuthenticated ? <Search /> : <Login />} />
          <Route path='*' element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
