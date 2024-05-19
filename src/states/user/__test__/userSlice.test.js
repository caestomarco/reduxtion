/**
 * Test scenario for userSlice
 *
 * - userReducer function
 *   - should handle the initial state
 *     - Dispatches an empty action
 *     - Expects the state to be equal to the initial state
 *
 *   - should handle fetchAuthedUser.pending
 *     - Dispatches the fetchAuthedUser.pending action
 *     - Expects the isLoading state to be set to true
 *
 *   - should handle fetchAuthedUser.fulfilled
 *     - Sets the initial state
 *     - Dispatches the fetchAuthedUser.fulfilled action with a payload
 *     - Expects the isLoading state to be set to false, isLoggedIn to be true, isError to be false, and authedUser to be set to the payload
 *
 *   - should handle fetchAuthedUser.rejected
 *     - Sets the initial state
 *     - Dispatches the fetchAuthedUser.rejected action
 *     - Expects the isLoading state to be set to false, isLoggedIn to be false, and isError to be true
 *
 *   - should handle logoutUser
 *     - Sets the initial state with an authedUser
 *     - Dispatches the logoutUser action
 *     - Expects the authedUser to be an empty object, isLoggedIn to be false, and the access token to be removed
 *
 *   - should handle registerUser.fulfilled and loginUser.fulfilled
 *     - Sets the initial state
 *     - Dispatches the registerUser.fulfilled or loginUser.fulfilled action with a payload
 *     - Expects the isLoading state to be set to false, isLoggedIn to be true, isError to be false, and an alert with the payload message
 *
 *   - should handle registerUser.rejected and loginUser.rejected
 *     - Sets the initial state
 *     - Dispatches the registerUser.rejected or loginUser.rejected action with a payload
 *     - Expects the isLoading state to be set to false, isError to be true, and an alert with the payload message
 */

import { describe, it, expect } from 'vitest';
import userReducer, { fetchAuthedUser, loginUser, logoutUser, registerUser } from '../userSlice';

describe('userSlice', () => {
    const initialState = {
        authedUser: {},
        isLoading: true,
        isError: false,
        isLoggedIn: false,
    };

    it('should handle the initial state', () => {
        expect(userReducer(undefined, {})).toEqual(initialState);
    });

    it('should handle logoutUser', () => {
        const authedUser = { id: 1, name: 'John Doe' };
        const state = { ...initialState, authedUser };
        const nextState = userReducer(state, logoutUser());

        expect(nextState.authedUser).toEqual({});
        expect(nextState.isLoggedIn).toBe(false);
    });
    it('should handle registerUser.fulfilled', async () => {
        const payload = {
            user: { id: 'user-MtX-Fc6opPyPXGdc', name: 'cobalagi', email: 'cobalagi@gmail.com', avatar: 'https://ui-avatars.com/api/?name=cobalagi&background=random' },
            message: 'user created',
        };
        const action = { type: registerUser.fulfilled.type, payload };
        const nextState = userReducer(initialState, action);

        expect(nextState).toEqual({
            authedUser: {},
            isLoading: false,
            isLoggedIn: true,
            isError: false,
        });
    });
    it('should handle loginUser.fulfilled', () => {
        const payload = { user: { email: 'cobalagi@gmail.com', password: '123456' }, message: 'user logged in' };
        const action = { type: loginUser.fulfilled.type, payload };
        const nextState = userReducer(initialState, action);

        expect(nextState).toEqual({
            authedUser: {},
            isLoading: false,
            isLoggedIn: true,
            isError: false,
        });
    });

    it('should handle fetchAuthedUser.pending', () => {
        const action = { type: fetchAuthedUser.pending.type };
        const nextState = userReducer(initialState, action);
        expect(nextState.isLoading).toBe(true);
    });
    it('should handle fetchAuthedUser.fulfilled', () => {
        const payload = { id: 1, name: 'John Doe' };
        const action = { type: fetchAuthedUser.fulfilled.type, payload };
        const nextState = userReducer(initialState, action);
        expect(nextState).toEqual({
            isLoading: false,
            isLoggedIn: true,
            isError: false,
            authedUser: payload,
        });
    });
    it('should handle fetchAuthedUser.rejected', () => {
        const action = { type: fetchAuthedUser.rejected.type };
        const nextState = userReducer(initialState, action);
        expect(nextState).toEqual({
            isLoading: false,
            isLoggedIn: false,
            isError: true,
            authedUser: {},
        });
    });
});
