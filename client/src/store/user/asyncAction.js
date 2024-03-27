import {createAsyncThunk} from '@reduxjs/toolkit'
import * as apis from '../../apis'

export const getOne = createAsyncThunk('user/getOne', async(data, {rejectWithValue}) => {
    const response = await apis.apiGetOne()
    console.log(response.mes);

    if(!response.status){
        return rejectWithValue(response)
    }
    
    return response.mes
})