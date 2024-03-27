import {createSlice} from '@reduxjs/toolkit'
import * as actions from './asyncAction'

export const scheduleSlice = createSlice({
    name: 'schedule',
    initialState: {
        schedules: null,
        isLoading: false,
        errorMessage: ''
    },
    reducers: {
        logout: (state) => {
            state.isLoading=false
        }
    },

    extraReducers: (builder) => {
        // builder.addCase(actions.getCourses.pending, (state) => {
        //     state.isLoading = true
        // })
        
        builder.addCase(actions.getSchedule.fulfilled, (state, action) => {
            state.isLoading = false
            state.courses = action.payload
        })
        
        builder.addCase(actions.getSchedule.rejected, (state, action) => {
            state.isLoading = false
            state.errorMessage=action.payload.message
        })
    }
})

export const { } = scheduleSlice.actions

export default scheduleSlice.reducer