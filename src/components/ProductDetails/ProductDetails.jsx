import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import $, { get } from'jquery'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { useNavigate ,Link } from 'react-router-dom'
import MainSlider from '../MainSlider/MainSlider'
export default function ProductDetails() {
    let {id} = useParams()
    let navigate=useNavigate()
    let [productList, setProduct]=useState();
    let baseUrl='https://route-ecommerce.onrender.com'
    async function getDetails(){
        let {data}= await axios.get(`${baseUrl}/api/v1/products/${id}`).then((res)=>{
          setProduct(res.data.data)
          $(".load").fadeOut(3500)
        })
      
    }
    useEffect(()=>{
        getDetails()
    })
    function chageimage(e){
  let imgpath=e.target.getAttribute("src")
  $("#product-images").attr("src",imgpath)
 
    }
 async function additemcart(id){
  console.log(id);

  let obj={
    productId:id
  }
  let header={
   token : localStorage.getItem("token"),
  }
 await axios.post(`${baseUrl}/api/v1/cart`,obj,{headers:header}).catch((err)=>{
console.log(err);
}).then(()=>{
  navigate("/cartDetails")
})

   }
  return (
<div>
 <div className='position-relative load'>
      <div className=' container-fluid justify-content-center align-items-center position-fixed bottom-0 top-0 right-0 left-0 loading'>
     <i className='fa-spin fa-solid fa-spinner fa-4x text-white'></i>
</div>
      </div>
    
    {
    
      productList!=undefined?
  <div className="container">
      <div className="row align-items-center">
      <div className="col-md-4">
      <OwlCarousel loop className='owl-theme' items={1} autoplay={true}  >
    {productList.images.map((ele,i)=>{
        return     <div className='' key={i}>
        <img src={ele} alt="" height={200}  className='w-100'/>
        </div>
        
    })}
   </OwlCarousel>
  </div>
      <div className='col-md-8 ps-3 pt-3'>
<h2>
    {productList.title}
</h2>
<p className='txt-muted'>    {productList.description}</p>
<span>{productList.category.name}</span>
<div className='d-flex justify-content-between'>
              <p className='pb-4'>{productList.price}EGP</p>
              <div>
                <i className='fa-solid fa fa-star text-warning  pe-3' >{productList.ratingsAverage}</i>
              </div>
              </div>
              <button onClick={()=>{additemcart(productList._id)}} className='btn btn-success w-100'>+ Add To Cart</button>
      </div>
  </div>
  </div>
  :""  
    }

</div>
  )
}
