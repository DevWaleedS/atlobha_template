// react
import React from 'react';

// third-party
import classNames from 'classnames';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// application
import AsyncAction from '../shared/AsyncAction';
import Currency from '../shared/Currency';
import Indicator from './Indicator';
import { Cart20Svg, Cross10Svg } from '../../svg';
import { cartRemoveItem,fetchCartData,cartRemoveItemLocal } from '../../store/cart';
import { useEffect } from 'react';

function IndicatorCart(props) {
    const domain = window.location.pathname.split('/')[1];
    const token = localStorage.getItem('token');
    const { cart, cartRemoveItem,fetchCartData,cartRemoveItemLocal } = props;
    let dropdown;
    let totals;

    useEffect(()=>{
        fetchCartData();
    },[fetchCartData])

    if (cart?.extraLines?.length > 0) {
        const extraLines = cart.extraLines.map((extraLine, index) => (
            <tr key={index}>
                <th>{extraLine.title}</th>
                <td><Currency value={Number(extraLine.price)} /></td>
            </tr>
        ));

        totals = (
            <React.Fragment>
                <tr>
                    <th>السعر</th>
                    <td><Currency value={Number(cart?.subtotal)} /></td>
                </tr>
                {extraLines}
            </React.Fragment>
        );
    }

    const items = cart?.items?.map((item) => {
        let options;
        let image;

        if (item?.options) {
            options = (
                <ul className="dropcart__product-options">
                    {item.options.map((option, index) => (
                        <li key={index}>{`${option.optionTitle}: ${option.valueTitle}`}</li>
                    ))}
                </ul>
            );
        }
        if (item?.product?.cover) {
            image = (
                <div className="product-image dropcart__product-image">
                    <Link to={`/${domain}/shop/product/${item?.product?.id}`} className="product-image__body">
                        <img className="product-image__img" src={item?.product?.cover} alt="" />
                    </Link>
                </div>
            );
        }

        const removeButton = (
            token ?
            <AsyncAction
                action={() => cartRemoveItem(item?.product?.id)}
                render={({ run, loading }) => {
                    const classes = classNames('dropcart__product-remove btn btn-light btn-sm btn-svg-icon', {
                        'btn-loading': loading,
                    });

                    return (
                        <button type="button" onClick={run} className={classes}>
                            <Cross10Svg />
                        </button>
                    );
                }}
            />
            :
            <AsyncAction
                action={() => cartRemoveItemLocal(item?.product?.id)}
                render={({ run, loading }) => {
                    const classes = classNames('dropcart__product-remove btn btn-light btn-sm btn-svg-icon', {
                        'btn-loading': loading,
                    });

                    return (
                        <button type="button" onClick={run} className={classes}>
                            <Cross10Svg />
                        </button>
                    );
                }}
            />
        );
        return (
            <div key={item?.id} className="dropcart__product">
                {image}
                <div className="dropcart__product-info">
                    <div className="dropcart__product-name">
                        <Link to={`/${domain}/shop/product/${item?.product?.id}`}>{item?.product?.name}</Link>
                    </div>
                    {options}
                    <div className="dropcart__product-meta">
                        <span className="dropcart__product-quantity">{item?.qty||item?.quantity}</span>
                        {' × '}
                        <span className="dropcart__product-price"><Currency value={Number(item?.price)} /></span>
                    </div>
                </div>
                {removeButton}
            </div>
        );
    });

    if (cart?.qty) {
        dropdown = (
            <div className="dropcart">
                <div className="dropcart__products-list">
                    {items}
                </div>

                <div className="dropcart__totals">
                    <table>
                        <tbody>
                            {totals}
                            <tr>
                                <th>الاجمالي</th>
                                <td><Currency value={Number(cart?.total)} /></td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="dropcart__buttons">
                    <Link className="btn btn-secondary" to={`/${domain}/shop/cart`}>سلة التسوق</Link>
                    <Link className="btn btn-primary" to={`/${domain}/shop/checkout`}>الدفع</Link>
                </div>
            </div>
        );
    } else {
        dropdown = (
            <div className="dropcart">
                <div className="dropcart__empty">
                    سلة التسوق الخاصة بك فارغة!
                </div>
            </div>
        );
    }

    return (
        <Indicator url={`/${domain}/shop/cart`} dropdown={dropdown} value={cart?.qty} icon={<Cart20Svg />} />
    );
}

const mapStateToProps = (state) => ({
    cart: state.cart,
});

const mapDispatchToProps = {
    cartRemoveItem,
    fetchCartData,
    cartRemoveItemLocal,
};

export default connect(mapStateToProps, mapDispatchToProps)(IndicatorCart);
