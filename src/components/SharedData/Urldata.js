import { createContext, useEffect, useState } from "react";
import axios from "axios";
export let Urlbase= createContext(null)
 export function UrlProvider(props){
    let[baseUrl,SetBaseUrl]= useState(" ")
    function seturl(){

        SetBaseUrl('https://route-ecommerce.onrender.com')
      
    }
  useEffect(()=>{
seturl()
  },[])
    return <Urlbase.Provider value={{baseUrl}}>
        {props.children}
    </Urlbase.Provider>
}