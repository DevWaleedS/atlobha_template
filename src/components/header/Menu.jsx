// react
import React from "react";

// third-party
import classNames from "classnames";
import PropTypes from "prop-types";

// application
import AppLink from "../shared/AppLink";
import { ArrowRoundedRight6x9Svg } from "../../svg";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function Menu(props) {
    const domain = window.location.pathname.split('/')[1];
    const { layout, withIcons, items, onClick } = props;
    const renderLink = (item, content) => {
        let link;

        if (item?.url) {
            link = (
                <AppLink {...item.props} to={item?.url} onClick={() => onClick(item?.url)}>
                    {content}
                </AppLink>
            );
        } else {
            link = <Link to={`/${domain}/site/SitePages/${item?.id}`}>{item?.name}</Link>;
        }

        return link;
    };

    const itemsList = items?.subcategory?.map((item, index) => {
        let arrow;
        let submenu;
        let icon;

        if (item?.subcategory && item?.subcategory?.length) {
            arrow = <ArrowRoundedRight6x9Svg className="menu__arrow" />;
        }

        if (item?.subcategory && item?.subcategory?.length) {
            submenu = (
                <div className="menu__submenu">
                    <Menu items={item?.subcategory} />
                </div>
            );
        }

        if (withIcons && item.icon) {
            icon = (
                <div className="menu__icon">
                    <img src={item.icon} srcSet={item.icon_srcset} alt="" />
                </div>
            );
        }

        return (
            <li key={index}>
                {renderLink(
                    item,
                    <React.Fragment>
                        {icon}
                        {item?.name}
                        {arrow}
                    </React.Fragment>
                )}
                {submenu}
            </li>
        );
    });

    const classes = classNames(`menu menu--layout--${layout}`, {
        "menu--with-icons": withIcons,
    });

    return <ul className={classes}>{itemsList}</ul>;
}

Menu.propTypes = {
    /** one of ['classic', 'topbar'] (default: 'classic') */
    layout: PropTypes.oneOf(["classic", "topbar"]),
    /** default: false */
    withIcons: PropTypes.bool,
    /** array of menu items */
    items: PropTypes.object,
    /** callback function that is called when the item is clicked */
    onClick: PropTypes.func,
};

Menu.defaultProps = {
    layout: "classic",
    withIcons: false,
    items: {},
    onClick: () => {},
};

export default Menu;
