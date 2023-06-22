// react
import React from 'react';

// third-party
import { Link } from 'react-router-dom';

// application
import Menu from './Menu';
import { ArrowRoundedRight6x9Svg } from '../../svg';

// data stubs
// import departments from '../../data/headerDepartments';

function DepartmentsLinks({ fetchedData }) {
    const domain = window.location.pathname.split('/')[1];
    const linksList = fetchedData?.category?.map((department, index) => {
        let arrow = null;
        let submenu = null;
        let itemClass = '';
        const type = 'menu';

        if (department?.subcategory) {
            arrow = <ArrowRoundedRight6x9Svg className="departments__link-arrow" />;
        }

        if (department?.subcategory && type === 'menu') {
            itemClass = 'departments__item--menu';
            submenu = (
                <div className="departments__menu">
                    <Menu items={department} layout="classic" />
                </div>
            );
        }

        return (
            <li key={index} className={`departments__item ${itemClass}`}>
                <Link to={`/${domain}/shop/products-by-category/${department?.id}`}>
                    {department?.name}
                    {arrow}
                </Link>
                {submenu}
            </li>
        );
    });

    return (
        <ul className="departments__links">
            {linksList}
        </ul>
    );
}

export default DepartmentsLinks;
