// react
import React from 'react';

// application
import SocialLinks from '../shared/SocialLinks';

export default function FooterNewsletter({ fetchedData }) {
    return (
        <div className="site-footer__widget footer-newsletter">
            <h5 className="footer-newsletter__title">اخر الاخبار</h5>
            <div className="footer-newsletter__text">
                Praesent pellentesque volutpat ex, vitae auctor lorem pulvinar mollis felis
                at lacinia.
            </div>

            <form action="" className="footer-newsletter__form">
                <label className="sr-only" htmlFor="footer-newsletter-address">البريد الالكتروني</label>
                <input
                    type="text"
                    className="footer-newsletter__form-input form-control"
                    id="footer-newsletter-address"
                    placeholder="البريد الالكتروني..."
                />
                <button type="submit" className="footer-newsletter__form-button btn btn-primary">الاشتراك</button>
            </form>

            <div className="footer-newsletter__text footer-newsletter__text--social">
                تابعونا على شبكات التواصل الاجتماعي
            </div>

            <SocialLinks fetchedData={fetchedData} className="footer-newsletter__social-links" shape="circle" />
        </div>
    );
}
