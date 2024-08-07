import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ENDPOINT, axiosBackendInstance } from "./endpoint";

const axiosInstance = axiosBackendInstance();

const initialState = {
    sourceofrevenues: [],
    sourceofrevenue: {},
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed' 
    error: null
}

export const fetchSourceofrevenues = createAsyncThunk('sourceofrevenues/fetchSourceofrevenues', async () => {
    const response = await axiosInstance.get(ENDPOINT.SOURCE_OF_REVENUE)
    return response.data
});

export const fetchSourceofrevenue = createAsyncThunk('sourceofrevenues/fetchSourceofrevenue', async (id) => {
    const response = await axiosInstance.get(`${ENDPOINT.SOURCE_OF_REVENUE}/${id}`)
    return response.data
});

export const addNewSourceofrevenue = createAsyncThunk('sourceofrevenues/addNewSourceofrevenue', async (initialPost, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post(ENDPOINT.SOURCE_OF_REVENUE, initialPost)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

const sourceofrevenuesSlice = createSlice({
    name: 'sourceofrevenues',
    initialState,
    reducers: {
        sourceofrevenueAdded: {
            reducer(state, action) {
                state.sourceofrevenues.push(action.payload);
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
            .addCase(fetchSourceofrevenues.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchSourceofrevenues.fulfilled, (state, action) => {
                state.status = 'succeeded'

                state.sourceofrevenues = action.payload
            })
            .addCase(fetchSourceofrevenues.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(fetchSourceofrevenue.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchSourceofrevenue.fulfilled, (state, action) => {
                state.status = 'succeeded'

                state.sourceofrevenue = action.payload
            })
            .addCase(fetchSourceofrevenue.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export const getAllSourceofrevenues = (state) => state.sourceofrevenues.sourceofrevenues;
export const getSinglesourceofrevenues = (state) => state.sourceofrevenues.sourceofrevenue;
export const getsourceofrevenuesStatus = (state) => state.sourceofrevenues.status;
export const getsourceofrevenuesError = (state) => state.sourceofrevenues.error;

export const { sourceofrevenueAdded } = sourceofrevenuesSlice.actions;

export default sourceofrevenuesSlice.reducer
