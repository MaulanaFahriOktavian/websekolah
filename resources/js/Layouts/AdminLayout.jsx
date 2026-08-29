import React, { useState } from 'react';
import { Head, usePage } from '@inertiajs/react';
import AdminSidebar from '../Components/Admin/AdminSidebar';
import AdminHeader from '../Components/Admin/AdminHeader';
import FlashMessage from '../Components/Common/FlashMessage';

export default function AdminLayout({ title, children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { school } = usePage().props;
    const schoolName = school?.name || 'School CMS';

    const pageTitle = title
        ? `${title} - Admin Panel | ${schoolName}`
        : `Admin Panel | ${schoolName}`;

    return (
        <div className="min-h-screen bg-slate-100 flex text-slate-900 selection:bg-indigo-600 selection:text-white">
            <Head title={pageTitle} />

            {/* Sidebar */}
            <AdminSidebar
                isOpen={sidebarOpen}
                setIsOpen={setSidebarOpen}
            />

            {/* Main Area */}
            <div className="flex-1 flex flex-col min-w-0 lg:pl-64">
                {/* Header Topbar */}
                <AdminHeader
                    title={title}
                    onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
                />

                {/* Main Content */}
                <main className="flex-1 p-4 sm:p-6 lg:p-8">
                    <div className="max-w-7xl mx-auto">
                        <FlashMessage />
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
