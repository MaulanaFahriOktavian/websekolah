import React from 'react';

export default function Badge({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
}) {
    const variants = {
        primary: 'bg-indigo-50 text-indigo-700 border-indigo-200/60',
        success: 'bg-emerald-50 text-emerald-700 border-emerald-200/60',
        warning: 'bg-amber-50 text-amber-700 border-amber-200/60',
        danger: 'bg-rose-50 text-rose-700 border-rose-200/60',
        slate: 'bg-slate-100 text-slate-700 border-slate-200',
    };

    const sizes = {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-2.5 py-1 text-xs font-medium',
        lg: 'px-3 py-1.5 text-sm font-medium',
    };

    return (
        <span
            className={`inline-flex items-center rounded-full border ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`}
        >
            {children}
        </span>
    );
}
