import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { useInput } from '../../hooks/useInput';

import { registerUser } from '../../states/user/userSlice';

import TextInput from '../../components/form/TextInput';
import SubmitButton from '../../components/ui/SubmitButton';

import { UserSVG, PasswordSVG, EmailSVG } from '../../components/ui/Icons';

function RegisterForm() {
    const dispatch = useDispatch();

    const [showPassword, setShowPassword] = React.useState(false);

    const [name, setName] = useInput('');
    const [email, setEmail] = useInput('');
    const [password, setPassword] = useInput('');

    const handleRegister = (event) => {
        event.preventDefault();
        dispatch(registerUser({ name, email, password }));
    };

    return (
        <form
            className="flex flex-col mb-0 space-y-4 rounded-lg p-6 lg:p-8"
            onSubmit={(event) => handleRegister(event)}
        >
            {/* NAME */}
            <div>
                <TextInput
                    id="name"
                    type="text"
                    placeholder="Masukkan nama"
                    value={name}
                    onChange={setName}
                >
                    <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                        <UserSVG className="size-4 stroke-current" />
                    </span>
                </TextInput>
            </div>

            {/* EMAIL */}
            <div>
                <TextInput
                    id="email"
                    type="email"
                    placeholder="Masukkan email"
                    value={email}
                    onChange={setEmail}
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
                    onChange={setPassword}
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
            <SubmitButton id="register-button">Daftar</SubmitButton>

            {/* LOGIN LINK */}
            <p className="self-center lg:self-start text-sm text-zinc-600 dark:text-zinc-400">
                <span>Sudah punya akun? </span>
                <Link to="/auth/login">
                    <span className="underline text-secondary">Masuk</span>
                </Link>
            </p>
        </form>
    );
}

export default RegisterForm;
