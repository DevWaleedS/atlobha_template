export default [
    {
        title: "الرئيسية",
        url: "/",
    },
    {
        title: "تواصل معنا",
        url: "/site/contact-us",
    },
    {
        title: "الاستبدال والاسترجاع",
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
        title: "الصفحات",
        url: "",
        submenu: {
            type: "menu",
            menu: [
                { title: "من نحن", url: "/site/about-us" },
                { title: "تواصل معنا", url: "/site/contact-us" },
                { title: "تواصل معنا Alt", url: "" },
                { title: "الشروط و الأحكام", url: "/site/termsAndConditions" },
                { title: "سياسة الاستخدام", url: "/site/usagePolicy" },
                { title: "سياسة الخصوصية", url: " " },
            ],
        },
    },
];
