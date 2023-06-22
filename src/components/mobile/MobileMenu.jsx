// react
import React from "react";

// third-party
import classNames from "classnames";
import { connect } from "react-redux";

// application
import MobileLinks from "./MobileLinks";
import { Cross20Svg } from "../../svg";
import { currencyChange } from "../../store/currency";
import { localeChange } from "../../store/locale";
import { mobileMenuClose } from "../../store/mobile-menu";

// data stubs
import currencies from "../../data/shopCurrencies";

function MobileMenu(props) {
    const domain = window.location.pathname.split('/')[1];
    const { mobileMenuState, closeMobileMenu, changeLocale, changeCurrency, fetchedData } = props;

    const links = [
        {
            type: "main-link",
            label: "الرئيسية",
            url: `/${domain}`,
        },

        {
            type: "main-link",
            label: "المنتجات",
            url: `/${domain}/shop/products`,
        },
        {
            type: "main-link",
            label: "المقالات",
            url: `/${domain}/blog/posts`,
        },
        {
            type: "main-link",
            label: "تواصل معنا",
            url: `/${domain}/site/contact-us`,
        },

        {
            type: "link",
            label: "الصفحات",
            url: "",
            children: fetchedData?.pages?.map((item) => ({
                type: "link",
                label: item?.title,
                url: item?.id,
            })),
        },
        {
            type: "link",
            label: "التسوق",
            url: "",
            children: [
                {
                    type: "shop-links",
                    label: "المقارنات",
                    url: `/${domain}/shop/compare`,
                },
                {
                    type: "shop-links",
                    label: "المفضله",
                    url: `/${domain}/shop/wishlist`,
                },
            ],
        },

        {
            type: "link",
            label: "حسابي",
            url: "",
            children: [

                {
                    type: "account",
                    label: "لوحة التحكم",
                    url: `/${domain}/account/dashboard`,
                },

            ],
        },
    ];

    const classes = classNames("mobilemenu", {
        "mobilemenu--open": mobileMenuState.open,
    });

    const handleItemClick = (item) => {
        if (item.data) {
            if (item.data.type === "language") {
                changeLocale(item.data.locale);
                closeMobileMenu();
            }
            if (item.data.type === "currency") {
                const currency = currencies.find((x) => x.currency.code === item.data.code);

                if (currency) {
                    changeCurrency(currency.currency);
                    closeMobileMenu();
                }
            }
        }
        if (item.type === "link") {
            closeMobileMenu();
        }
    };

    return (
        <div className={classes}>
            {/* eslint-disable-next-line max-len */}
            {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events */}
            <div className="mobilemenu__backdrop" onClick={closeMobileMenu} />
            <div className="mobilemenu__body">
                <div className="mobilemenu__header">
                    <div className="mobilemenu__title">القائمة</div>
                    <button type="button" className="mobilemenu__close" onClick={closeMobileMenu}>
                        <Cross20Svg />
                    </button>
                </div>
                <div className="mobilemenu__content">
                    <MobileLinks links={links} onItemClick={handleItemClick} />
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    mobileMenuState: state.mobileMenu,
});

const mapDispatchToProps = {
    closeMobileMenu: mobileMenuClose,
    changeLocale: localeChange,
    changeCurrency: currencyChange,
};

export default connect(mapStateToProps, mapDispatchToProps)(MobileMenu);
