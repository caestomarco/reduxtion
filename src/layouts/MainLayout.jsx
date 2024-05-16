import React from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';

import { fetchAuthedUser } from '../states/user/userSlice';

import Navbar from './Navbar';
import Footer from './Footer';
import Loading from '../components/ui/Loading';

function MainLayout() {
    // HOOKS
    const dispatch = useDispatch();

    // EFFECTS
    React.useEffect(() => {
        dispatch(fetchAuthedUser());
    }, []);

    return (
        <div>
            <Loading />
            <Navbar />
            <main className="flex max-w-screen-xl min-h-screen mx-auto">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}

export default MainLayout;
