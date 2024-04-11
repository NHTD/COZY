import React, { useEffect, useState } from 'react'
import { Tabs } from "flowbite-react";  
import { GrSchedules } from "react-icons/gr";
import { MdOutlineAssignment } from "react-icons/md";
import { Link, useParams } from 'react-router-dom';
import { apiGetSchedules, apiGetAllAssignmentInRoom } from '../../apis';
import path from '../../utils/path';

const MySchedule = () => {
  const {rid} = useParams()
  const [schedules, setSchedules] = useState(null)
  const [assignmentsRoom, setAssignmentsRoom] = useState(null)

  const fetchData = () => {
    return Promise.all([
      apiGetSchedules(),
      apiGetAllAssignmentInRoom(rid)
    ]);
  }
  
  useEffect(() => {
    fetchData()
      .then(([getSchedulesResponse, getAllAssignmentInRoomResponse])=> {
        if(getSchedulesResponse.status){
          setSchedules(getSchedulesResponse.mes)
        }
        if(getAllAssignmentInRoomResponse.status){
          setAssignmentsRoom(getAllAssignmentInRoomResponse.mes)
        }
      })
  },[])

  console.log(assignmentsRoom)

  const getSchedule = schedules?.filter(el => el?.room === rid);
  console.log(getSchedule)

  return (
    <div className='w-full'>
      <h1 className='h-[75px] flex justify-between items-center text-3xl font-bold px-4 border-b bg-gray-200 text-black'>
        <span>My schedule</span>
      </h1>
      <div className='flex flex-col items-center h-screen'>
          <Tabs aria-label="Default tabs" style="default" className='w-[1200px] flex justify-around'>
            
            <Tabs.Item title="Schedules" icon={GrSchedules}>
                <table className='table-auto mb-6 text-left w-full'>
                  <thead className='font-bold bg-gray-700 text-[13px] text-white'>
                    <tr className='border border-gray-500'>
                      <th className='px-4 py-2'>#</th>
                      <th className='px-4 py-2'>date</th>
                      <th className='px-4 py-2'>start_hour</th>
                      <th className='px-4 py-2'>end_hour</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getSchedule?.map((schedule, index) => (
                      <tr key={schedule._id} className='border border-gray-500'>
                        <td className='py-2 px-4'>{index+1}</td>
                        <td className='py-2 px-4'>
                          <span className='text-center'>{schedule?.date}</span>
                        </td>
                        <td className='py-2 px-4'>
                          <span>{schedule?.start_hour}</span>
                        </td>
                        <td className='py-2 px-4'>
                          <span>{schedule?.end_hour}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
            </Tabs.Item>
            <Tabs.Item title="assignments" icon={MdOutlineAssignment}>
              <table className='table-auto mb-6 text-left w-full'>
                  <thead className='font-bold bg-gray-700 text-[13px] text-white'>
                    <tr className='border border-gray-500'>
                      <th className='px-4 py-2'>#</th>
                      <th className='px-4 py-2'>Assignment name</th>
                      <th className='px-4 py-2'>Description</th>
                      <th className='px-4 py-2'>Deadline</th>
                    </tr>
                  </thead>
                  <tbody>
                    {assignmentsRoom?.map((assignment, index) => (
                      <tr key={assignment._id} className='border border-gray-500'>
                        <td className='py-2 px-4'>{index+1}</td>
                        <td className='py-2 px-4'>
                          <Link 
                            to={`/member/my-submit/${assignment._id}`}
                            className='text-center'
                          >
                            {assignment?.assignment_name}
                          </Link>
                        </td>
                        <td className='py-2 px-4'>
                          <span>{assignment?.description}</span>
                        </td>
                        <td className='py-2 px-4'>
                          <span>{assignment?.deadline}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
            </Tabs.Item>
        </Tabs>
        </div>
    </div>
  )
}

export default MySchedule