import React from 'react'
import'../Footer/footer.css'
import payment from'../../assets/2560px-Amazon_Pay_logo.svg.png'
import payment2 from'../../assets/Mastercard-logo.svg.png'
export default function Footer() {
  return (<>
    <div className='container-fluid  footer p-5 ps-5  mt-4' >
      
      <h4 className='txt-dark'>Get the FreshCart app</h4>
      <p className='text-muted '>we will send you a Link , open it in your phone  to download yhe app</p>
      <div className='d-flex mb-3'>
      <input   name='email'  id='email'  type='text' className='form-control email w-75' placeholder='Email...'/>
     
      <button type='submit' className='btn btn-success ms-4 '>
     share App Link
     </button>
      </div>


      </div>
    
      </>
  )
}
