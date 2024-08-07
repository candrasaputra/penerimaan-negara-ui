import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ENDPOINT, axiosBackendInstance } from "./endpoint";

const axiosInstance = axiosBackendInstance();

const initialState = {
    deposites: [],
    deposite: {},
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed' 
    error: null
}

export const fetchDeposites = createAsyncThunk('deposites/fetchDeposites', async () => {
    const response = await axiosInstance.get(ENDPOINT.DEPOSITE)
    return response.data
});

export const fetchDeposite = createAsyncThunk('deposites/fetchDeposite', async (id) => {
    const response = await axiosInstance.get(`${ENDPOINT.DEPOSITE}/${id}`)
    return response.data
});

export const addNewDeposite = createAsyncThunk('deposites/addNewDeposite', async (initialPost, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post(ENDPOINT.DEPOSITE, initialPost)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const updateDeposite = createAsyncThunk('deposites/updateDeposite', async (initialPost, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.patch(`${ENDPOINT.DEPOSITE}/${initialPost.id}`, initialPost.payload)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

const depositesSlice = createSlice({
    name: 'deposites',
    initialState,
    reducers: {
        depositeAdded: {
            reducer(state, action) {
                state.deposites.push(action.payload);
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
            .addCase(fetchDeposites.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchDeposites.fulfilled, (state, action) => {
                state.status = 'succeeded'

                state.deposites = action.payload
            })
            .addCase(fetchDeposites.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(fetchDeposite.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchDeposite.fulfilled, (state, action) => {
                state.status = 'succeeded'

                state.deposite = action.payload
            })
            .addCase(fetchDeposite.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export const getAllDeposites = (state) => state.deposites.deposites;
export const getSingleDeposites = (state) => state.deposites.deposite;
export const getDepositesStatus = (state) => state.deposites.status;
export const getDepositesError = (state) => state.deposites.error;

export const { depositeAdded } = depositesSlice.actions;

export default depositesSlice.reducer
