import React from 'react';
import { RouterProvider, Navigate, createBrowserRouter } from 'react-router-dom';

import { AUTH_PATHS, MAIN_PATHS } from './utils/paths';

import AuthLayout from './layouts/AuthLayout';
import MainLayout from './layouts/MainLayout';

import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';

import HomePage from './pages/Home';
import LeaderboardPage from './pages/Leaderboard';
import CreatePage from './pages/CreateThread';
import DetailPage from './pages/ThreadDetail';
import ProfilePage from './pages/Profile';
import UserListPage from './pages/UserList';

import ErrorPage from './pages/Errors';

function App() {
    const router = createBrowserRouter([
        // AUTH
        {
            path: '/auth',
            element: (
                <Navigate
                    to="/auth/login"
                    replace
                />
            ),
        },
        {
            path: '/auth/*',
            element: <AuthLayout />,
            errorElement: <ErrorPage />,
            children: [
                {
                    path: AUTH_PATHS.LOGIN,
                    element: <LoginPage />,
                },
                {
                    path: AUTH_PATHS.REGISTER,
                    element: <RegisterPage />,
                },
                {
                    path: '*',
                    element: <ErrorPage />,
                },
            ],
        },

        // THREADS
        {
            path: '/',
            element: (
                <Navigate
                    to="/threads"
                    replace
                />
            ),
        },
        {
            path: '/threads/*',
            element: <MainLayout />,
            errorElement: <ErrorPage />,
            children: [
                {
                    index: true,
                    element: <HomePage />,
                },
                {
                    path: MAIN_PATHS.CREATE_THREAD,
                    element: <CreatePage />,
                },
                {
                    path: MAIN_PATHS.THREAD_DETAIL,
                    element: <DetailPage />,
                },
                {
                    path: MAIN_PATHS.THREAD_LEADERBOARD,
                    element: <LeaderboardPage />,
                },
                {
                    path: '*',
                    element: <ErrorPage />,
                },
            ],
        },

        // USERS
        {
            path: '/users/*',
            element: <MainLayout />,
            errorElement: <ErrorPage />,
            children: [
                {
                    index: true,
                    element: <UserListPage />,
                },
                {
                    path: '*',
                    element: <ErrorPage />,
                },
            ],
        },

        // PROFILE
        {
            path: '/settings',
            element: (
                <Navigate
                    to="/settings/profile"
                    replace
                />
            ),
        },
        {
            path: '/settings/*',
            element: <MainLayout />,
            errorElement: <ErrorPage />,
            children: [
                {
                    path: MAIN_PATHS.PROFILE_SETTING,
                    element: <ProfilePage />,
                },
                {
                    path: '*',
                    element: <ErrorPage />,
                },
            ],
        },

        // NOT FOUND
        {
            path: '*',
            element: <ErrorPage />,
        },
    ]);

    return <RouterProvider router={router} />;
}

export default App;
