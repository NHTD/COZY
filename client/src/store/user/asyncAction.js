import {createAsyncThunk} from '@reduxjs/toolkit'
import * as apis from '../../apis'

export const getOne = createAsyncThunk('user/getOne', async(data, {rejectWithValue}) => {
    const response = await apis.apiGetOne()

    if(!response.status){
        return rejectWithValue(response)
    }
    
    return response.msg
})