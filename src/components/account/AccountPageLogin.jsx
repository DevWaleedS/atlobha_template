// react
import React from 'react';

// third-party
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

// application
import PageHeader from '../shared/PageHeader';
import { Check9x7Svg } from '../../svg';

// data stubs
import theme from '../../data/theme';

export default function AccountPageLogin() {
    const breadcrumb = [
        { title: 'الرئيسية', url: '' },
        { title: 'حسابي', url: '' },
    ];

    return (
        <React.Fragment>
            <Helmet>
                <title>{`تسجيل الدخول — ${theme.name}`}</title>
            </Helmet>

            <PageHeader header="حسابي" breadcrumb={breadcrumb} />

            <div className="block">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 d-flex">
                            <div className="card flex-grow-1 mb-md-0">
                                <div className="card-body">
                                    <h3 className="card-title">تسجيل الدخول</h3>
                                    <form>
                                        <div className="form-group">
                                            <label htmlFor="login-email">البريد الالكتروني</label>
                                            <input
                                                id="login-email"
                                                type="email"
                                                className="form-control"
                                                placeholder="البريد الالكتروني"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="login-password">كلمة المرور</label>
                                            <input
                                                id="login-password"
                                                type="password"
                                                className="form-control"
                                                placeholder="كلمة المرور"
                                            />
                                            <small className="form-text text-muted">
                                                <Link to="/">نسيت كلمة المرور</Link>
                                            </small>
                                        </div>
                                        <div className="form-group">
                                            <div className="form-check">
                                                <span className="form-check-input input-check">
                                                    <span className="input-check__body">
                                                        <input
                                                            id="login-remember"
                                                            type="checkbox"
                                                            className="input-check__input"
                                                        />
                                                        <span className="input-check__box" />
                                                        <Check9x7Svg className="input-check__icon" />
                                                    </span>
                                                </span>
                                                <label className="form-check-label" htmlFor="login-remember">
                                                    تذكرني
                                                </label>
                                            </div>
                                        </div>
                                        <button type="submit" className="btn btn-primary mt-2 mt-md-3 mt-lg-4">
                                            تسجيل الدخول
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 d-flex mt-4 mt-md-0">
                            <div className="card flex-grow-1 mb-0">
                                <div className="card-body">
                                    <h3 className="card-title">الاشتراك</h3>
                                    <form>
                                        <div className="form-group">
                                            <label htmlFor="register-email">البريد الالكتروني</label>
                                            <input
                                                id="register-email"
                                                type="email"
                                                className="form-control"
                                                placeholder="البريد الالكتروني"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="register-password">كلمة المرور</label>
                                            <input
                                                id="register-password"
                                                type="password"
                                                className="form-control"
                                                placeholder="كلمة المرور"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="register-confirm">اعادة كلمة المرور</label>
                                            <input
                                                id="register-confirm"
                                                type="password"
                                                className="form-control"
                                                placeholder="اعادة كلمة المرور"
                                            />
                                        </div>
                                        <button type="submit" className="btn btn-primary mt-2 mt-md-3 mt-lg-4">
                                            الاشتراك
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}
