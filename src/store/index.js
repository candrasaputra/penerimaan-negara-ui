import { configureStore } from "@reduxjs/toolkit";
import authReducer from './reducer/authReducer';
import depositeReducer from './reducer/depositeReducer';

export const store = configureStore({
    reducer: {
        activeUser: authReducer,
        deposites: depositeReducer
    }
});