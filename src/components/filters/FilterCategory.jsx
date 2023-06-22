// react
import React, { Fragment } from 'react';

// third-party
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// application
import { ArrowRoundedLeft6x9Svg } from '../../svg';
import { getCategoryParents } from '../../services/utils';

function FilterCategory(props) {
    const domain = window.location.pathname.split('/')[1];
    const { data,activeCategory } = props;
    const categoriesList = data?.items?.map((category) => {
        const itemClasses = classNames('filter-categories__item', {
            'filter-categories__item--current': Number(activeCategory) === category?.id,
        });

        return (
            <Fragment key={category?.id}>
                {getCategoryParents(category).map((parent) => (
                    <li key={parent?.id} className="filter-categories__item filter-categories__item--parent">
                        <ArrowRoundedLeft6x9Svg className="filter-categories__arrow" />
                        <Link to={`/${domain}/shop/products-by-category/${parent?.id}`}>{parent?.name}1</Link>
                    </li>
                ))}
                <li className={itemClasses}>
                    <Link to={`/${domain}/shop/products-by-category/${category?.id}`}>{category?.name}</Link>
                </li>
                {category?.s && category?.subcategory?.map((child) => (
                    <li key={child.id} className="filter-categories__item filter-categories__item--child">
                        <Link to={`/${domain}/shop/products-by-category/${child?.id}`}>{child?.name}</Link>
                    </li>
                ))}
            </Fragment>
        );
    });

    if (activeCategory) {
        categoriesList.unshift(
            <li key="[shop]" className="filter-categories__item filter-categories__item--parent">
                <ArrowRoundedLeft6x9Svg className="filter-categories__arrow" />
                <Link to={`/${domain}/shop/products`}>كل المنتجات</Link>
            </li>,
        );
    }

    return (
        <div className="filter-categories">
            <ul className="filter-categories__list">
                {categoriesList}
            </ul>
        </div>
    );
}

FilterCategory.propTypes = {
    /**
     * Filter object.
     */
    data: PropTypes.object,
};

export default FilterCategory;
