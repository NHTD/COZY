import React, { useEffect, useState } from 'react'
// import {useDispatch, useSelector} from 'react-redux'
// import { getCourses } from '../store/courses/asyncActions'
import { apiGetCourses, apiGetCategories } from '../apis'
import { CourseCard } from './index'
import { Link, NavLink } from 'react-router-dom'
import { apiGetSchedule } from '../apis'
import { useLocation} from 'react-router-dom'

const FeatureCourse = () => {
  const [courses, setCourses] = useState(null)
  const [categories, setCategories] = useState(null)
  // const {courses} = useSelector(state => state.course)
  // console.log(courses);
  // const navigate = useNavigate()
  const { pathname } = useLocation();

  const fetchCategories = async () => {
    const response = await apiGetCategories()
    if(response.status){
      setCategories(response.msg)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCourses = async() => {
    const response = await apiGetCourses()
    console.log(response);
    if(response.status){
      setCourses(response.mes)
    }
  }

  // const handleSubmit = (course) => {
  //   navigate(`/${course?._id}/${course?.course_name}`)
  // }

  useEffect(() => {
    fetchCourses()
  }, [])

  return (
    <div className='flex flex-wrap space-between'>
      {courses?.map(course => (
        <Link
          key={course?._id}
          // onClick={() => handleSubmit(course)}
          to={`/${course?._id}/${categories?.find(el => el?._id === course?.category)?.title}`}
        >
          <CourseCard 
            image={course?.image}
            courseName={categories?.find(el => el?._id === course?.category)?.title}
            price={course?.price}
            startDay={course?.start_date}
            courseLength={course?.course_length}
          />
        </Link>
      ))}
    </div>
  )
}

export default FeatureCourse