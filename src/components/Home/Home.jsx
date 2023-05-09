import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate ,Link } from 'react-router-dom'
import MainSlider from '../MainSlider/MainSlider'
import $ from'jquery'
import CategorySlider from '../CategorySlider/CategorySlider'
import {GetAllHomeData} from '../../Networks/Api'
export default function Home() {
 

  let [productList,setProduct]=useState([])
  console.log(process.env.REACT_APP_BASE_URL);
  let baseUrl='https://route-ecommerce.onrender.com'

  useEffect(()=>{
    GetAllData()
    
  },[])
function GetAllData(){
    GetAllHomeData().catch((err)=>{
   console.log(err);}
    ).then((res)=>{setProduct(res.data.data)
      $(".loading").fadeOut(3000)
    })
    


    }
  
  return (
    <div >
      <div className='position-relative  loading'>
      <div className=' container-fluid justify-content-center align-items-center position-fixed bottom-0 top-0 right-0 left-0 loading'>
      <i className='fa-spin fa-solid fa-spinner fa-4x text-white'></i>
        </div>
      </div>
      <div className='container mt-3 '>
        
      <MainSlider/>
      <CategorySlider/>
        <div className='row g-3'>{
          productList.map((product)=>{
            return <div className="col-md-2 productitem" key={product._id}>
              <Link to={"/productDetails/"+ product._id}>
            <div className='product border '>
             <img src={product.imageCover} className='w-100' alt="" />
             <span className='text-success'> {product.category.name}</span>
             <h2 className='h6 fw-bold'>{product.Title} </h2>
             <div className='d-flex justify-content-between'>
              <p>{product.price}EGP</p>
              <div>
                <i className='fa-solid fa fa-star text-warning ' >{product.ratingsAverage}</i>
              </div>
             </div>
            </div>
            </Link>
          </div>
          })
        }
         
        </div>
      </div>
    </div>
  )
}
