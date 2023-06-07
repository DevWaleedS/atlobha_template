// react
import React, { useEffect, useState } from "react";

// third-party
import { Helmet } from "react-helmet-async";
import useFetch from "../../hooks/useFetch";

// images and icons
import AboutUsBg from "../../img/about_us.png";

function SitePageAboutUs() {
    const { fetchedData: about_us_page } = useFetch("https://backend.atlbha.com/api/storPage/111?id=1");
    const [aboutUsPage, setAboutUsPage] = useState();
    useEffect(() => {
        const debounce = setTimeout(() => {
            if (about_us_page?.data?.pages) {
                setAboutUsPage(about_us_page?.data?.pages.map((page) => page)[2]);
            }
        }, 200);

        return () => clearTimeout(debounce);
    }, [about_us_page?.data?.pages]);

    return (
        <div className="block about-us">
            <Helmet>
                <title>{`About Us — ${aboutUsPage?.title}`}</title>
            </Helmet>

            <div className="about-us__image" style={{ backgroundImage: `url(${AboutUsBg})` }} />
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-xl-10">
                        <div className="about-us__body">
                            <h1 className="about-us__title">{aboutUsPage?.title}</h1>
                            <div
                                className="about-us__text typography"
                                dangerouslySetInnerHTML={{ __html: aboutUsPage?.page_content }}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SitePageAboutUs;
