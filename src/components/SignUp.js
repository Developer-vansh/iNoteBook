import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
  const[user,setUser]=useState({name:"",email:"",password:""})
  const Navigate=useNavigate()
  const handleclick=async(e)=>{
   const {name,email,password}=user;
    e.preventDefault();
  const response=  await fetch('http://localhost:5000/api/auth/createuser',{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify({name,email,password})
    });
   const json=await response.json()
   console.log(json)
   if(json.authtoken){
    //Save the auth token and redirect
    localStorage.setItem('token',json.authtoken);
    alert("Registered Success")
    Navigate('/')
   }
   else{
    alert("User with email already exists or password is not of min 5 length")
   }
  }
  const onchange=(e)=>{
    setUser({...user,[e.target.name]:e.target.value})
  }
  return (
    <div className='container my-3'>
      <h1>Create an Account to use iNotebook</h1>
      <form className="conatiner  justify-content-center" style={{width:'400px'}}>
  <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control" id="name" name="name" aria-describedby="emailHelp" value={user.name} onChange={onchange} required minLength={5}/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" name="email"  aria-describedby="emailHelp"  value={user.email} onChange={onchange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" name="password"   value={user.password} onChange={onchange} required minLength={5}/>
  </div>
  <button  className="btn btn-primary" onClick={handleclick}>Sign Up</button>
</form>
    </div>
  )
}
