import React from 'react';
import { Head, usePage } from '@inertiajs/react';
import Navbar from '../Components/Public/Navbar';
import Footer from '../Components/Public/Footer';
import FlashMessage from '../Components/Common/FlashMessage';

export default function PublicLayout({ title, description, children }) {
    const { school } = usePage().props;
    const schoolName = school?.name || 'Sekolah';
    const pageTitle = title ? `${title} | ${schoolName}` : schoolName;
    const metaDescription =
        description || school?.seo?.meta_description || 'Website Resmi Sekolah';

    return (
        <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-indigo-600 selection:text-white">
            <Head>
                <title>{pageTitle}</title>
                <meta name="description" content={metaDescription} />
                {school?.seo?.meta_keywords && (
                    <meta name="keywords" content={school.seo.meta_keywords} />
                )}
            </Head>

            {/* Public Header & Navbar */}
            <Navbar />

            {/* Main Content Area */}
            <main className="flex-1">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
                    <FlashMessage />
                </div>
                {children}
            </main>

            {/* Public Footer */}
            <Footer />
        </div>
    );
}
