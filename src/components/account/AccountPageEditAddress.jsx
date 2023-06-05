// react
import React from 'react';

// third-party
import { Helmet } from 'react-helmet-async';

// data stubs
import theme from '../../data/theme';

export default function AccountPageEditAddress() {
    return (
        <div className="card">
            <Helmet>
                <title>{`تعديل العنوان — ${theme.name}`}</title>
            </Helmet>

            <div className="card-header">
                <h5>تعديل العنوان</h5>
            </div>
            <div className="card-divider" />
            <div className="card-body">
                <div className="row no-gutters">
                    <div className="col-12 col-lg-10 col-xl-8">
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="checkout-first-name">الاسم الاول</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="checkout-first-name"
                                    placeholder="الاسم الاول"
                                />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="checkout-last-name">الاسم الاخير</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="checkout-last-name"
                                    placeholder="الاسم الاخير"
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="checkout-country">الدولة</label>
                            <select id="checkout-country" className="form-control form-control-select2">
                                <option>أختر الدولة...</option>
                                <option>United States</option>
                                <option>Russia</option>
                                <option>Italy</option>
                                <option>France</option>
                                <option>Ukraine</option>
                                <option>Germany</option>
                                <option>Australia</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="checkout-street-address">اسم الشارع</label>
                            <input
                                type="text"
                                className="form-control"
                                id="checkout-street-address"
                                placeholder="اسم الشارع"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="checkout-address">
                                شقة وحدة جناح الخ
                                {' '}
                                <span className="text-muted">(اختياري)</span>
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="checkout-address"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="checkout-postcode">رمز البريد / ZIP</label>
                            <input
                                type="text"
                                className="form-control"
                                id="checkout-postcode"
                            />
                        </div>

                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="checkout-email">البريد الالكتروني</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="checkout-email"
                                    placeholder="البريد الالكتروني"
                                />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="checkout-phone">رقم الهاتف</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="checkout-phone"
                                    placeholder="رقم الهاتف"
                                />
                            </div>
                        </div>

                        <div className="form-group mt-3 mb-0">
                            <button className="btn btn-primary" type="button">حفظ</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
