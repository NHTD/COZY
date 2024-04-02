import React from 'react'
import {Outlet, Navigate} from 'react-router-dom'
import path from '../../utils/path'
import { useSelector } from 'react-redux'
import { MemberSidebar } from '../../components'

const MemberLayout = () => {
    const { isLoggedIn, current } = useSelector(state => state.user)

    if(!isLoggedIn || !current) {
        return <Navigate to={`/${path.HOME}`} replace={true}/>
    }

    console.log(current)
  return (
    <div className='flex w-full min-h-screen relative'>
        <div className='w-1/5 top-0 bottom-0 flex-none fixed'>
        <MemberSidebar />
      </div>
      <div className='w-1/5'></div>
      <div className='flex-auto w-1/3'>
        <Outlet/>
      </div>
    </div>
  )
}

export default MemberLayout