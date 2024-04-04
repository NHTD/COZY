import React from 'react'
import { formatMoney } from '../utils/helper'
import { MdOutlineCalendarToday } from "react-icons/md";

const CourseCard = ({image, courseName, price, startDay, endDay}) => {
  return (
    <div className='w-[415px] min-h-[368px] mt-[30px] hover:rounded-md px-[15px]'>
        <div className='hover:animate-shadow-drop-2-center hover:rounded-md'> 
            <img src={image} alt='logo' className='w-[415px] h-[233px] rounded-md cursor-pointer] cursor-pointer'/>
            <div className='pt-[20px] pb-[20px] pr-[25px] pl-[25px] bg-white rounded-md'>
                <h2 className='mb-[25px] text-[#a1b4eb] text-[25px] text-center font-semibold cursor-pointer'>{courseName}</h2>
                <div>
                    <ul className='text-[15px]'>
                        <li className='mx-[8px] my-[10px] flex items-center'>
                            <span className='mr-[4px]'><MdOutlineCalendarToday/></span>
                            <span className='mr-[4px]'>Ngày bắt đầu: </span> <span className='text-[#6B7385] font-semibold'>{startDay}</span>
                        </li>
                        <li className='mx-[8px] my-[10px] flex items-center'>
                            <span className='mr-[4px]'><MdOutlineCalendarToday/></span>
                            <span className='mr-[4px]'>Ngày kết thúc: </span> <span className='text-[#6B7385] font-semibold'>{endDay}</span>
                        </li>
                        <li className='mx-[8px] my-[10px] text-[#001C66] font-semibold text-[20px]'>
                            {`${formatMoney(price)} VND`}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CourseCard