import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const Navigate=useNavigate()
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const handleSubmit=async(e)=>{
    e.preventDefault();
  const response=  await fetch('http://localhost:5000/api/auth/login',{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify({email,password})
    });
   const json=await response.json()
   console.log(json)
   if(json.success){
    //Save the auth token and redirect
    localStorage.setItem('token',json.authtoken);
    alert("Loggedin Success")
    Navigate('/')
     setEmail("")
     setPassword("")
   }
   else{
    alert("Invalid Cedential")
   }
  }
  return (
    <div className='container my-5'>
          <h1>Login to Continue to iNotebook</h1>
  <form className="conatiner  justify-content-center" style={{width:'400px'}}>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" value={email} onChange={(e)=>setEmail(e.target.value)} id="email" aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
  </div>
  <button type="submit" className="btn btn-primary" onClick={handleSubmit} >Submit</button>
</form>
    </div>
  )
}
