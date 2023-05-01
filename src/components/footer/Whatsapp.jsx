// react
import React, { useEffect, useState } from 'react';

// third-party
import classNames from 'classnames';

// application
import { WhatsappIcon } from '../../svg';

export default function Whatsapp() {
    const [show, setShow] = useState(false);

    const showFrom = 300;
    const classes = classNames('whatsapp', {
        'whatsapp--show': show,
    });

    useEffect(() => {
        let state = false;
        const onScroll = () => {
            const newState = window.pageYOffset >= showFrom;

            if (state !== newState) {
                setShow(state = newState);
            }
        };

        window.addEventListener('scroll', onScroll, { passive: true });

        return () => window.removeEventListener('scroll', onScroll, { passive: true });
    }, [setShow]);

    return (
        <div className={classes}>
            <div className="whatsapp__body">
                <div className="whatsapp__start" />
                <div className="whatsapp__container container" />
                <div className="whatsapp__end">
                    <a href="https://www.google.com/" target="_blank" className="whatsapp__button" rel="noreferrer">
                        <WhatsappIcon title="يمكنك مراسلتنا عبر الواتساب" />
                    </a>
                </div>
            </div>
        </div>
    );
}
