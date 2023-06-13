// react
import React, { useEffect, useState } from 'react';

// third-party
import { Helmet } from 'react-helmet-async';
import useFetch from '../../hooks/useFetch';

// blocks
import BlockBanner from '../blocks/BlockBanner';
import BlockCategories from '../blocks/BlockCategories';
import BlockFeatures from '../blocks/BlockFeatures';
import BlockPosts from '../blocks/BlockPosts';
import BlockProductColumns from '../blocks/BlockProductColumns';
import BlockProducts from '../blocks/BlockProducts';
import BlockProductsCarousel from '../blocks/BlockProductsCarousel';
import BlockSlideShow from '../blocks/BlockSlideShow';

// data stubs
// import categories from '../../data/shopBlockCategories';
import theme from '../../data/theme';

function HomePageOne() {
    const { fetchedData, loading } = useFetch('https://backend.atlbha.com/api/indexStore/1');
    const [activeNewId, setActiveNewId] = useState(0);
    const [activeMoreSalesId, setActiveMoreSalesId] = useState(0);
    const [newProducts, setNewProducts] = useState([]);
    const [newMoreSales, setNewMoreSales] = useState([]);
    /**
     * Product columns.
     */
    const columns = [
        {
            title: 'المنتجات الأكثر تقييماً',
            products: fetchedData?.data?.productsRatings?.slice(0, 3) || [],
        },
        {
            title: 'العروض الخاصة',
            products: fetchedData?.data?.productsOffers?.slice(0, 3) || [],
        },
        {
            title: 'المميزة',
            products: fetchedData?.data?.specialProducts?.slice(0, 3) || [],
        },
    ];

    useEffect(() => {
        setNewProducts(fetchedData?.data?.resentArrivede);
        setNewMoreSales(fetchedData?.data?.moreSales);
    }, [fetchedData?.data?.resentArrivede, fetchedData?.data?.moreSales]);

    const handleTabChange = (id) => {
        setActiveNewId(id);
        const resultFilter = id === 0
            ? fetchedData?.data?.resentArrivede
            : fetchedData?.data?.resentArrivede?.filter((item) => item?.category?.id === id);
        setNewProducts(resultFilter);
    };

    const handleMoreSalesTabChange = (id) => {
        setActiveMoreSalesId(id);
        const resultFilter = id === 0
            ? fetchedData?.data?.moreSales
            : fetchedData?.data?.moreSales?.filter((item) => item?.category?.id === id);
        setNewMoreSales(resultFilter);
    };

    return (
        <React.Fragment>
            <Helmet>
                <title>{`الرئيسية — ${theme.name}`}</title>
            </Helmet>

            <BlockSlideShow silders={fetchedData?.data?.sliders} />

            <BlockFeatures />

            <BlockProductsCarousel
                title="الجديد"
                layout="grid-4"
                products={newProducts}
                loading={loading}
                groups={fetchedData?.data?.category}
                onGroupClick={handleTabChange}
                activeId={activeNewId}
            />

            <BlockBanner banar1={!loading && fetchedData?.data?.banars[0]} />
            <BlockProducts
                title="المميزة"
                layout="large-first"
                featuredProduct={fetchedData?.data?.specialProducts[0]}
                products={fetchedData?.data?.specialProducts?.slice(1, 7)}
            />
            <BlockCategories
                title="التصنيفات الشائعة"
                layout="classic"
                categories={fetchedData?.data?.PopularCategories}
            />

            <BlockProductsCarousel
                title="الأكثر طلباً"
                layout="horizontal"
                rows={2}
                products={newMoreSales}
                loading={loading}
                groups={fetchedData?.data?.category}
                onGroupClick={handleMoreSalesTabChange}
                activeId={activeMoreSalesId}
            />

            <BlockPosts title="آخر الأخبار" layout="list-sm" posts={fetchedData?.data?.lastPosts?.slice(0, 6)} />

            <BlockProductColumns columns={columns} />
        </React.Fragment>
    );
}

export default HomePageOne;
