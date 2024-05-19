import React from 'react';
import { Link } from 'react-router-dom';

import { useInput } from '../../hooks/useInput';

import TextInput from '../../components/form/TextInput';
import SubmitButton from '../../components/ui/SubmitButton';

import { PasswordSVG, EmailSVG } from '../../components/ui/Icons';

function LoginForm({ handleLogin }) {
    const [showPassword, setShowPassword] = React.useState(false);

    const [email, handleEmail] = useInput('');
    const [password, handlePassword] = useInput('');

    return (
        <form
            aria-label="form"
            className="flex flex-col mb-0 space-y-4 rounded-lg p-6 lg:p-8"
            onSubmit={(event) => handleLogin(event, { email, password })}
        >
            {/* EMAIL */}
            <div>
                <TextInput
                    id="email"
                    type="email"
                    placeholder="Masukkan email"
                    value={email}
                    onChange={handleEmail}
                    required
                >
                    <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                        <EmailSVG className="size-4 stroke-current" />
                    </span>
                </TextInput>
            </div>

            {/* PASSWORD */}
            <div>
                <TextInput
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Masukkan kata sandi"
                    value={password}
                    onChange={handlePassword}
                    required
                >
                    <button
                        type="button"
                        className="absolute inset-y-0 end-0 grid place-content-center px-4"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        <span className="sr-only">Show Or Hide Password</span>
                        <PasswordSVG className="size-4 hover:cursor-pointer stroke-current" />
                    </button>
                </TextInput>
            </div>

            {/* SUBMIT BUTTON */}
            <div className="flex items-center justify-end">
                <SubmitButton id="login-button">Masuk</SubmitButton>
            </div>

            {/* REGISTER LINK */}
            <p className="self-center lg:self-start text-sm text-neutral-content">
                <span>Belum punya akun? </span>
                <Link to="/auth/register">
                    <span className="underline text-secondary">Daftar sekarang</span>
                </Link>
            </p>
        </form>
    );
}

export default LoginForm;
