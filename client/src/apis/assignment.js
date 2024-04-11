import axios from "../axios";

export const apiCreateAssignment = (data) => axios({
    url: '/assignment/',
    method: 'post',
    data
})

export const apiSubmitAssignment = (data, aid) => axios({
    url: '/assignment/submit/' + aid,
    method: 'put',
    data
})