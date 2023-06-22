const domain = window.location.pathname.split('/')[1];
export default [
    {
        title: "الرئيسية",
        url: `/${domain}`,
    },

    {
        title: "المنتجات",
        url: `/${domain}/shop/products`,
    },
    {
        title: "المقالات",
        url: `/${domain}/blog/posts`,
    },
    {
        title: "تواصل معنا",
        url: `/${domain}/site/contact-us`,
    },

    {
        title: "الصفحات",
        url: `/${domain}`,
        submenu: {
            type: "menu",
            menu: [
                { title: "تواصل معنا", url: `/${domain}/site/contact-us` },
                { title: "تواصل معنا Alt", url: `/${domain}/site/contact-us-alt` },
            ],
        },
    },
];
