import React, { useState,useEffect } from 'react'
import { Link, useNavigate  } from 'react-router-dom'
import Header from './Header'
import axios from 'axios'
import './Home.css';

const Signup = () => {
  const navigate = useNavigate();
  const [username,setusername]= useState('');
  const [password,setpassword]= useState('');
  const [email,setemail]= useState('');
  const [mobile,setmobile]= useState('');

  const handleApi = ()=>{
    // console.log({username,password});
    if (!username || !password ||! email || !mobile) {
      alert('Please enter All Field Values.');
      return;
    }
    const url = 'http://localhost:5000/signup';
    const data = {username,password,email,mobile};
    axios.post(url,data)
    .then((res) => {
      if (res.data.message){
        alert(res.data.message);
        navigate('/login')
      }
      
    })
    .catch((res) => {
      if (res.data.message){
        alert(res.data.message);
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
     <h2 className='mt-2'>Welcome To Signup  Page</h2> 
     </div>
    <br />
    Username
    <input className='form-control' type='text' value={username} onChange={(e)=>{setusername(e.target.value);}} />
    Password
    <input className='form-control' type='password' value={password} onChange={(e)=>{setpassword(e.target.value);}} />
    Email
    <input className='form-control' type='text' value={email} onChange={(e)=>{setemail(e.target.value);}} />
    Mobile
    <input className='form-control' type='text' value={mobile} onChange={(e)=>{setmobile(e.target.value);}} />
    <br />
    <button className='btn btn-primary' onClick={handleApi}>Signup</button>

    <Link className='ml-2' to="/login">Login</Link>
    </>
  )
}

export default Signup