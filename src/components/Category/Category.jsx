import axios from 'axios'
import React, { useEffect, useState,useContext } from 'react'
import { useNavigate ,Link } from 'react-router-dom'
import {CategoryData} from '../SharedData/CategoryShared'
import{Urlbase} from '../SharedData/Urldata'
export default function() {
  let {categoryList}=useContext(CategoryData)
  let {baseUrl}=useContext(Urlbase)
    let [category,setCategories]=useState([])
    let [loader , setloader]= useState(false)
    
    async function getAllcategories(){
        let {data}= await axios.get(`${baseUrl}/api/v1/categories`)
        setloader(true)
        setCategories(data.data)
    }    
    useEffect(()=>{
        getAllcategories()
    },[])
  return (
    <div>
      
     
          {loader?
             <div className="container mt-3 p-0">
              <div className="row g-4 p-5">
              {category.map((cate,i)=>{
                  return <div className="col-md-2" key={i}>
  
                      <img src={cate.image} alt=""  className='w-100 h-75'/>
                      <h4>{cate.name}</h4>
                  </div>
  
 })}
</div></div>: 
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
