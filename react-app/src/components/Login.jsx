import React, { useEffect, useState } from 'react'
import Header from './Header'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import './Home.css';
import API_URL from '../constants';



const Login = () => {
  const navigate = useNavigate();
  const [username,setusername]= useState('');
  const [password,setpassword]= useState('');

  const handleApi = ()=>{
    
    
    if (!username || !password) {
      alert('Please enter both username and password.');
      return;
    }
    // console.log({username,password});
    const url = API_URL + '/login';
    const data = {username,password};
    axios.post(url,data)
    .then((res) => {
      if (res.data.message === 'find success.')
      {
       
          localStorage.setItem('token',res.data.token);
          localStorage.setItem('userId',res.data.userId);
          localStorage.setItem('userName',res.data.username);


          navigate('/')
      }
        else {
        alert(res.data.message);
      }
      })
      .catch((err) => {
      if (err){
        // console.log(err);
        alert(err);
      }
      
    });

  }

  useEffect(() => {
    {!!localStorage.getItem('token') && navigate('/')}
  }, [])
  return (
    <>
    <Header />
    <div>
     <h2 className='mt-2'>Welcome To Login Page</h2> 
     </div>
     <br/>
    Username
    <input className='form-control' type='text'value={username} onChange={(e)=>{setusername(e.target.value);}}/>
    Password
    <input className='form-control' type='password' value={password} onChange={(e)=>{setpassword(e.target.value);}}/>
    <br />
    <button className='btn btn-danger' onClick={handleApi}>Login</button>
    <Link className='ml-2' to="/signup">Signup</Link>
    </>
  )
}

export default Login