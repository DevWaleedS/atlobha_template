export default [
    {
        title: "الرئيسية",
        url: "/",
    },

    {
        title: "المنتجات",
        url: "/shop/catalog",
    },
    {
        title: "المقالات",
        url: "/blog/category-classic",
    },
    {
        title: "الاستبدال والاسترجاع",
        url: "/",
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
