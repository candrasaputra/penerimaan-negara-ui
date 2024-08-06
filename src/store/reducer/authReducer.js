import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ENDPOINT, axiosBackendInstance } from "./endpoint";

const axiosInstance = axiosBackendInstance();

const initialState = {
    data: {
        id: '',
        username: '',
        name: '',
        role: ''
    },
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed' | 'loggedout'
    error: null
}

export const fetchAuthStatus = createAsyncThunk('auth/fetchAuthStatus', async () => {
    const response = await axiosInstance.get(ENDPOINT.STATUS_URL)
    return response.data
})

export const login = createAsyncThunk('auth/login', async (payload, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post(ENDPOINT.LOGIN_URL, payload);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})

export const logout = createAsyncThunk('auth/logout', async () => {
    const response = await axiosInstance.post(ENDPOINT.LOGOUT_URL)
    return response.data
})

const auth = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setActiveUser: {
            reducer(state, action) {
                state.data = action.payload;
            },
            prepare(id, username, name, role) {
                return {
                    payload: {
                        id,
                        username,
                        name,
                        role
                    }
                }
            }
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchAuthStatus.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchAuthStatus.fulfilled, (state, action) => {
                state.status = 'succeeded'
                const loadedStatus = {
                    id: action.payload.id,
                    username: action.payload.username,
                    name: action.payload.name,
                    role: action.payload.role
                }

                state.data = loadedStatus
            })
            .addCase(fetchAuthStatus.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = 'fulfilled'
                const loadedStatus = {
                    id: action.payload.data.user.id,
                    username: action.payload.data.user.username,
                    name: action.payload.data.user.name,
                    role: action.payload.data.user.role
                }

                state.data = loadedStatus
            })
            .addCase(login.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.payload
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.status = 'loggedout'
                const loadedStatus = {
                    id: '',
                    username: '',
                    name: '',
                    role: ''
                }

                state.data = loadedStatus
            })
    }
})

export const getActiveUser = (state) => state.activeUser.data;
export const getAuthStatus = (state) => state.activeUser.status;
export const getAuthError = (state) => state.activeUser.error;

export const { setActiveUser } = auth.actions;

export default auth.reducer
