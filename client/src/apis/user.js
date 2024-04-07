import axios from '../axios'

export const apiRegister = (data) => axios({
    url: '/user/register',
    method: 'post',
    data
})

export const apiLogin = (data) => axios({
    url: '/user',
    method: 'post',
    data
})

export const apiGetOne = () => axios({
    url: '/user/getOne',
    method: 'get'
})

export const apiForgotPassword = (data) => axios({
    url: '/user/forgotPassword',
    method: 'post',
    data
})

export const apiResetPassword = (data) => axios({
    url: '/user/resetPassword',
    method: 'put',
    data
})

export const apiGetAllUsers = (params) => axios({
    url: '/user/',
    method: 'get',
    params
})

export const apiUpdateUserByAdmin = (data, uid) => axios({
    url: '/user/'+uid,
    method: 'put',
    data
})

export const apiDeleteUserByAdmin = (uid) => axios({
    url: '/user/'+uid,
    method: 'delete'
})

export const apiUpdateUser = (data) => axios({
    url: '/user/updateuser',
    method: 'put',
    data
})
