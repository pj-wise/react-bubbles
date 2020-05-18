import React, { useState } from 'react';
import axios from 'axios';
import { axiosWithAuth } from '../utils/axiosWithAuth';

const Login = ({ history }) => {
  const [user, setUser] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .post('/login', user)
      .then((res) => {
        console.log('axiosAuth RESPONSE:', res.data.payload);
        localStorage.setItem('token', res.data.payload);
        history.push('/colors');
      })
      .catch((err) => {
        console.log('ugh, you just had to break it', err);
      });
  };

  return (
    <div className='loginFormWrap'>
      <form className='loginForm' onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          type='text'
          name='username'
          value={user.username}
          placeholder='username'
        />
        <input
          onChange={handleChange}
          type='password'
          name='password'
          value={user.password}
          placeholder='password'
        />
        <button type='submit'>Login</button>
      </form>
      <h1>Bubbles</h1>
    </div>
  );
};

export default Login;
