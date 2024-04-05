import React, { memo, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { getBase64 } from '../../utils/helper';
import { InputForm, Button } from '../../components';
import {toast} from 'react-toastify'
import { apiUpdateCourse } from '../../apis';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment'


const UpdateCourse = ({editCourse, render, setEditCourse}) => {
  const {register, handleSubmit, formState:{errors}, reset, watch} = useForm()
  const [selectedDate, setSelectedDate] = useState(null);

  const [preview, setPreview] = useState({
    image: ""
  })

  const handleUpdateCourse = async (data) => {
    const formData = new FormData()
    data.image = data?.image?.length===0 ? preview.image : data.image[0]
    data.start_date = moment(selectedDate).format("DD-MM-YYYY")
    for(let i of Object.entries(data)){
      formData.append(i[0], i[1])
    }
    const response = await apiUpdateCourse(formData, editCourse._id)
    // console.log(data.image.length)
    // formData.append('image', data.image = data?.image?.length===0 ? preview.image : data.image[0])
    console.log(response)
    if(response.status){
      toast.success(response.mes)
      render()
      setEditCourse(null)
    }else{
      toast.success(response.mes)
    }
  }

  useEffect(() => {
    reset({
      course_name: editCourse?.course_name,
      title: editCourse?.title || '',
      des: editCourse?.des || '',
      start_date: editCourse?.start_date || '',
      course_length: editCourse?.course_length || '',
      price: editCourse?.price || '',
      createdAt: editCourse?.createdAt || ''
    })

    setPreview({
      image: editCourse?.image || '' 
    })
  }, [editCourse])


  const handlePreviewImage = async (file) => {
    const base64Image = await getBase64(file)
    setPreview({...preview, image: base64Image})
  }

  useEffect(() => {
    if(watch('image')){
      handlePreviewImage(watch('image')[0])
    }
  }, [watch('image')])

  return (
    <div className='w-full flex flex-col gap-4 relative'>
      <div className='h-[69px] w-full'></div>
      <div className='px-4 border-b bg-gray-100 flex justify-between items-center right-0 left-[327px] fixed top-0'>
        <h1 className='text-3xl font-bold tracking-tight'>Update courses</h1>
        <span className='hover:underline cursor-pointer' onClick={() => setEditCourse(null)}>Back</span>
      </div>
      <div className='p-4'>
        <form onSubmit={handleSubmit(handleUpdateCourse)}>
          <InputForm
            label='Course name'
            register={register}
            errors={errors}
            id='course_name'
            validate={{
              required: 'Need fill this field'
            }}
            fullWidth
            placeholder='Course name'
          />
          <div className='w-full my-6 flex gap-4'>
            <InputForm
              label='Title'
              register={register}
              errors={errors}
              id='title'
              validate={{
                required: 'Need fill this field'
              }}
              fullWidth={true}
              placeholder='Title'
              style='flex-auto'
            />  
            <InputForm
              label='Description'
              register={register}
              errors={errors}
              id='des'
              validate={{
                required: 'Need fill this field'
              }}
              fullWidth={true}
              placeholder='Description'
              style='flex-auto'
            />
            <InputForm
              label='Price'
              register={register}
              errors={errors}
              id='price'
              validate={{
                required: 'Need fill this field'
              }}
              fullWidth={true}
              placeholder='Price'
              type='number'
              style='flex-auto'
            />
            {/* <InputForm
              label='Start day'
              register={register}
              errors={errors}
              id='start_date'
              validate={{
                required: 'Need fill this field'
              }}
              fullWidth={true}
              placeholder='start_date'
              style='flex-auto'
            /> */}
            <InputForm
              label='Course length'
              register={register}
              errors={errors}
              id='course_length'
              validate={{
                required: 'Need fill this field'
              }}
              placeholder='course_length'
              // style='flex-auto'
            />
          </div>
          <h4 className='mb-[6px]'>Start day</h4>
            <DatePicker
              selected={selectedDate}
              onChange={date => setSelectedDate(date)}
              format="DD-MM-YYYY"
            />
          <div className='flex flex-col gap-2 mt-8'>
              <label className='font-semibold' htmlFor='image'>Upload image</label>
              <input 
                type='file' 
                id='image'
                {...register('image')}
                // onChange={(e) => handleFileUpload(e)}
              />
              {errors['image'] && <small className='text-xs text-red-500'>{errors['image']?.message}</small>}
          </div>
          {
            preview.image 
            &&
            <div className='my-4'>
              <img src={preview.image} alt='img' className='w-[200px] object-contain'/>
            </div>
          }
          <div className='my-6'>
            <Button
              name='Update new course'
              type='submit'
            />
          </div>
        </form>
      </div>
    </div>
  )
}

export default memo(UpdateCourse)