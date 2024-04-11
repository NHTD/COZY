import React, {useState, useEffect} from 'react'
import { InputForm, Button, Select } from '../../components'
import { useForm } from 'react-hook-form'
import { apiCreateSchedule, apiGetRooms } from '../../apis'
import {toast} from 'react-toastify'
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import "react-datepicker/dist/react-datepicker.css";

const CreateSchedules = () => {

  const {register, formState: {errors}, reset, handleSubmit, watch} = useForm()
  const [startHour, setTime] = useState(null);
  const [endHour, onChangeEndHour] = useState(null);
  const [rooms, setRooms] = useState(null)

  const handleCreateSchedule = async (data) => {
    const requestData = {
      date: data.date,
      room: data.room,
      start_hour: startHour,
      end_hour: endHour
    };
  
    const response = await apiCreateSchedule(requestData)
    if(response.status){
      toast.success(response.mes)
    }else{
      toast.error(response.mes)
    }
  };

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
        <span>Create New Schedule</span>
      </h1>
      <div className='p-4'>
        <form onSubmit={handleSubmit(handleCreateSchedule)}>
          <div className='w-full my-6 flex gap-4'>
            <InputForm
              label='Date'
              register={register}
              errors={errors}
              id='date'
              validate={{
                required: 'Need fill this field'
              }}
              fullWidth={true}
              placeholder='Date'
              style='flex-auto'
            />
          </div>
          <div className='flex w-full justify-between'>
            <div className='flex flex-col gap-2'>
              <span>Start hour</span> 
              <TimePicker 
                onChange={(value) => setTime(value)} 
                value={startHour} 
                className='w-[450px] h-[50px]' format='HH:mm'
              />
            </div>
            <div className='flex flex-col gap-2'>
              <span>End hour</span>
              <TimePicker onChange={onChangeEndHour} value={endHour} className='w-[450px] h-[50px]' format='HH:mm'/>
            </div>
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
              name='Create new schedule'
              type='submit'
            />
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateSchedules