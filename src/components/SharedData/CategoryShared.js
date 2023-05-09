import { createContext, useEffect, useState } from "react";
import axios from "axios";

export let CategoryData= createContext(null)

export function CategoryProvider(props){
    let[categoryList,setCategoryList]= useState([])

let baseUrl='https://route-ecommerce.onrender.com'
async function getAllcategories(){
    let {data}= await axios.get(`${baseUrl}/api/v1/categories`)
    setCategoryList(data.data)
} 
useEffect(()=>{
    getAllcategories()
},[])
return<CategoryData.Provider value={{categoryList}}>
    {props.children}
 {  console.log(props.children)}
</CategoryData.Provider>
} 