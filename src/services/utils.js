export const url = {
    home: () => '/',

    catalog: () => '/shop/products',

    category: (category) => `/shop/catalog/${category.slug}`,

    product: (product) => `/shop/products/${product?.id}`,
};

export function getCategoryParents(category) {
    return category.parent ? [...getCategoryParents(category.parent), category.parent] : [];
}
