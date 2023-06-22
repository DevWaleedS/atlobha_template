// react
import React from 'react';

// third-party
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment/moment';

function WidgetPosts(props) {
    const domain = window.location.pathname.split('/')[1];
    const { posts } = props;
    // const postImage = (post) => post?.image.replace(/\.jpg$/, '-thumbnail.jpg');

    const postsList = posts.map((post) => (
        <div key={post.id} className="widget-posts__item">
            <div className="widget-posts__image">
                <Link to={`/${domain}/blog/post/${post?.id}`}>
                    <img src={post?.image} alt="" />
                </Link>
            </div>
            <div className="widget-posts__info">
                <div className="widget-posts__name">
                    <Link to={`/${domain}/blog/post/${post?.id}`}>{post?.title}</Link>
                </div>
                <div className="widget-posts__date">{moment(post?.created_at).format('MMMM.DD.YYYY')}</div>
            </div>
        </div>
    ));

    return (
        <div className="widget-posts widget">
            <h4 className="widget__title">اخر المقالات</h4>
            <div className="widget-posts__list">
                {postsList}
            </div>
        </div>
    );
}

WidgetPosts.propTypes = {
    /**
     * array of posts
     */
    posts: PropTypes.array,
};
WidgetPosts.defaultProps = {
    posts: [],
};

export default WidgetPosts;
