import { createContext, useEffect, useState } from "react";
import axios from "axios";
export let Cartcontext=createContext(null);

export  function Cartprovider(props){
    
let [cartList, Setcart]=useState([])
let baseUrl='https://route-ecommerce.onrender.com'
  async function getdatacart(){
      let header={
       token : localStorage.getItem("token"),
      }
     let {data}=await axios.get(`${baseUrl}/api/v1/cart`,{headers:header}).catch((err)=>{console.log(err);}).then((res)=>
    
    {
        Setcart(res.data);
        console.log("res");  
    }
    )
  
  
   
}


return <Cartcontext.Provider value={{getdatacart,cartList}}>
    {props.children}
</Cartcontext.Provider>
 }