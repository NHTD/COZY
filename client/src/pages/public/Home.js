import React, { useState } from 'react'
import logo from '../../assets/bg.jpg'
import { Link } from 'react-router-dom'
import { TiTick } from "react-icons/ti";
import { Course } from '../../components';
import Login from './Login';

const Home = () => {

  return (
    <div className='w-full relative'>
      {/* <Login/> */}
      <img 
        src={logo}
        alt='logo'
        className='w-full h-full object-cover'
      />
      
      <div className="absolute top-0 text-white right-0 bottom-0 left-[250px] text-center flex flex-col w-[1032px] h-[355px] justify-between mt-[115px]" >
          <h1 className='text-6xl h-[143px]'>28Tech - Become A Better Developer</h1>
          <p className='text-lg h-[52px]'>28Tech là đơn vị cung cấp những khóa học chất lượng cao về lập trình với mục tiêu lớn nhất là giúp các bạn sinh viên IT phát triển kiến thức, sự nghiệp !</p>
          <div className='flex gap-6 justify-center text-lg font-medium'>
            <Link className='w-[171px] h-[60px] bg-[#00ADEF] rounded-md hover:bg-[#001C66] pt-[15px] hover:animate-slide-top text-white no-underline'>Các khóa học</Link>
            <Link className='w-[212px] h-[60px] bg-[#FFF] text-black rounded-md hover:bg-[#00ADEF] hover:text-white pt-[15px] hover:animate-slide-top no-underline'>Zalo: 0903566477</Link>
          </div>
      </div>

      <div className='bg-[#F6FCFF] min-h-[355px] flex justify-center pt-[80px] pb-[80px]'>
        <Course/>
      </div>

      <div className='w-full min-h-[698px] py-[80px]'>
        <div className='relative'>
          <img src='https://cdn-main.28tech.com.vn/media/core/background/advisor-bg.svg' alt='logo' className='w-[729px] h-[447px]'/>
          <div className='flex flex-column'>
            <div className='absolute min-h-[538px] top-[-90px] left-[180px] '>
              <img src='https://cdn-main.28tech.com.vn/media/anh-khoa-hoc/lo_trinh_khoa_hoc/dai_dien1.png' alt='logo'/>
            </div>
            <div className='w-[637px] absolute right-[50px] top-0'>
                <h1 className='text-[40px] text-[#001C66] font-bold mb-[20px] h-[49px] flex items-center'>Về Cozy</h1>
                <div className='text-[#6B7385] text-[17px] mb-[24px]'>
                  <p>28Tech là một đội nhóm gồm các Lập trình viên hiện đang làm việc ở nhiều lĩnh vực khác nhau nhưng có chung niềm đam mê với giảng dạy và chia sẻ kiến thức.</p>
                  <br/><br/>
                  <p>28Tech luôn cố gắng đổi mới, trau dồi kỹ năng, đón nhận đóng góp, khắc phúc những điểm chưa tốt để mang đến cho các bạn học viên những khóa học lập trình với chất lượng cao nhất</p>
                </div>
                <div className='text-[17px] text-[0A033C] font-medium'>
                  <ul>
                    <li className='mt-[10px] mb-[16px] flex h-[40px] items-center'>
                      <span className='w-[40px] h-[40px] flex justify-center items-center text-[#00ADEF] text-[25px]'><TiTick/></span>
                      Giảng viên giàu kinh nghiệm
                    </li>
                    <li className='mt-[10px] mb-[16px] flex h-[40px] items-center'>
                      <span className='w-[40px] h-[40px] flex justify-center items-center text-[#00ADEF] text-[25px]'><TiTick/></span>
                      Bài giảng và bài tập chất lượng
                      </li>
                  </ul>
                </div>
            </div>
          </div>
        </div>
      </div>
      <div className='min-h-[815px] flex justify-center bg-[#F6FCFF] py-[80px]'>
        <div className='w-[1305px]'>
          <h1 className='text-[35px] font-semibold h-[114px] text-center'>Tại sao bạn nên học với Cozy</h1>
          <div className='flex'>
            <div className='w-[638px] h-[538px] flex justify-center items-center'>
              <img src='https://cdn-main.28tech.com.vn/media/anh-khoa-hoc/lo_trinh_khoa_hoc/dai_dien2.png' alt='logo'/>
            </div>
            <div className='w-[652px] flex flex-wrap'>
              <div className='flex w-[637px] h-[150px] p-[20px] bg-[#FFF] rounded-xl'>
                <div className='w-[110px] h-[110px] bg-[#DEF5FD] flex justify-center items-center mr-[20px] rounded-3xl'>
                  <img src='https://cdn-main.28tech.com.vn/media/core/icons/chat-luong-cao.png' alt='logo'  className='w-[70px] h-[70px]'/>
                </div>
                <div className='w-[500px] flex flex-col justify-center'>
                  <h1 className='text-[20px] font-bold mb-[15px] text-main-text'>Chất lượng cao</h1>
                  <span className='text-[#637B85] text-[14px]'>Nội dung của khóa học được đầu tư cả về chất và lượng, giáo viên có kinh nghiệm và cực kỳ tâm huyết với công việc giảng dạy.</span>
                </div>
              </div>
              <div className='flex w-[637px] h-[150px] p-[20px] bg-[#FFF] rounded-xl'>
                <div className='w-[110px] h-[110px] bg-[#DEF5FD] flex justify-center items-center mr-[20px] rounded-3xl'>
                  <img src='https://i1-vnexpress.vnecdn.net/2020/02/18/hoc-tieng-anh-7655-1581994665.jpg?w=1020&h=0&q=100&dpr=1&fit=crop&s=WkLf_PpED_S8kpLg-dm8Uw' alt='logo'  className='w-[70px] h-[70px]'/>
                </div>
                <div className='w-[500px] flex flex-col justify-center'>
                  <h1 className='text-[20px] font-bold mb-[15px] text-main-text'>Cung cấp nhiều kỹ năng quan trọng</h1>
                  <span className='text-[#637B85] text-[14px]'>Nội dung của khóa học được đầu tư cả về chất và lượng, giáo viên có kinh nghiệm và cực kỳ tâm huyết với công việc giảng dạy.</span>
                </div>
              </div>
              <div className='flex w-[637px] h-[150px] p-[20px] bg-[#FFF] rounded-xl'>
                <div className='w-[110px] h-[110px] bg-[#DEF5FD] flex justify-center items-center mr-[20px] rounded-3xl'>
                  <img src='https://png.pngtree.com/png-clipart/20210310/original/pngtree-blond-foreign-teacher-foreign-teacher-english-class-png-image_5923278.jpg' alt='logo'  className='w-[70px] h-[70px]'/>
                </div>
                <div className='w-[500px] flex flex-col justify-center'>
                  <h1 className='text-[20px] font-bold mb-[15px] text-main-text'>Bước chuẩn bị vững chắc của một lập trình viên</h1>
                  <span className='text-[#637B85] text-[14px]'>Nội dung của khóa học được đầu tư cả về chất và lượng, giáo viên có kinh nghiệm và cực kỳ tâm huyết với công việc giảng dạy.</span>
                </div>
              </div>
            </div>
          </div>
        </div> 
      </div>
    </div>
  ) 
}

export default Home