import React from 'react'
import {Link} from 'react-router-dom'
import FeatureCourse from './FeatureCourse'

const Course = () => {
  return (
    <div className='w-[1305px]'>
        <h1 className='text-4xl font-medium text-[#001C66] text-center'>Khóa học tại Cozy</h1>
        <div className='w-[1335px] min-h-[368px]'>
            <FeatureCourse/>
        </div>
    </div>
  )
}

export default Course