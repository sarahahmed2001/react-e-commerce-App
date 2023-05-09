import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
export default function Layout({userdata, logOut}) {

  return (<>
<Navbar userdata={userdata} logOut={logOut}  />

<Outlet/>

<Footer/>

    </> )
}
