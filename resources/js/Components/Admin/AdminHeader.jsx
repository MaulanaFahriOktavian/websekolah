import React from 'react';
import { Menu, ShieldCheck, User, LogOut } from 'lucide-react';
import { router, usePage } from '@inertiajs/react';

export default function AdminHeader({ onToggleSidebar, title }) {
    const { auth } = usePage().props;
    const userName = auth?.user?.name || 'Administrator';

    function handleLogout(e) {
        e.preventDefault();
        router.post('/logout');
    }

    return (
        <header className="sticky top-0 z-30 h-16 bg-white border-b border-slate-200/80 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            <div className="flex items-center gap-4">
                <button
                    type="button"
                    onClick={onToggleSidebar}
                    className="p-2 -ml-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 lg:hidden"
                    aria-label="Toggle Sidebar"
                >
                    <Menu className="w-5 h-5" />
                </button>

                {title && (
                    <h1 className="text-lg font-bold text-slate-900 tracking-tight">
                        {title}
                    </h1>
                )}
            </div>

            <div className="flex items-center gap-3">
                {/* System Status Pill */}
                <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-medium text-emerald-700">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Terautentikasi</span>
                </div>

                {/* User info + Logout */}
                <div className="flex items-center gap-2 pl-3 border-l border-slate-200">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-semibold text-xs border border-indigo-200 shrink-0">
                        <User className="w-4 h-4" />
                    </div>
                    <div className="hidden md:block text-left">
                        <p className="text-xs font-semibold text-slate-800 leading-tight">
                            {userName}
                        </p>
                        <p className="text-[11px] text-slate-500">Administrator</p>
                    </div>

                    <button
                        type="button"
                        onClick={handleLogout}
                        title="Keluar"
                        className="ml-1 p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                        aria-label="Logout"
                    >
                        <LogOut className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </header>
    );
}
