'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

import { useAlertService } from '_services';

export { Alert };

function Alert() {
    const pathname = usePathname();
    const alertService = useAlertService();
    const alert = alertService.alert;
    
    useEffect(() => {
        // clear alert on location change
        alertService.clear();
    }, [pathname]);

    if (!alert) return null;

    setTimeout(() => alertService.clear(), 10000);

    return (
        <div className={`absolute top-0 left-auto right-auto ${alert.type}`}>
            {alert.message}
            <button type="button" className="btn-close" onClick={alertService.clear}></button>
        </div>
    );
}