import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { InputForm, Select, Button } from '../../components'
import DatePicker from "react-datepicker";
import { NavLink } from 'react-router-dom';
import {Tab, Tabs} from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

// const menus = [
//   {
//     id: 1,
//     name: 'Teacher'
//   },
//   {
//     id: 2,
//     name: 'Schedule'
//   },
//   {
//     id: 3,
//     name: 'Study'
//   },
//   {
//     id: 4,
//     name: 'Exam'
//   }
// ]

const CreateRooms = () => {
  const {register, handleSubmit, watch, formState: { errors }} = useForm()
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [key, setKey] = useState('course');

  // const handleCreateRoom = (data) => {
  //   console.log(data)
  // }

  return (
    <div className='w-full'>
      <h1 className='h-[75px] flex justify-between items-center text-3xl font-bold px-4 border-b'>
        <span>Manage Room</span>
      </h1>
      <div className='flex flex-col items-center h-screen'>
        <Tabs
          id="controlled-tab-example"
          variant="solid-rounded"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mb-3 flex justify-around w-2/3"
          fill
        >
          <Tab eventKey="course" title="Course">
              <div className='w-[700px] bg-gray-100 min-h-[500px]'>
                <div className='w-full my-6'>
                  <InputForm
                    label='Course'
                    register={register}
                    errors={errors}
                    id='course'
                    validate={{
                      required: 'Need fill this field'
                    }}
                    fullWidth={true}
                    placeholder='Course'
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
                </div>
              </div>
            </Tab>  
            <Tab eventKey="teacher" title="Teacher">
              <div className='w-[700px] bg-gray-100 min-h-[500px]'>
                <div className='w-full my-6'>
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
                    // style={{color: 'red'}}
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
                </div>
              </div>
            </Tab>  
            <Tab eventKey="schedule" title="Schedule" className='text-black'>
            <div className='w-[700px] bg-gray-100 min-h-[500px]'>Schedule</div>
            </Tab>
            <Tab eventKey="study" title="Study" >
            <div className='w-[700px] bg-gray-100 min-h-[500px]'>Study</div>
            </Tab>
            <Tab eventKey="exam" title="Exam">
            <div className='w-[700px] bg-gray-100 min-h-[500px]'>Exam</div>
            </Tab>
        </Tabs>
      </div>
    </div>
  )
}

export default CreateRooms