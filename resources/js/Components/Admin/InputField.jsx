import React from 'react';

/**
 * Reusable labeled input field with error display.
 *
 * Supports: input, textarea, select (via `as` prop)
 *
 * Props:
 * - label (string)   — field label
 * - id (string)      — input id + label htmlFor
 * - error (string)   — validation error message
 * - hint (string)    — optional helper text below the input
 * - as ('input'|'textarea'|'select') — element type, default 'input'
 * - required (bool)
 * - ...rest          — forwarded to the input element
 */
export default function InputField({
    label,
    id,
    error,
    hint,
    as: Tag = 'input',
    required = false,
    children,
    ...rest
}) {
    const baseClass =
        'w-full px-3 py-2 text-sm rounded-lg border bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition';
    const errorClass = 'border-red-400 focus:ring-red-500 focus:border-red-500';
    const normalClass = 'border-slate-300 hover:border-slate-400';

    return (
        <div>
            <label htmlFor={id} className="block text-sm font-medium text-slate-700 mb-1">
                {label}
                {required && <span className="text-red-500 ml-0.5">*</span>}
            </label>

            {Tag === 'select' ? (
                <select
                    id={id}
                    className={`${baseClass} ${error ? errorClass : normalClass}`}
                    {...rest}
                >
                    {children}
                </select>
            ) : (
                <Tag
                    id={id}
                    className={`${baseClass} ${error ? errorClass : normalClass} ${
                        Tag === 'textarea' ? 'resize-y min-h-[100px]' : ''
                    }`}
                    {...rest}
                />
            )}

            {error && (
                <p className="mt-1 text-xs text-red-500">{error}</p>
            )}
            {hint && !error && (
                <p className="mt-1 text-xs text-slate-400">{hint}</p>
            )}
        </div>
    );
}
