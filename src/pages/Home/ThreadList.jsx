import React from 'react';
import PropTypes from 'prop-types';

import ThreadItem from './ThreadItem';

function ThreadList({ threads }) {
    return (
        <section className="space-y-4">
            {threads.map((thread) => (
                <ThreadItem
                    key={thread.id}
                    {...thread}
                />
            ))}
        </section>
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

ThreadList.propTypes = {
    threads: PropTypes.arrayOf(PropTypes.shape(threadShape)).isRequired,
};

export default ThreadList;
