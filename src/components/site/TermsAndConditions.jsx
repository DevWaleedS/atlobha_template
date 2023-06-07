// react
import React, { useEffect, useState } from "react";

// third-party
import { Helmet } from "react-helmet-async";

// application
import PageHeader from "../shared/PageHeader";

// data stubs
import theme from "../../data/theme";
import useFetch from "../../hooks/useFetch";

function TermsAndConditions() {
    const breadcrumb = [
        { title: "الرئيسية", url: "" },
        { title: "الشروط و الأحكام", url: "site/termsAndConditions" },
    ];

    const { fetchedData } = useFetch("https://backend.atlbha.com/api/storPage/111?id=1");
    const [termsAndConditionsPage, seTermsAndConditions] = useState();
    useEffect(() => {
        const debounce = setTimeout(() => {
            if (fetchedData?.data?.pages) {
                seTermsAndConditions(fetchedData?.data?.pages.map((page) => page)[0]);
            }
        }, 200);

        return () => clearTimeout(debounce);
    }, [fetchedData?.data?.pages]);

    return (
        <React.Fragment>
            <Helmet>
                <title>{`Terms And Conditions — ${termsAndConditionsPage?.title}`}</title>
            </Helmet>

            <PageHeader header={termsAndConditionsPage?.title} breadcrumb={breadcrumb} />

            <div className="block faq">
                <div
                    className="container"
                    dangerouslySetInnerHTML={{ __html: termsAndConditionsPage?.page_content }}
                ></div>
            </div>
        </React.Fragment>
    );
}

export default TermsAndConditions;
