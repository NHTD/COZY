import {createAsyncThunk} from '@reduxjs/toolkit'
import * as apis from '../../apis'

export const getCourses = createAsyncThunk('course/courses', async(data, {rejectWithValue}) => {
    const response = await apis.apiGetCourses()

    if(!response.success){
        return rejectWithValue(response)
    }

    return response
})