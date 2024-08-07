import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ENDPOINT, axiosBackendInstance } from "./endpoint";

const axiosInstance = axiosBackendInstance();

const initialState = {
    users: [],
    user: {},
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed' 
    error: null
}

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const response = await axiosInstance.get(ENDPOINT.USER)
    return response.data
});

export const fetchUser = createAsyncThunk('users/fetchUser', async (id) => {
    const response = await axiosInstance.get(`${ENDPOINT.USER}/${id}`)
    return response.data
});

export const addNewUser = createAsyncThunk('users/addNewUser', async (initialPost, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post(ENDPOINT.USER, initialPost)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const updateUser = createAsyncThunk('users/updateUser', async (initialPost, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.patch(`${ENDPOINT.USER}/${initialPost.id}`, initialPost.payload)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const deleteUser = createAsyncThunk('users/updateUser', async (id, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.delete(`${ENDPOINT.USER}/${id}`)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        userAdded: {
            reducer(state, action) {
                state.users.push(action.payload);
            },
            prepare(id, name, username, password, role) {
                return {
                    payload: {
                        id,
                        name,
                        username,
                        password,
                        role
                    }
                }
            }
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchUsers.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.status = 'succeeded'

                state.users = action.payload
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(fetchUser.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.status = 'succeeded'

                state.user = action.payload
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export const getAllUsers = (state) => state.users.users;
export const getSingleUsers = (state) => state.users.user;
export const getUsersStatus = (state) => state.users.status;
export const getUsersError = (state) => state.users.error;

export const { userAdded } = usersSlice.actions;

export default usersSlice.reducer
