// react
import React, { useEffect, useState } from "react";

// third-party
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

// application
import PageHeader from "../shared/PageHeader";

// data stubs
import theme from "../../data/theme";
import useFetch from "../../hooks/useFetch";

function UsagePolicy() {
    const breadcrumb = [
        { title: "الرئيسية", url: "" },
        { title: "سياسة الاستخدام", url: "site/usagePolicy" },
    ];

    const { fetchedData } = useFetch("https://backend.atlbha.com/api/storPage/111?id=1");
    const [usagePolicyPage, seUsagePolicyPage] = useState();
    useEffect(() => {
        const debounce = setTimeout(() => {
            if (fetchedData?.data?.pages) {
                seUsagePolicyPage(fetchedData?.data?.pages.map((page) => page)[1]);
            }
        }, 200);

        return () => clearTimeout(debounce);
    }, [fetchedData?.data?.pages]);

    return (
        <React.Fragment>
            <Helmet>
                <title>{`Usage Policy   — ${usagePolicyPage?.title}`}</title>
            </Helmet>

            <PageHeader breadcrumb={breadcrumb} />

            <div className="block">
                <div className="container">
                    <div className="document">
                        <div className="document__header">
                            <h1 className="document__title">{usagePolicyPage?.title}</h1>
                        </div>
                        <div
                            className="document__content typography"
                            dangerouslySetInnerHTML={{ __html: usagePolicyPage?.page_content }}
                        ></div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default UsagePolicy;
