// react
import React from "react";
// third-party
import { useParams } from "react-router-dom";
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
import StoreNotFound from "./site/StoreNotFound";
import HomePageOne from './home/HomePageOne';
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
    let { name } = useParams();
    const { match, headerLayout } = props;
    const { fetchedData, loading } = useFetch(`https://backend.atlbha.com/api/indexStore/${name}`);
    const token = localStorage.getItem('token');

    if (fetchedData?.success === false && fetchedData?.data === null) {
        return <StoreNotFound title={fetchedData?.message?.ar} />
    }

    return (
        <React.Fragment>
            <Helmet>
                <title>{theme.name}</title>
                <meta name="description" content={theme.fullName} />
            </Helmet>

            <ToastContainer autoClose={5000} hideProgressBar />

            <Quickview />

            <MobileMenu fetchedData={fetchedData?.data} />

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
                        <Route
                            exact
                            path={`${match.path}`}
                            render={() => <HomePageOne fetchedData={fetchedData} loading={loading} />}
                        />

                        {/*
                        // Shop
                        */}
                        <Redirect exact from={`/${name}/shop`} to={`/${name}/shop/products`} />
                        <Route
                            path={`/${name}/shop/products`}
                            render={(props) => (
                                <ShopPageCategory {...props} columns={3} viewMode="grid" sidebarPosition="start" />
                            )}
                        />
                        <Route
                            exact
                            path="/:name/shop/products-by-category/:id"
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
                            path="/:name/shop/product/:id"
                            render={(props) => (
                                <ShopPageProduct {...props} layout="standard" productSlug={props.match.params.id} storeName={props.match.params.name} />
                            )}
                        />
                        {/* Following product layouts only for demonstration. */}
                        {productLayouts}

                        <Route exact path="/:name/shop/cart" render={() => (<PageCart token={token} />)} />
                        <Route exact path="/:name/shop/checkout" render={() => (<PageCheckout token={token} />)} />
                        <Route exact path="/:name/shop/checkout/success" component={ShopPageOrderSuccess} />
                        <Route exact path="/:name/shop/wishlist" component={PageWishlist} />
                        <Route exact path="/:name/shop/compare" component={PageCompare} />
                        <Route exact path="/:name/shop/track-order" component={ShopPageTrackOrder} />

                        {/*
                        // Blog
                        */}
                        <Redirect exact from="/:name/blog" to="/:name/blog/posts" />
                        <Route
                            exact
                            path="/:name/blog/posts"
                            render={(props) => <BlogPosts {...props} layout="classic" sidebarPosition="end" />}
                        />
                        <Route
                            exact
                            path="/:name/blog/posts-by-category/:id"
                            render={(props) => <BlogPageCategory {...props} layout="classic" sidebarPosition="end" />}
                        />
                        <Route
                            exact
                            path="/:name/blog/category-grid"
                            render={(props) => <BlogPageCategory {...props} layout="grid" sidebarPosition="end" />}
                        />
                        <Route
                            exact
                            path="/:name/blog/category-list"
                            render={(props) => <BlogPageCategory {...props} layout="list" sidebarPosition="end" />}
                        />
                        <Route
                            exact
                            path="/:name/blog/category-left-sidebar"
                            render={(props) => <BlogPageCategory {...props} layout="classic" sidebarPosition="start" />}
                        />
                        <Route
                            exact
                            path="/:name/blog/post/:id"
                            render={(props) => <BlogPagePost {...props} layout="classic" sidebarPosition="end" />}
                        />
                        <Route
                            exact
                            path="/:name/blog/post-full"
                            render={(props) => <BlogPagePost {...props} layout="full" />}
                        />
                        <Route exact path={"/:name/site/SitePages/:id"} component={SitePages} />

                        {/*
                        // Account
                        */}
                        <Route exact path="/:name/account/login" component={AccountPageLogin} />
                        <Route path="/:name/account" component={AccountLayout} />

                        {/*

                         // about us page
                         // Pages dropdown menu
                        */}
                        <Redirect exact from="/:name/site" to="/:name" />
                        {/*
                         // page that will come form api
                        */}
                        <Route exact path={":name/site/SitePages/:id"} component={SitePages} />
                        {/*
                         // contact us pages
                        */}
                        <Route exact path="/:name/site/contact-us" component={SitePageContactUs} />
                        <Route exact path="/:name/site/contact-us-alt" component={SitePageContactUsAlt} />
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
};

Layout.defaultProps = {
    headerLayout: "default",
};

export default Layout;
