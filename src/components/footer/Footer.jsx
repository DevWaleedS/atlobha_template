// react
import React from 'react';

// application
import FooterContacts from './FooterContacts';
import FooterLinks from './FooterLinks';
import FooterNewsletter from './FooterNewsletter';
import ToTop from './ToTop';
import Whatsapp from './Whatsapp';

export default function Footer({ fetchedData }) {
    // const informationLinks = [
    //     { title: 'About Us', url: '' },
    //     { title: 'Delivery Information', url: '' },
    //     { title: 'Privacy Policy', url: '' },
    //     { title: 'Brands', url: '' },
    //     { title: 'Contact Us', url: '' },
    //     { title: 'Returns', url: '' },
    //     { title: 'Site Map', url: '' },
    // ];

    // const accountLinks = [
    //     { title: 'Store Location', url: '' },
    //     { title: 'Order History', url: '' },
    //     { title: 'Wish List', url: '' },
    //     { title: 'Newsletter', url: '' },
    //     { title: 'Specials', url: '' },
    //     { title: 'Gift Certificates', url: '' },
    //     { title: 'Affiliate', url: '' },
    // ];

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
                        <a href="https://faz-it.net/" rel="noopener noreferrer" target="_blank"> شبكة فاز </a>
                    </div>
                    <div className="site-footer__payments">
                        <a href="https://google.com" rel="noopener noreferrer" target="_blank">
                            <img src="images/maroof.webp" width="60" alt="maroof" />
                        </a>
                        <img src="images/payments.png" alt="payments" />
                    </div>
                </div>
            </div>
            <ToTop />
            <Whatsapp />
        </div>
    );
}
