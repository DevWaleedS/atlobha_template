// react
import React, { useState } from 'react';

// third-party
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';
import useFetch from '../../hooks/useFetch';

// application
import PageHeader from '../shared/PageHeader';
import Pagination from '../shared/Pagination';
import PostCard from '../shared/PostCard';
import BlogSidebar from './BlogSidebar';
import BlockLoader from '../blocks/BlockLoader';

// data stubs
import theme from '../../data/theme';

function BlogPageCategory(props) {
    const { fetchedData, loading } = useFetch('https://backend.atlbha.com/api/postStore/1');

    const { layout, sidebarPosition } = props;
    const [page, setPage] = useState(1);
    const breadcrumb = [
        { title: 'الرئيسية', url: '/' },
        { title: 'المقالات', url: '' },
    ];
    let sidebarStart;
    let sidebarEnd;

    const handlePageChange = (page) => {
        setPage(page);
    };
    const sidebar = <BlogSidebar fetchedData={fetchedData?.data} position={sidebarPosition} />;

    if (sidebarPosition === 'start') {
        sidebarStart = <div className="col-12 col-lg-4 order-1 order-lg-0">{sidebar}</div>;
    } else if (sidebarPosition === 'end') {
        sidebarEnd = <div className="col-12 col-lg-4">{sidebar}</div>;
    }

    const postsList = fetchedData?.data?.posts?.map((post) => {
        const postLayout = {
            classic: 'grid-lg',
            grid: 'grid-nl',
            list: 'list-nl',
        }[layout];

        return (
            <div key={post.id} className="posts-list__item">
                <PostCard post={post} layout={postLayout} />
            </div>
        );
    });
    if (loading) {
        return <BlockLoader />;
    }

    return (
        <React.Fragment>
            <Helmet>
                <title>{`Blog Category Page — ${theme.name}`}</title>
            </Helmet>

            <PageHeader header="المقالات" breadcrumb={breadcrumb} />

            <div className="container">
                <div className="row">
                    {sidebarStart}
                    <div className="col-12 col-lg-8">
                        <div className="block">
                            <div className="posts-view">
                                <div className={`posts-view__list posts-list posts-list--layout--${layout}`}>
                                    <div className="posts-list__body">
                                        {postsList}
                                    </div>
                                </div>
                                <div className="posts-view__pagination">
                                    <Pagination
                                        current={page}
                                        siblings={2}
                                        total={10}
                                        onPageChange={handlePageChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    {sidebarEnd}
                </div>
            </div>
        </React.Fragment>
    );
}

BlogPageCategory.propTypes = {
    /**
     * blog layout
     * one of ['classic', 'grid', 'list'] (default: 'classic')
     */
    layout: PropTypes.oneOf(['classic', 'grid', 'list']),
    /**
     * sidebar position (default: 'start')
     * one of ['start', 'end']
     * for LTR scripts "start" is "left" and "end" is "right"
     */
    sidebarPosition: PropTypes.oneOf(['start', 'end']),
};

BlogPageCategory.defaultProps = {
    layout: 'classic',
    sidebarPosition: 'start',
};
export default BlogPageCategory;
