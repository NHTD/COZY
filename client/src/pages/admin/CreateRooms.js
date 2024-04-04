import React, {useState, useEffect} from 'react'
import { InputForm, Button, Select } from '../../components'
import { useForm } from 'react-hook-form'
import { apiCreateCourse, apiCreateRooms, apiGetCourses, apiGetSchedules, apiGetAllUsers } from '../../apis'
import {toast} from 'react-toastify'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CreateCourses = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [courses, setCourses] = useState(null)
  const [users, setUsers] = useState(null)

  const {register, formState: {errors}, reset, handleSubmit, watch} = useForm()

  const fetchUsers = async () => {
    const response = await apiGetAllUsers()
    console.log(response)
    if(response.success){
      setUsers(response.users)
    }
  }
  
  useEffect(() => {
    fetchUsers()
  }, []) 

  const fetchCourses = async () => {
    const response = await apiGetCourses()
    if(response.status){
      setCourses(response.mes)
    }
  }

  useEffect(() => {
    fetchCourses()
  }, [])

  const handleCreateRoom = async (data) => {
    const response = await apiCreateRooms(data)
    console.log(response)
    if(response.status){
      toast.success(response.mes)
    }else{
      toast.success(response.mes)
    }
  }
  
  const filteredUsers = users?.filter(user => +user?.role === 2);
  return (
    <div className='w-full'>
      <h1 className='h-[75px] flex justify-between items-center text-3xl font-bold px-4 border-b'>
        <span>Create New Room</span>
      </h1>
      <div className='p-4'>
        <form onSubmit={handleSubmit(handleCreateRoom)}>
          <div className='w-full my-6 flex gap-4'>
            <InputForm
              label='Room name'
              register={register}
              errors={errors}
              id='room_name'
              validate={{
                required: 'Need fill this field'
              }}
              fullWidth={true}
              placeholder='Room name'
              style='flex-auto'
            />
            <InputForm
              label='Capacity'
              register={register}
              errors={errors}
              id='capacity'
              validate={{
                required: 'Need fill this field'
              }}
              fullWidth={true}
              placeholder='Capacity'
              style='flex-auto'
            />
            <InputForm
              label='Location'
              register={register}
              errors={errors}
              id='location'
              validate={{
                required: 'Need fill this field'
              }}
              fullWidth={true}
              placeholder='Location'
              style='flex-auto'
            />
          </div>
            <div className='mb-[20px]'>
              <Select
                label='Course'
                options={courses?.map(course => ({code: course?._id, value: course?.course_name}))}
                register={register}
                id='course'
                validate={{required: 'This field is required'}}
                errors={errors}
              />
            </div>
            <div>
              <Select
                label='Teacher'
                options={filteredUsers?.map(user => ({code: user?._id, value: `${user?.first_name} ${user?.last_name}`}))}
                register={register}
                id='uid'
                validate={{required: 'This field is required'}}
                errors={errors}
              />
            </div>
            <div className='flex w-full justify-between items-center mb-[20px]'>
             
            </div>
          
          <div className='my-6'>
            <Button
              name='Create new room'
              type='submit'
            />
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateCourses