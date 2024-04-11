import React, { Fragment, memo, useState } from 'react'
import { memberSidebar } from '../utils/constants'
import { NavLink } from 'react-router-dom'
import clsx from 'clsx'
import { AiOutlineCaretDown, AiOutlineCaretRight } from "react-icons/ai";
import { Link } from 'react-router-dom';
import path from '../utils/path';
import {useSelector} from 'react-redux'
import avatar from '../assets/avatar.png'
 
const activedStyle = 'px-4 py-2 flex items-center gap-2 bg-[#05ADEF]'
const notActivedStyle = 'px-4 py-2 flex items-center gap-2 hover:bg-[#05ADEF]'

const TeacherSidebar = () => {

  const {current} = useSelector(state => state.user)  
  const [actived, setActived] = useState([])

  const handleShowTabs = (tabId) => {
    if(actived.some(el => el === tabId)){
      setActived(prev => prev.filter(el => el!==tabId))
    }else{
      setActived(prev => [...prev, tabId])
    }
  }

  return (
    <div className=' bg-main h-full py-4'>
      <div className='flex justify-center flex-col p-4 gap-2 items-centerw-full'>
        <div >
          <img src={current.avatar || avatar} alt='logo' className='w-16 h-16 object-contain rounded-[50%]'/>
          <small>{`${current?.last_name} ${current?.first_name}`}</small>
        </div>
      </div>
      <div className='text-white'>
        {memberSidebar.map(el => (
          <Fragment key={el.id}>
            {el.type === 'single' && 
            <NavLink
              to={el.path}
              className={({isActive}) => clsx(isActive && activedStyle, !isActive && notActivedStyle)}
            >
              <span>{el.icon}</span> 
              <span>{el.text}</span> 
            </NavLink>}

            {el.type === 'parent' 
            &&
            <div className='flex gap-2 flex-col' onClick={() => handleShowTabs(el.id)}>
              <div className='flex items-center justify-between gap-2 px-4 py-2 hover:bg-[#05ADEF] cursor-pointer'>
                <div className='flex items-center gap-2'>
                  <span>{el.icon}</span>  
                  <span>{el.text}</span>
                </div>  
                {actived.some(id => id === el.id) ? <AiOutlineCaretDown/> : <AiOutlineCaretRight/>}
              </div>
              {
                actived.some(id => id === el.id)
                &&
                <div 
                  className='flex flex-col'
                >
                  {el.submenu.map(item => (
                    <NavLink 
                      key={el.text} 
                      to={item.path}
                      onClick={e => e.stopPropagation()}
                      className={({isActive}) => clsx(isActive && activedStyle, !isActive && notActivedStyle, 'pl-10')}
                    >
                      {item.text}
                    </NavLink>
                  ))}
                </div>
              }
            </div>}
          </Fragment>
        ))}
      </div>
    </div>
  )
}

export default memo(TeacherSidebar)