import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import parser from 'html-react-parser';
import PropTypes from 'prop-types';

import { postedAt } from '../../utils';

import { downVoteComment, neutralizeCommentVote, upVoteComment } from '../../states/thread/threadSlice';

import ActionButton from '../../components/ui/ActionButton';
import { UpVoteSVG, DownVoteSVG, TimeSVG } from '../../components/ui/Icons';

function CommentItem({ id, content, createdAt, upVotesBy, downVotesBy, owner, threadId }) {
    // HOOKS
    const dispatch = useDispatch();

    // STORE's STATE
    const authedUser = useSelector((state) => state.user.authedUser);
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

    // ACTION
    const handleUpVote = () => {
        if (isLoggedIn === false) {
            alert('You must be logged in to vote!');
        } else {
            dispatch(upVoteComment({ commentId: id, threadId, authedUserId: authedUser.id }));
        }
    };

    const handleDownVote = () => {
        if (isLoggedIn === false) {
            alert('You must be logged in to vote!');
        } else {
            dispatch(downVoteComment({ commentId: id, threadId, authedUserId: authedUser.id }));
        }
    };

    const handleNeutralizeVote = () => {
        if (isLoggedIn === false) {
            alert('You must be logged in to vote!');
        } else {
            dispatch(neutralizeCommentVote({ commentId: id, threadId, authedUserId: authedUser.id }));
        }
    };

    return (
        <div className="card w-full border-2 border-primary hover:bg-primary/10 transition-all">
            <div className="card-body gap-y-4">
                {/* OWNER */}
                <div className="w-full flex items-center gap-x-2">
                    <img
                        alt="User Avatar"
                        src={owner.avatar}
                        className="w-10 h-10 rounded-full"
                    />
                    <span className="font-bold uppercase">{owner.name}</span>
                </div>
                {/* COMMENT CONTENT */}
                <section className="line-clamp-1">{parser(content)}</section>
                <div className="card-actions justify-between items-end">
                    {/* CREATED AT */}
                    <ul className="menu menu-horizontal">
                        <li className="pointer-events-none">
                            <span className="flex items-center">
                                <TimeSVG className="w-5 h-5 stroke-current" />
                                {postedAt(createdAt)}
                            </span>
                        </li>
                    </ul>
                    {/* VOTES */}
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
                    </ul>
                </div>
            </div>
        </div>
    );
}

const ownerShape = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
};

const commentShape = {
    id: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    threadId: PropTypes.string.isRequired,
    owner: PropTypes.shape(ownerShape).isRequired,
};

CommentItem.propTypes = commentShape;

export default CommentItem;
