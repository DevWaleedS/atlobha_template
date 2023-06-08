// react
import React from "react";

// application
import FooterContacts from "./FooterContacts";
import FooterLinks from "./FooterLinks";
import FooterNewsletter from "./FooterNewsletter";
import ToTop from "./ToTop";
import Whatsapp from "./Whatsapp";

// import

export default function Footer({ fetchedData }) {
    

    return (
        <div className="site-footer">
            <div className="container">
                <div className="site-footer__widgets">
                    <div className="row">
                        <div className="col-12 col-md-6 col-lg-4">
                            <FooterContacts fetchedData={fetchedData} />
                        </div>
                        <div className="col-12 col-md-6 col-lg-4">
                            <FooterLinks title="معلومات" items={fetchedData?.pages} />
                        </div>
                        <div className="col-12 col-md-12 col-lg-4">
                            <FooterNewsletter fetchedData={fetchedData} />
                        </div>
                    </div>
                </div>

                <div className="site-footer__bottom">
                    <div className="site-footer__copyright">
                        صنع بكل حب 2023 &copy;
                        <a href="https://faz-it.net/" rel="noopener noreferrer" target="_blank">
                            {" "}
                            شبكة فاز{" "}
                        </a>
                    </div>
                    <div className="site-footer__payments">
                        {fetchedData?.paymentMethod?.map((payment) => (
                            <div key={payment?.id}>
                                <img className="img-fluid" src={payment?.image} alt={payment?.name} width="30" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <ToTop />
            <Whatsapp />
        </div>
    );
}
