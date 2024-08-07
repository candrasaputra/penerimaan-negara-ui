import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ENDPOINT, axiosBackendInstance } from "./endpoint";

const axiosInstance = axiosBackendInstance();

const initialState = {
    depositeareas: [],
    district: {},
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed' 
    error: null
}

export const fetchDepositeAreas = createAsyncThunk('depositeareas/fetchDepositeAreas', async () => {
    const response = await axiosInstance.get(ENDPOINT.DEPOSITE_AREA)
    return response.data
});

const depositeAreasSlice = createSlice({
    name: 'depositeareas',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchDepositeAreas.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchDepositeAreas.fulfilled, (state, action) => {
                state.status = 'succeeded'

                state.depositeareas = action.payload
            })
            .addCase(fetchDepositeAreas.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export const getAllDepositeAreas = (state) => state.depositeareas.depositeareas;
export const getSingleDepositeAreas = (state) => state.depositeareas.district;
export const getDepositeAreasStatus = (state) => state.depositeareas.status;
export const getDepositeAreasError = (state) => state.depositeareas.error;

export default depositeAreasSlice.reducer
