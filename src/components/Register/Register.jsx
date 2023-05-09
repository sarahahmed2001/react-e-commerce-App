import { isVisible } from '@testing-library/user-event/dist/utils'
import axios from 'axios'
import { Formik, useFormik } from 'formik'
import React, { useState } from 'react'
import * as Yup from 'yup'
import  $ from'jquery'
import { useNavigate } from 'react-router-dom'
export default function Regester() {

  let [errmessage, seterror]=useState("");
  let [loading,setloading]=useState(false)
  let navigate=useNavigate()
  let baseurl='https://route-ecommerce.onrender.com'

  let validate= Yup.object({
    name:Yup.string().required("name is required ").max(15,"max char 5").min(3,"min char 3"),
    email:Yup.string().required("email is required ").email(),
    phone:Yup.string().required("phone is required ").matches(/^(011|010|015|012)[0-9]{8}$/,"enter matches phone number "),
    password:Yup.string().required("password is required").matches(/^[A-Z][a-zA-Z0-9]{3,16}$/,"enter matches phone number "),
    rePassword:Yup.string().required("repassword is required").oneOf([Yup.ref("password")],"repassword dosenot match")   
  })
  let userform=useFormik({
    initialValues:{
      name:"",
      email:"",
      phone:"",
      password:"",
      rePassword:""
    }, onSubmit:(values)=>{validData(values)},
    validationSchema:validate,
  })
 async function validData(values){
  setloading(true)
let {data}= await axios.post(`${baseurl}/api/v1/auth/signup`,values).catch((err=>{
seterror(err.response.data.message);
setloading(false)

}))

if (data.message=='success'){


}
  }
  return (<div className='m-auto w-75 '>

    <h2>Register Now</h2>
    <form onSubmit={userform.handleSubmit}>
     <div className=''>
<label htmlFor="name"> Name</label>
<input onChange={userform.handleChange} onBlur={userform.handleBlur} name='name' id='name' type='text' className='form-control change'/>
     <p className='text-danger'>{userform.errors.name}</p>
     </div>
     <div className=''>
<label htmlFor="email"> Email</label>
<input onChange={userform.handleChange} onBlur={userform.handleBlur} name='email' id='email' type='email' className='form-control change'/>
<p className='text-danger'>{userform.errors.email}</p>
     </div>
     <div className=''>
<label htmlFor="phone"> phone</label>
<input onChange={userform.handleChange} onBlur={userform.handleBlur} name='phone' id='phone' type='tel' className='form-control change'/>
<p className='text-danger'>{userform.errors.phone}</p>
     </div>
     <div className=''>
<label htmlFor="password"> password</label>
<input onChange={userform.handleChange} onBlur={userform.handleBlur} name='password' id='password' type='password' className='form-control change'/>
<p className='text-danger'>{userform.errors.password}</p>
     </div>
     <div className=''>
<label htmlFor="rePassword"> Repassword</label>
<input onChange={userform.handleChange} onBlur={userform.handleBlur} name='rePassword' id='rePassword' type='password' className='form-control change'/>
<p className='text-danger'>{userform.errors.rePassword}</p>
     </div>
   { errmessage!=""?  <div className='alert alert-danger'>
{errmessage}
     </div>
     :" "}
     {loading?<button disabled={!userform.isValid} type='submit' className='btn btn-success '>
     <i className='fa-solid fa-spinner fa-spin text-white'></i>  
    </button>:  <button disabled={!userform.isValid} type='submit' >
     Register
     </button>}
       
    </form>
    </div> )
}
