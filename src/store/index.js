import { configureStore } from "@reduxjs/toolkit";
import authReducer from './reducer/authReducer';
import depositeReducer from './reducer/depositeReducer';
import userdistrictsReducer from './reducer/userDistrictReducer';
import sourceofrevenuesReducer from './reducer/sourceOfRevenueReducer';
import usersReducer from './reducer/userReducer';

export const store = configureStore({
    reducer: {
        activeUser: authReducer,
        deposites: depositeReducer,
        userdistricts: userdistrictsReducer,
        sourceofrevenues: sourceofrevenuesReducer,
        users: usersReducer
    }
});