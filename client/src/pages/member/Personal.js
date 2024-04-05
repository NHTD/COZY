import React, { memo, useEffect } from 'react'
import {useForm} from 'react-hook-form'
import { Button, InputForm } from '../../components'
import {useSelector, useDispatch} from 'react-redux'
import moment from 'moment'
import avatar from '../../assets/avatar.png'
import { apiUpdateUser } from '../../apis'
import {toast} from 'react-toastify'
import { getOne } from '../../store/user/asyncAction'

const Personal = () => {
  const {register, formState: {errors, isDirty}, handleSubmit, reset} = useForm()

  const {current} = useSelector(state => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    reset({
      first_name: current?.first_name,
      last_name: current?.last_name,
      email: current?.email,
      address: current?.address,
      mobile: current?.mobile,
      avatar: current?.avatar,
    })
  }, [current])

  const handleUpdate = async (data) => {
    const formData = new FormData()
    if(data.avatar.length > 0){
      formData.append('avatar', data.avatar[0])
    }
    delete data.avatar

    for(let i of Object.entries(data)){
      formData.append(i[0], i[1])
    }

    const response = await apiUpdateUser(formData)
    if(response.status){
      dispatch(getOne())
      toast.success(response.msg)
    }else{
      toast.error(response.msg)
    }
  }

  return (
    <div className='w-full relative p-4'>
      <header className='text-3xl font-semibold py-4 border-b border-b-blue-200'>
        Personal
      </header>
      <form onSubmit={handleSubmit(handleUpdate)} className='w-3/5 mx-auto py-8 flex flex-col gap-4'>
        <InputForm
          label='First name'
          register={register}
          errors={errors}
          id='first_name'
          validate={{
            required: 'This fill is required'
          }}
          placeholder='First name'
        />
        <InputForm
          label='Last name'
          register={register}
          errors={errors}
          id='last_name'
          validate={{
            required: 'This fill is required'
          }}
          placeholder='Last name'
        />
        <InputForm
          label='Email'
          register={register}
          errors={errors}
          id='email'
          validate={{
            required: 'This fill is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "invalid email address"
            }
          }}
          placeholder='Email'
        />
        <InputForm
          label='Address'
          register={register}
          errors={errors}
          id='address'
          validate={{
            required: 'This fill is required'
          }}
          placeholder='address'
        />
        <InputForm
          label='Mobile'
          register={register}
          errors={errors}
          id='mobile'
          validate={{
            required: 'This fill is required',
            pattern: {
              value: /(0[3|5|7|8|9])+([0-9]{8})\b/g,
              message: 'Phone invalid'
            }
          }}
          placeholder='mobile'
        />
        <div className='flex items-center gap-2'>
          <span className='font-medium'>Account status</span>
          <span>{current?.isBlocked ? 'Blocked' : 'Actived'}</span>
        </div>
        <div className='flex items-center gap-2'>
          <span className='font-medium'>Role</span>
          <span>{+current?.role===1 ? 'Admin' : +current?.role===2 ? 'Teacher' : 'User'}</span>
        </div>
        <div className='flex items-center gap-2'>
          <span className='font-medium'>Created At</span>
          <span>{moment(current?.createdAt).fromNow()}</span>
        </div>
        <div className='flex flex-col gap-2'>
          <span className='font-medium'>Profile image</span>
          <label htmlFor='file'>
            <img src={current?.avatar || avatar} alt='avatar' className='w-20 h-20 ml-8 object-cover rounded-full'/>
          </label>
          <input type='file' id='file' {...register('avatar')} hidden/>
        </div>
        {
          isDirty 
          &&
          <div className='w-full flex justify-center'>
            <Button
              name='Update information'
              type='submit'
            />
          </div>
        }
      </form>
    </div>
  )
}

export default memo(Personal)