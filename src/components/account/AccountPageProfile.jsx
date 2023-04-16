// react
import React from 'react';

// third-party
import { Helmet } from 'react-helmet-async';

// data stubs
import theme from '../../data/theme';

export default function AccountPageProfile() {
    return (
        <div className="card">
            <Helmet>
                <title>{`الملف الشخصي — ${theme.name}`}</title>
            </Helmet>

            <div className="card-header">
                <h5>تعديل الملف الشخصي</h5>
            </div>
            <div className="card-divider" />
            <div className="card-body">
                <div className="row no-gutters">
                    <div className="col-12 col-lg-7 col-xl-6">
                        <div className="form-group">
                            <label htmlFor="profile-first-name">الاسم الاول</label>
                            <input
                                id="profile-first-name"
                                type="text"
                                className="form-control"
                                placeholder="الاسم الاول"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="profile-last-name">الاسم الاخير</label>
                            <input
                                id="profile-last-name"
                                type="text"
                                className="form-control"
                                placeholder="الاسم الاخير"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="profile-email">البريد الالكتروني</label>
                            <input
                                id="profile-email"
                                type="email"
                                className="form-control"
                                placeholder="البريد الالكتروني"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="profile-phone">رقم الهاتف</label>
                            <input
                                id="profile-phone"
                                type="text"
                                className="form-control"
                                placeholder="رقم الهاتف"
                            />
                        </div>

                        <div className="form-group mt-5 mb-0">
                            <button type="button" className="btn btn-primary">حفظ</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
