export default [
    {
        type: "link",
        label: "الرئيسية",
        url: "/",
    },
    {
        type: "link",
        label: "المنتجات",
        url: "/shop/products",
    },
    {
        type: "link",
        label: "المقالات",
        url: "/blog/posts",
    },
    {
        type: "link",
        label: "تواصل معنا Alt",
        url: "/site/contact-us",
    },
    {
        type: "link",
        label: "الصفحات",
        url: "/site/contact-us",

        children: [
            { type: "link", label: "تواصل معنا", url: "/site/contact-us" },
            { type: "link", label: "تواصل معنا Alt", url: "/site/contact-us-alt" },
        ],
    },
];
