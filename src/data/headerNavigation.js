export default [
    {
        title: "الرئيسية",
        url: "/",
    },

    {
        title: "المنتجات",
        url: "/shop/products",
    },
    {
        title: "المقالات",
        url: "/blog/posts",
    },
    {
        title: "تواصل معنا",
        url: "/site/contact-us",
    },

    {
        title: "الصفحات",
        url: "/",
        submenu: {
            type: "menu",
            menu: [
                { title: "تواصل معنا", url: "/site/contact-us" },
                { title: "تواصل معنا Alt", url: "/site/contact-us-alt" },
            ],
        },
    },
];
