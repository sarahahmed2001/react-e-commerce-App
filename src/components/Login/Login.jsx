import { isVisible } from '@testing-library/user-event/dist/utils'
import axios from 'axios'
import { Formik, useFormik } from 'formik'
import React, { useState } from 'react'
import * as Yup from 'yup'
import jwt_decode from 'jwt-decode'
import  $ from'jquery'
import { useNavigate ,Link } from 'react-router-dom'
export default function Login({saveUserData}) {

  let [errmessage, seterror]=useState("");
  let [loading,setloading]=useState(false)
  let navigate=useNavigate()
  let baseurl='https://route-ecommerce.onrender.com'
  let validate= Yup.object({
    
    email:Yup.string().required("email is required ").email(),
    
    password:Yup.string().required("password is required").matches(/^[A-Z][a-zA-Z0-9]{3,16}$/),
     
  })
  let userform=useFormik({
    initialValues:{

      email:"",
     
      password:"",
    }, onSubmit:(values)=>{validData(values)},
    validationSchema:validate,
  })
 async function validData(values){
  setloading(true)
let {data}= await axios.post(`${baseurl}/api/v1/auth/signin`,values).catch((err=>{
seterror(err.response.data.message);
console.log(err.response.data);
setloading(false)

}))
if (data.message=='success'){
  setloading(false)

  localStorage.setItem("token",data.token)
  saveUserData(data.user)
  navigate("/home")
  console.log(data.token);
 

}
 }
  return (<>

    <h2>Login Now</h2>
    <form onSubmit={userform.handleSubmit}>

     <div className='my-3'>
<label htmlFor="email"> Email</label>
<input onChange={userform.handleChange} onBlur={userform.handleBlur} name='email' id='email' type='email' className='form-control'/>
<p className='text-danger'>{userform.errors.email}</p>
     </div>
 
     <div className='my-3'>
<label htmlFor="password"> password</label>
<input onChange={userform.handleChange} onBlur={userform.handleBlur} name='password' id='password' type='password' className='form-control'/>
<p className='text-danger'>{userform.errors.password}</p>
     </div>
   
   { errmessage!=""?  <div className='alert alert-danger'>
{errmessage}
     </div>
     :" "}
     <Link to="/forgetpassword" className='mb-3'>Forget Password ?</Link>
     <br></br>
     {loading?<button disabled={!userform.isValid} type='submit' className='btn btn-successmt-4'>
     <i className='fa-solid fa-spinner fa-spin text-white' ></i>  
    </button>:  <button disabled={!userform.isValid} type='submit' className='btn btn-success mt-4'>
     Login
     </button>}
       
    </form>
    </> )
}
