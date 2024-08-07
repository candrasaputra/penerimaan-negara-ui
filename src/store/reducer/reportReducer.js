import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ENDPOINT, axiosBackendInstance } from "./endpoint";

const axiosInstance = axiosBackendInstance();

const initialState = {
    summarydeposites: [],
    summarybrekdowns: [],
    report: {},
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed' 
    error: null
}

export const fetchSummaryDeposite = createAsyncThunk('reports/fetchSummaryDeposite', async (year) => {
    const response = await axiosInstance.get(`${ENDPOINT.REPORT}/summary-deposite?year=${year}`)
    return response.data
});

export const fetchSummaryBreakdown = createAsyncThunk('reports/fetchSummaryBreakdown', async (payload) => {
    const response = await axiosInstance.get(`${ENDPOINT.REPORT}/summary-breakdown?year=${payload.year}&deposite_area=${payload.depositeArea}`)
    return response.data
});

const reportsSlice = createSlice({
    name: 'reports',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchSummaryDeposite.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchSummaryDeposite.fulfilled, (state, action) => {
                state.status = 'succeeded'

                state.summarydeposites = action.payload
            })
            .addCase(fetchSummaryDeposite.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })

            .addCase(fetchSummaryBreakdown.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchSummaryBreakdown.fulfilled, (state, action) => {
                state.status = 'succeeded'

                state.summarybrekdowns = action.payload
            })
            .addCase(fetchSummaryBreakdown.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export const getReportSummarydeposites = (state) => state.reports.summarydeposites;
export const getReportSummarybreakdowns = (state) => state.reports.summarybrekdowns;

export const getReportStatus = (state) => state.reports.status;
export const getReportError = (state) => state.reports.error;

export default reportsSlice.reducer
