// react
import React, { useState } from 'react';

// third-party
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';
import useFetch from '../../hooks/useFetch';

// application
import PageHeader from '../shared/PageHeader';
import Product from '../shared/Product';
import ProductTabs from './ProductTabs';
import { url } from '../../services/utils';

// blocks
import BlockLoader from '../blocks/BlockLoader';
import BlockProductsCarousel from '../blocks/BlockProductsCarousel';

// widgets
import WidgetCategories from '../widgets/WidgetCategories';
import WidgetProducts from '../widgets/WidgetProducts';

// data stubs
import categories from '../../data/shopWidgetCategories';
import theme from '../../data/theme';

function ShopPageProduct(props) {
    const { productSlug, layout, sidebarPosition } = props;
    const { fetchedData, loading } = useFetch(`https://backend.atlbha.com/api/productPage/${productSlug}`);

    if (loading) {
        return <BlockLoader />;
    }

    const breadcrumb = [
        { title: 'الرئيسية', url: url.home() },
        { title: 'المنتجات', url: url.catalog() },
        { title: fetchedData?.data?.product?.name, url: ''},
    ];

    let content;

    if (layout === 'sidebar') {
        const sidebar = (
            <div className="shop-layout__sidebar">
                <div className="block block-sidebar">
                    <div className="block-sidebar__item">
                        <WidgetCategories categories={categories} location="shop" />
                    </div>
                    <div className="block-sidebar__item d-none d-lg-block">
                        <WidgetProducts title="المنتجات المضافة مؤخراً" />
                    </div>
                </div>
            </div>
        );

        content = (
            <div className="container">
                <div className={`shop-layout shop-layout--sidebar--${sidebarPosition}`}>
                    {sidebarPosition === 'start' && sidebar}
                    <div className=" shop-layout__content">
                        <div className=" block">
                            <Product product={fetchedData?.data?.product} layout={layout} />
                            <ProductTabs withSidebar />
                        </div>

                        {fetchedData?.data?.relatedProduct?.length > 0 && (
                            <BlockProductsCarousel
                                title="منتجات ذات صله"
                                layout="grid-4-sm"
                                products={fetchedData?.data?.relatedProduct}
                                withSidebar
                            />
                        )}
                    </div>
                    {sidebarPosition === 'end' && sidebar}
                </div>
            </div>
        );
    } else {
        content = (
            <React.Fragment>
                <div className="block">
                    <div className="container">
                        <Product product={fetchedData?.data?.product} layout={layout} />
                        <ProductTabs data={fetchedData?.data} />
                    </div>
                </div>

                {fetchedData?.data?.relatedProduct?.length > 0 && (
                    <BlockProductsCarousel
                        title="منتجات ذات صله"
                        layout="grid-5"
                        products={fetchedData?.data?.relatedProduct}
                    />
                )}
            </React.Fragment>
        );
    }

    return (
        <React.Fragment>
            <Helmet>
                <title>{`${fetchedData?.data?.product?.name} — ${theme.name}`}</title>
            </Helmet>

            <PageHeader breadcrumb={breadcrumb} />

            {content}
        </React.Fragment>
    );
}

ShopPageProduct.propTypes = {
    /** Product slug. */
    productSlug: PropTypes.string,
    /** one of ['standard', 'sidebar', 'columnar', 'quickview'] (default: 'standard') */
    layout: PropTypes.oneOf(['standard', 'sidebar', 'columnar', 'quickview']),
    /**
     * sidebar position (default: 'start')
     * one of ['start', 'end']
     * for LTR scripts "start" is "left" and "end" is "right"
     */
    sidebarPosition: PropTypes.oneOf(['start', 'end']),
};

ShopPageProduct.defaultProps = {
    layout: 'standard',
    sidebarPosition: 'start',
};

export default ShopPageProduct;
