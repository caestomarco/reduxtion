import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';

import { fetchAuthedUser } from '../states/user/userSlice';

import Loading from '../components/ui/Loading';

function AuthLayout() {
    // HOOKS
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // STORE's STATE
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

    // EFFECTS
    React.useEffect(() => {
        if (isLoggedIn === true) {
            navigate('/', { replace: true });
        }
        dispatch(fetchAuthedUser());
    }, [isLoggedIn]);

    return (
        <div>
            <Loading />
            <main className="flex flex-col justify-center items-center max-w-screen-xl h-screen mx-auto">
                <Outlet />
            </main>
        </div>
    );
}

export default AuthLayout;
