// react
import React, { useState } from 'react';

// third-party
import { useParams } from "react-router-dom";
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

function BlogPosts(props) {
    let { name } = useParams();
    const domain = window.location.pathname.split('/')[1];
    const { fetchedData, loading } = useFetch(`https://backend.atlbha.com/api/postStore/${name}`);
    const [search, setSearch] = useState('');
    const { layout, sidebarPosition } = props;
    const posts = fetchedData?.data?.posts?.filter((post) => post?.title?.includes(search));
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts?.slice(indexOfFirstPost, indexOfLastPost);

    const getSearchData = (search) => {
        setSearch(search);
    }

    const breadcrumb = [
        { title: 'الرئيسية', url:  `/${domain}` },
        { title: 'المقالات', url: `/${domain}/blog/posts` },
    ];
    let sidebarStart;
    let sidebarEnd;

    const sidebar = <BlogSidebar fetchedData={fetchedData?.data} position={sidebarPosition} getSearchData={getSearchData} />;

    if (sidebarPosition === 'start') {
        sidebarStart = <div className="col-12 col-lg-4 order-1 order-lg-0">{sidebar}</div>;
    } else if (sidebarPosition === 'end') {
        sidebarEnd = <div className="col-12 col-lg-4">{sidebar}</div>;
    }

    const postsList = currentPosts?.map((post) => {
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

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const previousPage = () => {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const nextPage = () => {
        if (currentPage !== Math.ceil(fetchedData?.data?.posts?.length / postsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <React.Fragment>
            <Helmet>
                <title>{`Blog Category Page — ${theme.name}`}</title>
            </Helmet>

            <PageHeader header="المقالات" breadcrumb={breadcrumb} />

            <div className="container">
                <div className="row">
                    {sidebarStart}
                    {posts?.length > 0 ?
                        (
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
                                                postsPerPage={postsPerPage}
                                                totalPosts={fetchedData?.data?.posts?.length}
                                                paginate={paginate}
                                                previousPage={previousPage}
                                                nextPage={nextPage}
                                                currentPage={currentPage}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                        :
                        (
                            <div className="col-12 col-lg-8">
                                <p>لاتوجد مقالات في هذا القسم</p>
                            </div>
                        )}
                    {sidebarEnd}
                </div>
            </div>
        </React.Fragment>
    );
}

BlogPosts.propTypes = {
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

BlogPosts.defaultProps = {
    layout: 'classic',
    sidebarPosition: 'start',
};
export default BlogPosts;
