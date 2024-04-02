import axios from '../axios'

export const apiGetCourses = (params) => axios({
    url: '/course/',
    method: 'get',
    params
})

export const apiGetCourse = (cid) => axios({
    url: '/course/' + cid,
    method: 'get'
})

export const apiCreateCourse = (data) => axios({
    url: '/course/',
    method: 'post',
    data,
    headers: {
        'Content-Type': 'multipart/form-data'
    }
})

export const apiUpdateCourse = (data, cid) => axios({
    url: '/course/'+cid,
    method: 'put',
    data
})
export const apiDeleteCourse = (cid) => axios({
    url: '/course/'+cid,
    method: 'delete'
})