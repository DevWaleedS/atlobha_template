// react
import React from "react";

// third-party
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";

// application
import NavPanel from "./NavPanel";
import Search from "./Search";

function Header(props) {
    const domain = window.location.pathname.split('/')[1];
    const { layout, fetchedData } = props;
    let bannerSection;

    if (layout === "default") {
        bannerSection = (
            <div className="site-header__middle container">
                <div className="site-header__logo">
                    <Link to={`/${domain || fetchedData?.domain}`}>
                        <img src={fetchedData?.logo} alt="logo" width="100%" height="100%" />
                    </Link>
                </div>
                <div className="site-header__search">
                    <Search fetchedData={fetchedData} context="header" />
                </div>
                <div className="site-header__phone">
                    <div className="site-header__phone-title">
                        <FormattedMessage id="header.phoneLabel" defaultMessage="خدمة العملاء" />
                    </div>
                    <div className="site-header__phone-number">
                        {fetchedData?.phonenumber?.slice(5)}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="site-header">
            {bannerSection}
            <div className="site-header__nav-panel">
                <NavPanel fetchedData={fetchedData} layout={layout} />
            </div>
        </div>
    );
}

Header.propTypes = {
    /** one of ['default', 'compact'] (default: 'default') */
    layout: PropTypes.oneOf(["default", "compact"]),
};

Header.defaultProps = {
    layout: "default",
};

export default Header;
