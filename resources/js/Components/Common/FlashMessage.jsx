import React from 'react';
import { usePage } from '@inertiajs/react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function FlashMessage() {
    const { flash } = usePage().props;
    const [dismissed, setDismissed] = React.useState(false);

    if (dismissed || (!flash?.success && !flash?.error && !flash?.info)) {
        return null;
    }

    const type = flash.success ? 'success' : flash.error ? 'error' : 'info';
    const message = flash.success || flash.error || flash.info;

    const styles = {
        success: {
            bg: 'bg-emerald-50 border-emerald-200 text-emerald-800',
            icon: <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />,
        },
        error: {
            bg: 'bg-rose-50 border-rose-200 text-rose-800',
            icon: <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />,
        },
        info: {
            bg: 'bg-indigo-50 border-indigo-200 text-indigo-800',
            icon: <Info className="w-5 h-5 text-indigo-600 shrink-0" />,
        },
    };

    const current = styles[type];

    return (
        <div
            className={`flex items-center justify-between p-4 mb-6 rounded-xl border ${current.bg} transition-all duration-200`}
            role="alert"
        >
            <div className="flex items-center gap-3">
                {current.icon}
                <p className="text-sm font-medium">{message}</p>
            </div>
            <button
                type="button"
                onClick={() => setDismissed(true)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-md transition-colors"
                aria-label="Tutup notifikasi"
            >
                <X className="w-4 h-4" />
            </button>
        </div>
    );
}
