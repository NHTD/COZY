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