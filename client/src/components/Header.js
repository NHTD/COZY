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
    const [isOption, setIsOption] = useState(false)
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

    useEffect(() => {
        const handleClickoutOptions = (e) => {
            const selection = document.getElementById('selection')
            if(!selection?.contains(e.target)){
                setIsOption(false)
            }
        }
        document.addEventListener('click', handleClickoutOptions)

        return () => {
            document.removeEventListener('click', handleClickoutOptions)
        }
    }, [])

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
                    className={menu.id==='1' ? 'text-[#00ADEF]  no-underline' : 'text-white hover:text-[#00ADEF]  no-underline'}
                >
                    {menu.name}
                </NavLink>
            ))}
        </div>

        <div className='w-[205px] flex justify-center items-center gap-1'>
            
            {isLoggedIn && current
            ? <div className='w-full flex justify-center items-center gap-1'>
                <div className='text-white text-[16px] relative cursor-pointer'
                    // to={+current?.role === 1 ? `/${path.ADMIN}/${path.DASHBOARD}` : +current?.role === 2 ? `/${path.TEACHER}` : `/${path.MEMBER}/${path.PERSONAL}`}
                    onClick={() => setIsOption(prev => !prev)}
                    id='selection'
                >
                    <span>{`${current?.last_name} ${current?.first_name}`}</span>
                    {
                        isOption 
                        && 
                        <div onClick={e => e.stopPropagation()} className='absolute top-[25px] left-0 bg-black border min-w-[200px] py-2 cursor-pointer flex flex-col z-50'>
                            <Link className='p-2 hover:bg-sky-100 ' to={`/${path.MEMBER}/${path.PERSONAL}`}>User</Link>
                            {
                                +current.role === 1
                                && 
                                <Link className='p-2 hover:bg-sky-100 text-white' to={`/${path.ADMIN}/${path.DASHBOARD}`}>Admin</Link>
                            }
                            <span onClick={() => dispatch(logout())} className='text-white w-full hover:bg-sky-100 inline cursor-pointer hover-text-[700] hover:text-[#00ADEF] p-2'><IoIosLogOut size={18}/></span>
                        </div>
                    }

                </div>
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
