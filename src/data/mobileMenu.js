export default [
    {
        type: "link",
        label: "الرئيسية",
        url: "/",
    },
    {
        type: "link",
        label: "المنتجات",
        url: "/shop/catalog",
    },
    {
        type: "link",
        label: "المقالات",
        url: "/blog/category-classic",
    },
    {
        type: "link",
        label: "الاستبدال والاسترجاع",
        url: "/",
    },

    {
        type: "link",
        label: "الصفحات",
        url: "/site/contact-us",
        children: [
            { type: "link", label: "من نحن", url: "/site/SitePages/:id" },
            { type: "link", label: "تواصل معنا", url: "/site/contact-us" },
            { type: "link", label: "تواصل معنا Alt", url: "/site/contact-us-alt" },
            { type: "link", label: "الشروط و الأحكام", url: "/site/SitePages/:id" },
            { type: "link", label: "سياسة الاستخدام", url: "/site/SitePages/:id" },
            { type: "link", label: "سياسة الخصوصية", url: " " },
        ],
    },
];
