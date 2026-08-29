import React from 'react';
import { Link } from '@inertiajs/react';

export default function Button({
    type = 'button',
    variant = 'primary',
    size = 'md',
    href = null,
    className = '',
    disabled = false,
    children,
    ...props
}) {
    const baseStyles =
        'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer';

    const variants = {
        primary:
            'bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white shadow-sm hover:shadow focus:ring-indigo-500',
        secondary:
            'bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-800 focus:ring-slate-400',
        outline:
            'border border-slate-300 bg-transparent hover:bg-slate-50 text-slate-700 focus:ring-indigo-500',
        danger:
            'bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white shadow-sm focus:ring-rose-500',
        ghost:
            'bg-transparent hover:bg-slate-100 text-slate-600 hover:text-slate-900 focus:ring-slate-300',
    };

    const sizes = {
        sm: 'px-3 py-1.5 text-xs gap-1.5',
        md: 'px-4 py-2 text-sm gap-2',
        lg: 'px-5 py-2.5 text-base gap-2.5',
    };

    const combinedClassName = `${baseStyles} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`;

    if (href) {
        return (
            <Link href={href} className={combinedClassName} {...props}>
                {children}
            </Link>
        );
    }

    return (
        <button
            type={type}
            disabled={disabled}
            className={combinedClassName}
            {...props}
        >
            {children}
        </button>
    );
}
