import React, { useContext, useEffect, useState } from 'react'
import {getCartData, updateInQuantity,deleteProduct} from '../../Networks/Api'
import axios from 'axios'
import { useNavigate ,Link } from 'react-router-dom'
import { Cartcontext } from '../SharedData/CartShared'


export default function CartDetails({saveCartItems}) {
 let [cartList,setCartList]=useState([])
 let [load,setloader]=useState(false)
 let {getdatacart} =useContext(Cartcontext)

 function getdata(){
   getCartData().catch((err)=>{
     console.log(err);
    }).then((res)=>{
      setCartList(res.data)
      localStorage.setItem("cartItems",res.data.numOfCartItems)
      setloader(true)

    
    })
  }
  function increaseProduct(id,quantity){
    let quan=quantity+1
    console.log(quan);
    updateInQuantity(id,quan).catch((err)=>{
      console.log(err);
     }).then((res)=>{
      console.log(res);
      setCartList(res.data)
     })
  }

 function decreaseProduct(id,quantity){
  let quan=quantity-1
  console.log(quantity);
  updateInQuantity(id,quan).catch((err)=>{
    console.log(err);
   }).then((res)=>{
    console.log(res);
    setCartList(res.data)
   })
  }
  function deleteSpecficProduct(id){
    deleteProduct(id).catch((err)=>{
      console.log(err);
    }).then((res)=>{   
       setCartList(res.data)
       console.log(res);
      }   
       )
  }


   
useEffect(()=>{
    getdata()
    getdatacart()
} ,[])
  return (
    <div>
     {load?
             <div className="container mt-3 p-0  cart-container rounded shadow mt-5">
              <div className="row g-4 p-5">
         
        
      
        <h6 className='ms-2 fw-bold pb-0 '>
          shopping cart
        </h6>
      <h6 className=' point ms-2 me-2 fw-bold text-success mt-0'>
      Total cart price : {cartList.data.totalCartPrice}
      </h6>
 
      <table className='table m-3 border-none text-center text-muted border-0  ms-0'>

      

    <tbody className='mt-4 '>
 { cartList.data.products?cartList.data.products.map((ele,i)=>{
  return <tr className='my-3  ' key={i}>
         <td >
          <div className='d-flex '>
            <img src={ele.product.imageCover} className='w-10' alt="" />
        
         <div>
      <p className=' fs-6 text-dark ms-4 text-start'>  {  ele.product.title}   </p>  
      <p className=' fs-6 text-success ms-4 text-start'> Price : {  ele.price}   </p>  
      <i onClick={()=>{deleteSpecficProduct(ele.product._id)}} className=' me-5 fa-solid fa-trash fs-4 mt-1 text-success clicked text-start'></i>
      </div>  </div>  </td> 
            <td  className=' mt-2 ' colSpan={4}>
              <div className='pe-4 d-flex justify-content-end'>
                <a className='text-decoration-none  me-2 fs-3 text-success  'onClick={()=>{increaseProduct(ele.product._id,ele.count)}}>+</a>
           <button className='  border-0'>{ele.count}</button>
           <a className='text-decoration-none fs-3 text-success  ms-2'onClick={()=>{decreaseProduct(ele.product._id,ele.count)}} >-</a></div>

            </td>   
            <td>

            </td>   
            
      
           </tr>})  : null  }
           <tr>
            <td colSpan={4} className="text-start fs-5">
                Total
            </td>
             <td className='text-dark'>
              {cartList.data.totalCartPrice
              }
              
             </td>
           </tr>
    </tbody>
</table>
<Link  className='btn btn-success w-25 mx-auto' to={"/checkout/"+cartList.data._id}>Place Order</Link>
</div>
</div>: 
  <div className="container-fluid mt-3 p-0">
<div className='position-relative  loading '>
      <div className=' container-fluid justify-content-center align-items-center position-fixed bottom-0 top-0 right-0 left-0 loading'>
      <i className='fa-spin fa-solid fa-spinner fa-4x text-white'></i>
        </div>
        </div>
      </div>}

</div>
  )
}
