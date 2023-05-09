import React, { useContext, useEffect, useState } from 'react'
import { Link,NavLink } from 'react-router-dom'
import Logo from '../../assets/freshcart-logo.svg'
import { cartItems } from '../CartDetails/CartDetails'
import { Cartcontext } from '../SharedData/CartShared'

export default function Navbar({userdata,logOut}) {
let[cartItem ,setCartItems]=useState(null)
let {cartList}= useContext(Cartcontext)
let [loading,setloading]=useState(false)
function update(){
  setCartItems(localStorage.getItem("cartItems"))
}
useEffect(()=>{
  update()
})
  return (
    <div>
<nav className="navbar navbar-expand-lg bg-light ">
  <div className="container">
    <Link className="navbar-brand" to="/"><img src={Logo} className="w-100" /></Link>
    <button className="navbar-toggler" type="button" >
      <span className="navbar-toggler-icon " ></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      {userdata?   <ul className="navbar-nav me-auto mb-2 mb-lg-0">
      
      <li className="nav-item">
        <NavLink className={({isActive})=>isActive?"acive nav-link":"nav-link "} to="home">Home</NavLink>
      </li>
      <li className="nav-item">
          <NavLink className={({isActive})=>isActive?"acive nav-link":"nav-link "} to="Category">Category</NavLink>
        </li>
   
   </ul>:""}
   
     <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
      {userdata?  <>
  
     <li className="nav-item py-2">
   <i className='fa-brands fa-facebook mx-2'></i>
   <i className='fa-brands fa-twitter mx-2'></i>
   <i className='fa-brands fa-spotify mx-2'></i>
   <i className='fa-brands fa-youtube mx-2'></i>
        </li>
    
      
        <li className="nav-item">
          <NavLink className={({isActive})=>isActive?"acive nav-link":"nav-link "} to="profile">Profile</NavLink>
        </li>
       
        <li className="nav-item">
          <span role="button" className='nav-link cursor-pointer'onClick={logOut} >logout</span>
        </li>
        <li className="nav-item position-relative">
          <NavLink className={({isActive})=>isActive?"acive nav-link":"nav-link "} to="cartDetails"><i class="fs-5 fa-solid fa-cart-shopping text-success"></i></NavLink>
          <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill cart  px-2 mt-2">
            {cartList.numOfCartItems}
        
    <span class="visually-hidden">unread messages</span>
  </span>

        </li>
        </>:  <>
        <li className="nav-item">
          <NavLink className={({isActive})=>isActive?"acive nav-link":"nav-link "} to="/">Register</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className={({isActive})=>isActive?"acive nav-link":"nav-link "} to="login">login</NavLink>
        </li>
        </>}
    
      
     </ul>
      
    </div>
  </div>
</nav>
      
    </div>
  )
}
