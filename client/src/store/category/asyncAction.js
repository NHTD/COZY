import {createAsyncThunk} from '@reduxjs/toolkit'
import * as apis from '../../apis'

export const getCategory = createAsyncThunk('category/categories', async(data, {rejectWithValue}) => {
    const response = await apis.apiGetCategories()

    if(!response.status){
        return rejectWithValue(response)
    }
    
    return response.msg
})