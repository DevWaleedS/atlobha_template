// react
import React from 'react';

// third-party
import classNames from 'classnames';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// application
import AsyncAction from '../shared/AsyncAction';
import Currency from '../shared/Currency';
import { Cart16Svg } from '../../svg';
import { cartAddItem, cartAddItemLocal } from '../../store/cart';
import { url } from '../../services/utils';

function Suggestions(props) {
    const token = localStorage.getItem('token');
    const {
        context,
        className,
        products,
        cartAddItem,
        cartAddItemLocal,
    } = props;
    const rootClasses = classNames(`suggestions suggestions--location--${context}`, className);

    const list = (products && products.map((product) => (
        <li key={product?.id} className="suggestions__item">
            {product.cover && (
                <div className="suggestions__item-image product-image">
                    <div className="product-image__body">
                        <img className="product-image__img" src={product.cover} alt="product-img" />
                    </div>
                </div>
            )}
            <div className="suggestions__item-info">
                <Link className="suggestions__item-name" to={`/shop/products/${product?.id}`}>
                    {product?.name}
                </Link>
                <div className="suggestions__item-meta">SKU: 83690/32</div>
            </div>
            <div className="suggestions__item-price">
                {product.compareAtPrice && (
                    <React.Fragment>
                        <span className="suggestions__item-price-new"><Currency value={Number(product?.selling_price)} /></span>
                        <span className="suggestions__item-price-old"><Currency value={Number(product?.selling_price)} /></span>
                    </React.Fragment>
                )}

                {!product.compareAtPrice && (<Currency value={Number(product?.selling_price)} />)}
            </div>
            {context === 'header' && (
                <div className="suggestions__item-actions">
                    {token ?
                        (
                            <AsyncAction
                                action={() => cartAddItem(product)}
                                render={({ run, loading }) => (
                                    <button
                                        type="button"
                                        onClick={run}
                                        title="اضافة إلى السلة"
                                        className={classNames('btn btn-primary btn-sm btn-svg-icon', {
                                            'btn-loading': loading,
                                        })}
                                    >
                                        <Cart16Svg />
                                    </button>
                                )}
                            />
                        )
                        :
                        (
                            <AsyncAction
                                action={() => cartAddItemLocal(product)}
                                render={({ run, loading }) => (
                                    <button
                                        type="button"
                                        onClick={run}
                                        title="اضافة إلى السلة"
                                        className={classNames('btn btn-primary btn-sm btn-svg-icon', {
                                            'btn-loading': loading,
                                        })}
                                    >
                                        <Cart16Svg />
                                    </button>
                                )}
                            />
                        )
                    }
                </div>
            )}
        </li>
    )));

    return (
        <div className={rootClasses}>
            <ul className="suggestions__list">
                {list}
            </ul>
        </div>
    );
}

const mapStateToProps = () => ({});

const mapDispatchToProps = {
    cartAddItem,
    cartAddItemLocal,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Suggestions);
