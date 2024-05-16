import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { showLoading, hideLoading } from 'react-redux-loading-bar';

import api from '../../utils/api';
// import { delay } from '../../utils';

const initialState = {
    leaderboards: [],
    isLoading: false,
    isError: false,
};

export const fetchLeaderboards = createAsyncThunk('leaderboards/fetchLeaderboards', async (_, thunkAPI) => {
    thunkAPI.dispatch(showLoading());
    try {
        const response = await api.getLeaderboards();

        return response;
    } catch (error) {
        console.error(error);
        throw error.response.data;
    } finally {
        thunkAPI.dispatch(hideLoading());
    }
});

export const leaderboardSlice = createSlice({
    name: 'leaderboard',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(fetchLeaderboards.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchLeaderboards.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.leaderboards = action.payload;
        });
        builder.addCase(fetchLeaderboards.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
        });
    },
});

export default leaderboardSlice.reducer;
