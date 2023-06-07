// react
import React from 'react';

// third-party
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment/moment';

function PostCard(props) {
    const { post, layout } = props;
    const cardClasses = classNames(
        'post-card',
        {
            'post-card--layout--grid': ['grid-nl', 'grid-lg'].includes(layout),
            'post-card--layout--list': ['list-nl', 'list-sm'].includes(layout),
            'post-card--size--nl': ['grid-nl', 'list-nl'].includes(layout),
            'post-card--size--lg': layout === 'grid-lg',
            'post-card--size--sm': layout === 'list-sm',
        },
    );
    // const categories = post?.pageCategory?.map((category, index) => (
    //     <Link key={index} to="/">{category?.name}</Link>
    // ));

    return (
        <div className={cardClasses}>
            <div className="post-card__image">
                <Link to={`/blog/post/${post?.id}`}>
                    <img src={post?.image} alt="img" />
                </Link>
            </div>
            <div className="post-card__info">
                <div className="post-card__category">
                    <Link to="/">{post?.postCategory?.name}</Link>
                </div>
                <div className="post-card__name">
                    <Link to={`/blog/post/${post?.id}`}>{post?.title}</Link>
                </div>
                <div className="post-card__date">{moment(post?.created_at).format('MMMM.DD.YYYY')}</div>
                <div className="post-card__content">
                    {post?.page_desc}
                </div>
                <div className="post-card__read-more">
                    <Link to={`/blog/post/${post?.id}`} className="btn btn-secondary btn-sm">إقرأ المزيد</Link>
                </div>
            </div>
        </div>
    );
}

PostCard.propTypes = {
    /**
     * post data object
     */
    post: PropTypes.object,
    /**
     * post card layout
     * one of ['grid-nl', 'grid-lg', 'list-nl', 'list-sm']
     */
    layout: PropTypes.oneOf(['grid-nl', 'grid-lg', 'list-nl', 'list-sm']),
};

export default PostCard;
