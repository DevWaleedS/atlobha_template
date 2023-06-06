// react
import React from 'react';

// third-party
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// application
import AsyncAction from './AsyncAction';
import Currency from './Currency';
import Rating from './Rating';
import { cartAddItem } from '../../store/cart';
import { Compare16Svg, Quickview16Svg, Wishlist16Svg } from '../../svg';
import { compareAddItem } from '../../store/compare';
import { quickviewOpen } from '../../store/quickview';
import { url } from '../../services/utils';
import { wishlistAddItem } from '../../store/wishlist';

function ProductCard(props) {
    const {
        product,
        layout,
        quickviewOpen,
        cartAddItem,
        wishlistAddItem,
        compareAddItem,
    } = props;
    const containerClasses = classNames('product-card', {
        'product-card--layout--grid product-card--size--sm': layout === 'grid-sm',
        'product-card--layout--grid product-card--size--nl': layout === 'grid-nl',
        'product-card--layout--grid product-card--size--lg': layout === 'grid-lg',
        'product-card--layout--list': layout === 'list',
        'product-card--layout--horizontal': layout === 'horizontal',
    });

    // let badges = [];
    let image;
    let price;
    let features;

    // if (product.badges.includes('sale')) {
    // eslint-disable-next-line max-len
    // badges.push(<div key="sale" className="product-card__badge product-card__badge--sale">خصم</div>);
    // }
    // if (product.badges.includes('hot')) {
    // eslint-disable-next-line max-len
    //     badges.push(<div key="hot" className="product-card__badge product-card__badge--hot">عرض خاص</div>);
    // }
    // if (product.badges.includes('new')) {
    // eslint-disable-next-line max-len
    //     badges.push(<div key="new" className="product-card__badge product-card__badge--new">جديد</div>);
    // }

    // badges = badges.length ? <div className="product-card__badges-list">{badges}</div> : null;

    if (product?.cover) {
        image = (
            <div className="product-card__image product-image">
                <Link to={url.product(product?.id)} className="product-image__body">
                    <img className="product-image__img" src={product?.cover} alt="product_image" />
                </Link>
            </div>
        );
    }

    if (product.compareAtPrice) {
        price = (
            <div className="product-card__prices">
                <span className="product-card__new-price">{product?.purchasing_price}</span>
                <span className="product-card__old-price">{product?.compareAtPrice}</span>
            </div>
        );
    } else {
        price = (
            <div className="product-card__prices">
                <Currency value={product?.purchasing_price || 0} />
            </div>
        );
    }

    if (product.attributes && product.attributes.length) {
        features = (
            <ul className="product-card__features-list">
                {product.attributes.filter((x) => x.featured).map((attribute, index) => (
                    <li key={index}>{`${attribute.name}: ${attribute.values.map((x) => x.name).join(', ')}`}</li>
                ))}
            </ul>
        );
    }

    return (
        <div className={containerClasses}>
            <AsyncAction
                action={() => quickviewOpen(product.slug)}
                render={({ run, loading }) => (
                    <button
                        type="button"
                        onClick={run}
                        className={classNames('product-card__quickview', {
                            'product-card__quickview--preload': loading,
                        })}
                    >
                        <Quickview16Svg />
                    </button>
                )}
            />
            {image}
            <div className="product-card__info">
                <div className="product-card__name">
                    <Link to={url.product(product?.id)}>{product.name}</Link>
                </div>
                <div className="product-card__rating">
                    <Rating value={product?.productRating} />
                    <div className=" product-card__rating-legend">{`${product.reviews} تقييم`}</div>
                </div>
                {features}
            </div>
            <div className="product-card__actions">
                <div className="product-card__availability">
                    المخزون:
                    <span className="text-success">متوفر</span>
                </div>
                {price}
                <div className="product-card__buttons">
                    <AsyncAction
                        action={() => cartAddItem(product)}
                        render={({ run, loading }) => (
                            <React.Fragment>
                                <button
                                    type="button"
                                    onClick={run}
                                    className={classNames('btn btn-primary product-card__addtocart', {
                                        'btn-loading': loading,
                                    })}
                                >
                                    اضافة إلى السلة
                                </button>
                                <button
                                    type="button"
                                    onClick={run}
                                    className={classNames('btn btn-secondary product-card__addtocart product-card__addtocart--list', {
                                        'btn-loading': loading,
                                    })}
                                >
                                    اضافة إلى السلة
                                </button>
                            </React.Fragment>
                        )}
                    />
                    <AsyncAction
                        action={() => wishlistAddItem(product)}
                        render={({ run, loading }) => (
                            <button
                                type="button"
                                onClick={run}
                                className={classNames('btn btn-light btn-svg-icon btn-svg-icon--fake-svg product-card__wishlist', {
                                    'btn-loading': loading,
                                })}
                            >
                                <Wishlist16Svg />
                            </button>
                        )}
                    />
                    <AsyncAction
                        action={() => compareAddItem(product)}
                        render={({ run, loading }) => (
                            <button
                                type="button"
                                onClick={run}
                                className={classNames('btn btn-light btn-svg-icon btn-svg-icon--fake-svg product-card__compare', {
                                    'btn-loading': loading,
                                })}
                            >
                                <Compare16Svg />
                            </button>
                        )}
                    />
                </div>
            </div>
        </div>
    );
}

ProductCard.propTypes = {
    /**
     * product object
     */
    product: PropTypes.object.isRequired,
    /**
     * product card layout
     * one of ['grid-sm', 'grid-nl', 'grid-lg', 'list', 'horizontal']
     */
    layout: PropTypes.oneOf(['grid-sm', 'grid-nl', 'grid-lg', 'list', 'horizontal']),
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {
    cartAddItem,
    wishlistAddItem,
    compareAddItem,
    quickviewOpen,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ProductCard);
