import React from 'react';
import PropTypes from 'prop-types';

import CommentItem from './CommentItem';
import { CommentSVG } from '../../components/ui/Icons';

function CommentList({ comments, threadId }) {
    return (
        <article className="card">
            <section className="card-body gap-y-4">
                <div className="w-full gap-x-2 card-title justify-between ">
                    <h1 className="flex items-center gap-x-2">
                        <CommentSVG className="w-6 h-6 stroke-primary" />
                        <span className="text-xl font-bold text-primary">Komentar</span>
                    </h1>
                </div>
                {comments.map((comment) => (
                    <CommentItem
                        key={comment.id}
                        threadId={threadId}
                        {...comment}
                    />
                ))}
            </section>
        </article>
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
    owner: PropTypes.shape(ownerShape).isRequired,
};

CommentList.propTypes = {
    comments: PropTypes.arrayOf(PropTypes.shape(commentShape)).isRequired,
    threadId: PropTypes.string.isRequired,
};

export default CommentList;
