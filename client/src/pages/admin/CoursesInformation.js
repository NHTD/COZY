import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { InputForm, Select, Button } from '../../components'
import { Tabs } from "flowbite-react";
import { FaBook } from "react-icons/fa";
import { GrSchedules } from "react-icons/gr";
import { BsHouseDoor } from "react-icons/bs";
import { MdOutlineAssignment, MdGroup } from "react-icons/md";


const CoursesInformation = () => {
  return (
    <div className='w-full'>
      <h1 className='h-[75px] flex justify-between items-center text-3xl font-bold px-4 border-b'>
        <span>Rooms Information</span>
      </h1>
      <div className='flex flex-col items-center h-screen'>
        <Tabs aria-label="Default tabs" style="default" className='w-[1200px] flex justify-around'>
          <Tabs.Item active title="Courses" icon={FaBook}>
            This is <span className="font-medium text-gray-800 dark:text-white">Courses tab's associated content</span>.
            Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to
            control the content visibility and styling.
          </Tabs.Item>
          <Tabs.Item title="Schedules" icon={GrSchedules}>
            This is <span className="font-medium text-gray-800 dark:text-white">Dashboard tab's associated content</span>.
            Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to
            control the content visibility and styling.
          </Tabs.Item>
          <Tabs.Item title="rooms" icon={BsHouseDoor}>
            This is <span className="font-medium text-gray-800 dark:text-white">Settings tab's associated content</span>.
            Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to
            control the content visibility and styling.
          </Tabs.Item>
          <Tabs.Item title="users" icon={MdGroup}>
            This is <span className="font-medium text-gray-800 dark:text-white">Contacts tab's associated content</span>.
            Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to
            control the content visibility and styling.
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