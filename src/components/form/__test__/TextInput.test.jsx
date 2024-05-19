/**
 * Testing Scenario
 *
 * - TextInput component
 *   - should render the input with the correct value
 *   - should call onChange handler when the input value is changed
 */

import React from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, it, expect, vi } from 'vitest';
import matchers from '@testing-library/jest-dom/matchers';

import TextInput from '../TextInput';

expect.extend(matchers);

describe('TextInput component', () => {
    afterEach(() => {
        cleanup();
    });

    it('should render the input with the correct value', async () => {
        const value = 'test@example.com';

        render(
            <TextInput
                id="email"
                type="email"
                placeholder="Masukkan email"
                value={value}
                onChange={() => {}}
                required
            />,
        );

        const email = await screen.getByDisplayValue(value);

        await userEvent.type(email, 'test@example.com');

        expect(email).toHaveValue('test@example.com');
    });

    it('should call onChange handler when the input value is changed', async () => {
        const handleChange = vi.fn((event) => {
            expect(event.target.value).toEqual('test@gmail.com');
        });

        render(
            <TextInput
                id="email"
                type="email"
                placeholder="Masukkan email"
                value=""
                onChange={(event) => handleChange(event)}
                required
            />,
        );

        const email = await screen.getByPlaceholderText('Masukkan email');

        await fireEvent.change(email, { target: { value: 'test@gmail.com' } });

        expect(handleChange).toHaveBeenCalledTimes(1);
    });
});
