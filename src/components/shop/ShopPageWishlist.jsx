// react
import React from 'react';

// third-party
import classNames from 'classnames';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

// application
import AsyncAction from '../shared/AsyncAction';
import Currency from '../shared/Currency';
import PageHeader from '../shared/PageHeader';
import Rating from '../shared/Rating';
import { cartAddItem, cartAddItemLocal } from '../../store/cart';
import { Cross12Svg } from '../../svg';
import { wishlistRemoveItem } from '../../store/wishlist';

// data stubs
import theme from '../../data/theme';

function ShopPageWishlist(props) {
    const domain = window.location.pathname.split('/')[1];
    const token = localStorage.getItem('token');
    const { wishlist, cartAddItem, wishlistRemoveItem, cartAddItemLocal } = props;
    const breadcrumb = [
        { title: 'الرئيسية', url: `/${domain}` },
        { title: 'المفضلة', url: '' },
    ];

    let content;

    if (wishlist.length) {
        const itemsList = wishlist.map((item) => {
            let image;
            image = (
                <div className="product-image">
                    <Link to={`/${domain}/shop/product/${item?.id}`} className="product-image__body">
                        <img className="product-image__img" src={item?.cover} alt="" />
                    </Link>
                </div>
            );

            const renderAddToCarButton = ({ run, loading }) => {
                const classes = classNames('btn btn-primary btn-sm', {
                    'btn-loading': loading,
                });

                return <button type="button" onClick={run} className={classes}>اضافة إلى السلة</button>;
            };

            const renderRemoveButton = ({ run, loading }) => {
                const classes = classNames('btn btn-light btn-sm btn-svg-icon', {
                    'btn-loading': loading,
                });

                return <button type="button" onClick={run} className={classes} aria-label="Remove"><Cross12Svg /></button>;
            };

            return (
                <tr key={item?.id} className="wishlist__row">
                    <td className="wishlist__column wishlist__column--image">
                        {image}
                    </td>
                    <td className="wishlist__column wishlist__column--product">
                        <Link to={`/${domain}/shop/product/${item?.id}`} className="wishlist__product-name">{item?.name}</Link>
                        <div className="wishlist__product-rating">
                            <Rating value={Number(item?.productRating)} />
                            <div className="wishlist__product-rating-legend">{`${item?.productRatingCount} تقييم`}</div>
                        </div>
                    </td>
                    <td className="wishlist__column wishlist__column--stock">
                        {item?.stock > 0 ?
                            <div className="badge badge-success">متوفر</div>
                            :
                            <div className="badge badge-danger">غير متوفر</div>
                        }
                    </td>
                    <td className="wishlist__column wishlist__column--price"><Currency value={Number(item?.selling_price)} /></td>
                    <td className="wishlist__column wishlist__column--tocart">
                        {token ?
                            (
                                <AsyncAction
                                    action={() => cartAddItem(item)}
                                    render={renderAddToCarButton}
                                />
                            )
                            :
                            (
                                <AsyncAction
                                    action={() => cartAddItemLocal(item)}
                                    render={renderAddToCarButton}
                                />
                            )
                        }
                    </td>
                    <td className="wishlist__column wishlist__column--remove">
                        <AsyncAction
                            action={() => wishlistRemoveItem(item.id)}
                            render={renderRemoveButton}
                        />
                    </td>
                </tr>
            );
        });

        content = (
            <div className="block">
                <div className="container">
                    <table className="wishlist">
                        <thead className="wishlist__head">
                            <tr className="wishlist__row">
                                <th className="wishlist__column wishlist__column--image">الصورة</th>
                                <th className="wishlist__column wishlist__column--product">اسم المنتج</th>
                                <th className="wishlist__column wishlist__column--stock">حالة المخزون</th>
                                <th className="wishlist__column wishlist__column--price">السعر</th>
                                <th className="wishlist__column wishlist__column--tocart" aria-label="اضافة إلى السلة" />
                                <th className="wishlist__column wishlist__column--remove" aria-label="حذف" />
                            </tr>
                        </thead>
                        <tbody className="wishlist__body">
                            {itemsList}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    } else {
        content = (
            <div className="block block-empty">
                <div className="container">
                    <div className="block-empty__body">
                        <div className="block-empty__message">قائمة المفضلة فارغة!</div>
                        <div className="block-empty__actions">
                            <Link to={`/${domain}`} className="btn btn-primary btn-sm">استمرار</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <React.Fragment>
            <Helmet>
                <title>{`المفضلة — ${theme.name}`}</title>
            </Helmet>

            <PageHeader header="المفضلة" breadcrumb={breadcrumb} />

            {content}
        </React.Fragment>
    );
}

const mapStateToProps = (state) => ({
    wishlist: state.wishlist,
});

const mapDispatchToProps = {
    cartAddItem,
    wishlistRemoveItem,
    cartAddItemLocal,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ShopPageWishlist);
