import React, { useEffect, useState } from 'react'
import Header from './Header'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import './Home.css';
import API_URL from '../constants';



const Login = () => {

  const location = useLocation()
  const navigate = useNavigate();
  const [username,setusername]= useState('');
  const [password,setpassword]= useState('');
  const [role,setrole]= useState('');

  // const showAdminOption = window.location.pathname.includes('/jay');
  const handleApi = ()=>{
    
    
    if (!username || !password || !role) {
      alert('Please enter All Fields');
      return;
    }
    // console.log({username,password});
    const url = API_URL + '/login';
    const data = {username,password,role};
    axios.post(url,data)
    .then((res) => {
      if (res.data.message === 'find success.')
      {
      //  console.log(res.data);
      //  return;
          localStorage.setItem('token',res.data.token);
          localStorage.setItem('userId',res.data.userId);
          localStorage.setItem('userName',res.data.username);
          localStorage.setItem('userRole',res.data.role);
          console.log("goods");
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
    Select User Role
    <select className='form-control' value={role} onChange={(e)=>{setrole(e.target.value)}}>
    <option>Select Values</option>
    <option>user</option>
    {location.pathname.includes('/jay') && <option>Admin</option>}
       </select>
    <button className='btn btn-danger' onClick={handleApi}>Login</button>
    <Link className='ml-2' to="/signup">Signup</Link>
    </>
  )
}

export default Login