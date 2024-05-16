import { configureStore } from '@reduxjs/toolkit';
import { loadingBarReducer } from 'react-redux-loading-bar';

import threadsReducer from './thread/threadSlice';
import usersReducer from './user/userSlice';
import leaderboardReducer from './leaderboard/leaderboardSlice';
import globalReducer from './globalSlice';

const store = configureStore({
    reducer: {
        global: globalReducer,
        thread: threadsReducer,
        user: usersReducer,
        leaderboard: leaderboardReducer,
        loadingBar: loadingBarReducer,
    },
});

export default store;
