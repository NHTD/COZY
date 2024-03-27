import axios from '../axios'

export const apiGetSchedules = () => axios({
    url: '/schedule/',
    method: 'get'
})

export const apiGetSchedule = (sid) => axios({
    url: '/schedule/' + sid,
    method: 'get'
})