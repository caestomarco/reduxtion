import React from 'react';
import PropTypes from 'prop-types';

import CategoryItem from './CategoryItem';

function CategoryList({ categories, selectedCategory, onChange }) {
    return (
        <section
            className="relative space-y-2 max-h-60 overflow-y-scroll"
            style={{ scrollbarWidth: 'none' }}
        >
            {categories.map((category) => (
                <CategoryItem
                    key={category}
                    category={category}
                    selectedCategory={selectedCategory}
                    onChange={onChange}
                />
            ))}
        </section>
    );
}

CategoryList.propTypes = {
    categories: PropTypes.arrayOf(PropTypes.string).isRequired,
    selectedCategory: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default CategoryList;
