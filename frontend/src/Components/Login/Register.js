import { Avatar, Button } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import logo from "../../images/facebook.png"
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../../Actions/User';
import { useAlert } from 'react-alert'

const Register = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");

  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, error } = useSelector(state => state.user);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const Reader = new FileReader();
    Reader.readAsDataURL(file);
    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setAvatar(Reader.result);
      }
    }

  }
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(registerUser(name, email, password, avatar));

  }

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }
  }, [alert, error, dispatch])

  return (
    <div class="login-container">
      <div class="login-row">
        <div class="img">
          <img src={logo} alt="" />
          <p>Facebook helps you connect and share with the people in your life.</p>
        </div>
        <div class="login-form-container">
          <form onSubmit={submitHandler}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Avatar src={avatar} sx={{ width: "3rem", height: "3rem" }} />
              <input type="file" accept='image/*' onChange={handleImageChange} required style={{ width: "88%" }} />
            </div>
            <input required type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
            <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address" />
            <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            <Button type="submit" variant='contained' disabled={loading}>Create New Account</Button>
            <hr style={{ marginTop: "2rem" }} />
            <strong style={{ textAlign: "center", marginBottom: "1rem" }}>Or</strong>
            <Link to="/">
              <Button class="signup" style={{ width: "50%" }} variant="contained">Login</Button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register