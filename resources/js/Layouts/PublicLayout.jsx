import React from 'react';
import { Head, usePage } from '@inertiajs/react';
import Navbar from '../Components/Public/Navbar';
import Footer from '../Components/Public/Footer';
import FlashMessage from '../Components/Common/FlashMessage';

/**
 * Strips HTML tags, normalizes whitespace, and limits text length.
 */
function sanitizeDescription(text, maxLength = 160) {
    if (!text || typeof text !== 'string') return '';
    const noHtml = text.replace(/<[^>]*>/g, ' ');
    const normalized = noHtml.replace(/\s+/g, ' ').trim();
    if (normalized.length <= maxLength) return normalized;
    return normalized.slice(0, maxLength).trim() + '...';
}

/**
 * Resolves a safe, non-duplicated absolute URL for Open Graph / Twitter images.
 * Priority: page-specific image -> school.logo_path.
 * Normalizes /storage/storage/... or storage/... paths.
 */
function resolveImageUrl(rawImage, baseUrl) {
    if (!rawImage || typeof rawImage !== 'string' || !rawImage.trim()) {
        return null;
    }
    const trimmed = rawImage.trim();
    if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
        return trimmed;
    }

    const cleanBase = baseUrl ? baseUrl.replace(/\/+$/, '') : '';

    // Remove leading slashes
    let cleanPath = trimmed.replace(/^\/+/, '');

    // Normalize storage prefix
    if (cleanPath.startsWith('storage/')) {
        cleanPath = cleanPath.replace(/^storage\/+/, '');
    }

    if (!cleanPath) return null;

    const fullPath = `/storage/${cleanPath}`;
    return cleanBase ? `${cleanBase}${fullPath}` : fullPath;
}

export default function PublicLayout({
    title,
    description,
    keywords,
    image,
    ogType = 'website',
    canonical,
    children,
}) {
    const { url, props } = usePage();
    const { school, app_url, current_url } = props;

    const schoolName = school?.name || 'Situs Resmi Sekolah';
    const pageTitle = title ? `${title} — ${schoolName}` : schoolName;

    const rawDescription =
        description ||
        school?.seo?.meta_description ||
        school?.tagline ||
        school?.description ||
        `Website resmi ${schoolName}. Informasi profil, akademik, berita, prestasi, dan agenda sekolah.`;

    const metaDescription = sanitizeDescription(rawDescription, 160);
    const metaKeywords = keywords || school?.seo?.meta_keywords || null;

    // Resolve base URL for absolute metadata
    const baseUrl =
        app_url ||
        (typeof window !== 'undefined' && window.location.origin
            ? window.location.origin
            : '');

    // Canonical URL (clean path without query parameters)
    const cleanPath = url ? url.split('?')[0] : '';
    const canonicalUrl =
        canonical ||
        (current_url ? current_url.split('?')[0] : (baseUrl ? `${baseUrl}${cleanPath}` : ''));

    // Resolve Open Graph image with priority: 1. page-specific image -> 2. school.logo_path
    const ogImageUrl = resolveImageUrl(image || school?.logo_path, baseUrl);

    const faviconUrl = school?.favicon_path
        ? `/storage/${school.favicon_path.replace(/^\/?storage\/?/, '')}`
        : '/favicon.ico';

    return (
        <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-indigo-600 selection:text-white">
            <Head>
                {/* Standard Title & Meta */}
                <title>{pageTitle}</title>
                <meta name="description" content={metaDescription} />
                {metaKeywords && <meta name="keywords" content={metaKeywords} />}
                {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
                <link rel="icon" href={faviconUrl} />

                {/* Open Graph / Facebook */}
                <meta property="og:type" content={ogType} />
                <meta property="og:site_name" content={schoolName} />
                <meta property="og:title" content={pageTitle} />
                <meta property="og:description" content={metaDescription} />
                {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
                {ogImageUrl && <meta property="og:image" content={ogImageUrl} />}

                {/* Twitter Cards */}
                <meta
                    name="twitter:card"
                    content={ogImageUrl ? 'summary_large_image' : 'summary'}
                />
                <meta name="twitter:title" content={pageTitle} />
                <meta name="twitter:description" content={metaDescription} />
                {ogImageUrl && <meta name="twitter:image" content={ogImageUrl} />}
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
