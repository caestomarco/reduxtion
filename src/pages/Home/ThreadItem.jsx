import React from 'react';
import PropTypes from 'prop-types';
import parser from 'html-react-parser';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { postedAt } from '../../utils';

import { upVoteThread, downVoteThread, neutralizeThreadVote } from '../../states/globalSlice';

import ActionButton from '../../components/ui/ActionButton';
import { TimeSVG, UpVoteSVG, DownVoteSVG, CommentSVG } from '../../components/ui/Icons';

function ThreadItem({ id, title, body, category, createdAt, upVotesBy, downVotesBy, totalComments, owner }) {
    // HOOKS
    const dispatch = useDispatch();

    // STORE's STATE
    const authedUser = useSelector((state) => state.user.authedUser);
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

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

    return (
        <div className="card w-full border-2 border-primary hover:bg-primary/10 transition-all ">
            <div className="card-body gap-y-4 ">
                <div className="flex items-center gap-x-2">
                    {/* OWNER */}
                    <img
                        alt="User Avatar"
                        src={owner.avatar}
                        className="w-10 h-10 rounded-full"
                    />
                    <span className="font-bold uppercase">{owner.name}</span>
                    {/* CATEGORY */}
                    <div className="ml-auto">
                        <div
                            type="button"
                            className="badge badge-secondary badge-lg badge-outline"
                        >
                            {category}
                        </div>
                    </div>
                </div>
                {/* TITLE */}
                <Link to={`/threads/${category}/${id}`}>
                    <h2 className="card-title text-primary justify-between cursor-pointer hover:underline decoration-primary overflow-hidden">{title}</h2>
                </Link>
                {/* BODY */}
                <section className="line-clamp-1">{parser(body)}</section>
                {/* VOTES */}
                <div className="card-actions justify-between items-end">
                    <ul className="menu menu-horizontal">
                        <li className="pointer-events-none">
                            <span className="flex items-center">
                                <TimeSVG className="w-5 h-5 stroke-current" />
                                {postedAt(createdAt)}
                            </span>
                        </li>
                    </ul>
                    <ul className="menu menu-horizontal items-center">
                        <li>
                            <ActionButton
                                id="upvote-button"
                                onClick={() => (upVotesBy.find((vote) => vote === authedUser.id) ? handleNeutralizeVote() : handleUpVote())}
                            >
                                <UpVoteSVG
                                    className={`w-5 h-5 group-hover:stroke-secondary group-hover:fill-secondary ${
                                        upVotesBy.find((vote) => vote === authedUser.id) ? 'fill-secondary stroke-secondary' : 'stroke-current'
                                    }`}
                                />
                                {upVotesBy.length}
                            </ActionButton>
                        </li>
                        <li>
                            <ActionButton
                                id="downvote-button"
                                onClick={() => (downVotesBy.find((vote) => vote === authedUser.id) ? handleNeutralizeVote() : handleDownVote())}
                            >
                                <DownVoteSVG
                                    className={`w-5 h-5 group-hover:stroke-secondary group-hover:fill-secondary ${
                                        downVotesBy.find((vote) => vote === authedUser.id) ? 'fill-secondary stroke-secondary' : 'stroke-current'
                                    }`}
                                />
                                {downVotesBy.length}
                            </ActionButton>
                        </li>
                        <li className="pointer-events-none">
                            <span className="flex items-center font-bold text-base">
                                <CommentSVG className="w-5 h-5 stroke-current" />
                                {totalComments}
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

const ownerShape = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
};

const threadShape = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    totalComments: PropTypes.number.isRequired,
    owner: PropTypes.shape(ownerShape).isRequired,
};

ThreadItem.propTypes = threadShape;

export default ThreadItem;
