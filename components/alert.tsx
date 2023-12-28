'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import classNames from 'classnames';
import { ceil, words } from 'lodash';
import { useAlertService } from '../services';

const alertTimeoutMs = 1000 * 5; // Base of 5 seconds
const msPerWordRead = 1000 / (120 / 60); // 120 words per minute

export { Alert };

function Alert() {
    const pathname = usePathname();
    const alertService = useAlertService();
    const alert = alertService.alert;

    useEffect(() => {
        // clear alert on location change.
        alertService.clear();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname]);

    if (!alert) return null;

    const additionalReadingTime = ceil(words(alert.message).length * msPerWordRead, -3);

    setTimeout(alertService.clear, alertTimeoutMs + additionalReadingTime);

    return (
        <div className={`absolute pointer-events-none top-0 w-screen h-screen flex justify-center overflow-hidden mt-4`}>
            <p tabIndex={0} role='alert' aria-live={'assertive'} className={classNames({
                'border rounded px-4 py-1 shadow-xl h-fit cursor-pointer text-lg pointer-events-auto max-w-screen-sm': true,
                'bg-green-600 text-white': alert.type === 'alert-success',
                'bg-red-500 text-white': alert.type === 'alert-danger',
            })} onClick={alertService.clear}>
                {alert.message}
            </p>
        </div>
    );
}
