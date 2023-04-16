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
        url: '/site/about-us',
        children: [
            { type: 'link', label: 'من نحن', url: '/site/about-us' },
            { type: 'link', label: 'تواصل معنا', url: '/site/contact-us' },
            { type: 'link', label: 'تواصل معنا Alt', url: '/site/contact-us-alt' },
            { type: 'link', label: '404', url: '/site/not-found' },
            { type: 'link', label: 'الشروط والأحكام', url: '/site/terms' },
            { type: 'link', label: 'الأسئلة الشائعة', url: '/site/faq' },
            { type: 'link', label: 'العناصر', url: '/site/components' },
            { type: 'link', label: 'الخطوط', url: '/site/typography' },
        ],
    },
];
