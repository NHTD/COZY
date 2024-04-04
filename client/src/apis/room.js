import axios from '../axios'

export const apiCreateRooms = (data) => axios({
    url: '/room/',
    method: 'post',
    data
})

export const apiGetRooms = () => axios({
    url: '/room/',
    method: 'get'
})