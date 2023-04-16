export default [
    {
        title: 'الرئيسية',
        url: '/',
    },
    {
        title: 'المنتجات',
        url: '/shop/catalog',
    },
    {
        title: 'المدونة',
        url: '/blog/category-classic',
    },
    {
        title: 'الصفحات',
        url: '/site/about-us',
        submenu: {
            type: 'menu',
            menu: [
                { title: 'من نحن', url: '/site/about-us' },
                { title: 'تواصل معنا', url: '/site/contact-us' },
                { title: 'تواصل معنا Alt', url: '/site/contact-us-alt' },
                { title: '404', url: '/site/not-found' },
                { title: 'الشروط والأحكام', url: '/site/terms' },
                { title: 'الأسئلة الشائعة', url: '/site/faq' },
                { title: 'العناصر', url: '/site/components' },
                { title: 'الخطوط', url: '/site/typography' },
            ],
        },
    },
];
