import React, { Profiler, useState ,useEffect} from 'react'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import Home from './components/Home/Home'
import Layout from './components/Layout/Layout'
import Login from './components/Login/Login'
import Notfound from './components/Notfound/Notfound'
import Products from './components/Products/Products'
import Register from './components/Register/Register'
import Profile from './components/Profile/Profile'
import jwt_decode from 'jwt-decode'
import ForgetPassword from './components/ForgetPassword/ForgetPassword'
import Resetpass from './components/Resetpass/Resetpass'
import ProductDetails from './components/ProductDetails/ProductDetails'
import Category from './components/Category/Category'
import { CategoryProvider } from './components/SharedData/CategoryShared'
import { UrlProvider } from './components/SharedData/Urldata'
import CartDetails from './components/CartDetails/CartDetails'
import { Cartprovider } from './components/SharedData/CartShared'
import Checkout  from './components/Checkout/Checkout'

  function getToken (){
    return localStorage.getItem("token")
  }
  function setToken (userToken){
  
    localStorage.setItem("token",userToken)
    return < Navigate to="/home"/>
  }
  
export default function App() {
  let [userdata,setuser]=useState(null)
  
  function logOut(){
    setuser(null)
    localStorage.removeItem("token")
  return  <Navigate to="/login"/>
  }
  function saveUserData(data){
    setuser(data)
  }
  function saveCartItems(count){


  }
  function Protectrouting(props){
    if (localStorage.getItem("token")){
      return props.children
    }
    else{
  return < Navigate to="/login"/>
    }
  }

  useEffect(()=>{
      if (localStorage.getItem("token")){
      let data= jwt_decode(localStorage.getItem("token"))
      saveUserData(data);
      }
  },[])

  
  let routes =createBrowserRouter([
    
     {path:"",element:<Layout userdata={userdata} logOut={logOut} />,children:[
     {path:"home",element:<Protectrouting><Home/></Protectrouting>},
     {path:"products",element:<Protectrouting><Products/></Protectrouting>  },
     {path:"checkout/:id",element:<Protectrouting><Checkout /></Protectrouting>  },
     {path:"cartDetails",element:<Protectrouting><CartDetails /></Protectrouting>  },
     {path:"productDetails/:id",element:<Protectrouting><ProductDetails/></Protectrouting>  },
     {path:"category",element:<Protectrouting><Category/></Protectrouting>  },
     {path:"login",element:<Login saveUserData ={saveUserData} /> },
     {path:"forgetpassword",element:<ForgetPassword /> },
     {path:"resetpass",element:<Resetpass /> },
    {path:"profile",element:<Protectrouting><Profile userdata={userdata} /></Protectrouting> },
    {path:"resetpass",element:<Resetpass/> },
    {index:true,element:<Register/> },
    {path:"*",element:<Notfound/> 
    }
    ]},
  ])

  return (
    <Cartprovider>
 <UrlProvider>
<CategoryProvider>
<RouterProvider router={routes} />
</CategoryProvider></UrlProvider></Cartprovider>
  )
}
