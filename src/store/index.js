import { configureStore } from "@reduxjs/toolkit";
import activeUserReducer from './reducer/authReducer';

export const store = configureStore({
    reducer: {
        activeUser: activeUserReducer
    }
});