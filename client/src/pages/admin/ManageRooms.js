import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { InputForm, Select, Button } from '../../components'
import moment from 'moment'
import { apiGetRooms, apiGetAllUsers, apiGetCourses, apiUpdateRoom, apiDeleteRoom } from '../../apis'
import {toast} from 'react-toastify'
import { Link } from 'react-router-dom'
import path from '../../utils/path'

const CreateRooms = () => {
  const {register, handleSubmit, watch, formState: { errors }, reset} = useForm()
  const [rooms, setRooms] = useState(null)
  const [users, setUsers] = useState(null)
  const [courses, setCourses] = useState(null)
  const [editRooms, setEditRooms] = useState(false)
  const [update, setUpdate] = useState(false)

  const handleUpdate = async(data) => {
    const response = await apiUpdateRoom(data, editRooms._id)
    if(response.status){
      setEditRooms(null)
      render()
      toast.success(response.mes)
    }else{
      toast.error(response.mes)
    }
  }
  const fetchApiGetUsers = async () => {
    const response = await apiGetAllUsers()
    console.log(response)
    if(response.success){
      setUsers(response.users)
    }
  }

  const fetchApiGetRooms = async () => {
    const response = await apiGetRooms()
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
    if(editRooms){
      reset({
        room_name: editRooms?.room_name,
        capacity: editRooms?.capacity,
        location: editRooms?.location,
        teacher: editRooms?.teacher
        
      })
    }
  }, [editRooms])

  useEffect(() => {
    fetchApiGetCourses()
  }, [])
  useEffect(() => {
    fetchApiGetRooms()
  }, [update])

  useEffect(() => {
    fetchApiGetUsers()
  }, [])

  const render = useCallback(() => {
    setUpdate(!update)
  }, [update])

  const handleRemoveRoom = async(data) => {
    const response = await apiDeleteRoom(data)
    if(response.status){
      toast.success(response.mes)
      render()
    }else{
      toast.error(response.mes)
    }
  }

  const filteredUsers = users?.filter(user => +user?.role === 2)
  return (
    <div className='w-full flex flex-col gap-4'>
      <div className='h-[75px] flex justify-between items-center text-3xl font-bold px-4 border-b bg-gray-200 text-black'>
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
      
      <form onSubmit={handleSubmit(handleUpdate)}>
        <div className='pl-[14px]'>
          {editRooms && <Button type='submit' name='Update' style={'hover:bg-[#00ADEF] px-4 py-2 rounded-md text-white bg-main text-semibold my-2 hover:animate-slide-top'}/>}
        </div>
        <table className='table-auto mb-6 text-left w-full'>
          <thead>
            <tr className='border bg-main text-white py-2'>
              <th className=' py-2 px-4'>#</th>
              <th className=' py-2 px-4'>Course name</th>
              <th className=' py-2 px-4'>Room name</th>
              <th className=' py-2 px-4'>Capacity</th>
              <th className=' py-2 px-4'>Location</th>
              <th className=' py-2 px-4'>Teacher</th>
              <th className='py-2 px-4'>Action</th>
            </tr>
          </thead>
          <tbody>
            {rooms?.map((room, index) => (
              <tr className='border-b' key={room._id}>
                <td className=' py-2 px-4 '>{index+1}</td>
                <td className=' py-2 px-4 '>{courses?.find(course => course?._id === room?.course)?.course_name}</td>
                <td className='py-2 px-4'>
                  {
                    editRooms?._id === room?._id
                    ?
                    <InputForm
                      register={register} 
                      fullWidth errors={errors} 
                      // defaultValue={user.first_name} 
                      id={'room_name'} 
                      validate={{
                        required: 'Require fill'  
                      }}
                      style="flex-auto"
                    />
                    :
                    <Link 
                      className='text-main underline'
                      to={`/${path.ADMIN}/${'rooms-information'}/${room?._id}`}
                    >
                      {room?.room_name}
                    </Link>
                  }
                </td>
                <td className='py-2 px-4 '>
                  {
                    editRooms?._id === room?._id
                    ?
                    <InputForm
                      register={register} 
                      fullWidth errors={errors} 
                      // defaultValue={user.first_name} 
                      id={'capacity'} 
                      validate={{
                        required: 'Require fill'  
                      }}
                    />
                    :
                    <span className=''>{room?.capacity}</span>
                  }
                </td>
                <td className='py-2 px-4 '>
                  {
                    editRooms?._id === room?._id
                    ?
                    <InputForm
                      register={register} 
                      fullWidth errors={errors} 
                      // defaultValue={user.first_name} 
                      id={'location'} 
                      validate={{
                        required: 'Require fill'  
                      }}
                    />
                    :
                    <span className=''>{room?.location}</span>
                  }
                </td>
                <td className='py-2 px-4 '>
                  {
                    editRooms?._id === room?._id
                    ?
                    <Select
                      register={register} 
                      fullWidth 
                      errors={errors} 
                      options={filteredUsers?.map(user => ({code: user?._id, value: `${user?.first_name} ${user?.last_name}`}))}
                      // defaultValue={user.first_name} 
                      id='teacher'
                      validate={{
                        required: 'Require fill'  
                      }}
                    />
                    :
                    <span className=''>{users?.find(user => user._id===room.teacher)?.first_name} {' '} {users?.find(user => user._id === room.teacher)?.last_name}</span>
                  }
                </td>
              
                <td className=''>
                  {
                    editRooms
                    ?
                    <span onClick={() => setEditRooms(null)} className='hover:underline cursor-pointer px-1'>Back</span>
                    :
                    <span onClick={() => setEditRooms(room)} className='hover:underline cursor-pointer px-1'>Edit</span>
                  }
                  <span onClick={() => handleRemoveRoom(room?._id)} className='hover:underline cursor-pointer px-1'>Remove</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </form>
      {/* <div className='w-full flex justify-end my-8'>
        <Pagination totalCount={counts}/>
      </div> */}
    </div>
  )
}

export default CreateRooms