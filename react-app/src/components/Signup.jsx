import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from './Header';
import axios from 'axios';
import './Home.css';
import API_URL from '../constants';
import io from 'socket.io-client';
let socket = io(API_URL);

const Signup = () => {
  const navigate = useNavigate();
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');
  const [email, setemail] = useState('');
  const [mobile, setmobile] = useState('');
  const [role, setrole] = useState('');

  const handleApi = () => {
    if (!username || !password || !email || !mobile || !role) {
      alert('Please enter All Field Values.');
      return;
    }
    const url = API_URL + '/signup';
    const data = { username, password, email, mobile, role };
    axios.post(url, data)
      .then((res) => {
        if (res.data.message) {
          alert(res.data.message);
          // Emit 'signup' event to notify Allusers component
          socket.emit('signup', { username, email, mobile, role });
          navigate('/login');
        }
      })
      .catch((res) => {
        if (res.data.message) {
          alert(res.data.message);
        }
      });
  }

  useEffect(() => {
    !!localStorage.getItem('token') && navigate('/');
  }, []);

  return (
    <>
      <Header />
      <div>
        <h2 className='mt-2'>Welcome To Signup Page</h2>
      </div>
      <br />
      Username
      <input className='form-control' type='text' value={username} onChange={(e) => { setusername(e.target.value); }} />
      Password
      <input className='form-control' type='password' value={password} onChange={(e) => { setpassword(e.target.value); }} />
      Email
      <input className='form-control' type='text' value={email} onChange={(e) => { setemail(e.target.value); }} />
      Mobile
      <input className='form-control' type='text' value={mobile} onChange={(e) => { setmobile(e.target.value); }} />
      <br />
      Select User Role
      <select className='form-control' value={role} onChange={(e) => { setrole(e.target.value) }}>
        <option>Select Values</option>
        <option>Admin</option>
        <option>user</option>
      </select>

      <button className='btn btn-primary' onClick={handleApi}>Signup</button>
      <Link className='ml-2' to="/login">Login</Link>
    </>
  )
}

export default Signup;
