import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchLeaderboards } from '../../states/leaderboard/leaderboardSlice';

function LeaderboardPage() {
    // HOOKS
    const dispatch = useDispatch();

    // STORE's STATE
    const isLoading = useSelector((state) => state.leaderboard.isLoading);
    const leaderboards = useSelector((state) => state.leaderboard.leaderboards);

    // EFFECTS
    React.useEffect(() => {
        dispatch(fetchLeaderboards());
    }, []);

    return (
        <main className="p-8 flex gap-x-4 basis-full justify-center">
            <section className="flex flex-col gap-y-4 p-4 w-full max-w-screen-md items-stretch">
                <h1 className="p-4 text-3xl font-bold self-center">Leaderboard</h1>
                <div className="overflow-x-auto">
                    <table className="table p-4 ">
                        <thead>
                            <tr>
                                <th className="w-1/4">Rank</th>
                                <th className="w-1/2">Name</th>
                                <th className="w-1/4">Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(() => {
                                if (isLoading === false && leaderboards.length > 0) {
                                    return leaderboards.map((leaderboard, index) => (
                                        <tr
                                            key={leaderboard.user.id}
                                            className={`${index === 0 ? 'text-warning bg-base-300' : ''}`}
                                        >
                                            <th className="w-1/4">{index + 1}</th>
                                            <td className="w-1/2 flex items-center gap-x-2">
                                                <img
                                                    alt="User Avatar"
                                                    src={leaderboard.user.avatar}
                                                    className="w-8 h-8 rounded-full"
                                                />
                                                <span className="font-bold uppercase">{leaderboard.user.name}</span>
                                            </td>
                                            <td className="w-1/4 font-bold text-lg">{leaderboard.score}</td>
                                        </tr>
                                    ));
                                }
                                return (
                                    <tr>
                                        <td
                                            colSpan={3}
                                            className="skeleton rounded-none w-full text-center"
                                        >
                                            Loading...
                                        </td>
                                    </tr>
                                );
                            })()}
                        </tbody>
                    </table>
                </div>
            </section>
        </main>
    );
}

export default LeaderboardPage;
