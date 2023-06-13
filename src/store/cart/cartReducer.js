import axios from "axios";
import { toast } from "react-toastify";
import { CART_SET_ITEM, CART_ADD_ITEM, CART_REMOVE_ITEM, CART_UPDATE_QUANTITIES, CART_ADD_ITEM_LOCAL, CART_REMOVE_ITEM_LOCAL, RESET_LOCAL_CART, AAD_LOCAL_CART_TO_DB } from './cartActionTypes';

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
        subtotal: data?.total,
        total: data?.total,
        lastItemId: data?.cartDetail?.[data?.cartDetail?.length - 1]?.product?.id,
    };
}

function removeItem(state, data) {
    return {
        ...state,
        items: data?.cartDetail,
        quantity: data?.count,
        subtotal: data?.total,
        total: data?.total,
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
        items: data?.cartDetail || state?.items || [],
        quantity: Number(data?.count) || state?.quantity || 0,
        subtotal: Number(data?.total) || state?.subtotal || 0,
        total: Number(data?.total) || state?.total || 0,
        lastItemId: data?.cartDetail?.[data?.cartDetail?.length - 1]?.product?.id || state?.lastItemId || null,
    };
}

function addItemLocal(state, product, options, quantity) {
    const itemIndex = findItemIndex(state.items, product, options);

    let newItems;
    let { lastItemId } = state;

    if (itemIndex === -1) {
        lastItemId += 1;
        newItems = [...state.items, {
            id: lastItemId,
            product: JSON.parse(JSON.stringify(product)),
            options: JSON.parse(JSON.stringify(options)),
            price: Number(product?.selling_price),
            total: Number(product?.selling_price) * quantity,
            quantity,
        }];
    } else {
        const item = state.items[itemIndex];

        newItems = [
            ...state.items.slice(0, itemIndex),
            {
                ...item,
                quantity: item.quantity + quantity,
                total: (item.quantity + quantity) * Number(item?.product?.selling_price),
            },
            ...state.items.slice(itemIndex + 1),
        ];
    }

    const subtotal = calcSubtotal(newItems);
    const total = calcTotal(subtotal, state.extraLines);

    return {
        ...state,
        lastItemId,
        subtotal,
        total,
        items: newItems,
        quantity: calcQuantity(newItems),
    };
}

function removeItemLocal(state, itemId) {
    const { items } = state;
    const newItems = items.filter((item) => item?.product?.id !== itemId);

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

function resetLocalCart(state) {
    return {
        ...state,
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
}

function addCartToDB(state) {
    var formData = new FormData;
    const token = localStorage.getItem("token");
    const productData = state?.items?.map((item) => ({
        id: item?.product?.id,
        name: item?.product?.name,
        price: item?.product?.selling_price,
        qty: item?.quantity,
    }));

    async function addData() {
        try {
            const response = await axios.post(`https://backend.atlbha.com/api/addCart`, ...productData, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response?.data?.success === true) {
                this.addItem(state,response?.data?.data);
            }
        } catch (err) {
            toast.error(err, { theme: "colored" });
        }
    };
    addData();
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
            return getData(state, action.data);

        case CART_ADD_ITEM:
            return addItem(state, action.data);

        case CART_REMOVE_ITEM:
            return removeItem(state, action.data);

        case CART_UPDATE_QUANTITIES:
            return updateQuantities(state, action.quantities);

        case CART_ADD_ITEM_LOCAL:
            return addItemLocal(state, action.product, action.options, action.quantity);
        case CART_REMOVE_ITEM_LOCAL:
            return removeItemLocal(state, action.itemId);
        case RESET_LOCAL_CART:
            return resetLocalCart(state);
        case AAD_LOCAL_CART_TO_DB:
            return addCartToDB(state);
        default:
            return state;
    }
}
