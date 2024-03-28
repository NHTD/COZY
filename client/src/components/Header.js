import React, { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import path from '../utils/path'
import Modal from './Modal'
import { Login } from '../pages/public'
import { useDispatch, useSelector } from 'react-redux'
import { getOne } from '../store/user/asyncAction'
import { IoIosLogOut } from "react-icons/io";
import { logout, clearMessage} from '../store/user/userSlice'
import Swal from 'sweetalert2'

const menus = [
    {
        id: '1',
        name: 'Trang chủ'
    },
    {
        id: '2',
        name: 'Quản lý khóa học'
    },
    {
        id: '3',
        name: 'Danh mục'
    },
    {
        id: '4',
        name: 'Lịch học'
    }
]

const Header = () => {

    const [showLogin, setShowLogin] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {isLoggedIn, current, mes} = useSelector(state => state.user)
    useEffect(() => {
        if(isLoggedIn){
            dispatch(getOne())
        }
    }, [dispatch, isLoggedIn])

    useEffect(() => {
        if(mes){
            Swal.fire('Oops!', mes, 'info').then(() => {
                navigate(`/${path.HOME}`)
                dispatch(clearMessage())
            })
        }
    }, [mes]) 

    const handleOnClose = () => {
        setShowLogin(false)
    }

  return (
    <div className='w-full bg-[#0A033C] h-[76px] pt-2.5 pb-2.5 flex justify-center items-center relative gap-8'>
        <Link to={`/${path.HOME}`} className='w-[205px] text-center'>
            <img src='https://www.cozygrammar.com/wp-content/uploads/2018/02/Cozy-Grammar-and-Hopper.webp' alt='logo' className='w-[164px] h-[56px] object-contain'/>
        </Link>

        <div className='w-[865px] text-[17px] font-medium cursor-pointer flex justify-around'>
            {menus?.map(menu =>  (
                <NavLink 
                    key={menu.id} 
                    to={menu.path} 
                    className={menu.id==='1' ? 'text-[#00ADEF]' : 'text-white hover:text-[#00ADEF]'}
                >
                    {menu.name}
                </NavLink>
            ))}
        </div> ư

        <div className='w-[205px] flex justify-center items-center gap-1'>
            
            {isLoggedIn && current
            ? <div className='w-full flex justify-center items-center gap-1'>
                <Link className='text-white text-[16px]'
                    to={+current?.role === 1 ? `/${path.ADMIN}/${path.DASHBOARD}` : +current?.role === 2 ? `/${path.TEACHER}` : `/${path.MEMBER}/${path.PERSONAL}`}
                >
                    {`${current?.last_name} ${current?.first_name}`}
                </Link>
                <span onClick={() => dispatch(logout())} className='text-white inline cursor-pointer hover-text-[700] hover:text-[#00ADEF]'><IoIosLogOut size={18}/></span>
            </div>
            : 
            <button 
                onClick={() => setShowLogin(true)}
                className='text-[16px] text-black bg-white w-[106px] h-[45px] rounded-md hover:bg-[#00ADEF] hover:text-white hover:shadow-inherit shadow-md shadow-white hover:animate-slide-top'
            >
                    Đăng ký
            </button>}
            
        </div>
        {/* <Modal /> */}
        <Login visible={showLogin} onClose={handleOnClose}/>
    </div>
  )
}

export default Header
//className='text-white inline cursor-pointer hover-text-[700] hover:text- [#00ADEF]' onClick={dispatch(logout())}