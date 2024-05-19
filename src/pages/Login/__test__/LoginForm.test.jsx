/**
 * Testing Scenario
 *
 * - LoginForm Component
 *   - should handle email typing correctly
 *   - should handle password typing correctly
 *   - should call dispatch when login button is clicked
 */

import React from 'react';
import { describe, it, expect, afterEach, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as matchers from '@testing-library/jest-dom/matchers';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import LoginForm from '../LoginForm';
import store from '../../../states/store';

expect.extend(matchers);

describe('LoginForm component', () => {
    afterEach(() => {
        cleanup();
    });

    it('should handle email typing correctly', async () => {
        render(
            <Provider store={store}>
                <Router>
                    <LoginForm />
                </Router>
            </Provider>,
        );

        const emailInput = await screen.getByPlaceholderText('Masukkan email');
        await userEvent.type(emailInput, 'test@example.com');
        expect(emailInput).toHaveValue('test@example.com');
    });

    it('should handle password typing correctly', async () => {
        render(
            <Provider store={store}>
                <Router>
                    <LoginForm />
                </Router>
            </Provider>,
        );

        const passwordInput = await screen.getByPlaceholderText('Masukkan kata sandi');
        await userEvent.type(passwordInput, 'password123');
        expect(passwordInput).toHaveValue('password123');
    });

    it('should call handleLogin action when form is submitted', async () => {
        const handleLogin = vi.fn();

        render(
            <Provider store={store}>
                <Router>
                    <LoginForm handleLogin={handleLogin} />
                </Router>
            </Provider>,
        );

        const emailInput = await screen.getByPlaceholderText('Masukkan email');
        await userEvent.type(emailInput, 'test@example.com');

        const passwordInput = await screen.getByPlaceholderText('Masukkan kata sandi');
        await userEvent.type(passwordInput, 'password123');

        const form = await screen.getByRole('form');
        await fireEvent.submit(form);

        expect(handleLogin).toHaveBeenCalledWith(expect.any(Object), {
            email: 'test@example.com',
            password: 'password123',
        });
    });
});
