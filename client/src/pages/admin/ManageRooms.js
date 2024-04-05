import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { InputForm, Select, Button } from '../../components'
import moment from 'moment'
import { apiGetRooms, apiGetAllUsers, apiGetCourses } from '../../apis'

const CreateRooms = () => {
  const {register, handleSubmit, watch, formState: { errors }} = useForm()
  const [rooms, setRooms] = useState(null)
  const [users, setUsers] = useState(null)
  const [courses, setCourses] = useState(null)

  const fetchApiGetUsers = async () => {
    const response = await apiGetAllUsers()
    console.log(response)
    if(response.success){
      setUsers(response.users)
    }
  }

  const fetchApiGetRooms = async () => {
    const response = await apiGetRooms()
    console.log(response)
    if(response.status){
      setRooms(response.mes)
    }
  }

  const fetchApiGetCourses = async () => {
    const response = await apiGetCourses() 
    if(response.status){
      setCourses(response.mes)
    }
  }

  useEffect(() => {
    fetchApiGetCourses()
  }, [])

  useEffect(() => {
    fetchApiGetRooms()
  }, [])

  useEffect(() => {
    fetchApiGetUsers()
  }, [])
  console.log(courses)

  return (
    <div className='w-full flex flex-col gap-4 relative'>
      <div className='h-[69px] w-full'></div>
      <div className='px-4 border-b w-full bg-gray-100 flex justify-between items-center fixed top-0'>
        <h1 className='text-3xl font-bold tracking-tight'>Manage rooms</h1>
      </div>
      <div className='flex w-full justify-start items-center px-4'>
        <form className='w-[45%]'>
          <InputForm
            id='q'
            register={register}
            errors={errors}
            fullWidth
            placeholder='Search rooms...'
          />
        </form>
      </div>
      <table className='table-auto'>
        <thead>
          <tr className='border bg-main text-white py-2'>
            <th className='text-center py-2'>#</th>
            <th className='text-center py-2'>Course name</th>
            <th className='text-center py-2'>Room name</th>
            <th className='text-center py-2'>Capacity</th>
            <th className='text-center py-2'>Location</th>
            <th className='text-center py-2'>Teacher</th>
            <th className='text-center py-2'>Action</th>
          </tr>
        </thead>
        <tbody>
          {rooms?.map((room, index) => (
            <tr className='border-b' key={room._id}>
              <td className='text-center'>{index+1}</td>
              {/* <td className='text-center cursor-pointer'>{courses?.find(course => course?._id === room?.course)}</td> */}
              <td className='text-center cursor-pointer hover:underline'>{room?.room_name}</td>
              <td className='text-center'>{room?.capacity}</td>
              <td className='text-center w-1/5'>{room?.location}</td>
              <td className='text-center'>{users?.find(user => user._id===room.teacher)?.first_name} {' '} {users?.find(user => user._id === room.teacher)?.last_name}</td>
              <td className='text-center'>
                <span className='hover:underline cursor-pointer px-1'>Edit</span>
                <span className='hover:underline cursor-pointer px-1'>Remove</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* <div className='w-full flex justify-end my-8'>
        <Pagination totalCount={counts}/>
      </div> */}
    </div>
  )
}

export default CreateRooms