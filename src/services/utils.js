const domain = window.location.pathname.split('/')[1];
export const url = {
    home: () => `/${domain}`,

    catalog: () => `/${domain}/shop/products`,

    category: (category) => `/${domain}/shop/catalog/${category.slug}`,

    product: (product) => `/${domain}/shop/product/${product?.id}`,
};

export function getCategoryParents(category) {
    return category.parent ? [...getCategoryParents(category.parent), category.parent] : [];
}
