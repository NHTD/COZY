import React, { useCallback, useEffect, useState } from 'react'
import {InputFields, Button, Modal} from '../../components'
import { apiForgotPassword, apiLogin, apiRegister } from '../../apis/user'
import Swal from 'sweetalert2'
import {useNavigate} from 'react-router-dom'
import path from '../../utils/path'
import { login } from '../../store/user/userSlice'
import {useDispatch} from 'react-redux'
import {toast} from 'react-toastify'
import { validate } from '../../utils/helper'

const Login = ({visible, onClose }) => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  

  const [isRegister, setIsRegister] = useState(false)
  const [isForgotPassword, setIsForgotPassword] = useState(false)
  const [email, setEmail] = useState('')
  

  const [payload, setPayload] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    mobile: '',
    address: ''
  })

  const [invalidFields, setInvalidFields] = useState([])

  const resetPayload = () => {
    setPayload({
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      mobile: '',
      address: ''
    })
  }



  useEffect(() => {
    resetPayload()
  }, [isRegister])


  const handleSubmit = useCallback( async () => {
    const {first_name, last_name, mobile, address, ...data} = payload

    const invalids = isRegister ? validate(payload, setInvalidFields) : validate(data, setInvalidFields)

    if(invalids === 0){
      if(isRegister){
        const response = await apiRegister(payload)
        if(response.status){
          Swal.fire('Congratulation', response.msg, 'success').then(() => {
            setIsRegister(false)
            resetPayload()
          })
        }else{
          Swal.fire('Oops', response.msg, 'error')
        }
        
      }else{
        const rs = await apiLogin(data)
        if(rs.status){
          dispatch(login({isLoggedIn: true, token: rs.accessToken}))
          // navigate(`/${path.HOME}`)
          window.location.reload();
        }else{
          Swal.fire('Oops', rs.msg, 'error')
        }
      }
    }else{

    }
  }, [payload, isRegister])

  const handleForgotPassword = async () => {
    const response = await apiForgotPassword({email})
    if(response.status){
      toast.success(response.msg, {theme: 'colored'})
    }else{
      toast.info(response.msg, {theme: 'colored'})
    }
  }

  if(!visible){
    return null;
  }

  return (
    <div className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-10'>
      <div className='w-screen h-screen relative'>
        {isForgotPassword && <div className='absolute top-0 right-0 left-0 bottom-0 bg-white flex flex-col items-center z-10'>
          <div className='flex flex-col gap-4'>
            <label className=''>Enter you gmail:</label>
            <input
              type='text'
              id='email'
              className='w-[800px] pb-2 border-b outline-none placeholder:text-sm'
              placeholder='Exp: email@gmail.com'
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <div className='flex items-center justify-end w-full gap-4'>
              <Button
                name='Submit'
                handleOnclick={handleForgotPassword}
              />
              <Button
                name='Back'
                handleOnclick={() => {
                  setIsForgotPassword(false)
                  setEmail('')
                }}
              />
            </div>
          </div>
        </div>}

        {/* <img src='https://cdn-main.28tech.com.vn/media/core/background/bg-image-10.jpg' alt='bg' className='w-full h-full object-cover'/> */}
        <div className='absolute top-0 right-0 left-0 bottom-0 flex items-center justify-center'>
          <div className='p-8 bg-white flex flex-col items-center rounded-md min-w-[500px]'>
            {/* <button onClick={onClose} className='absolute top-[200px] right-[540px]'>X</button> */}
            <span onClick={onClose} className='text-right w-full cursor-pointer hover:text-red-500'>X</span>
            <h1 className='text-[28px] font-semibold text-main mb-8'>{isRegister ? 'Register' : 'Login'}</h1>
            {isRegister && <InputFields
              value={payload.first_name}
              setValue={setPayload}
              nameKey='first_name'
              invalidFields={invalidFields}
              setInvalidFields={setInvalidFields}
            />}
            {isRegister && <InputFields
              value={payload.last_name}
              setValue={setPayload}
              nameKey='last_name'
              invalidFields={invalidFields}
              setInvalidFields={setInvalidFields}
            />}
            <InputFields
              value={payload.email}
              setValue={setPayload}
              nameKey='email'
              invalidFields={invalidFields}
              setInvalidFields={setInvalidFields}
            />
            <InputFields
              value={payload.password}
              setValue={setPayload}
              nameKey='password'
              type='password'
              invalidFields={invalidFields}
              setInvalidFields={setInvalidFields}
            />
            {isRegister && <InputFields
              value={payload.mobile}
              setValue={setPayload}
              nameKey='mobile'
              invalidFields={invalidFields}
              setInvalidFields={setInvalidFields}
            />}
            {isRegister && <InputFields
              value={payload.address}
              setValue={setPayload}
              nameKey='address'
              invalidFields={invalidFields}
              setInvalidFields={setInvalidFields}
            />}
            <Button
              name={isRegister ? 'Register' : 'Login'}
              handleOnclick={handleSubmit}
              handleOnClose={onClose}
              fw
              invalidFields={invalidFields}
              setInvalidFields={setInvalidFields}
            />

            <div className='flex items-center justify-between my-2 w-full text-sm'>
              {!isRegister && <span onClick={() => setIsForgotPassword(true)} className='text-blue-500 hover:underline cursor-pointer'>Forgot your account?</span>}
              {!isRegister && <span 
                className='text-blue-500 hover:underline cursor-pointer'
                onClick={() => setIsRegister(true)}
              >
                Create account
              </span>}
              {isRegister && <span 
                className='text-blue-500 hover:underline cursor-pointer w-full text-center'
                onClick={() => setIsRegister(false)}
              >
                Go login
              </span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login