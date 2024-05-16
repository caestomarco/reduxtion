import React from 'react';

function CategorySkeleton() {
    return (
        <section className="space-y-2 max-h-60 overflow-y-auto ">
            {[...Array(3)].map((_, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <div className="label cursor-pointer group skeleton" key={index}>
                    <span className="label-text group-hover:text-secondary group-hover:font-bold" />
                    <div className="h-6 skeleton" />
                </div>
            ))}
        </section>
    );
}

export default CategorySkeleton;
