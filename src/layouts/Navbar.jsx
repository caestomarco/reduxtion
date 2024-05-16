import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import { logoutUser } from '../states/user/userSlice';

import ActionButton from '../components/ui/ActionButton';
import LinkButton from '../components/ui/LinkButton';
import { HamburgerSVG, HomeSVG, LeaderboardSVG, ProfileSVG, UsersSVG, ExitSVG } from '../components/ui/Icons';

function Navbar() {
    // HOOKS
    const dispatch = useDispatch();
    const location = useLocation();

    // STORE's STATE
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    const authedUser = useSelector((state) => state.user.authedUser);
    const isLoading = useSelector((state) => state.user.isLoading);

    return (
        <nav className="navbar">
            <div className="navbar-start">
                <div className="dropdown">
                    <button
                        type="button"
                        className="btn btn-ghost lg:hidden"
                    >
                        <span className="sr-only">Hamburger Icon</span>
                        <HamburgerSVG className="h-6 w-6 stroke-secondary" />
                    </button>
                    <ul className="dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-60">
                        <li>
                            <LinkButton
                                id="home-sm-button"
                                tooltip="Home"
                                destination="/threads"
                                variant="ghost"
                            >
                                <HomeSVG className={`w-6 h-6 group-hover:stroke-secondary ${location.pathname === '/threads' ? 'stroke-secondary' : 'stroke-base-content'}`} />
                                <span>Home</span>
                            </LinkButton>
                        </li>
                        <li>
                            <LinkButton
                                id="leaderboard-sm-button"
                                tooltip="Leaderboard"
                                destination="/threads/leaderboard"
                                variant="ghost"
                            >
                                <LeaderboardSVG className={`w-6 h-6 group-hover:stroke-secondary ${location.pathname === '/threads/leaderboard' ? 'stroke-secondary ' : 'stroke-base-content'}`} />
                                <span>Leaderboard</span>
                            </LinkButton>
                        </li>
                        <li>
                            <LinkButton
                                id="users-sm-button"
                                tooltip="Users"
                                destination="/users"
                                variant="ghost"
                            >
                                <UsersSVG
                                    className={`w-6 h-6 ${location.pathname === '/users' ? 'stroke-secondary group-hover:stroke-secondary' : 'stroke-base-content group-hover:stroke-secondary'}`}
                                />
                                <span>Users</span>
                            </LinkButton>
                        </li>
                    </ul>
                </div>
                <Link
                    to="/"
                    className="btn btn-ghost text-secondary font-bold text-xl lg:text-2xl"
                >
                    <img
                        src="/redux.svg"
                        alt="logo"
                        className="h-8 w-8"
                    />
                    Reduxtion
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal gap-x-4 py-0">
                    <li>
                        <LinkButton
                            id="home-button"
                            tooltip="Home"
                            destination="/threads"
                        >
                            <span className="sr-only">Home</span>
                            <HomeSVG className={`w-8 h-8 group-hover:stroke-secondary ${location.pathname === '/threads' ? 'stroke-secondary' : 'stroke-base-content'}`} />
                        </LinkButton>
                    </li>
                    <li>
                        <LinkButton
                            id="leaderboard-button"
                            tooltip="Leaderboard"
                            destination="/threads/leaderboard"
                        >
                            <span className="sr-only">Leaderboard</span>
                            <LeaderboardSVG className={`w-8 h-8 group-hover:stroke-secondary ${location.pathname === '/threads/leaderboard' ? 'stroke-secondary' : 'stroke-base-content'}`} />
                        </LinkButton>
                    </li>
                    <li>
                        <LinkButton
                            id="users-button"
                            tooltip="Users"
                            destination="/users"
                        >
                            <span className="sr-only">Home</span>
                            <UsersSVG className={`w-8 h-8 ${location.pathname === '/users' ? 'stroke-secondary group-hover:stroke-secondary' : 'stroke-base-content group-hover:stroke-secondary'}`} />
                        </LinkButton>
                    </li>
                </ul>
            </div>
            <div className="navbar-end gap-x-2">
                {(() => {
                    if (isLoading === true) {
                        return <div className="h-12 skeleton w-1/2" />;
                    }
                    if (isLoggedIn === true) {
                        return (
                            <div className="dropdown dropdown-end">
                                <button
                                    type="button"
                                    className="btn btn-ghost font-bold uppercase avatar justify-start"
                                >
                                    <div className="w-10 rounded-full">
                                        <img
                                            alt="User Avatar"
                                            src="https://ui-avatars.com/api/?name=Caesto+Marco&background=random"
                                        />
                                    </div>
                                    {authedUser.name}
                                </button>
                                <ul className="dropdown-content mt-3 z-10 p-2 shadow bg-base-100 rounded-box w-60">
                                    <li>
                                        <LinkButton
                                            id="profile-button"
                                            tooltip="Profile"
                                            destination="/settings/profile"
                                            variant="ghost"
                                        >
                                            <ProfileSVG className={`w-6 h-6 group-hover:stroke-secondary ${location.pathname === '/settings/profile' ? 'stroke-secondary ' : 'stroke-base-content'}`} />
                                            <span>Profil Saya</span>
                                        </LinkButton>
                                    </li>
                                    <li>
                                        <ActionButton
                                            id="logout-button"
                                            variant="ghost"
                                            onClick={() => dispatch(logoutUser())}
                                        >
                                            <ExitSVG className="w-6 h-6 stroke-base-content group-hover:stroke-secondary" />
                                            <span>Logout</span>
                                        </ActionButton>
                                    </li>
                                </ul>
                            </div>
                        );
                    }
                    return (
                        <>
                            <LinkButton
                                id="login-button"
                                tooltip="Login"
                                destination="/auth/login"
                                variant="ghost"
                            >
                                Masuk
                            </LinkButton>
                            <LinkButton
                                id="login-button"
                                tooltip="Register"
                                destination="/auth/register"
                                variant="solid"
                            >
                                Daftar
                            </LinkButton>
                        </>
                    );
                })()}
            </div>
        </nav>
    );
}

export default Navbar;
