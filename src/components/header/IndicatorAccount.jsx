// react
import React, { useState } from 'react';

// third-party
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useHistory } from "react-router";

// application
import Indicator from './Indicator';
import { Person20Svg } from '../../svg';

export default function IndicatorAccount() {
    const token = localStorage.getItem('token');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [EmailError, setrEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    let history = useHistory();
    const [disabledLogin, setDisabledLogin] = useState(false);

    const Login = () => {
        setDisabledLogin(true);
        setrEmailError('');
        setPasswordError('');
        const data = {
            user_name: email,
            password: password,
        };
        axios.post('https://backend.atlbha.com/api/loginapi', data).then((res) => {
            if (res?.data?.success === true && res?.data?.data?.status === 200) {
                toast.success(res?.data?.message?.ar, { theme: 'colored' });
                localStorage.setItem('token', res?.data?.data?.token);
                history.push('/');
                setDisabledLogin(false);
            } else {
                setrEmailError(res?.data?.message?.en?.user_name?.[0]);
                setPasswordError(res?.data?.message?.en?.password?.[0]);
                setDisabledLogin(false);
            }
        });
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            Login();
        }
    };

    const Logout = () => {
        localStorage.removeItem("token");
        toast.success('تم تسجيل الخروج بنجاح', { theme: 'colored' });
        history.push('/');

    }

    const dropdown = (
        <div className="account-menu">
            {!token ?
                (
                    <form className="account-menu__form">
                        <div className="account-menu__form-title">تسجيل الدخول إلى حسابك</div>
                        <div className="form-group">
                            <label htmlFor="header-signin-email" className="sr-only">البريد الالكتروني</label>
                            <input
                                id="header-signin-email"
                                type="email"
                                className="form-control form-control-sm"
                                placeholder="البريد الالكتروني"
                                name='email'
                                value={email}
                                onKeyDown={handleKeyDown}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                            />
                            <span className='text-danger' style={{ fontSize: '0.8rem' }}>{EmailError && EmailError}</span>
                        </div>
                        <div className="form-group">
                            <label htmlFor="header-signin-password" className="sr-only">كلمة المرور</label>
                            <div className="account-menu__form-forgot">
                                <input
                                    id="header-signin-password"
                                    type="password"
                                    className="form-control form-control-sm"
                                    placeholder="كلمة المرور"
                                    name='password'
                                    value={password}
                                    onKeyDown={handleKeyDown}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                    }}
                                />
                                <span className="text-danger" style={{ fontSize: '0.8rem' }}>{passwordError && passwordError}</span>
                                <Link to="/account/login" className="account-menu__form-forgot-link">نسيت كلمة المرور?</Link>
                            </div>
                        </div>
                        <div className="form-group account-menu__form-button">
                            <button type="button" disabled={disabledLogin} onClick={Login} className="btn btn-primary btn-sm">تسجيل الدخول</button>
                        </div>
                        <div className="account-menu__form-link">
                            <Link to="/account/login">إنشاء حساب جديد</Link>
                        </div>
                    </form>
                )
                :
                (
                    <>
                        <div className="account-menu__divider" />
                        <Link to="/account/dashboard" className="account-menu__user">
                            <div className="account-menu__user-avatar">
                                <img src="images/avatars/avatar-3.jpg" alt="" />
                            </div>
                            <div className="account-menu__user-info">
                                <div className="account-menu__user-name">Helena Garcia</div>
                                <div className="account-menu__user-email">stroyka@example.com</div>
                            </div>
                        </Link>
                        <div className="account-menu__divider" />
                        <ul className="account-menu__links">
                            <li><Link to="/account/profile">تعديل الملف الشخصي</Link></li>
                            <li><Link to="/account/orders">الطلبات</Link></li>
                            <li><Link to="/account/addresses">العناوين</Link></li>
                            <li><Link to="/account/password">كلمة المرور</Link></li>
                        </ul>
                        <div className="account-menu__divider" />
                        <ul className="account-menu__links">
                            <li><Link onClick={Logout}>تسجيل الخروج</Link></li>
                        </ul>
                    </>
                )
            }
        </div>
    );

    return (
        <Indicator url="/account" dropdown={dropdown} icon={<Person20Svg />} />
    );
}
