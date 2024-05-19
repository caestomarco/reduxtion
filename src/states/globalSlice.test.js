/**
 * Scenario test:
 * - upVoteThread thunk
 * - should dispatch actions correctly when upvoting a thread succeeds
 */

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { showLoading, hideLoading } from 'react-redux-loading-bar';

import api from '../utils/api';
import { upVoteThread } from './globalSlice';

const fakeUpVoteThreadResponse = {
    status: 'success',
    message: 'thread up voted',
    data: {
        vote: {
            id: 'thread_vote-LW5kpmCIesZmBEtq',
            threadId: 'thread-Np47p4jhUXYhrhRn',
            userId: 'user-qn6ReHs0f991HMx3',
            voteType: 1,
        },
    },
};

const fakeErrorResponse = {
    status: 'fail',
    message: 'thread is not exist',
    data: {},
};

describe('upVoteThread thunk', () => {
    beforeEach(() => {
        api._upVoteThread = api.upVoteThread;
    });

    afterEach(() => {
        api.upVoteThread = api._upVoteThread;
        delete api._upVoteThread;
    });

    it('should dispatch actions correctly when upvoting a thread succeeds', async () => {
        api.upVoteThread = () => Promise.resolve(fakeUpVoteThreadResponse);

        const action = {
            meta: {
                arg: {
                    threadId: 'thread-Np47p4jhUXYhrhRn',
                    authedUserId: 'user-qn6ReHs0f991HMx3',
                },
            },
        };
        const expectedResponse = {
            data: {
                vote: {
                    id: 'thread_vote-LW5kpmCIesZmBEtq',
                    threadId: 'thread-Np47p4jhUXYhrhRn',
                    userId: 'user-qn6ReHs0f991HMx3',
                    voteType: 1,
                },
            },
            message: 'thread up voted',
            status: 'success',
        };
        const dispatch = vi.fn();

        await upVoteThread(action)(dispatch);

        expect(dispatch).toHaveBeenCalledWith(showLoading());
        expect(dispatch).toHaveBeenCalledWith({
            type: 'threads/upVoteThread/pending',
            meta: {
                arg: { ...action },
                requestId: expect.any(String),
                requestStatus: 'pending',
            },
        });
        expect(dispatch).toHaveBeenCalledWith({
            type: 'threads/upVoteThread/fulfilled',
            payload: expectedResponse,
            meta: {
                arg: { ...action },
                requestId: expect.any(String),
                requestStatus: 'fulfilled',
            },
        });
        expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });

    it('should dispatch actions correctly when upvoting a thread failed', async () => {
        api.upVoteThread = () => Promise.reject(fakeErrorResponse);
        const action = {
            meta: {
                arg: {
                    threadId: null,
                    authedUserId: 'user-qn6ReHs0f991HMx3',
                },
            },
        };
        const dispatch = vi.fn();

        await upVoteThread(action)(dispatch);

        expect(dispatch).toHaveBeenCalledWith(showLoading());
        expect(dispatch).toHaveBeenCalledWith({
            type: 'threads/upVoteThread/pending',
            meta: {
                arg: { ...action },
                requestId: expect.any(String),
                requestStatus: 'pending',
            },
        });
        expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });
});
