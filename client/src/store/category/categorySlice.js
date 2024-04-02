import {createSlice} from '@reduxjs/toolkit'
import {getCategory} from './asyncAction'

export const categorySlice = createSlice({
    name: 'category',
    initialState: {
        categories: null,
        isLoading: false
    },
    reducers: {
    },

    extraReducers: (builder) => {
        // builder.addCase(getCategory.pending, (state) => {
        //     state.isLoading = true
        // })
        
        builder.addCase(getCategory.fulfilled, (state, action) => {
            state.isLoading = false
            state.categories = action.payload
        })
        
        builder.addCase(getCategory.rejected, (state, action) => {
            state.isLoading = false
            state.categories=null
        })
    }
})

export const { } = categorySlice.actions

export default categorySlice.reducer