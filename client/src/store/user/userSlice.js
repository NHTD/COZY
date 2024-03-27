import {createSlice} from '@reduxjs/toolkit'
import {getOne} from './asyncAction'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLoggedIn: false,
        current: null,
        token: null,
        isLoading: false,
        mes: ''
    },
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn
            // state.current = action.payload.userData
            state.token = action.payload.token
        },
        logout: (state, action) => {
            state.isLoggedIn = false
            state.token = null
        },
        clearMessage: (state) => {
            state.mes=''
        }
    },

    extraReducers: (builder) => {
        builder.addCase(getOne.pending, (state) => {
            state.isLoading = true
        })
        
        builder.addCase(getOne.fulfilled, (state, action) => {
            console.log(action);
            state.isLoading = false
            state.current = action.payload
            state.isLoggedIn = true 
        })
        
        builder.addCase(getOne.rejected, (state, action) => {
            state.isLoading = false
            state.current=null
            state.isLoggedIn = false
            state.token=null
            state.mes = 'Phiên đăng nhập đã hết hạn. Hãy đăng nhập lại!'
        })
    }
})

export const { login, logout, clearMessage } = userSlice.actions

export default userSlice.reducer