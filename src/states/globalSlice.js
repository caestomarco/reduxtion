import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { showLoading, hideLoading } from 'react-redux-loading-bar';

import api from '../utils/api';

// import { delay } from '../utils';

const initialState = {
    threads: [],
    users: [],
    isLoading: true,
    isError: false,
    isSuccess: false,
};

export const fetchUsersAndThreads = createAsyncThunk('users/fetchUsers', async (_, thunkAPI) => {
    thunkAPI.dispatch(showLoading());
    try {
        const users = await api.getAllUsers();
        const threads = await api.getAllThreads();

        return { users, threads };
    } catch (error) {
        console.error(error);
        throw error;
    } finally {
        thunkAPI.dispatch(hideLoading());
    }
});

export const createThread = createAsyncThunk('thread/createThread', async ({ title, body, category }, thunkAPI) => {
    thunkAPI.dispatch(showLoading());
    try {
        const response = await api.createThread({ title, body, category });

        return response;
    } catch (error) {
        console.error(error);
        throw error;
    } finally {
        thunkAPI.dispatch(hideLoading());
    }
});

export const upVoteThread = createAsyncThunk('threads/upVoteThread', async ({ threadId, authedUserId }, thunkAPI) => {
    thunkAPI.dispatch(showLoading());
    try {
        const response = await api.upVoteThread(threadId);

        return response;
    } catch (error) {
        console.error(error, authedUserId);
        throw error;
    } finally {
        thunkAPI.dispatch(hideLoading());
    }
});

export const downVoteThread = createAsyncThunk('threads/downVoteThread', async ({ threadId, authedUserId }, thunkAPI) => {
    thunkAPI.dispatch(showLoading());
    try {
        const response = await api.downVoteThread(threadId);

        return response;
    } catch (error) {
        console.error(error, authedUserId);
        throw error;
    } finally {
        thunkAPI.dispatch(hideLoading());
    }
});

export const neutralizeThreadVote = createAsyncThunk('threads/neutralizeThreadVote', async ({ threadId, authedUserId }, thunkAPI) => {
    thunkAPI.dispatch(showLoading());
    try {
        const response = await api.neutralizeThreadVote(threadId);

        return response;
    } catch (error) {
        console.error(error, authedUserId);
        throw error;
    } finally {
        thunkAPI.dispatch(hideLoading());
    }
});

export const globalSlice = createSlice({
    name: 'global',
    initialState,
    reducers: {
        resetSuccessStatus: (state) => {
            state.isSuccess = false;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUsersAndThreads.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchUsersAndThreads.fulfilled, (state, action) => {
            const { users, threads } = action.payload;

            state.users = users;
            state.threads = threads;
            state.isLoading = false;
        });
        builder.addCase(fetchUsersAndThreads.rejected, (state) => {
            console.log('Failed to fetch users and threads');
            state.isLoading = false;
            state.isError = true;
        });

        builder.addCase(createThread.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(createThread.fulfilled, (state, action) => {
            alert(action.payload.message);

            state.isSuccess = true;
        });
        builder.addCase(createThread.rejected, (state, action) => {
            console.error(action.type);

            state.isLoading = false;
            state.isError = true;
        });

        builder.addCase(upVoteThread.pending, (state, action) => {
            const { threadId, authedUserId } = action.meta.arg;

            state.threads = state.threads.map((thread) => {
                if (thread.id === threadId) {
                    return {
                        ...thread,
                        upVotesBy: [...thread.upVotesBy, authedUserId],
                        downVotesBy: thread.downVotesBy.filter((voterId) => voterId !== authedUserId),
                    };
                }

                return thread;
            });
        });
        builder.addCase(upVoteThread.fulfilled, (state, action) => {
            const { message } = action.payload;

            console.log(message);
        });
        builder.addCase(upVoteThread.rejected, (state, action) => {
            const { threadId, authedUserId } = action.meta.arg;

            state.threads = state.threads.map((thread) => {
                if (thread.id === threadId) {
                    return {
                        ...thread,
                        upVotesBy: thread.upVotesBy.filter((voterId) => voterId !== authedUserId),
                    };
                }

                return thread;
            });
        });

        builder.addCase(downVoteThread.pending, (state, action) => {
            const { threadId, authedUserId } = action.meta.arg;

            state.threads = state.threads.map((thread) => {
                if (thread.id === threadId) {
                    return {
                        ...thread,
                        downVotesBy: [...thread.downVotesBy, authedUserId],
                        upVotesBy: thread.upVotesBy.filter((voterId) => voterId !== authedUserId),
                    };
                }

                return thread;
            });
        });
        builder.addCase(downVoteThread.fulfilled, (state, action) => {
            const { message } = action.payload;

            console.log(message);
        });
        builder.addCase(downVoteThread.rejected, (state, action) => {
            const { threadId, authedUserId } = action.meta.arg;

            state.threads = state.threads.map((thread) => {
                if (thread.id === threadId) {
                    return {
                        ...thread,
                        downVotesBy: thread.downVotesBy.filter((voterId) => voterId !== authedUserId),
                    };
                }

                return thread;
            });
        });

        builder.addCase(neutralizeThreadVote.pending, (state, action) => {
            const { threadId, authedUserId } = action.meta.arg;

            state.threads = state.threads.map((thread) => {
                if (thread.id === threadId) {
                    return {
                        ...thread,
                        upVotesBy: thread.upVotesBy.filter((voterId) => voterId !== authedUserId),
                        downVotesBy: thread.downVotesBy.filter((voterId) => voterId !== authedUserId),
                    };
                }

                return thread;
            });
        });
        builder.addCase(neutralizeThreadVote.fulfilled, (state, action) => {
            const { message } = action.payload;

            console.log(message);
        });
        builder.addCase(neutralizeThreadVote.rejected, (state, action) => {
            const { message } = action.payload;

            console.error(message);
        });
    },
});

export const { resetSuccessStatus } = globalSlice.actions;

export default globalSlice.reducer;
