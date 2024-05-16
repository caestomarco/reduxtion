import React from 'react';

function ThreadSkeleton() {
    return (
        <section className="space-y-4">
            {[...Array(3)].map((_, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <section className="card w-full bg-base-100" key={index}>
                    <div className="card-body gap-y-4 w-full p-8">
                        <div className="flex gap-x-2 items-center w-full">
                            <div className="skeleton w-10 h-10 shrink-0 rounded-full" />
                            <div className="skeleton h-4 w-28" />
                            <div className="skeleton h-4 w-10 justify-self-end ml-auto" />
                        </div>
                        <div className="skeleton h-4 w-28" />
                        <div className="skeleton h-4 w-72" />
                    </div>
                </section>
            ))}
        </section>
    );
}

export default ThreadSkeleton;
