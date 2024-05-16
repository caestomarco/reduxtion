import React from 'react';
import PropTypes from 'prop-types';

function CategoryItem({ category, selectedCategory, onChange }) {
    const isSelected = selectedCategory === category;

    return (
        <div className="form-control rounded-box">
            <label
                htmlFor={category}
                className="label cursor-pointer group"
            >
                <span className="label-text group-hover:text-secondary group-hover:font-bold">{category}</span>
                <input
                    id={category}
                    type="radio"
                    name="category"
                    className="radio radio-secondary"
                    checked={isSelected}
                    onChange={() => onChange(category)}
                />
            </label>
        </div>
    );
}

CategoryItem.propTypes = {
    category: PropTypes.string.isRequired,
    selectedCategory: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default CategoryItem;
