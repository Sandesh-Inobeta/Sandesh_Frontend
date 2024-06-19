import { createSlice } from '@reduxjs/toolkit'

export const SetEmail = createSlice({
    name: 'SetEmail',
    initialState:{
        email: "",
    },
    reducers:{
        ChangeEmail (state, action){
            state.email = action.payload;
        }
    }
})

export const { ChangeEmail } = SetEmail.actions