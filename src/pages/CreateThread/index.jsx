import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { resetSuccessStatus } from '../../states/globalSlice';

import CreateThreadForm from './CreateThreadForm';

function CreatePage() {
    // HOOKS
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // STORE's STATE
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    const isLoading = useSelector((state) => state.user.isLoading);
    const isError = useSelector((state) => state.user.isError);
    const isSuccess = useSelector((state) => state.global.isSuccess);

    // EFFECTS
    React.useEffect(() => {
        if (isLoading === false && isLoggedIn === false) {
            console.warn('Mohon maaf, silakan login terlebih dahulu untuk dapat membuat diskusi.');
            navigate('/auth/login', { replace: true });
        }
    }, [isError, isLoggedIn]);

    React.useEffect(() => {
        if (isLoading === false && isSuccess === true && isLoggedIn === true) {
            navigate('/', { replace: true });
            dispatch(resetSuccessStatus());
        }
    }, [isLoggedIn, isSuccess]);

    if (isLoading) {
        return null;
    }

    if (isError) {
        return (
            <section className="flex flex-col items-center justify-center px-4 text-center basis-full">
                <h1 className="text-9xl font-black text-secondary ">Authentication Failed</h1>
                <p className="font-bold tracking-tight text-secondary sm:text-4xl">Uh-oh!</p>
                <p className="mt-4 text-zinc-500">Mohon maaf, silakan login terlebih dahulu untuk dapat membuat diskusi.</p>
            </section>
        );
    }

    return (
        <section className="flex p-8 gap-x-4 basis-full">
            <aside className="w-full max-w-xs hidden lg:block">
                <h1 className="p-4 text-3xl font-bold">Mulai Diskusi</h1>
                <div className="space-y-4 p-4">
                    <span>Pertanyaanmu akan ditampilkan di halaman utama.</span>
                    <div className="space-y-2">
                        <h2 className="text-xl font-semibold">Tata Krama Berdiskusi</h2>
                        <div className="join join-vertical w-full">
                            <div className="collapse collapse-arrow join-item border border-base-200">
                                <input
                                    type="radio"
                                    name="my-accordion-4"
                                />
                                <div className="collapse-title text-base font-medium">Sopan</div>
                                <div className="collapse-content">
                                    <p className="text-sm">Hindari menggunakan kata-kata kasar, menyinggung, atau merendahkan pendapat orang lain.</p>
                                </div>
                            </div>
                            <div className="collapse collapse-arrow join-item border border-base-200">
                                <input
                                    type="radio"
                                    name="my-accordion-4"
                                />
                                <div className="collapse-title text-base font-medium">Objektif</div>
                                <div className="collapse-content">
                                    <p className="text-sm">Menyampaikan argumen atau pendapat berdasarkan fakta dan data yang valid, bukan hanya opini subjektif.</p>
                                </div>
                            </div>
                            <div className="collapse collapse-arrow join-item border border-base-200">
                                <input
                                    type="radio"
                                    name="my-accordion-4"
                                />
                                <div className="collapse-title text-base font-medium">Terbuka</div>
                                <div className="collapse-content">
                                    <p className="text-sm">Mau mengakui ketika terdapat kekeliruan atau kesalahpahaman dalam argumentasi.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>
            <article className="flex flex-col gap-y-4 p-4 w-full max-w-full">
                <CreateThreadForm />
            </article>
        </section>
    );
}

export default CreatePage;
