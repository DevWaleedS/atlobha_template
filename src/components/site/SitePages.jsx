// react
import React, { useEffect, useState } from "react";

// third-party
import { Helmet } from "react-helmet-async";

// application
import PageHeader from "../shared/PageHeader";

// data stubs

import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

function SitePages() {
    const { id } = useParams();
    const { fetchedData } = useFetch(`https://backend.atlbha.com/api/storPage/${id}?id=1`);
    const [sitePage, seTSitePage] = useState();

    const breadcrumb = [
        { title: "الرئيسية", url: "" },
        { title: sitePage?.title, url: `/site/SitePages/${sitePage?.id}` },
    ];

    useEffect(() => {
        if (fetchedData?.data?.page) {
            seTSitePage(fetchedData?.data?.page);
        }
    }, [fetchedData?.data?.page]);

    return (
        <React.Fragment>
            <Helmet>
                <title>{`${sitePage?.title}`}</title>
            </Helmet>

            <PageHeader header={sitePage?.title} breadcrumb={breadcrumb} />

            <div className="block faq">
                <div className="container" dangerouslySetInnerHTML={{ __html: sitePage?.page_content }}></div>
            </div>
        </React.Fragment>
    );
}

export default SitePages;
