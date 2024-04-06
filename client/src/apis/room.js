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

export const apiUpdateRoom = (data, rid) => axios({
    url: '/room/'+rid,
    method: 'put',
    data
})

export const apiDeleteRoom = (rid) => axios({
    url: '/room/'+rid,
    method: 'delete'
})