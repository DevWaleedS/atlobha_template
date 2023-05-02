export default [
    {
        type: 'link',
        label: 'الرئيسية',
        url: '/',
    },

    {
        type: 'link',
        label: 'المنتجات',
        url: '/shop/catalog',
    },

    {
        type: 'link',
        label: 'المدونة',
        url: '/blog/category-classic',
    },

    {
        type: 'link',
        label: 'الصفحات',
        url: '/site/contact-us',
        children: [
            { type: 'link', label: 'من نحن', url: '' },
            { type: 'link', label: 'تواصل معنا', url: '/site/contact-us' },
            { type: 'link', label: 'تواصل معنا Alt', url: '' },
            { type: 'link', label: '404', url: '' },
            { type: 'link', label: 'الشروط والأحكام', url: '' },
            { type: 'link', label: 'الأسئلة الشائعة', url: '' },
            { type: 'link', label: 'العناصر', url: '' },
            { type: 'link', label: 'الخطوط', url: '' },
        ],
    },
];
