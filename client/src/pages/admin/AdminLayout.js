import React from 'react'
import {Outlet, Navigate} from 'react-router-dom'
import path from '../../utils/path'
import { useSelector } from 'react-redux'
import { AdminSidebar } from '../../components'

const AdminLayout = () => {
  const { isLoggedIn, current } = useSelector(state => state.user)
  console.log(current.role)

  if(!isLoggedIn || !current || +current.role !== 1){
    return <Navigate to={`/${path.HOME}`} replace={true}/>
  }

  return (
    <div className='flex w-full min-h-screen relative'>
      <div className='w-[327px] top-0 bottom-0 flex-none fixed'>
        <AdminSidebar />
      </div>
      <div className='w-[327px]'></div>
      <div className='flex-auto'>
        <Outlet/>
      </div>
    </div>
  )
}

export default AdminLayout