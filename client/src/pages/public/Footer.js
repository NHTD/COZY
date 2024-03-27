import React from 'react'
import { CiLocationOn, CiMail } from "react-icons/ci";


const Footer = () => {
  return (
    <div className='w-full mt-[80px]'>
        <div className='w-full relative h-[390px] custom-bg-gradient-to-t flex justify-center'> 
          <img src='https://cdn-main.28tech.com.vn/media/core/background/subscribe-bg.svg' alt='logo' className='w-[1305px] h-full'/>

          <div className='text-[#FFF] w-[735px] h-[245px] absolute top-[80px] left-[400px] flex flex-col items-center justify-center'>
            <h3 className='text-[48px] font-semibold mb-[40px]'>Gửi yêu cầu tư vấn miễn phí</h3>
            <p className='18px mb-[40px]'>Vui lòng để lại số điện thoại, chúng tôi sẽ liên hệ tư vấn bạn trong thời gian sớm nhất.</p>
            <div className='w-[465px] h-[75px] flex items-center bg-[#FFF] rounded-xl '>
              <div className='flex flex-1 items-center'>
                <input placeholder='Số điện thoại...' className='w-full rounded-xl py-[26px] px-[20px] outline-none text-black placeholder:text-sm placeholder:text-black placeholder:opacity-50'/>
              </div>
              <div className='flex w-[145px] h-[60px] text-[16px] font-semibold justify-center mr-[6px] cursor-pointer'>
                <button className='w-full h-full rounded-lg custom-hover-right-to-left hover:bg-right'>Đăng ký</button>
              </div>
            </div>
          </div>
        </div>
        <div className='w-full h-[290px] bg-[#EFFBFF] pt-[80px] pb-[50px] flex justify-center content-between'>
          <ul className='w-[1305px] flex justify-center space-between'>
            <li className='flex flex-col w-[330px] min-h-[210px] px-[7.5px]'>
              <h3 className='mb-[15px] text-[20px] text-main-text font-bold capitalize'>28Tech - Become A Better Developer</h3>
              <div className='mb-[10px] flex items-center'>
                <span className='text-[25px] w-[30px] text-[#6B7385] font-bold'><CiLocationOn/></span>
                <span className='text-[#6B7385] text-[16px] '>TP. Đà Nẵng</span> 
              </div>
              <div className='flex items-center'>
                <span className='text-[25px] w-[30px] text-[#6B7385] font-bold'><CiMail/></span>
                <span className='text-[#6B7385] text-[16px]'>Cozy@gmail.com</span>
              </div>
            </li>
            <li className='flex flex-col w-[330px] min-h-[210px] px-[7.5px]'>
              <h3 className='mb-[15px] text-[20px] text-main-text font-bold capitalize'>Về Cozy</h3>
              <span className='text-[#6B7385] text-[16px] mb-[10px]'>Về chúng tôi</span>
              <span className='text-[#6B7385] text-[16px] mb-[10px]'>Điều khoản dịch vụ</span>
              <span className='text-[#6B7385] text-[16px]'>Chính sách bảo mật</span>
            </li>
            <li className='flex flex-col w-[330px] min-h-[210px] px-[7.5px]'>
              <h3 className='mb-[15px] text-[20px] text-main-text font-bold capitalize'>Thông tin Cozy</h3>
              <span className='text-[#6B7385] text-[16px] mb-[10px]'>Đăng ký giảng viên</span>
              <span className='text-[#6B7385] text-[16px] mb-[10px]'>Danh sách khóa học</span>
              <span className='text-[#6B7385] text-[16px] mb-[10px]'>Câu hỏi thường gặp</span>
              <span className='text-[#6B7385] text-[16px]'>Góc chia sẻ</span>
            </li>
          </ul>
        </div>
    </div>
  )
}

export default Footer

//#EFFBFF