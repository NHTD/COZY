import React, { useEffect, useState } from 'react'
import { Breadcrumb } from '../../components'
import { useParams } from 'react-router-dom'
import { apiGetSchedule, apiGetCourse } from '../../apis'
import { formatMoney } from '../../utils/helper'
import { BsTelephone } from "react-icons/bs";

const DetailCourse = () => {
    const { cid, course_name } = useParams()
    const { sid } = useParams()
    console.log(sid)
    const [course, setCourse] = useState(null)
    const [schedule, setSchedule] = useState(null)

    const fetchCourseData = async() => {
        const response = await apiGetCourse(cid)
        if(response.status){
            setCourse(response.mes)
        }
    }

    const fetchScheduleData = async() => {
        const response = await apiGetSchedule(sid)
        if(response.status){
            setSchedule(response.mes)
        }
    }

    useEffect(() => {
        if(cid){
            fetchCourseData()
        }
    }, [cid])

    useEffect(() => {
        if(sid){
            fetchScheduleData()
        }
    }, [sid])

  return (
    <div className='mb-[70px]'>
        <div className='w-full mb-[70px] relative'>
            <img src='https://cdn-main.28tech.com.vn/media/core/background/bg-image-10.jpg' alt='background' className='h-screen w-screen object-cover' />
            <div className='flex'>
                <div className='w-[855px] h-[467px] absolute top-[80px] left-[117px] pr-[85px]'>
                    <Breadcrumb course_name={course?.course_name}/>
                    <ul className='text-[15px]'>
                        <li>
                            <h1 className='mb-[40px] text-[50px] font-[600]'>{course?.title}</h1>
                        </li>
                        <li>
                            <p>
                                {course?.des}
                            </p>
                        </li>
                    </ul>
                </div>
                <div className='w-[404px] h-[610px] bg-white absolute top-[40px] right-[50px] flex flex-col items-center rounded-md border-solid border-[#0082C6] border-[4px]'>
                    <div className='flex justify-center py-[30px]'>
                        <img src={course?.image} alt='img' className='w-[350px] h-[197px]'/>
                    </div>
                    
                    <div className="w-[350px] min-h-[165px] flex flex-col rounded-md">
                        <header className='h-[30px] mb-[20px] text-main-text text-[20px] font-[700] leading-[30px]'>{formatMoney(course?.price)} VND</header>
                        <button className=' h-[60px] bg-black text-white px-[26px] w-[340px] rounded-lg custom-hover-right-to-left text-[16px] font-semibold'>
                            Đăng ký học
                        </button>
                        <ul className='w-[340px]'>
                            <li className='my-[10px] flex justify-between h-[36px] border-b outline-bot leading-[26px] font-medium'>
                                <span className='text-[#6B7385] font-medium'>Ngày khai giảng</span>
                                <span>{course?.start_date}</span>
                            </li>
                            <li className='my-[10px] flex justify-between h-[36px] leading-[26px] font-medium'>
                                <span className='text-[#6B7385] font-medium'>Độ dài khóa học</span>
                                <span>{course?.course_length}</span>
                            </li>
                            {/* <li className='my-[10px] flex justify-between h-[36px] leading-[26px] font-medium'>
                                <span className='text-[#6B7385] font-medium'>Giờ học</span>
                                <span>{schedule?.start_hour}</span>
                            </li> */}
                        </ul>
                    </div>

                    <footer className='bg-[#F5F5FA] w-full h-[130.5px] flex items-center justify-center p-[30px]'>
                        <div className='w-[344px] h-[80px]'>
                            <p className='w-full text-center'>Bạn cần tư vấn thêm, liên hệ với Cozy:</p>
                            <div className=' bg-[#CCC1E3] mt-[10px] w-full h-[50px] text-center leading-[50px] tracking-wider rounded-[500px]'>
                                <span><BsTelephone className='inline'/> </span>
                                <span>Zalo: </span>
                                <strong>0903566477</strong>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
        </div>
    </div>
  )
}

export default DetailCourse