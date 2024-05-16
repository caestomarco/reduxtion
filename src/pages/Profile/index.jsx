import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { logoutUser } from '../../states/user/userSlice';
import { fetchLeaderboards } from '../../states/leaderboard/leaderboardSlice';
import { fetchUsersAndThreads } from '../../states/globalSlice';

import ActionButton from '../../components/ui/ActionButton';
import { ExitSVG } from '../../components/ui/Icons';

function ProfilePage() {
    // HOOKS
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // STORE's STATE
    const authedUser = useSelector((state) => state.user.authedUser);
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    const isLoading = useSelector((state) => state.user.isLoading);
    const isError = useSelector((state) => state.user.isError);
    const threads = useSelector((state) => state.global.threads);
    const leaderboards = useSelector((state) => state.leaderboard.leaderboards);

    // MODIFIED STATE
    const totalThreads = threads.filter((thread) => thread.ownerId === authedUser.id).length;
    const totalScore = leaderboards.find((leaderboard) => leaderboard.user.id === authedUser.id)?.score || 0;

    // EFFECTS
    React.useEffect(() => {
        if (isLoading === false && isLoggedIn === false) {
            console.warn('Mohon maaf, silakan login terlebih dahulu untuk dapat melihat profil.');
            navigate('/auth/login', { replace: true });
        }
    }, [isError, isLoggedIn]);

    React.useEffect(() => {
        dispatch(fetchUsersAndThreads());
        dispatch(fetchLeaderboards());
    }, []);

    return (
        <section className="flex p-8 gap-x-4 basis-full">
            <aside className="w-full max-w-xs hidden lg:block">
                <h1 className="p-4 text-3xl font-bold">Profil Saya</h1>
                <div className="space-y-4 p-4 ">
                    <span>Kamu dapat melihat informasi detail akunmu pada halaman ini.</span>
                </div>
            </aside>
            <section className="flex flex-col gap-y-4 p-4 w-full max-w-5xl">
                <article className="card bg-base-100">
                    <div className="card-body gap-y-4 ">
                        <div className="flex items-center gap-x-2">
                            <img
                                alt="User Avatar"
                                src={authedUser.avatar}
                                className="w-20 h-20 rounded-full ring ring-primary ring-offset-primary-content ring-offset-2"
                            />
                        </div>
                        <div className="flex flex-col items-stretch justify-start">
                            <h1 className="text-lg font-semibold text-primary mb-2">Nama Lengkap</h1>
                            <div
                                type="text"
                                placeholder="Type here"
                                className="label input input-ghost w-full max-w-full uppercase !text-base-content"
                                disabled
                            >
                                {authedUser.name}
                            </div>
                        </div>
                        <div className="flex flex-col items-stretch justify-start">
                            <h1 className="text-lg font-semibold text-primary mb-2">Email</h1>
                            <div
                                type="text"
                                placeholder="Type here"
                                className="label input input-ghost w-full max-w-full !text-base-content"
                                disabled
                            >
                                {authedUser.email}
                            </div>
                        </div>
                        <div className="flex flex-col items-stretch justify-start">
                            <h1 className="text-lg font-semibold text-primary mb-2">Total Diskusi</h1>
                            <div
                                type="text"
                                placeholder="Type here"
                                className="label input input-ghost w-full max-w-full uppercase !text-base-content"
                                disabled
                            >
                                {totalThreads}
                            </div>
                        </div>
                        <div className="flex flex-col items-stretch justify-start">
                            <h1 className="text-lg font-semibold text-primary mb-2">Total Score</h1>
                            <div
                                type="text"
                                placeholder="Type here"
                                className="label input input-ghost w-full max-w-full uppercase !text-base-content"
                                disabled
                            >
                                {totalScore}
                            </div>
                        </div>
                        <div className="card-actions justify-end items-end">
                            <ul className="menu menu-horizontal">
                                <li>
                                    <ActionButton
                                        id="logout-button"
                                        variant="solid"
                                        onClick={() => dispatch(logoutUser())}
                                    >
                                        <ExitSVG className="w-6 h-6 stroke-current group-hover:stroke-current" />
                                        <span>Logout</span>
                                    </ActionButton>
                                </li>
                            </ul>
                        </div>
                    </div>
                </article>
            </section>
        </section>
    );
}

export default ProfilePage;
