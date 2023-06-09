// react
import React from 'react';

// third-party
import { Helmet } from 'react-helmet-async';

// data stubs
import theme from '../../data/theme';

function StoreNotFound({title}) {
    return (
        <div className="block">
            <Helmet>
                <title>{`Store Not Found — ${theme.name}`}</title>
            </Helmet>

            <div className="container">
                <div className="not-found">
                    <div className="not-found__404">
                        خطأ
                    </div>

                    <div className="not-found__content">
                        <h1 className="not-found__title">{title}</h1>

                        <p className="not-found__text">
                            لايمكننا العثور على المتجر التي تبحث عنه
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StoreNotFound;
