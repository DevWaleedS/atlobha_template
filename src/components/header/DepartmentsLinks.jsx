// react
import React from 'react';

// third-party
import { Link } from 'react-router-dom';

// application
import Megamenu from './Megamenu';
import Menu from './Menu';
import { ArrowRoundedRight6x9Svg } from '../../svg';

// data stubs
// import departments from '../../data/headerDepartments';

function DepartmentsLinks({ props }) {
    const { fetchedData } = props;
    const linksList = fetchedData?.category?.map((department, index) => {
        let arrow = null;
        let submenu = null;
        let itemClass = '';

        if (department?.subcategory) {
            arrow = <ArrowRoundedRight6x9Svg className="departments__link-arrow" />;
        }

        if (department?.subcategory && department?.subcategory.type === 'menu') {
            itemClass = 'departments__item--menu';
            submenu = (
                <div className="departments__menu">
                    <Menu items={department.subcategory?.name} />
                </div>
            );
        }

        if (department?.subcategory && department?.subcategory?.type === 'megamenu') {
            submenu = (
                <div className={`departments__megamenu departments__megamenu--${department?.subcategory?.menu.size}`}>
                    <Megamenu menu={department?.subcategory?.name} location="department" />
                </div>
            );
        }

        return (
            <li key={index} className={`departments__item ${itemClass}`}>
                <Link to={department.url}>
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
