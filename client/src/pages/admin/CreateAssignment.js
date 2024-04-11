import React, { useCallback, useEffect, useState } from 'react'
import { Button, InputForm, Select } from '../../components'
import { useForm } from 'react-hook-form'
import { apiCreateAssignment, apiGetRooms } from '../../apis'
import {toast} from 'react-toastify'

const CreateAssignment = () => {
  const [rooms, setRooms] = useState(null)
  console.log(rooms)

  const {register, formState: {errors}, reset, handleSubmit} = useForm() 

  const handleCreateAssignment = async (data) => {
    const assignmentData = {
      assignment_name: data?.assignment_name,
      description: data?.description,
      deadline: data?.deadline,
      room: data?.room
    }
    const response = await apiCreateAssignment(assignmentData)
    if(response.status){
      toast.success(response.mes)
    }else{
      toast.error(response.mes)
    }
  }
  const fetchRooms = async () => {
    const response = await apiGetRooms()
    if(response.status){
      setRooms(response.mes)
    }
  }

  useEffect(() => {
    fetchRooms()
  }, [])

  return (
    <div className='w-full'>
      <h1 className='h-[75px] flex justify-between items-center text-3xl font-bold px-4 border-b bg-gray-200 text-black'>
        <span>Create New Assignment</span>
      </h1>
      <div className='p-4'>
        <form onSubmit={handleSubmit(handleCreateAssignment)}>
          <div className='w-full my-6 flex gap-4'>
            <InputForm
              label='Assignment name'
              register={register}
              errors={errors}
              id='assignment_name'
              validate={{
                required: 'Need fill this field'
              }}
              fullWidth={true}
              placeholder='Assignment name'
              style='flex-auto'
            />
            <InputForm
              label='Description'
              register={register}
              errors={errors}
              id='description'
              validate={{
                required: 'Need fill this field'
              }}
              fullWidth={true}
              placeholder='Description'
              style='flex-auto'
            />
            <InputForm
              label='Deadline'
              register={register}
              errors={errors}
              id='deadline'
              validate={{
                required: 'Need fill this field'
              }}
              fullWidth={true}
              placeholder='Deadline'
              style='flex-auto'
            />
          </div>
          <div>
            <Select
              label='Room'
              options={rooms?.map(room => ({code: room?._id, value: room?.room_name}))}
              register={register}
              id='room'
              validate={{required: 'This field is required'}}
              errors={errors}
            />
          </div>
        
          <div className='my-6'>
            <Button
              name='Create new assignment'
              type='submit'
            />
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateAssignment