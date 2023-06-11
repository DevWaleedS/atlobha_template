// import React from "react";
// import useFetch from "../hooks/useFetch";

// export const PagesLinks = () => {
//     const { fetchedData } = useFetch("https://backend.atlbha.com/api/indexStore/1");
//     console.log(fetchedData?.data?.pages);
// };

export default [
    {
        type: "link",
        label: "الرئيسية",
        url: "/",
    },
    {
        type: 'link',
        label: 'المنتجات',
        url: '/shop/products',
    },
    {
        type: 'link',
        label: 'المقالات',
        url: '/blog/posts',
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
            { type: "link", label: "تواصل معنا", url: "/site/contact-us" },
            { type: "link", label: "تواصل معنا Alt", url: "/site/contact-us-alt" },
        ],
    },
];
