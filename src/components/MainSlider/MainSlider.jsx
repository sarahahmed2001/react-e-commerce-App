import React from 'react'
import $ from 'jquery'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import img1 from '../../assets/images/slider-image-1.jpeg'
import img2 from '../../assets/images/slider-image-2.jpeg'
import img3 from '../../assets/images/slider-image-3.jpeg'
import slide1 from '../../assets/images/slider-image-2.jpeg'
import slide2 from '../../assets/images/slider-image-1.jpeg'

export default function MainSlider() {
  return (
    <div>
      <div className="container">
        <div className="row g-0 mainSlider">
          
         <div className="col-md-9">
         <OwlCarousel className='owl-theme ' loop items={1} autoplay={true} >
         <img src={img1} height={400} alt="" className='w-100' />
         <img src={img2} height={400} alt="" className='w-100' />
         <img src={img3} height={400} alt="" className='w-100' />
       </OwlCarousel>
         </div>
         <div className="col-md-3">
         <img src={slide1} height={200} alt=""  className='w-100' />
         <img src={slide2} height={200} alt=""  className='w-100' />
         </div>  
        </div>
    </div></div>
  )
}
