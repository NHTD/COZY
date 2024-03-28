import React from 'react'
import {Outlet, Navigate} from 'react-router-dom'
import path from '../../utils/path'
import { useSelector } from 'react-redux'
import { Header } from '../../components'

const AdminLayout = () => {
  const { isLoggedIn, current } = useSelector(state => state.user)

  if(!isLoggedIn || current || +current.role !== 1){
    return <Navigate to={`/${path.HOME}`} replace={true}/>
  }

  return (
    <div>
      AdminLayout
      <div>
        <Outlet/>
      </div>
    </div>
  )
}

export default AdminLayout