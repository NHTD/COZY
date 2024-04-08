import React, { useCallback, useEffect, useId, useState } from 'react'
import { apiGetAllUsers, apiUpdateUserByAdmin, apiDeleteUserByAdmin } from '../../apis/user'
import {roles, blockStatus} from '../../utils/constants'
import moment from 'moment'
import { Button, InputFields, InputForm, Select } from '../../components'
import useDebounce from '../../hooks/useDebounce'
import Pagination from '../../components/Pagination'
import { useSearchParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import {toast} from 'react-toastify'

const ManageUser = () => {

  const {handleSubmit, register, formState: {errors}, reset} = useForm({
    first_name: '',
    last_name: '',
    email: '',
    mobile: '',
    address: '',
    role: '',
    isBlocked: '',
  })

  const handleUpdate = async (data) => {
    const response = await apiUpdateUserByAdmin(data, editItems._id)
    if(response.status){
      setEditItems(null)
      render()
      toast.success(response.msg)
    }else{
      toast.error(response.msg)
    }
  }

  const handleDelete = async (uid) => {
    const response = await apiDeleteUserByAdmin(uid)
    if(response.status){
      render()
      toast.success(response.msg)
    }else{
      toast.error(response.msg)
    }
  }

  const [users, setUsers] = useState(null)
  const [queries, setQueries] = useState({
    q: ""
  })
  const [editItems, setEditItems] = useState(null)
  const [update, setUpdate] = useState(false)

  const [params] = useSearchParams()

  const render = useCallback(() => {
    setUpdate(!update)
  }, [update])

  const fetchUsers = async (params) => {
    const response = await apiGetAllUsers({...params, limit: 6})
    if(response.success){
      
      setUsers(response)
    }
  }

  const queriresDebounce = useDebounce(queries.q, 800)

  useEffect(() => {
    const queries = Object.fromEntries([...params])
    if(queriresDebounce){
      queries.q = queriresDebounce 
    }
    fetchUsers(queries)
  }, [queriresDebounce, params, update])
  console.log(editItems)

  useEffect(() => {
    if(editItems){
      reset({
        first_name: editItems.first_name,
        last_name: editItems.last_name,
        email: editItems.email,
        mobile: editItems.mobile,
        address: editItems.address, 
        role: editItems.role,
        status: editItems.isBlocked
      })
    }
  }, [editItems])

  return (
    <div className='w-full'>
      <h1 className='h-[75px] flex justify-between items-center text-3xl font-bold px-4 border-b'>
        <span>Manage Users</span>
      </h1>
      <div className='w-full p-4'>

        <div className='flex justify-end py-4'>
          <InputFields
            nameKey={'q'}
            value={queries.q}
            setValue={setQueries}
            style={'w500'}
            placeholder={'Search...'}
            isHideLabel
          />
        </div>

        <form onSubmit={handleSubmit(handleUpdate)} >
          {editItems && <Button type='submit' name='Update'/>}
          <table className='table-auto mb-6 text-left w-full'>
            <thead className='font-bold bg-gray-700 text-[13px] text-white'>
              <tr className=' border-blue-300  border'>
                <th className='px-4 py-2'>#</th>
                <th className='px-4 py-2'>First name</th>
                <th className='px-4 py-2'>Last name</th>
                <th className='px-4 py-2'>Email</th>
                <th className='px-4 py-2'>Mobile</th>
                <th className='px-4 py-2'>address</th>
                <th className='px-4 py-2'>Role</th>
                <th className='px-4 py-2'>Status</th>
                <th className='px-4 py-2'>Created at</th>
                <th className='px-4 py-2'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users?.users?.map((user, i) => (
                <tr key={user._id} className='border border-gray-500'>
                  <td className='py-2 px-4'>{i+1}</td>
                  <td className='py-2 px-4'>
                    {editItems?._id===user?._id 
                    ? 
                      <InputForm 
                        register={register} 
                        fullWidth errors={errors} 
                        // defaultValue={user.first_name} 
                        id={'first_name'} 
                        validate={{
                          required: 'Require fill'  
                        }}/> 
                    : 
                    <span>{user.first_name}</span>}
                  </td>
                  <td className='py-2 px-4'>
                    {editItems?._id===user?._id 
                    ? 
                    <InputForm 
                      register={register} 
                      fullWidth errors={errors} 
                      defaultValue={user.last_name} 
                      id={'last_name'} 
                      validate={{required: 'Require fill'}}/> 
                    : 
                    <span>{user.last_name}</span>}
                  </td>

                  <td className='py-2 px-4'>
                    {editItems?._id===user?._id 
                    ? 
                    <InputForm 
                      register={register} 
                      fullWidth errors={errors} 
                      // defaultValue={user.email} 
                      id={'email'} 
                      validate={{
                        required: 'Require fill',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "invalid email address"
                        }
                      }}/> 
                    : 
                    <span>{user?.email}</span>}
                  </td>

                  <td className='py-2 px-4'>
                    {editItems?._id===user?._id 
                    ? 
                    <InputForm 
                      register={register} 
                      fullWidth errors={errors} 
                      // defaultValue={user.mobile} 
                      id={'mobile'} 
                      validate={{
                        required: 'Require fill',
                        pattern: {
                          value: /(0[3|5|7|8|9])+([0-9]{8})\b/g,
                          message: "invalid phone number"
                        }
                      }}/> 
                    : 
                    <span>{user?.mobile}</span>}
                  </td>

                  <td className='py-2 px-4'>
                    {editItems?._id===user?._id 
                    ? 
                    <InputForm 
                      register={register} 
                      fullWidth errors={errors} 
                      // defaultValue={user.address} 
                      id={'address'} 
                      validate={{required: 'Require fill'}}/> 
                    : 
                    <span>{user?.address}</span>}
                  </td>

                  <td className='py-2 px-4'>
                    {editItems?._id===user?._id 
                    ? 
                    <Select
                      register={register} 
                      fullWidth 
                      errors={errors} 
                      defaultValue={user.role}
                      id={'role'} 
                      validate={{required: 'Require fill'}}
                      options={roles}
                    /> 
                    : 
                    <span>{user.role}</span>}
                  </td>

                  <td className='py-2 px-4'>
                    {editItems?._id===user?._id 
                    ? 
                    <Select
                      register={register} 
                      fullWidth 
                      errors={errors} 
                      defaultValue={user.isBlocked} 
                      id={'isBlocked'} 
                      validate={{required: 'Require fill'}}
                      options={blockStatus}
                    /> 
                    : 
                    <span>{user.isBlocked ? 'Blocked' : 'Active'}</span>}
                  </td>

                  <td className='py-2 px-4'>{moment(user?.createdAt).format('DD/MM/YYYY')}</td>
                  <td>
                    {editItems?._id === user?._id ? <span onClick={() => setEditItems(null)} className='px-2 text-orange hover:underline cursor-pointer'>Back</span> 
                      : <span onClick={() => setEditItems(user)} className='px-2 text-orange hover:underline cursor-pointer'>Edit</span>
                    }
                    <span onClick={() => handleDelete(user?._id)} className='px-2 text-orange hover:underline cursor-pointer'>Delete</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </form>

      </div>
      <div className='w-full m-auto my-4 flex justify-end'>
        <Pagination
          totalCount={users?.counts}
        />
      </div>
    </div>
  )
}

export default ManageUser

///(84|0[3|5|7|8|9])+([0-9]{8})\b/g