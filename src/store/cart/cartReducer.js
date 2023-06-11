import { CART_SET_ITEM,CART_ADD_ITEM, CART_REMOVE_ITEM, CART_UPDATE_QUANTITIES } from './cartActionTypes';

/**
 * @param {array} items
 * @param {object} product
 * @param {array} options
 * @return {number}
 */
function findItemIndex(items, product, options) {
    return items.findIndex((item) => {
        if (item.product.id !== product.id || item.options.length !== options.length) {
            return false;
        }

        for (let i = 0; i < options.length; i += 1) {
            const option = options[i];
            const itemOption = item.options.find((itemOption) => (
                itemOption.optionId === option.optionId && itemOption.valueId === option.valueId
            ));

            if (!itemOption) {
                return false;
            }
        }

        return true;
    });
}

function calcSubtotal(items) {
    return items.reduce((subtotal, item) => subtotal + item.total, 0);
}

function calcQuantity(items) {
    return items.reduce((quantity, item) => quantity + item.quantity, 0);
}

function calcTotal(subtotal, extraLines) {
    return subtotal + extraLines.reduce((total, extraLine) => total + extraLine.price, 0);
}

function addItem(state, data) {
    return {
        ...state,
        items: data?.cartDetail,
        quantity: data?.count,
        subtotal:data?.total,
        total:data?.total,
        lastItemId:data?.cartDetail?.[data?.cartDetail?.length- 1]?.product?.id,
    };
}

function removeItem(state, data) {
    return {
        ...state,
        items: data?.cartDetail,
        quantity: data?.count,
        subtotal:data?.total,
        total:data?.total,
    };
}

function updateQuantities(state, quantities) {
    let needUpdate = false;

    const newItems = state.items.map((item) => {
        const quantity = quantities.find((x) => x.itemId === item.id && x.value !== item.quantity);

        if (!quantity) {
            return item;
        }

        needUpdate = true;

        return {
            ...item,
            quantity: quantity.value,
            total: quantity.value * item.price,
        };
    });

    if (needUpdate) {
        const subtotal = calcSubtotal(newItems);
        const total = calcTotal(subtotal, state.extraLines);

        return {
            ...state,
            items: newItems,
            quantity: calcQuantity(newItems),
            subtotal,
            total,
        };
    }

    return state;
}

function getData(state, data) {
    return {
        ...state,
        items: data?.cartDetail || [],
        quantity: Number(data?.count) || 0,
        subtotal: Number(data?.total) || 0,
        total: Number(data?.total) || 0,
    };
}

/*
* item example:
* {
*   id: 1,
*   product: {...}
*   options: [
*     {optionId: 1, optionTitle: 'Color', valueId: 1, valueTitle: 'Red'}
*   ],
*   price: 250,
*   quantity: 2,
*   total: 500
* }
* extraLine example:
* {
*   type: 'shipping',
*   title: 'Shipping',
*   price: 25
* }
*/
const initialState = {
    lastItemId: 0,
    quantity: 0,
    items: [],
    subtotal: 0,
    extraLines: [ // shipping, taxes, fees, .etc
        {
            type: 'shipping',
            title: 'الشحن',
            price: 25,
        },
        {
            type: 'tax',
            title: 'الضريبة',
            price: 0,
        },
    ],
    total: 0,
};

export default function cartReducer(state = initialState, action) {
    switch (action.type) {
    case CART_SET_ITEM:
        return getData(state,action.data);

    case CART_ADD_ITEM:
        return addItem(state, action.data);

    case CART_REMOVE_ITEM:
        return removeItem(state, action.data);

    case CART_UPDATE_QUANTITIES:
        return updateQuantities(state, action.quantities);

    default:
        return state;
    }
}
