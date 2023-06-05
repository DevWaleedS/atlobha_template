export default [
    {
        title: 'الرئيسية',
        url: '/',
    },
    {
        title: 'تواصل معنا',
        url: '/site/contact-us',
    },
    {
        title: 'الاستبدال والاسترجاع',
        url: '/',
    },
    {
        title: 'الخصوصية',
        url: '/',
    },
    {
        title: 'المنتجات',
        url: '/shop/catalog',
    },
    {
        title: 'المقالات',
        url: '/blog/category-classic',
    },
    {
        title: 'الصفحات',
        url: '/site/contact-us',
        submenu: {
            type: 'menu',
            menu: [
                { title: 'من نحن', url: '' },
                { title: 'تواصل معنا', url: '/site/contact-us' },
                { title: 'تواصل معنا Alt', url: '' },
                { title: '404', url: '' },
                { title: 'الشروط والأحكام', url: '' },
                { title: 'الأسئلة الشائعة', url: '' },
                { title: 'العناصر', url: '' },
                { title: 'الخطوط', url: '' },
            ],
        },
    },
];
