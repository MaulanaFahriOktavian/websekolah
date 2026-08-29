import React from 'react';

/**
 * Reusable form section card for admin forms.
 *
 * Props:
 * - title (string)      — section heading
 * - description (string) — optional subtitle
 * - children           — form fields
 */
export default function FormSection({ title, description, children }) {
    return (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/60">
                <h2 className="text-sm font-semibold text-slate-800">{title}</h2>
                {description && (
                    <p className="text-xs text-slate-500 mt-0.5">{description}</p>
                )}
            </div>
            <div className="px-6 py-5 space-y-5">{children}</div>
        </div>
    );
}
