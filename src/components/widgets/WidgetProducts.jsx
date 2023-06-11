// react
import React from 'react';

// third-party
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// application
import Currency from '../shared/Currency';
import { url } from '../../services/utils';

function WidgetProducts(props) {
    const { title, products } = props;
    const productsList = products.map((product) => {
        let image;
        let price;

        if (product?.cover) {
            image = (
                <div className="widget-products__image">
                    <div className="product-image">
                        <Link to={`/shop/products/${product?.id}`} className="product-image__body">
                            <img className="product-image__img" src={product?.cover} alt="" />
                        </Link>
                    </div>
                </div>
            );
        }

        if (product.compareAtPrice) {
            price = (
                <React.Fragment>
                    <span className="widget-products__new-price"><Currency value={Number(product?.selling_price)} /></span>
                    {' '}
                    <span className="widget-products__old-price"><Currency value={Number(product?.selling_price)} /></span>
                </React.Fragment>
            );
        } else {
            price = <Currency value={Number(product?.selling_price)} />;
        }

        return (
            <div key={product.id} className="widget-products__item">
                {image}
                <div className="widget-products__info">
                    <div className="widget-products__name">
                        <Link to={`/shop/products/${product?.id}`}>{product?.name}</Link>
                    </div>
                    <div className="widget-products__prices">
                        {price}
                    </div>
                </div>
            </div>
        );
    });

    return (
        <div className="widget-products widget">
            <h4 className="widget__title">{title}</h4>
            <div className="widget-products__list">
                {productsList}
            </div>
        </div>
    );
}

WidgetProducts.propTypes = {
    /**
     * widget title
     */
    title: PropTypes.node,
    /**
     * array of product objects
     */
    products: PropTypes.array,
};

WidgetProducts.defaultProps = {
    products: [],
};

export default WidgetProducts;
