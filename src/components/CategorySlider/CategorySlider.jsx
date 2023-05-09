import React, { createContext, useContext } from 'react'
import {CategoryData} from '../SharedData/CategoryShared'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import img1 from '../../assets/images/slider-image-1.jpeg'
import img2 from '../../assets/images/slider-image-2.jpeg'
import img3 from '../../assets/images/slider-image-3.jpeg'
import slide1 from '../../assets/images/slider-image-2.jpeg'
import slide2 from '../../assets/images/slider-image-1.jpeg'
export default function CategorySlider() {
    let {categoryList}=useContext(CategoryData)
  return (<>
   
    
      
         <OwlCarousel className='owl-theme' loop items={5} autoplay={true} >
    {categoryList.map((ele,i)=>{
        return    <div className='border' key={i}>
        <img src={ele.image} alt="" height={200}  className='w-100'/>
        <h4>{ele.name}</h4>
        </div>
        
   
    })}
   </OwlCarousel>

    
 

</>
  )
}

