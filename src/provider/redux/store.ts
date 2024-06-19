import { configureStore, combineReducers } from '@reduxjs/toolkit'
import {SetEmail} from "@/provider/redux/SetEmail";
import {SetToken} from "@/provider/redux/SetToken";

export type RootState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
    SetEmail: SetEmail.reducer,
    SetToken: SetToken.reducer,
});

export const store = configureStore({
    reducer: rootReducer,
});