import axios from 'axios';
import { toast } from 'react-toastify';
import { CART_SET_ITEM, CART_ADD_ITEM, CART_REMOVE_ITEM, CART_UPDATE_QUANTITIES } from './cartActionTypes';

export function cartUpdateQuantitiesSuccess(quantities) {
    return {
        type: CART_UPDATE_QUANTITIES,
        quantities,
    };
}

export function cartAddItem(product, options = [], quantity = 1) {
    const token = localStorage.getItem('token');
    const productData ={
        id:product?.id,
        name:product?.name,
        price:product?.selling_price,
        qty:quantity
    }
    let resultData = null;
    return async function (dispatch) {
        try {
            const response = await axios.post(`https://backend.atlbha.com/api/addCart`,productData, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            if(response?.data?.success === true){
                toast.success(`منتج "${productData?.name}" تمت اضافته للسلة !`, { theme: 'colored' });
                resultData = response?.data?.data;
            }
        } catch (err) {
            toast.error(err, { theme: 'colored' });
        }
        dispatch({
            type: CART_ADD_ITEM,
            data:resultData
        });
    }
}

export function cartRemoveItem(itemId) {
    const token = localStorage.getItem('token');
    let resultData = null;
    return async function (dispatch) {
        try {
            const response = await axios.get(`https://backend.atlbha.com/api/deleteCart/${itemId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            if(response?.data?.success === true){
                resultData = response?.data?.data;
            }
        } catch (err) {
            toast.error(err, { theme: 'colored' });
        }
        dispatch({
            type: CART_REMOVE_ITEM,
            data:resultData
        });
    }
}

export function cartUpdateQuantities(quantities) {
    // sending request to server, timeout is used as a stub
    return (dispatch) => (
        new Promise((resolve) => {
            setTimeout(() => {
                dispatch(cartUpdateQuantitiesSuccess(quantities));
                resolve();
            }, 500);
        })
    );
}

export function fetchCartData() {
    const token = localStorage.getItem('token');
    let resultData = null;
    return async function (dispatch) {
        try {
            const response = await axios.get("https://backend.atlbha.com/api/cartShow/1", {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            resultData = response?.data?.data?.cart;
        } catch (err) {
            toast.error(err, { theme: 'colored' });
        }
        dispatch({
            type: CART_SET_ITEM,
            data:resultData,
        });
    }
}
