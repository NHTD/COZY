import axios from '../axios'

export const apiGetCategories = () => axios({
    url: '/courseCategory/',
    method: 'get'
})