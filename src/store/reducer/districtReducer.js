import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ENDPOINT, axiosBackendInstance } from "./endpoint";

const axiosInstance = axiosBackendInstance();

const initialState = {
    districts: [],
    district: {},
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed' 
    error: null
}

export const fetchDistricts = createAsyncThunk('districts/fetchDistricts', async () => {
    const response = await axiosInstance.get(ENDPOINT.DISTRICT)
    return response.data
});

const districtsSlice = createSlice({
    name: 'districts',
    initialState,
    reducers: {
        districtAdded: {
            reducer(state, action) {
                state.districts.push(action.payload);
            },
            prepare(id, name) {
                return {
                    payload: {
                        id,
                        name
                    }
                }
            }
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchDistricts.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchDistricts.fulfilled, (state, action) => {
                state.status = 'succeeded'

                state.districts = action.payload
            })
            .addCase(fetchDistricts.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export const getAllDistricts = (state) => state.districts.districts;
export const getSingleDistricts = (state) => state.districts.district;
export const getdistrictsStatus = (state) => state.districts.status;
export const getdistrictsError = (state) => state.districts.error;

export const { districtAdded } = districtsSlice.actions;

export default districtsSlice.reducer
