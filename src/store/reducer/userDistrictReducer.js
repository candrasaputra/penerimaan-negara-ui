import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ENDPOINT, axiosBackendInstance } from "./endpoint";

const axiosInstance = axiosBackendInstance();

const initialState = {
    userdistricts: [],
    userdistrict: {},
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed' 
    error: null
}

export const fetchUserdistricts = createAsyncThunk('userdistricts/fetchUserdistricts', async () => {
    const response = await axiosInstance.get(ENDPOINT.USER_DISTRICT)
    return response.data
});

export const fetchUserdistrict = createAsyncThunk('userdistricts/fetchUserdistrict', async (id) => {
    const response = await axiosInstance.get(`${ENDPOINT.USER_DISTRICT}/${id}`)
    return response.data
});

export const addNewUserdistrict = createAsyncThunk('userdistricts/addNewUserdistrict', async (initialPost, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post(ENDPOINT.USER_DISTRICT, initialPost)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

const userdistrictsSlice = createSlice({
    name: 'userdistricts',
    initialState,
    reducers: {
        userdistrictAdded: {
            reducer(state, action) {
                state.userdistricts.push(action.payload);
            },
            prepare(id, district, source_of_revenue, amount, date) {
                return {
                    payload: {
                        id,
                        district,
                        source_of_revenue,
                        amount,
                        date
                    }
                }
            }
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchUserdistricts.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchUserdistricts.fulfilled, (state, action) => {
                state.status = 'succeeded'

                state.userdistricts = action.payload
            })
            .addCase(fetchUserdistricts.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(fetchUserdistrict.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchUserdistrict.fulfilled, (state, action) => {
                state.status = 'succeeded'

                state.userdistrict = action.payload
            })
            .addCase(fetchUserdistrict.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export const getAlluserdistricts = (state) => state.userdistricts.userdistricts;
export const getSingleuserdistricts = (state) => state.userdistricts.userdistrict;
export const getuserdistrictsStatus = (state) => state.userdistricts.status;
export const getuserdistrictsError = (state) => state.userdistricts.error;

export const { userdistrictAdded } = userdistrictsSlice.actions;

export default userdistrictsSlice.reducer
