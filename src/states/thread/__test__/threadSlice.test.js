/* Test scenario for threadSlice
 *
 * - threadReducer function
 *   - should return initial state when given an unknown action
 *     - Dispatches an unknown action
 *     - Expects the state to be equal to the initial state
 *
 *   - should handle fetchThreadDetail.fulfilled
 *     - Sets the initial state
 *     - Dispatches the fetchThreadDetail.fulfilled action with a payload
 *     - Expects the state to have isLoading set to false, isError set to false, and threadDetail set to the payload
 *
 *   - should handle fetchThreadDetail.rejected
 *     - Sets the initial state
 *     - Dispatches the fetchThreadDetail.rejected action
 *     - Expects the state to have isLoading set to false, isError set to true, and threadDetail set to empty object
 *
 *   - should handle upVoteThread.pending
 *     - Sets the initial state
 *     - Dispatches the upVoteThread.pending action
 *     - Expects the state to have threads updated with the upVotesBy and downVotesBy
 *
 *   - should handle upVoteThread.rejected
 *     - Sets the initial state
 *     - Dispatches the upVoteThread.rejected action
 *     - Expects the state to have threads updated with the upVotesBy and downVotesBy
 */

import { describe, it, expect } from 'vitest';
import threadReducer, { fetchThreadDetail, upVoteThread } from '../threadSlice';

describe('threadSlice', () => {
    const initialState = {
        threadDetail: {
            upVotesBy: [],
            downVotesBy: [],
        },
        isLoading: true,
        isError: false,
        isSuccess: false,
    };

    it('should return initial state when given an unknown action', () => {
        const action = { type: 'thread/unknownAction' };
        const nextState = threadReducer(initialState, action);

        expect(nextState).toEqual(initialState);
    });

    it('should handle fetchThreadDetail.fulfilled', () => {
        const payload = {
            id: 'thread-91KocEqYPRz68MhD',
            title: 'Halo! Selamat datang dan silakan perkenalkan diri kamu',
            body: '<div>Hello</div>',
        };
        const action = { type: fetchThreadDetail.fulfilled.type, payload };
        const nextState = threadReducer(initialState, action);

        expect(nextState).toEqual({
            isLoading: false,
            isError: false,
            isSuccess: false,
            threadDetail: payload,
        });
    });
    it('should handle fetchThreadDetail.rejected', () => {
        const action = { type: fetchThreadDetail.rejected.type };
        const nextState = threadReducer(initialState, action);

        expect(nextState).toEqual({
            isLoading: false,
            isError: true,
            isSuccess: false,
            threadDetail: {},
        });
    });

    it('should handle upVoteThread.pending', () => {
        const threadId = 'thread-91KocEqYPRz68MhD';
        const authedUserId = 'user-1';
        const action = { type: upVoteThread.pending.type, meta: { arg: { threadId, authedUserId } } };
        const nextState = threadReducer(initialState, action);

        expect(nextState).toEqual({
            isLoading: true,
            isError: false,
            isSuccess: false,
            threadDetail: {
                ...initialState.threadDetail,
                upVotesBy: [...initialState.threadDetail.upVotesBy, authedUserId],
                downVotesBy: [],
            },
        });
    });
    it('should handle upVoteThread.rejected', () => {
        const threadId = 'thread-91KocEqYPRz68MhD';
        const authedUserId = 'user-1';
        const action = { type: upVoteThread.rejected.type, meta: { arg: { threadId, authedUserId } } };
        const nextState = threadReducer(initialState, action);

        expect(nextState).toEqual({
            isLoading: true,
            isError: false,
            isSuccess: false,
            threadDetail: {
                ...initialState.threadDetail,
                upVotesBy: [],
                downVotesBy: [],
            },
        });
    });
});
