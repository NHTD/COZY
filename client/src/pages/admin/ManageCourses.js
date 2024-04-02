import React, { useCallback, useEffect, useState } from 'react'
import { InputForm, Pagination } from '../../components'
import { useForm } from 'react-hook-form'
import { apiGetCourses, apiDeleteCourse } from '../../apis'
import moment from 'moment'
import { useSearchParams } from 'react-router-dom'
import  useDebounce  from '../../hooks/useDebounce'
import UpdateCourse from './UpdateCourse'
import {toast} from 'react-toastify'

const ManageCourse = () => {

  const [courses, setCourses] = useState(null)
  const [counts, setCounts] = useState(0)
  const [editCourse, setEditCourse] = useState(null)
  const [update, setUpdate] = useState(false)

  const [params] = useSearchParams()

  const render = useCallback(() => {
    setUpdate(!update)
  })

  const {register, formState: {errors}, handleSubmit, reset, watch} = useForm()

  const fetchCourses = async (params) => {
    const response = await apiGetCourses({...params, limit: process.env.REACT_APP_LIMIT})
    if(response.status){
      setCounts(response.counts)
      setCourses(response.mes)
    }
  }

  const queryDebounce = useDebounce(watch('q'), 800)

  useEffect(() => {
    const searchParams = Object.fromEntries([...params])
    if(queryDebounce){
      searchParams.q = queryDebounce
    }
    fetchCourses(searchParams)
  }, [params, queryDebounce, update])

  const handleDeleteCourse = async (cid) => {
    const deleteCourse = await apiDeleteCourse(cid)
    if(deleteCourse.status){
      toast.success(deleteCourse.mes)
      render()
    }else{
      toast.error(deleteCourse.mes)
    }
  }

  return (
    <div className='w-full flex flex-col gap-4 relative'>
      {editCourse && <div className='absolute inset-0 min-h-screen bg-gray-100 z-50'>
        <UpdateCourse 
          editCourse={editCourse} 
          render={render}
          setEditCourse={setEditCourse}
        />
      </div>}
      <div className='h-[69px] w-full'></div>
      <div className='px-4 border-b w-full bg-gray-100 flex justify-between items-center fixed top-0'>
        <h1 className='text-3xl font-bold tracking-tight'>Manage courses</h1>
      </div>
      <div className='flex w-full justify-start items-center px-4'>
        <form className='w-[45%]'>
          <InputForm
            id='q'
            register={register}
            errors={errors}
            fullWidth
            placeholder='Search courses...'
          />
        </form>
      </div>
      <table className='table-auto'>
        <thead>
          <tr className='border bg-main text-white py-2'>
            <th className='text-center py-2'>#</th>
            <th className='text-center py-2'>Course name</th>
            <th className='text-center py-2'>Title</th>
            <th className='text-center py-2'>Description</th>
            <th className='text-center py-2'>Start day</th>
            <th className='text-center py-2'>Image</th>
            <th className='text-center py-2'>Course length</th>
            <th className='text-center py-2'>Price</th>
            <th className='text-center py-2'>Created at</th>
            <th className='text-center py-2'>Action</th>
          </tr>
        </thead>
        <tbody>
          {courses?.map((course, index) => (
            <tr className='border-b' key={course._id}>
              <td className='text-center'>{index+1}</td>
              <td className='text-center'>{course.course_name}</td>
              <td className='text-center'>{course.title}</td>
              <td className='text-center w-1/5'>{course.des}</td>
              <td className='text-center'>{course.start_date}</td>
              <td className='text-center'>
                <img src={course.image} alt='img' className='w-12 h-12 object-cover'/>
              </td>
              <td className='text-center'>{course.course_length}</td>
              <td className='text-center'>{course.price}</td>
              <td className='text-center'>{moment(course.createdAt).format('DD/MM/YYYY')}</td>
              <td className='text-center'>
                <span onClick={() => setEditCourse(course)} className='hover:underline cursor-pointer px-1'>Edit</span>
                <span onClick={() => handleDeleteCourse(course._id)} className='hover:underline cursor-pointer px-1'>Remove</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='w-full flex justify-end my-8'>
        <Pagination totalCount={counts}/>
      </div>
    </div>
  )
}

export default ManageCourse