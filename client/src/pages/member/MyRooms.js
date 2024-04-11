import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { apiGetUserInRoom, apiGetCourses, apiGetAllUsers } from '../../apis';
import moment from 'moment';
import {  useNavigate  } from 'react-router-dom';
import path from '../../utils/path';

const MyRooms = () => {
  const { current } = useSelector(state => state.user);
  const [userInRoom, setUserInRoom] = useState(null);
  const [courses, setCourses] = useState(null);
  const [users, setUsers] = useState(null);

  const navigate = useNavigate();

  const fetchData = () => {
    return Promise.all([
      apiGetUserInRoom(),
      apiGetCourses(), 
      apiGetAllUsers()
    ]);
  };
  console.log(userInRoom);

  useEffect(() => {
    fetchData()
      .then(([getUserInRoomResponse, getCoursesResponse, getALlUserResponse]) => {
        if(getUserInRoomResponse.status){
          setUserInRoom(getUserInRoomResponse.mes);
        }
        if(getCoursesResponse.status){
          setCourses(getCoursesResponse.mes);
        }
        if(getALlUserResponse.status){
          setUsers(getALlUserResponse.mes);
        }
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  },[]);

  const handleRoomClick = rid => {
    navigate(`/${path.MEMBER}/${'my-schedule'}/${rid}`);
  };

  const getCourse = userInRoom?.map(room => {
    const course = courses?.find(course => course._id === room.course);
    console.log(course);
    return { ...room, course };
  });
  console.log(getCourse);
  

  return (
    <div className='w-full'>
      <h1 className='h-[75px] flex justify-between items-center text-3xl font-bold px-4 border-b bg-gray-200 text-black'>
        <span>My rooms</span>
      </h1>
      <div>
      <table className='table-auto mb-6 text-left w-full'>
          <thead className='font-bold bg-gray-700 text-[13px] text-white'>
            <tr className='border border-gray-500'>
              <th className='px-4 py-2'>#</th>
              <th className='px-4 py-2'>Room name</th>
              <th className='px-4 py-2'>Capacity</th>
              <th className='px-4 py-2'>Location</th>
              <th className='px-4 py-2'>Course name</th>
              <th className='px-4 py-2'>Created at</th>
            </tr>
          </thead>
          <tbody>
            {getCourse?.map((room, index) => (
              <tr key={room._id} className='border border-gray-500'>
                <td className='py-2 px-4'>{index+1}</td>
                <td className='py-2 px-4'>
                  {/* Sử dụng hàm xử lý sự kiện khi click */}
                  <span 
                    className='text-center'
                    onClick={() => handleRoomClick(room._id)}
                    style={{ cursor: 'pointer' }}
                  >
                    {room?.room_name}
                  </span>
                </td>
                <td className='py-2 px-4'>
                  <span>{room?.capacity}</span>
                </td>
                <td className='py-2 px-4'>
                  <span>{room?.location}</span>
                </td>
                <td className='py-2 px-4'>
                  <span>{room?.course?.course_name}</span>
                </td>
                <td className='py-2 px-4'>
                  <span>{moment(room?.createdAt).format('DD-MM-YYYY')}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyRooms;
