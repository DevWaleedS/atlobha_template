// react
import React from 'react';

// third-party
import { Helmet } from 'react-helmet-async';

// data stubs
import theme from '../../data/theme';

export default function AccountPagePassword() {
    return (
        <div className="card">
            <Helmet>
                <title>{`تغيير كلمة المرور — ${theme.name}`}</title>
            </Helmet>

            <div className="card-header">
                <h5>تغيير كلمة المرور</h5>
            </div>
            <div className="card-divider" />
            <div className="card-body">
                <div className="row no-gutters">
                    <div className="col-12 col-lg-7 col-xl-6">
                        <div className="form-group">
                            <label htmlFor="password-current">كلمة المرور الحالية</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password-current"
                                placeholder="كلمة المرور الحالية"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password-new">كلمة المرور الجديدة</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password-new"
                                placeholder="كلمة المرور الجديدة"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password-confirm">تأكيد كلمة المرور الجديد</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password-confirm"
                                placeholder="تأكيد كلمة المرور الجديدة"
                            />
                        </div>

                        <div className="form-group mt-5 mb-0">
                            <button type="button" className="btn btn-primary">تغيير</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
