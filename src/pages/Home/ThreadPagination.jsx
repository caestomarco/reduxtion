import React from 'react';
import PropTypes from 'prop-types';

function Pagination({ disabledNext, disabledPrevious, action, currentPage = 1 }) {
    return (
        <div className="join self-end">
            <button
                type="button"
                className="join-item btn btn-outline btn-primary"
                onClick={() => action(-1)}
                disabled={disabledPrevious}
            >
                «
            </button>
            <button
                type="button"
                className="join-item btn btn-primary disabled:btn-outline"
                disabled
            >
                {`Halaman ${currentPage}`}
            </button>
            <button
                type="button"
                className="join-item btn btn-outline btn-primary"
                onClick={() => action(1)}
                disabled={disabledNext}
            >
                »
            </button>
        </div>
    );
}

Pagination.propTypes = {
    disabledNext: PropTypes.bool.isRequired,
    disabledPrevious: PropTypes.bool.isRequired,
    action: PropTypes.func.isRequired,
    currentPage: PropTypes.number,
};

export default Pagination;
