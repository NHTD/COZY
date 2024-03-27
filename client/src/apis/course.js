import axios from '../axios'

export const apiGetCourses = () => axios({
    url: '/course/',
    method: 'get'
})

export const apiGetCourse = (cid) => axios({
    url: '/course/' + cid,
    method: 'get'
})