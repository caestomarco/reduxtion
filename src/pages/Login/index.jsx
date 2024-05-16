import React from 'react';

import LoginForm from './LoginForm';

function LoginPage() {
    return (
        <div className="mx-auto max-w-screen-xl w-full px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-lg space-y-4">
                <h1 className="text-4xl lg:text-5xl font-semibold text-secondary text-center">Masuk</h1>
                <p className="text-center text-zinc-700 dark:text-zinc-300 px-6 lg:px-8">Silakan masukkan email dan kata sandi untuk melanjutkan.</p>
                <LoginForm />
            </div>
        </div>
    );
}

export default LoginPage;
