import React from 'react';
import { Link, useRouteError } from 'react-router-dom';

function ErrorPage() {
    const error = useRouteError();

    if (error) {
        console.error(error);
    }

    return (
        <section className="flex flex-col items-center justify-center basis-full h-screen">
            <h1 className="text-9xl font-black text-secondary ">{error?.message || '404'}</h1>
            <p className="font-bold tracking-tight text-secondary/70 sm:text-4xl">Mohon maaf, terjadi kesalahan.</p>
            <p className="mt-4 text-zinc-500">{error?.statusText || 'Halaman yang anda cari tidak ditemukan.'}</p>
            <Link to="/">
                <button
                    type="button"
                    className="btn btn-block basis-full btn-outline btn-secondary mt-4"
                >
                    Kembali ke Beranda
                </button>
            </Link>
        </section>
    );
}

export default ErrorPage;
