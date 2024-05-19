import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { showLoading, hideLoading } from 'react-redux-loading-bar';

import api from '../../utils/api';

const initialState = {
    threadDetail: {},
    isLoading: true,
    isError: false,
    isSuccess: false,
};

export const fetchThreadDetail = createAsyncThunk('thread/fetchThreadDetail', async (id, thunkAPI) => {
    thunkAPI.dispatch(showLoading());

    try {
        const response = await api.getThreadDetail(id);

        return response;
    } catch (error) {
        console.error(error);
        throw error;
    } finally {
        thunkAPI.dispatch(hideLoading());
    }
});

export const upVoteThread = createAsyncThunk('thread/upVoteThread', async ({ threadId, authedUserId }, thunkAPI) => {
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

export const downVoteThread = createAsyncThunk('thread/downVoteThread', async ({ threadId, authedUserId }, thunkAPI) => {
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

export const neutralizeThreadVote = createAsyncThunk('thread/neutralizeThreadVote', async ({ threadId, authedUserId }, thunkAPI) => {
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

export const createComment = createAsyncThunk('thread/createComment', async ({ threadId, content }, thunkAPI) => {
    thunkAPI.dispatch(showLoading());
    try {
        const response = await api.createComment({ threadId, content });

        return response;
    } catch (error) {
        console.error(error);
        throw error;
    } finally {
        thunkAPI.dispatch(hideLoading());
    }
});

export const upVoteComment = createAsyncThunk('thread/upVoteComment', async ({ commentId, threadId, authedUserId }, thunkAPI) => {
    thunkAPI.dispatch(showLoading());
    try {
        const response = await api.upVoteComment({ commentId, threadId });

        return response;
    } catch (error) {
        console.error(error, authedUserId);
        throw error;
    } finally {
        thunkAPI.dispatch(hideLoading());
    }
});

export const downVoteComment = createAsyncThunk('thread/downVoteComment', async ({ commentId, threadId, authedUserId }, thunkAPI) => {
    thunkAPI.dispatch(showLoading());
    try {
        const response = await api.downVoteComment({ commentId, threadId });

        return response;
    } catch (error) {
        console.error(error, authedUserId);
        throw error;
    } finally {
        thunkAPI.dispatch(hideLoading());
    }
});

export const neutralizeCommentVote = createAsyncThunk('thread/neutralizeCommentVote', async ({ commentId, threadId, authedUserId }, thunkAPI) => {
    thunkAPI.dispatch(showLoading());
    try {
        const response = await api.neutralizeCommentVote({ commentId, threadId });

        return response;
    } catch (error) {
        console.error(error, authedUserId);
        throw error;
    } finally {
        thunkAPI.dispatch(hideLoading());
    }
});

export const threadSlice = createSlice({
    name: 'thread',
    initialState,
    reducers: {
        resetSuccessStatus: (state) => {
            state.isSuccess = false;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchThreadDetail.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.threadDetail = action.payload;
        });
        builder.addCase(fetchThreadDetail.rejected, (state, action) => {
            console.error(action.type);
            state.isLoading = false;
            state.isError = true;
            state.threadDetail = {};
        });

        builder.addCase(upVoteThread.pending, (state, action) => {
            const { authedUserId } = action.meta.arg;

            state.threadDetail = {
                ...state.threadDetail,
                upVotesBy: [...state.threadDetail.upVotesBy, authedUserId],
                downVotesBy: state.threadDetail.downVotesBy.filter((voterId) => voterId !== authedUserId),
            };
        });
        builder.addCase(upVoteThread.fulfilled, (state, action) => {
            const { message } = action.payload;

            console.log(message);
        });
        builder.addCase(upVoteThread.rejected, (state, action) => {
            const { authedUserId } = action.meta.arg;

            state.threadDetail = {
                ...state.threadDetail,
                upVotesBy: state.threadDetail.upVotesBy.filter((voterId) => voterId !== authedUserId),
            };
        });

        builder.addCase(downVoteThread.pending, (state, action) => {
            const { authedUserId } = action.meta.arg;

            state.threadDetail = {
                ...state.threadDetail,
                downVotesBy: [...state.threadDetail.downVotesBy, authedUserId],
                upVotesBy: state.threadDetail.upVotesBy.filter((voterId) => voterId !== authedUserId),
            };
        });
        builder.addCase(downVoteThread.fulfilled, (state, action) => {
            const { message } = action.payload;

            console.log(message);
        });
        builder.addCase(downVoteThread.rejected, (state, action) => {
            const { authedUserId } = action.meta.arg;

            state.threadDetail = {
                ...state.threadDetail,
                downVotesBy: state.threadDetail.downVotesBy.filter((voterId) => voterId !== authedUserId),
            };
        });

        builder.addCase(neutralizeThreadVote.pending, (state, action) => {
            const { authedUserId } = action.meta.arg;

            state.threadDetail = {
                ...state.threadDetail,
                upVotesBy: state.threadDetail.upVotesBy.filter((voterId) => voterId !== authedUserId),
                downVotesBy: state.threadDetail.downVotesBy.filter((voterId) => voterId !== authedUserId),
            };
        });
        builder.addCase(neutralizeThreadVote.fulfilled, (state, action) => {
            const { message } = action.payload;

            console.log(message);
        });
        builder.addCase(neutralizeThreadVote.rejected, (state, action) => {
            const { message } = action.payload;

            console.error(message);
        });

        builder.addCase(createComment.fulfilled, (state, action) => {
            alert(action.payload.message);

            state.isSuccess = true;
            state.threadDetail = {
                ...state.threadDetail,
                comments: [action.payload.comment, ...state.threadDetail.comments],
            };
        });
        builder.addCase(createComment.rejected, (state, action) => {
            console.error(action.type);
        });

        builder.addCase(upVoteComment.pending, (state, action) => {
            const { commentId, authedUserId } = action.meta.arg;

            state.threadDetail.comments = state.threadDetail.comments.map((comment) => {
                if (comment.id === commentId) {
                    return {
                        ...comment,
                        upVotesBy: [...comment.upVotesBy, authedUserId],
                        downVotesBy: comment.downVotesBy.filter((voterId) => voterId !== authedUserId),
                    };
                }

                return comment;
            });
        });
        builder.addCase(upVoteComment.fulfilled, (state, action) => {
            const { message } = action.payload;

            console.log(message);
        });
        builder.addCase(upVoteComment.rejected, (state, action) => {
            const { commentId, authedUserId } = action.meta.arg;

            state.threadDetail.comments = state.threadDetail.comments.map((comment) => {
                if (comment.id === commentId) {
                    return {
                        ...comment,
                        upVotesBy: comment.upVotesBy.filter((voterId) => voterId !== authedUserId),
                    };
                }

                return comment;
            });
        });

        builder.addCase(downVoteComment.pending, (state, action) => {
            const { commentId, authedUserId } = action.meta.arg;

            state.threadDetail.comments = state.threadDetail.comments.map((comment) => {
                if (comment.id === commentId) {
                    return {
                        ...comment,
                        downVotesBy: [...comment.downVotesBy, authedUserId],
                        upVotesBy: comment.upVotesBy.filter((voterId) => voterId !== authedUserId),
                    };
                }

                return comment;
            });
        });
        builder.addCase(downVoteComment.fulfilled, (state, action) => {
            const { message } = action.payload;

            console.log(message);
        });
        builder.addCase(downVoteComment.rejected, (state, action) => {
            const { commentId, authedUserId } = action.meta.arg;

            state.threadDetail.comments = state.threadDetail.comments.map((comment) => {
                if (comment.id === commentId) {
                    return {
                        ...comment,
                        downVotesBy: comment.downVotesBy.filter((voterId) => voterId !== authedUserId),
                    };
                }

                return comment;
            });
        });

        builder.addCase(neutralizeCommentVote.pending, (state, action) => {
            const { commentId, authedUserId } = action.meta.arg;

            state.threadDetail.comments = state.threadDetail.comments.map((comment) => {
                if (comment.id === commentId) {
                    return {
                        ...comment,
                        upVotesBy: comment.upVotesBy.filter((voterId) => voterId !== authedUserId),
                        downVotesBy: comment.downVotesBy.filter((voterId) => voterId !== authedUserId),
                    };
                }

                return comment;
            });
        });
        builder.addCase(neutralizeCommentVote.fulfilled, (state, action) => {
            const { message } = action.payload;

            console.log(message);
        });
        builder.addCase(neutralizeCommentVote.rejected, (state, action) => {
            const { message } = action.payload;

            console.error(message);
        });
    },
});

export const { resetSuccessStatus } = threadSlice.actions;

export default threadSlice.reducer;
