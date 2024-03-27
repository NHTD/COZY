import React, { useState } from 'react'
import { Button } from '../../components'
import { useParams } from 'react-router-dom'
import { apiResetPassword } from '../../apis'
import {toast} from 'react-toastify'

const ResetPassword = () => {
  const [password, setPassword] = useState('')
  const { token } = useParams()

  const handleForgotPassword = async () => {
    const response = await apiResetPassword({password, token})
    if(response.status){
      toast.success(response.msg, {theme: 'colored'})
    }else{
      toast.info(response.msg, {theme: 'colored'})
    }
  }

  return (
    <div className='absolute top-0 right-0 left-0 bottom-0 bg-white flex flex-col items-center z-10'>
          <div className='flex flex-col gap-4'>
            <label htmlFor='password'>Enter your new password:</label>
            <input
              type='text'
              id='email'
              className='w-[800px] pb-2 border-b outline-none placeholder:text-sm'
              placeholder='Type here'
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <div className='flex items-center justify-end w-full gap-4'>
              <Button
                name='Submit'
                handleOnclick={handleForgotPassword}
              />
            </div>
          </div>
        </div>
  )
}

export default ResetPassword