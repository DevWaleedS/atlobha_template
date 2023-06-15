// react
import React from "react";
export default function FooterContacts({ fetchedData }) {
    return (
        <div className="site-footer__widget footer-contacts">
            <h5 className="footer-contacts__title">تواصل معنا</h5>

            <div className="footer-contacts__text">{fetchedData?.storeName}</div>

            <ul className="footer-contacts__contacts">
                <li>
                    <i className="footer-contacts__icon fas fa-globe-americas" />
                    {fetchedData?.storeAddress}
                </li>
                <li>
                    <i className="footer-contacts__icon far fa-envelope" />
                    {fetchedData?.storeEmail}
                </li>
                <li>
                    <i className="footer-contacts__icon fas fa-mobile-alt" />
                    {fetchedData?.phonenumber}
                </li>

                {/**
                <li>
                    <i className="footer-contacts__icon far fa-clock" />
                    Mon-Sat 10:00pm - 7:00pm
                </li>
             */}
            </ul>
        </div>
    );
}
