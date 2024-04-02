import React, {useState, useEffect} from 'react'
import { InputForm, Button } from '../../components'
import { useForm } from 'react-hook-form'
import {useSelector, useDispatch} from 'react-redux'
import { getBase64, validate } from '../../utils/helper'
import { apiCreateCourse } from '../../apis'
import {toast} from 'react-toastify'

const CreateCourses = () => {
  const {courses} = useSelector(state => state.course)
  const dispatch = useDispatch()

  const {register, formState: {errors}, reset, handleSubmit, watch} = useForm()
  const [preview, setPreview] = useState({
    image: ""
  })

  const handleCreateCourse = async (data) => {
    const formData = new FormData()
    for(let i of Object.entries(data)){
      console.log(i[0], i[1])
      formData.append(i[0], i[1])
    }
    if(data.image){
      formData.append('image', data.image[0])
    } 
    const response = await apiCreateCourse(formData)
    if(response.status){
      toast.success(response.mes)
    }else{
      toast.success(response.mes)
    }
  }
  
  const handlePreviewImage = async (file) => {
    const base64Image = await getBase64(file)
    setPreview({...preview, image: base64Image})
  }
  // console.log(watch('image')[0])
  useEffect(() => {
    handlePreviewImage(watch('image')[0])
  }, [watch('image')])  

  // const handleFileUpload = async (e) => {
  //   const file = e.target.files[0]
  //   const base64 = await getBase64(file)
  //   setPreview({...preview, image: base64})
  // }
  // console.log(preview.image)

  return (
    <div className='w-full'>
      <h1 className='h-[75px] flex justify-between items-center text-3xl font-bold px-4 border-b'>
        <span>Create New Course</span>
      </h1>
      <div className='p-4'>
        <form onSubmit={handleSubmit(handleCreateCourse)}>
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
            <InputForm
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
            />
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
          <div className='flex flex-col gap-2 mt-8'>
              <label className='font-semibold' htmlFor='image'>Upload image</label>
              <input 
                type='file' 
                id='image'
                {...register('image', { required: 'Need fill' })}
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
              name='Create new course'
              type='submit'
            />
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateCourses