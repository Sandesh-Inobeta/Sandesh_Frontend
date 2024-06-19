import { createSlice } from '@reduxjs/toolkit'

export const SetToken = createSlice({
    name: 'SetToken',
    initialState:{
        token: "",
    },
    reducers:{
        ChangeToken (state, action){
            state.token = action.payload;
        }
    }
})

export const { ChangeToken } = SetToken.actions