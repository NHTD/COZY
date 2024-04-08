  import React, { useEffect, useState } from 'react'
  import { useForm } from 'react-hook-form'
  import { InputForm, Select, Button } from '../../components'
  import { Tabs } from "flowbite-react";
  import { FaBook } from "react-icons/fa";
  import { GrSchedules } from "react-icons/gr";
  import { BsHouseDoor } from "react-icons/bs";
  import { MdOutlineAssignment, MdGroup } from "react-icons/md";
  import { useParams } from 'react-router-dom';
  import { apiGetRoomById, apiGetAllUsers, apiGetCourses, apiGetSchedules, apiAddUserToRoom, apiDeleteUserFromRoom,apiGetAllStudentInRoom } from '../../apis';
  import moment from 'moment'
  import {toast} from 'react-toastify'

  const CoursesInformation = () => {
    const {register, formState: {errors, isDirty}, handleSubmit, reset} = useForm()
    const [room, setRoom] = useState(null)
    const [users, setUsers] = useState(null)
    const [courses, setCourses] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [selectedUsers, setSelectedUsers] = useState([])
    const [studentInRooms, setStudentInRooms] = useState(null)
    const [isVisible, setIsVisible] = useState(false)

    const {rid} = useParams()
    console.log(studentInRooms)

    const fetchRoomAndUsers = () => {
      return Promise.all([
        apiGetRoomById(rid),
        apiGetAllUsers(),
        apiGetCourses(),
        apiGetSchedules(),
        apiGetAllStudentInRoom(rid)
      ]);
    }

    const filterTeacher = users?.filter(user => +user?.role === 2)
    // const filterCourse = courses?.filter(course => course?._id === room?.course)
  
    useEffect(() => {
      fetchRoomAndUsers()
        .then(([roomResponse, usersResponse, coursesResponse, schedulesResponse, studentRoomResponse]) => {
          if (roomResponse.status) {
            if(coursesResponse.status){
              if(schedulesResponse.status){
                const { teacher, ...roomData } = roomResponse.mes;
                const teacherName = filterTeacher?.find(user => user?._id === teacher)?.first_name + " " + filterTeacher?.find(user => user?._id === teacher)?.last_name;
                const coursesId = coursesResponse.mes?.find(el => el?._id === roomData?.course)
                const scheduleValue = schedulesResponse.mes?.find(el => el?.room === roomData?._id)
                const resetValues = {
                  room_name: roomData?.room_name,
                  location: roomData?.location,
                  capacity: roomData?.capacity,
                  teacher: teacherName,
                  course: roomData?.course
                };
                const resetCourses = {
                  course_name: coursesId?.course_name,
                  title: coursesId?.title,
                  des: coursesId?.des,
                  start_date: coursesId?.start_date,
                  end_date: coursesId?.end_date,
                  image: coursesId?.image,
                  price: coursesId?.price
                }
                const resetSchedules = {
                  date: scheduleValue?.date,
                  start_hour: scheduleValue?.start_hour,
                  end_hour: scheduleValue?.end_hour
                }
                reset({...resetValues, ...resetCourses,  ...resetSchedules})
                setRoom(roomResponse.mes)
                setIsLoaded(true)
              }
            }
          }
          if (usersResponse.success) {
            setUsers(usersResponse.users)
            setIsLoaded(true)
          }
          if(studentRoomResponse.status){
            setStudentInRooms(studentRoomResponse.mes)
            setIsLoaded(true)
          }
        })
        .catch(error => {
          console.error("Error fetching room and users:", error);
        });
    }, [isLoaded]);
    

    // const fetchGetRoomById = async() => {
    //   const response = await apiGetRoomById(rid)
    //   if(response.status){
    //     const {teacher, course, ...roomData} = response.mes
    //     const teacherName = filterTeacher?.find(el => el?._id === teacher)?.first_name +  " " + filterTeacher?.find(el => el?._id === teacher)?.last_name
    //     const resetValues = {
    //       room_name: roomData?.room_name,
    //       location: roomData?.location,
    //       capacity: roomData?.capacity,
    //       teacher: teacherName 
    //     };
    //     reset(resetValues)
    //   }
    // }

    // const fetchAllUsers = async () => {
    //   const response = await apiGetAllUsers()
    //   if(response.success){
    //     setUsers(response.users)
    //     setIsLoaded(true)
    //   }
    // }

    // const fetchAllCourses = async () => {
    //   const response = await apiGetCourses()
    //   if(response.status){
    //     setCourses(response.mes)
    //     setIsLoaded(true)
    //   }
    // }
    // console.log(courses)

    const handleUpdate = () => {
    }

    const handleUpdateCourse = () => {
    }

    // useEffect(() => {
    //   fetchGetRoomById()
    //   fetchAllUsers()
    //   fetchAllCourses()
    // }, [isLoaded])

    // useEffect(() => {
    //   reset({
    //     course_name: courses?.course_name
    //   })
    // }, [])

    const handleUserSelect = (userId) => {
      const isSelected = selectedUsers.includes(userId);
    
      if (isSelected) {
        setSelectedUsers(selectedUsers.filter(id => id !== userId));
      } else {
        setSelectedUsers([...selectedUsers, userId]);
      }
    };
    
    const handleAddUsersToRoom = async () => {
      const userData = { userIds: selectedUsers }; 
    const response = await apiAddUserToRoom(userData, rid);
    const newUsers = users.filter(user => selectedUsers.includes(user._id));
    if(newUsers.length > 0){
      setIsVisible(true)
    }
    if (response.status) {
      const updatedStudentInRooms = [...studentInRooms, ...newUsers];
      setStudentInRooms(updatedStudentInRooms);
      setIsLoaded(true);
      toast.success(response.mes);
  } else {
      toast.error(response.mes);
  }
    };

    const handleDeleteUsersFromRoom = async() => {
      const userData = { userIds: selectedUsers }; 
      const response = await apiDeleteUserFromRoom(userData, rid)

      const updatedStudentInRooms = studentInRooms.filter(user => !selectedUsers.includes(user._id));
      if(updatedStudentInRooms.length === 0){
        setIsVisible(false)
      }
      if(response.status){
        setStudentInRooms(updatedStudentInRooms)
        setIsLoaded(true)
        toast.success(response.mes)
      }else{
        toast.error(response.mes)
      }
    }
    console.log(room)
    console.log(studentInRooms)

    return (
      <div className='w-full'>
        <h1 className='h-[75px] flex justify-between items-center text-3xl font-bold px-4 border-b'>
          <span>{room?.room_name}</span>
        </h1>
        <div className='flex flex-col items-center h-screen'>
          <Tabs aria-label="Default tabs" style="default" className='w-[1200px] flex justify-around'>
            <Tabs.Item active title="Courses" icon={FaBook}>
            <form onSubmit={handleSubmit(handleUpdateCourse)} className='w-3/5 mx-auto py-8 flex flex-col gap-4'>
                <InputForm
                  label='Course name'
                  register={register}
                  errors={errors}
                  id='course_name'
                  validate={{
                    required: 'This fill is required'
                  }}
                  placeholder='Course name'
                />
                <InputForm
                  label='Title'
                  register={register}
                  errors={errors}
                  id='title'
                  validate={{
                    required: 'This fill is required'
                  }}
                  placeholder='Title'
                />
                <InputForm
                  label='Description'
                  register={register}
                  errors={errors}
                  id='des'
                  validate={{
                    required: 'This fill is required'
                  }}
                  placeholder='Description'
                />
                <InputForm
                  label='Start day'
                  register={register}
                  errors={errors}
                  id='start_date'
                  validate={{
                    required: 'This fill is required'
                  }}
                  placeholder='Start day'
                />
                <InputForm
                  label='End day'
                  register={register}
                  errors={errors}
                  id='end_date'
                  validate={{
                    required: 'This fill is required'
                  }}
                  placeholder='End day'
                />
                {/* <InputForm
                  label='Image'
                  register={register}
                  errors={errors}
                  type='file'
                  id='image'
                  validate={{
                    required: 'This fill is required'
                  }}
                  placeholder='Image'
                /> */}
                {/* <input>
                  <img src='' alt='img'/>
                </input> */}
                <InputForm
                  label='Price'
                  register={register}
                  errors={errors}
                  id='price'
                  validate={{
                    required: 'This fill is required'
                  }}
                  placeholder='Price'
                />
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
              </form>`
            </Tabs.Item>
            <Tabs.Item title="Schedules" icon={GrSchedules}>
              <form onSubmit={handleSubmit(handleUpdate)} className='w-3/5 mx-auto py-8 flex flex-col gap-4'>
                  <InputForm
                    label='Date'
                    register={register}
                    errors={errors}
                    id='date'
                    validate={{
                      required: 'This fill is required'
                    }}
                    placeholder='Date'
                  />
                  <InputForm
                    label='Start hour'
                    register={register}
                    errors={errors}
                    id='start_hour'
                    validate={{
                      required: 'This fill is required'
                    }}
                    placeholder='Start hour'
                  />
                  <InputForm
                    label='End hour'
                    register={register}
                    errors={errors}
                    id='end_hour'
                    validate={{
                      required: 'This fill is required'
                    }}
                    placeholder='Location'
                  />
                  
                </form>
            </Tabs.Item>
            <Tabs.Item title="rooms" icon={BsHouseDoor}>
              <form onSubmit={handleSubmit(handleUpdate)} className='w-3/5 mx-auto py-8 flex flex-col gap-4'>
                <InputForm
                  label='Room name'
                  register={register}
                  errors={errors}
                  id='room_name'
                  validate={{
                    required: 'This fill is required'
                  }}
                  placeholder='Room name'
                />
                <InputForm
                  label='Capacity'
                  register={register}
                  errors={errors}
                  id='capacity'
                  validate={{
                    required: 'This fill is required'
                  }}
                  placeholder='Capacity'
                />
                <InputForm
                  label='Location'
                  register={register}
                  errors={errors}
                  id='location'
                  validate={{
                    required: 'This fill is required'
                  }}
                  placeholder='Location'
                />
                <InputForm
                  label='Teacher'
                  register={register}
                  errors={errors}
                  id='teacher'
                  validate={{
                    required: 'This fill is required'
                  }}
                  placeholder='Teacher'
                />
                
              </form>
            </Tabs.Item>
            <Tabs.Item title="users" icon={MdGroup}>
              {/* <div className="flex flex-col items-center">
                <h2 className="text-xl font-semibold mb-4">Select Users</h2>
                {users && (
                  <div className="grid grid-cols-2 gap-4">
                    {users.map((user) => (
                      <label key={user._id} className="flex items-center">
                        <input
                          type="checkbox"
                          onChange={() => handleUserSelect(user._id)}
                          checked={selectedUsers.includes(user._id)}
                        />
                        <span className="ml-2">{`${user.first_name} ${user.last_name}`}</span>
                      </label>
                    ))}
                  </div>
                )}
                <Button 
                  name='Add User'
                  handleOnclick={handleAddUsersToRoom}
                />
              </div> */}
              <form onSubmit={handleSubmit(handleAddUsersToRoom)}> 
                <table className='table-auto mb-6 text-left w-full'>
                  <thead className='font-bold bg-gray-700 text-[13px] text-white'>
                    <tr className='border border-gray-500'>
                      <th className='px-4 py-2'>#</th>
                      <th className='px-4 py-2'>First name</th>
                      <th className='px-4 py-2'>Last name</th>
                      <th className='px-4 py-2'>Email</th>
                      <th className='px-4 py-2'>Mobile</th>
                      <th className='px-4 py-2'>Address</th>
                      <th className='px-4 py-2'>Status</th>
                      <th className='px-4 py-2'>Created at</th>
                      <th className='px-4 py-2'>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users?.map((user, index) => (
                      <tr key={user._id} className='border border-gray-500'>
                        <td className='py-2 px-4'>{index+1}</td>
                        <td className='py-2 px-4'>
                          <span className='text-center'>{user?.first_name}</span>
                        </td>
                        <td className='py-2 px-4'>
                          <span>{user?.last_name}</span>
                        </td>
                        <td className='py-2 px-4'>
                          <span>{user?.email}</span>
                        </td>
                        <td className='py-2 px-4'>
                          <span>{user?.mobile}</span>
                        </td>
                        <td className='py-2 px-4'>
                          <span>{user?.address}</span>
                        </td>
                        <td className='py-2 px-4'>
                          <span>{user.isBlocked ? 'Blocked' : 'Active'}</span>
                        </td>
                        <td className='py-2 px-4'>
                          <span>{moment(user?.createdAt).format('DD-MM-YYYY')}</span>
                        </td>
                        <td className='py-2 px-4'>
                          <input
                            type="checkbox"
                            onChange={() => handleUserSelect(user._id)}
                            checked={selectedUsers.includes(user._id)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {
                  selectedUsers.length!==0
                  && 
                  <Button 
                    name='Add User'
                    handleOnclick={handleAddUsersToRoom}
                    type='Submit'
                  />
                }
                {
                  selectedUsers.length!==0
                  && 
                  <Button 
                    name='Delete User'
                    handleOnclick={handleDeleteUsersFromRoom}
                    type='Submit'
                  />
                }
              </form>
              {
                isVisible
                &&
                <table className='table-auto mb-6 text-left w-full'>
                  <thead className='font-bold bg-gray-700 text-[13px] text-white'>
                    <tr className='border border-gray-500'>
                      <th className='px-4 py-2'>#</th>
                      <th className='px-4 py-2'>First name</th>
                      <th className='px-4 py-2'>Last name</th>
                      <th className='px-4 py-2'>Email</th>
                      <th className='px-4 py-2'>Mobile</th>
                      <th className='px-4 py-2'>Address</th>
                      <th className='px-4 py-2'>Status</th>
                      <th className='px-4 py-2'>Created at</th>
                    </tr>
                  </thead>
                  <tbody>
                    {studentInRooms?.map((user, index) => (
                      <tr key={user._id} className='border border-gray-500'>
                        <td className='py-2 px-4'>{index+1}</td>
                        <td className='py-2 px-4'>
                          <span className='text-center'>{user?.first_name}</span>
                        </td>
                        <td className='py-2 px-4'>
                          <span>{user?.last_name}</span>
                        </td>
                        <td className='py-2 px-4'>
                          <span>{user?.email}</span>
                        </td>
                        <td className='py-2 px-4'>
                          <span>{user?.mobile}</span> 
                        </td>
                        <td className='py-2 px-4'>
                          <span>{user?.address}</span>
                        </td>
                        <td className='py-2 px-4'>
                          <span>{user.isBlocked ? 'Blocked' : 'Active'}</span>
                        </td>
                        <td className='py-2 px-4'>
                          <span>{moment(user?.createdAt).format('DD-MM-YYYY')}</span>
                        </td>
                        
                      </tr>
                    ))}
                  </tbody>
                </table>
              }
             
            </Tabs.Item>
            <Tabs.Item title="assignments" icon={MdOutlineAssignment}>
              This is <span className="font-medium text-gray-800 dark:text-white">Contacts tab's associated content</span>.
              Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to
              control the content visibility and styling.
            </Tabs.Item>
        </Tabs>
        </div>
      </div>
    )
  }

  export default CoursesInformation