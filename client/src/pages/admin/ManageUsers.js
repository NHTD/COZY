import React, { useCallback, useEffect, useState } from 'react'
import { apiGetAllUsers } from '../../apis/user'
import {roles} from '../../utils/constants'
import moment from 'moment'
import { InputFields } from '../../components'
import useDebounce from '../../hooks/useDebounce'
import Pagination from '../../components/Pagination'
import { useSearchParams } from 'react-router-dom'

const ManageUser = () => {

  const [users, setUsers] = useState(null)
  const [queries, setQueries] = useState({
    q: ""
  })

  const [params] = useSearchParams()

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
  }, [queriresDebounce, params])
  console.log(queries)

  return (
    <div>
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

        <table className='table-auto mb-6 text-left w-full'>
          <thead className='font-bold bg-gray-700 text-[13px] text-white'>
            <tr className=' border-blue-300  border'>
              <th className='px-4 py-2'>#</th>
              <th className='px-4 py-2'>Full name</th>
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
                <td className='py-2 px-4'>{user?.first_name} {user?.last_name}</td>
                <td className='py-2 px-4'>{user?.email}</td>
                <td className='py-2 px-4'>{user?.mobile}</td>
                <td className='py-2 px-4'>{user?.address}</td>
                <td className='py-2 px-4'>{roles.find(role => role.code === +user.role)?.value}</td>
                <td className='py-2 px-4'>{user.isBlocked ? 'Blocked' : 'Active'}</td>
                <td className='py-2 px-4'>{moment(user?.createdAt).format('DD/MM/YYYY')}</td>
                <td>
                  <span className='px-2 text-orange hover:underline cursor-pointer'>Edit</span>
                  <span className='px-2 text-orange hover:underline cursor-pointer'>Delete</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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