import React from 'react'
import {Outlet} from 'react-router-dom'
import { Header } from '../../components'
import Footer from './Footer'

const Public = () => {
  return (
    <div className='w-main'>
        <Header/>
        <div className='w-full'>
            <Outlet/>
        </div>
        <Footer/>
    </div>
  )
}

export default Public