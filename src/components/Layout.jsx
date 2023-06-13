// react
import React from "react";
// third-party
import PropTypes from "prop-types";
import { Helmet } from "react-helmet-async";
import { Redirect, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import useFetch from "../hooks/useFetch";

// application
import Footer from "./footer";
import Header from "./header";
import MobileHeader from "./mobile/MobileHeader";
import MobileMenu from "./mobile/MobileMenu";
import Quickview from "./shared/Quickview";

// pages
import AccountLayout from "./account/AccountLayout";
import AccountPageLogin from "./account/AccountPageLogin";
import BlogPosts from "./blog/BlogPosts";
import BlogPageCategory from "./blog/BlogPageCategory";
import BlogPagePost from "./blog/BlogPagePost";
import PageCart from "./shop/ShopPageCart";
import PageCheckout from "./shop/ShopPageCheckout";
import PageCompare from "./shop/ShopPageCompare";
import PageWishlist from "./shop/ShopPageWishlist";
import ShopPageCategory from "./shop/ShopPageCategory";
import ShopPageOrderSuccess from "./shop/ShopPageOrderSuccess";
import ShopPageProduct from "./shop/ShopPageProduct";
import ShopPageTrackOrder from "./shop/ShopPageTrackOrder";
import SitePageContactUs from "./site/SitePageContactUs";
import SitePageContactUsAlt from "./site/SitePageContactUsAlt";

import SitePageNotFound from "./site/SitePageNotFound";

// import SitePageComponents from './site/SitePageComponents';

// data stubs
import theme from "../data/theme";
import SitePages from "./site/SitePages";

const categoryLayouts = [
    ["/shop/category-grid-3-columns-sidebar", { columns: 3, viewMode: "grid", sidebarPosition: "start" }],
    ["/shop/category-grid-4-columns-full", { columns: 4, viewMode: "grid" }],
    ["/shop/category-grid-5-columns-full", { columns: 5, viewMode: "grid" }],
    ["/shop/category-list", { columns: 3, viewMode: "list", sidebarPosition: "start" }],
    ["/shop/category-right-sidebar", { columns: 3, viewMode: "grid", sidebarPosition: "end" }],
].map(([url, options]) => (
    <Route
        key={url}
        exact
        path={url}
        render={(props) => <ShopPageCategory {...props} {...options} categorySlug="power-tools" />}
    />
));

const productLayouts = [
    ["/shop/product-standard", { layout: "standard" }],
    ["/shop/product-columnar", { layout: "columnar" }],
    ["/shop/product-sidebar", { layout: "sidebar" }],
].map(([url, options]) => (
    <Route
        key={url}
        exact
        path={url}
        render={(props) => <ShopPageProduct {...props} {...options} productSlug="brandix-screwdriver-screw1500acc" />}
    />
));

function Layout(props) {
    const { match, headerLayout, homeComponent } = props;
    const { fetchedData } = useFetch("https://backend.atlbha.com/api/indexStore/1");
    const token = localStorage.getItem('token');

    return (
        <React.Fragment>
            <Helmet>
                <title>{theme.name}</title>
                <meta name="description" content={theme.fullName} />
            </Helmet>

            <ToastContainer autoClose={5000} hideProgressBar />

            <Quickview />

            <MobileMenu fetchedData={fetchedData?.data}/>

            <div className="site">
                <header className="site__header d-lg-none">
                    <MobileHeader fetchedData={fetchedData?.data} />
                </header>

                <header className="site__header d-lg-block d-none">
                    <Header fetchedData={fetchedData?.data} layout={headerLayout} />
                </header>

                <div className="site__body">
                    <Switch>
                        {/*
                        // Home
                        */}
                        <Route exact path={`${match.path}`} component={homeComponent} />

                        {/*
                        // Shop
                        */}
                        <Redirect exact from="/shop" to="/shop/products" />
                        <Route
                            exact
                            path="/shop/products"
                            render={(props) => (
                                <ShopPageCategory {...props} columns={3} viewMode="grid" sidebarPosition="start" />
                            )}
                        />
                        <Route
                            exact
                            path="/shop/products-by-category/:id"
                            render={(props) => (
                                <ShopPageCategory
                                    {...props}
                                    columns={3}
                                    viewMode="grid"
                                    sidebarPosition="start"
                                    categoryId={props.match.params.id}
                                />
                            )}
                        />
                        {/* Following category layouts only for demonstration. */}
                        {categoryLayouts}

                        <Route
                            exact
                            path="/shop/products/:id"
                            render={(props) => (
                                <ShopPageProduct {...props} layout="standard" productSlug={props.match.params.id} />
                            )}
                        />
                        {/* Following product layouts only for demonstration. */}
                        {productLayouts}

                        <Route exact path="/shop/cart" render={() => (<PageCart token={token}/>)} />
                        <Route exact path="/shop/checkout" render={() => (<PageCheckout token={token} />)} />
                        <Route exact path="/shop/checkout/success" component={ShopPageOrderSuccess} />
                        <Route exact path="/shop/wishlist" component={PageWishlist} />
                        <Route exact path="/shop/compare" component={PageCompare} />
                        <Route exact path="/shop/track-order" component={ShopPageTrackOrder} />

                        {/*
                        // Blog
                        */}
                        <Redirect exact from="/blog" to="/blog/posts" />
                        <Route
                            exact
                            path="/blog/posts"
                            render={(props) => <BlogPosts {...props} layout="classic" sidebarPosition="end" />}
                        />
                        <Route
                            exact
                            path="/blog/posts-by-category/:id"
                            render={(props) => <BlogPageCategory {...props} layout="classic" sidebarPosition="end" />}
                        />
                        <Route
                            exact
                            path="/blog/category-grid"
                            render={(props) => <BlogPageCategory {...props} layout="grid" sidebarPosition="end" />}
                        />
                        <Route
                            exact
                            path="/blog/category-list"
                            render={(props) => <BlogPageCategory {...props} layout="list" sidebarPosition="end" />}
                        />
                        <Route
                            exact
                            path="/blog/category-left-sidebar"
                            render={(props) => <BlogPageCategory {...props} layout="classic" sidebarPosition="start" />}
                        />
                        <Route
                            exact
                            path="/blog/post/:id"
                            render={(props) => <BlogPagePost {...props} layout="classic" sidebarPosition="end" />}
                        />
                        <Route
                            exact
                            path="/blog/post-full"
                            render={(props) => <BlogPagePost {...props} layout="full" />}
                        />
                        <Route exact path={"/site/SitePages/:id"} component={SitePages} />

                        {/*
                        // Account
                        */}
                        <Route exact path="/account/login" component={AccountPageLogin} />
                        <Route path="/account" component={AccountLayout} />

                        {/*

                         // about us page
                         // Pages dropdown menu
                        */}
                        <Redirect exact from="/site" to="/" />
                        {/*
                         // page that will come form api
                        */}
                        <Route exact path={"/site/SitePages/:id"} component={SitePages} />
                        {/*
                         // contact us pages
                        */}
                        <Route exact path="/site/contact-us" component={SitePageContactUs} />
                        <Route exact path="/site/contact-us-alt" component={SitePageContactUsAlt} />
                        {/*
                        // Page Not Found
                        */}
                        <Route component={SitePageNotFound} />
                    </Switch>
                </div>

                <footer className="site__footer">
                    <Footer fetchedData={fetchedData?.data} />
                </footer>
            </div>
        </React.Fragment>
    );
}

Layout.propTypes = {
    /**
     * header layout (default: 'classic')
     * one of ['classic', 'compact']
     */
    headerLayout: PropTypes.oneOf(["default", "compact"]),
    /**
     * home component
     */
    homeComponent: PropTypes.elementType.isRequired,
};

Layout.defaultProps = {
    headerLayout: "default",
};

export default Layout;
