import {createAsyncThunk} from '@reduxjs/toolkit'
import * as apis from '../../apis'

export const getSchedule = createAsyncThunk('schedule/schedules', async(data, {rejectWithValue}) => {
    const response = await apis.apiGetSchedule()

    if(!response.success){
        return rejectWithValue(response)
    }

    return response
})