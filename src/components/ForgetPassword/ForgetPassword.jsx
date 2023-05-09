import { isVisible } from '@testing-library/user-event/dist/utils'
import axios from 'axios'

import { Formik, useFormik } from 'formik'
import React, { useState } from 'react'


import * as Yup from 'yup'
import jwt_decode from 'jwt-decode'
import  $ from'jquery'
import { useNavigate ,Link } from 'react-router-dom'
export default function ForgetPassword() {
  let [flagMessage, setCodeFlag]=useState(true);
  let [errmessage, seterror]=useState("");
  let [handle, sethandle]=useState("");
  let navigate=useNavigate()
  let baseurl='https://route-ecommerce.onrender.com'
async function ForgetPassword(values){

let {data}= await axios.post(`${baseurl}/api/v1/auth/forgotPasswords`,values).catch((err=>{
console.log(err);
seterror(err.response.data.message);

}))
if(data.statusMsg=="success"){
  setCodeFlag(false);
}

}
const handleClick=()=>{
  sethandle('')
}
function ChangeEmail(){
  setCodeFlag(true);
}
async function ResetCode(values){

  let {data}= await axios.post(`${baseurl}/api/v1/auth/verifyResetCode`,values).catch((err=>{
    console.log(err);
  seterror(err.response.data.message);
  
  }))
  console.log(data);
  if(data.status=="Success"){
    setCodeFlag(false)
    navigate("/resetpass")
 
  }
  
  }

 
  let Form2=useFormik({
    initialValues:{
  
      resetCode:"",
    
    }, onSubmit:(values)=> 
    {
      ResetCode(values)}
  })
  let validate2= Yup.object({
    email:Yup.string().required("email is required ").email(),  
})
let userForm=useFormik({
initialValues:{

  email:"",

}, onSubmit:(values)=>{ForgetPassword(values)},
validationSchema:validate2,
})
  return (
  <>
 {flagMessage?<form onSubmit={userForm.handleSubmit}>
<div className='my-3'>
<label htmlFor="emsil"> Email</label>
<input onChange={userForm.handleChange} onBlur={userForm.handleBlur} name='email' id='email' type='email' className='form-control'/>
     <p className='text-danger'>{userForm.errors.name}</p>
     </div>
     <button  type='submit' className='btn btn-success mt-4'>
     send code
     </button>
</form>:<form onSubmit={Form2.handleSubmit}>
<div className='my-3'>
<label htmlFor="resetCode"> reset code</label>
<input onChange={Form2.handleChange} onBlur={Form2.handleBlur}  name='resetCode'  id='resetCode'  type='text' className='form-control'/>
     <p className='text-danger'>{Form2.errors.name}</p>
     </div>
     <Link onClick={ChangeEmail}>change Email</Link>
     <br />
  {  errmessage!=""? <div className='alert alert-danger mt-2'>
{errmessage}
     </div>:""}
     <button  type='submit' className='btn btn-success mt-2' onClick={handleClick}>
    reset code
     </button>
</form>}
  </>
  )
}
