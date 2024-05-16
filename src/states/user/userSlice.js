import { createSlice, createAsyncThunk, isAnyOf } from '@reduxjs/toolkit';
import { showLoading, hideLoading } from 'react-redux-loading-bar';

import api from '../../utils/api';
// import { delay } from '../../utils';

const initialState = {
    authedUser: {},
    isLoading: true,
    isError: false,
    isLoggedIn: false,
};

export const fetchAuthedUser = createAsyncThunk('user/fetchAuthedUser', async (_, thunkAPI) => {
    thunkAPI.dispatch(showLoading());
    try {
        const response = await api.getOwnProfile();

        return response;
    } catch (error) {
        console.error(error);
        throw error.response.data;
    } finally {
        thunkAPI.dispatch(hideLoading());
    }
});

export const registerUser = createAsyncThunk('user/register', async ({ name, email, password }, thunkAPI) => {
    thunkAPI.dispatch(showLoading());
    try {
        const registerResponse = await api.register({ name, email, password });
        const loginResponse = await api.login({ email, password });

        api.putAccessToken(loginResponse.token);
        return { ...registerResponse, ...loginResponse };
    } catch (error) {
        alert(error);
        throw error.response.data;
    } finally {
        thunkAPI.dispatch(hideLoading());
    }
});

export const loginUser = createAsyncThunk('user/login', async ({ email, password }, thunkAPI) => {
    thunkAPI.dispatch(showLoading());
    try {
        const response = await api.login({ email, password });

        api.putAccessToken(response.token);
        return response;
    } catch (error) {
        alert(error);
        throw error.response.data;
    } finally {
        thunkAPI.dispatch(hideLoading());
    }
});

export const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        logoutUser: (state) => {
            state.authedUser = {};
            state.isLoggedIn = false;

            api.putAccessToken('');
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAuthedUser.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchAuthedUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isLoggedIn = true;
            state.isError = false;
            state.authedUser = action.payload;
        });
        builder.addCase(fetchAuthedUser.rejected, (state) => {
            state.isLoading = false;
            state.isLoggedIn = false;
            state.isError = true;
        });

        builder.addMatcher(isAnyOf(fetchAuthedUser.pending, registerUser.pending, loginUser.pending), (state) => {
            state.isLoading = true;
        });
        builder.addMatcher(isAnyOf(registerUser.fulfilled, loginUser.fulfilled), (state, action) => {
            alert(action.payload.message);

            state.isLoading = false;
            state.isLoggedIn = true;
            state.isError = false;
        });
        builder.addMatcher(isAnyOf(registerUser.rejected, loginUser.rejected), (state, action) => {
            alert(action.payload.message);

            state.isLoading = false;
            state.isError = true;
        });
    },
});

export const { findUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
