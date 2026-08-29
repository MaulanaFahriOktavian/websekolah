import React from 'react';
import { Link } from '@inertiajs/react';

export default function Pagination({ links, className = '' }) {
    if (!links || links.length <= 3) {
        return null;
    }

    return (
        <nav className={`flex items-center justify-center gap-1 ${className}`}>
            {links.map((link, key) => {
                // Decode HTML entities like &laquo; and &raquo;
                const label = link.label
                    .replace('&laquo; Previous', '← Sebelumnya')
                    .replace('Next &raquo;', 'Selanjutnya →');

                if (link.url === null) {
                    return (
                        <span
                            key={key}
                            className="px-3.5 py-2 text-xs font-medium text-slate-400 border border-slate-200 rounded-lg bg-slate-50 cursor-not-allowed select-none"
                            dangerouslySetInnerHTML={{ __html: label }}
                        />
                    );
                }

                return (
                    <Link
                        key={key}
                        href={link.url}
                        preserveScroll
                        className={`px-3.5 py-2 text-xs font-medium rounded-lg border transition-colors ${
                            link.active
                                ? 'bg-indigo-600 border-indigo-600 text-white font-bold'
                                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
                        }`}
                        dangerouslySetInnerHTML={{ __html: label }}
                    />
                );
            })}
        </nav>
    );
}
