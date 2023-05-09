import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Formik, useFormik } from 'formik'
import{checkoutData}from '../../Networks/Api'
import * as Yup from 'yup'
export default function Checkout() {
  let {id} = useParams()
    let [response,setResponse]=useState(null)
    let [errmessage, seterror]=useState("");
    let validate= Yup.object({
        city:Yup.string().required("name is required ").min(3,"min char 3"),    
        phone:Yup.string().required("phone is required ").matches(/^(011|010|015|012)[0-9]{8}$/,"enter matches phone number "),
         
      })
      let userform=useFormik({
        initialValues:{
          details:"",
         city: "",
         phone:"",
        }, onSubmit:(values)=>{sendData(values)},
        validationSchema:validate,
      }) 
      function sendData(vals){
        checkoutData(vals,id).catch((err)=>{console.log(err);
          seterror(err.response.data.message);
          
        }).then((res)=>{
         setResponse(res)
         if (res.status==200){
           window.open(res.data.session.url)
         }
       
       })
      }
  return (
    <div>
       <div className="container p-4 ">
          <h2 className=' pt-5 pb-3 font-design ps-0 text-success'>
          Checkout Details
        </h2>
        <form onSubmit={userform.handleSubmit} className='pb-5'>
        <div className='my-3'>
          <label htmlFor="details"> details</label>
          <input onChange={userform.handleChange} onBlur={userform.handleBlur} name='details' id='details' type='text' className='form-control'/>
          <p className='text-danger'>{userform.errors.email}</p>
     </div>
 
     <div className='my-3'>
       <label htmlFor="city"> city</label>
       <input onChange={userform.handleChange} onBlur={userform.handleBlur} name='city' id='city' type='text' className='form-control'/>
        <p className='text-danger'>{userform.errors.password}</p>
     </div>
     <div className='my-3'>
       <label htmlFor="phone"> phone</label>
       <input onChange={userform.handleChange} onBlur={userform.handleBlur} name='phone' id='phone' type='tel' className='form-control'/>
        <p className='text-danger'>{userform.errors.password}</p>
     </div>
   
   { errmessage!=""?  <div className='alert alert-danger'>
{errmessage}
     </div>
     :" "}
     <button type='submit' className='btn btn-success'>pay</button>
        </form>
        </div> 
    </div>
  )
}
