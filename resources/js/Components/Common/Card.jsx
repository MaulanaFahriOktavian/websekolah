import React from 'react';

export default function Card({
    title,
    subtitle,
    action,
    children,
    footer,
    className = '',
    bodyClassName = '',
    headerClassName = '',
}) {
    return (
        <div
            className={`bg-white rounded-xl border border-slate-200/80 shadow-xs overflow-hidden ${className}`}
        >
            {(title || subtitle || action) && (
                <div
                    className={`px-6 py-4 border-b border-slate-100 flex items-center justify-between gap-4 ${headerClassName}`}
                >
                    <div>
                        {title && (
                            <h3 className="font-semibold text-slate-900 text-base">
                                {title}
                            </h3>
                        )}
                        {subtitle && (
                            <p className="text-xs text-slate-500 mt-0.5">
                                {subtitle}
                            </p>
                        )}
                    </div>
                    {action && <div>{action}</div>}
                </div>
            )}

            <div className={`p-6 ${bodyClassName}`}>{children}</div>

            {footer && (
                <div className="px-6 py-3 bg-slate-50/70 border-t border-slate-100 text-xs text-slate-500">
                    {footer}
                </div>
            )}
        </div>
    );
}
