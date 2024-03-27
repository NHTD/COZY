import {createSlice} from '@reduxjs/toolkit'
import * as actions from './asyncAction'

export const courseSlice = createSlice({
    name: 'course',
    initialState: {
        courses: null,
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
        
        builder.addCase(actions.getCourses.fulfilled, (state, action) => {
            state.isLoading = false
            state.courses = action.payload
        })
        
        builder.addCase(actions.getCourses.rejected, (state, action) => {
            state.isLoading = false
            state.errorMessage=action.payload.message
        })
    }
})

export const { } = courseSlice.actions

export default courseSlice.reducer