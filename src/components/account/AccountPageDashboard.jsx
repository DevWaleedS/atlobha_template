// react
import React from 'react';

// third-party
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

// data stubs
import addresses from '../../data/accountAddresses';
import allOrders from '../../data/accountOrders';
import theme from '../../data/theme';

export default function AccountPageDashboard() {
    const address = addresses[0];
    const orders = allOrders.slice(0, 3).map((order) => (
        <tr key={order.id}>
            <td>
                <Link to="/account/orders/5">
                    #
                    {order.id}
                </Link>
            </td>
            <td>{order.date}</td>
            <td>{order.status}</td>
            <td>{order.total}</td>
        </tr>
    ));

    return (
        <div className="dashboard">
            <Helmet>
                <title>{`حسابي — ${theme.name}`}</title>
            </Helmet>

            <div className="dashboard__profile card profile-card">
                <div className="card-body profile-card__body">
                    <div className="profile-card__avatar">
                        <img src="images/avatars/avatar-3.jpg" alt="" />
                    </div>
                    <div className="profile-card__name">Helena Garcia</div>
                    <div className="profile-card__email">stroyka@example.com</div>
                    <div className="profile-card__edit">
                        <Link to="profile" className="btn btn-secondary btn-sm">تعديل الملف الشخصي</Link>
                    </div>
                </div>
            </div>
            <div className="dashboard__address card address-card address-card--featured">
                {address.default && <div className="address-card__badge">العنوان الافتراضي</div>}
                <div className="address-card__body">
                    <div className="address-card__name">{`${address.firstName} ${address.lastName}`}</div>
                    <div className="address-card__row">
                        {address.country}
                        <br />
                        {address.postcode}
                        ,
                        {address.city}
                        <br />
                        {address.address}
                    </div>
                    <div className="address-card__row">
                        <div className="address-card__row-title">رقم الهاتف</div>
                        <div className="address-card__row-content">{address.phone}</div>
                    </div>
                    <div className="address-card__row">
                        <div className="address-card__row-title">البريد الالكتروني</div>
                        <div className="address-card__row-content">{address.email}</div>
                    </div>
                    <div className="address-card__footer">
                        <Link to="/account/addresses/5">تعديل العنوان</Link>
                    </div>
                </div>
            </div>
            <div className="dashboard__orders card">
                <div className="card-header">
                    <h5>آخر الطلبات</h5>
                </div>
                <div className="card-divider" />
                <div className="card-table">
                    <div className="table-responsive-sm">
                        <table>
                            <thead>
                                <tr>
                                    <th>الطلب</th>
                                    <th>تاريخ الطلب</th>
                                    <th>حالة الطلب</th>
                                    <th>الاجمالي</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
