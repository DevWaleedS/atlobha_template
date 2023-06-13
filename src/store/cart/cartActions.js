import axios from "axios";
import { toast } from "react-toastify";
import { CART_SET_ITEM, CART_ADD_ITEM, CART_REMOVE_ITEM, CART_UPDATE_QUANTITIES,CART_ADD_ITEM_LOCAL,CART_REMOVE_ITEM_LOCAL,RESET_LOCAL_CART,AAD_LOCAL_CART_TO_DB } from "./cartActionTypes";

export function cartUpdateQuantitiesSuccess(quantities) {
    return {
        type: CART_UPDATE_QUANTITIES,
        quantities,
    };
}

export function cartAddItemSuccess(product, options = [], quantity = 1) {
    toast.success(`منتج "${product.name}" تمت اضافته للسلة !`, { theme: 'colored' });

    return {
        type: CART_ADD_ITEM_LOCAL,
        product,
        options,
        quantity,
    };
}

export function cartAddItemLocal(product, options = [], quantity = 1) {
    // sending request to server, timeout is used as a stub
    return (dispatch) => (
        new Promise((resolve) => {
            setTimeout(() => {
                dispatch(cartAddItemSuccess(product, options, quantity));
                resolve();
            }, 500);
        })
    );
}

export function cartRemoveItemLocal(itemId) {
    // sending request to server, timeout is used as a stub
    return (dispatch) => (
        new Promise((resolve) => {
            setTimeout(() => {
                dispatch(cartRemoveItemSuccess(itemId));
                resolve();
            }, 500);
        })
    );
}

export function cartRemoveItemSuccess(itemId) {
    return {
        type: CART_REMOVE_ITEM_LOCAL,
        itemId,
    };
}

export function cartAddItem(product, options = [], quantity = 1) {
    const token = localStorage.getItem("token");
    const productData = {
        id: product?.id,
        name: product?.name,
        price: product?.selling_price,
        qty: quantity,
    };
    let resultData = null;
    return async function (dispatch) {
        try {
            const response = await axios.post(`https://backend.atlbha.com/api/addCart`, productData, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response?.data?.success === true) {
                toast.success(`تم إضافة  "${productData?.name}" للسلة `, { theme: "colored" });
                resultData = response?.data?.data;
            }
        } catch (err) {
            toast.error(err, { theme: "colored" });
        }
        dispatch({
            type: CART_ADD_ITEM,
            data: resultData,
        });
    };
}

export function cartRemoveItem(itemId) {
    const token = localStorage.getItem("token");
    let resultData = null;
    return async function (dispatch) {
        try {
            const response = await axios.get(`https://backend.atlbha.com/api/deleteCart/${itemId}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response?.data?.success === true) {
                resultData = response?.data?.data;
            }
        } catch (err) {
            toast.error(err, { theme: "colored" });
        }
        dispatch({
            type: CART_REMOVE_ITEM,
            data: resultData,
        });
    };
}

export function cartUpdateQuantities(quantities) {
    // sending request to server, timeout is used as a stub
    return (dispatch) =>
        new Promise((resolve) => {
            setTimeout(() => {
                dispatch(cartUpdateQuantitiesSuccess(quantities));
                resolve();
            }, 500);
        });
}

export function fetchCartData() {
    const token = localStorage.getItem("token");
    let resultData = null;
    return async function (dispatch) {
        try {
            const response = await axios.get("https://backend.atlbha.com/api/cartShow/1", {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            resultData = response?.data?.data?.cart;
        } catch (err) {
            toast.error(err, { theme: "colored" });
        }
        dispatch({
            type: CART_SET_ITEM,
            data: resultData,
        });
    };
}

export function resetCartLocal() {
    return {
        type: RESET_LOCAL_CART,
    };
}

export function addLocalCartToDB() {
    return {
        type: AAD_LOCAL_CART_TO_DB,
    };
}
