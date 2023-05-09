import { isVisible } from '@testing-library/user-event/dist/utils'
import axios from 'axios'
import { Formik, useFormik } from 'formik'
import React, { useState } from 'react'
import * as Yup from 'yup'
import jwt_decode from 'jwt-decode'
import  $ from'jquery'
import { useNavigate ,Link } from 'react-router-dom'
export default function Resetpass() {
  let [loading,setloading]=useState(false)
  let navigate=useNavigate()
  let baseurl='https://route-ecommerce.onrender.com'
  let validate= Yup.object({
    
    email:Yup.string().required("email is required ").email(),
    
    newPassword:Yup.string().required("password is required").matches(/^[A-Z][a-zA-Z0-9]{3,16}$/),
     
  })
  let userform=useFormik({
    initialValues:{

      email:"",
     
      newPassword:"",
    }, onSubmit:(values)=>{ResetPasswordApi(values)},
    validationSchema:validate,
  })
 async function ResetPasswordApi(values){
  let {data}= await axios.put(`${baseurl}/api/v1/auth/resetPassword`,values).catch((err=>{
  
    console.log(err.response.data);
   
    
    }))
if (data.status=='Success'){
<p className='txt-success'>password reseted successfully </p>
}


  }
  return (
<>
<form  onSubmit={userform.handleSubmit}>
<div className='my-3'>
<label htmlFor="email"> Email</label>
<input onChange={userform.handleChange} onBlur={userform.handleBlur} name='email' id='email' type='email' className='form-control'/>
 </div>
 
     <div className='my-3'>
<label htmlFor="password"> new password </label>
<input onChange={userform.handleChange} onBlur={userform.handleBlur} name='newPassword' id='password' type='password' className='form-control'/>
     </div>
      <button  type='submit' className='btn btn-success mt-4'>
     change password
     </button>
     </form>
</>
  )
}
