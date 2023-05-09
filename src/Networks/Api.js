import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
let baseUrl=process.env.REACT_APP_BASE_URL
export async function GetAllHomeData(){
   return await axios.get(`${baseUrl}/api/v1/products`);}
   export async function getCartData(){
      let header={
       token : localStorage.getItem("token"),  }
   let t =  await axios.get(`${baseUrl}/api/v1/cart`,{headers:header})
   return t;
   }
   export async function updateInQuantity(id,quantity){
      let header={
       token : localStorage.getItem("token"),
      }
      let body={
         count:quantity
      }
    
   return await axios.put(`${baseUrl}/api/v1/cart/${id}`,body,{headers:header})
   }
   export async function deleteProduct(id){
      let header={
       token : localStorage.getItem("token"),
      }
     
    console.log(id);
   return await axios.delete(`${baseUrl}/api/v1/cart/${id}`,{headers:header})
   }
   export async function checkoutData(vals, id){    
      let body={
         shippingAddress:vals}
      let headers={
         token : localStorage.getItem("token"),   
      }
      console.log(body);
      console.log(id);
      return await axios.post(`${baseUrl}/api/v1/orders/checkout-session/${id}?url=http://localhost:4200`, body,{headers})
   }