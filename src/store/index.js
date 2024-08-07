import { configureStore } from "@reduxjs/toolkit";
import authReducer from './reducer/authReducer';
import depositeReducer from './reducer/depositeReducer';
import districtsReducer from './reducer/districtReducer';
import sourceofrevenuesReducer from './reducer/sourceOfRevenueReducer';
import usersReducer from './reducer/userReducer';

export const store = configureStore({
    reducer: {
        activeUser: authReducer,
        deposites: depositeReducer,
        districts: districtsReducer,
        sourceofrevenues: sourceofrevenuesReducer,
        users: usersReducer
    }
});