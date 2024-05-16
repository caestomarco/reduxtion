import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import parser from 'html-react-parser';

import { postedAt } from '../../utils';

import { fetchThreadDetail, upVoteThread, downVoteThread, neutralizeThreadVote, resetSuccessStatus } from '../../states/thread/threadSlice';

import CreateCommentForm from './CreateCommentForm';
import { DownVoteSVG, UpVoteSVG } from '../../components/ui/Icons';
import CommentList from './CommentList';
import ActionButton from '../../components/ui/ActionButton';

function DetailPage() {
    // HOOKS
    const dispatch = useDispatch();
    const { id } = useParams();

    // STORE's STATE
    const threadDetail = useSelector((state) => state.thread.threadDetail);
    const isLoading = useSelector((state) => state.thread.isLoading);
    const isError = useSelector((state) => state.thread.isError);
    const isSuccess = useSelector((state) => state.thread.isSuccess);
    const authedUser = useSelector((state) => state.user.authedUser);
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

    // EFFECTS
    React.useEffect(() => {
        dispatch(fetchThreadDetail(id));
    }, []);

    React.useEffect(() => {
        if (isSuccess) {
            dispatch(resetSuccessStatus());
        }
    }, [isSuccess]);

    // ACTIONS
    const handleUpVote = () => {
        if (isLoggedIn === false) {
            alert('You must be logged in to vote!');
        } else {
            dispatch(upVoteThread({ threadId: id, authedUserId: authedUser.id }));
        }
    };

    const handleDownVote = () => {
        if (isLoggedIn === false) {
            alert('You must be logged in to vote!');
        } else {
            dispatch(downVoteThread({ threadId: id, authedUserId: authedUser.id }));
        }
    };

    const handleNeutralizeVote = () => {
        if (isLoggedIn === false) {
            alert('You must be logged in to vote!');
        } else {
            dispatch(neutralizeThreadVote({ threadId: id, authedUserId: authedUser.id }));
        }
    };

    if (isLoading) {
        // SKELETON HERE
        return null;
    }

    if (isError) {
        return (
            <section className="flex flex-col items-center justify-center px-4 text-center basis-full">
                <h1 className="text-9xl font-black text-secondary ">404</h1>
                <p className="font-bold tracking-tight text-secondary sm:text-4xl">Uh-oh!</p>
                <p className="mt-4 text-zinc-500">Thread yang dituju tidak ditemukan.</p>
            </section>
        );
    }

    return (
        <section className="flex p-8 gap-x-4 basis-full">
            {/* VOTES */}
            <aside className="w-full max-w-60 hidden lg:block">
                <h1 className="p-4 text-3xl font-bold">Detail Diskusi</h1>
                <div className="space-y-4 p-4 ">
                    <span>Berikan vote dengan menekan salah satu tombol di bawah.</span>
                    <ul className="menu menu-vertical justify-center items-center">
                        <li className="group">
                            <ActionButton
                                id="upvote-button"
                                onClick={() => (threadDetail.upVotesBy.find((vote) => vote === authedUser.id) ? handleNeutralizeVote() : handleUpVote())}
                            >
                                <UpVoteSVG
                                    className={`w-12 h-12 group-hover:stroke-secondary group-hover:fill-secondary ${
                                        threadDetail.upVotesBy.find((vote) => vote === authedUser.id) ? 'fill-secondary stroke-secondary' : 'stroke-current'
                                    }`}
                                />
                            </ActionButton>
                        </li>
                        <li>
                            <span className="font-bold text-xl pointer-events-none">{threadDetail.upVotesBy.length - threadDetail.downVotesBy.length}</span>
                        </li>
                        <li className="group">
                            <ActionButton
                                id="downvote-button"
                                onClick={() => (threadDetail.downVotesBy.find((vote) => vote === authedUser.id) ? handleNeutralizeVote() : handleDownVote())}
                            >
                                <DownVoteSVG
                                    className={`w-12 h-12 group-hover:stroke-secondary group-hover:fill-secondary ${
                                        threadDetail.downVotesBy.find((vote) => vote === authedUser.id) ? 'fill-secondary stroke-secondary' : 'stroke-current'
                                    }`}
                                />
                            </ActionButton>
                        </li>
                    </ul>
                </div>
            </aside>
            <section className="flex flex-col gap-y-4 p-4 w-full max-w-5xl">
                {/* ORIGINAL POST */}
                <article className="card bg-base-100">
                    <div className="card-body gap-y-4 ">
                        <div className="w-full gap-x-2 card-title justify-between ">
                            <h1 className="text-3xl font-bold overflow-hidden">{threadDetail.title}</h1>
                        </div>
                        <section className="overflow-hidden">{parser(threadDetail.body)}</section>
                        <div className="card-actions justify-between items-end">
                            <ul className="menu menu-horizontal">
                                <li className=" pointer-events-none">
                                    <span className="flex rounded-box bg-base-300">
                                        Category:
                                        <div className="badge badge-secondary badge-lg badge-outline">{threadDetail.category}</div>
                                    </span>
                                </li>
                            </ul>
                            <ul className="menu menu-horizontal">
                                <li className=" pointer-events-none">
                                    <span className="flex flex-col rounded-box bg-base-300">
                                        {`created ${postedAt(threadDetail.createdAt)} by`}
                                        <div className="w-full flex items-center gap-x-2 ">
                                            <img
                                                alt="User Avatar"
                                                src={threadDetail.owner.avatar}
                                                className="w-10 h-10 rounded-full"
                                            />
                                            <span className="font-bold uppercase">{threadDetail.owner.name}</span>
                                        </div>
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </article>
                {/* COMMENT FORM */}
                <CreateCommentForm threadId={threadDetail.id} />
                {/* COMMENT LIST */}
                <CommentList
                    comments={threadDetail.comments}
                    threadId={threadDetail.id}
                />
            </section>
        </section>
    );
}

export default DetailPage;
