import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import PublicLayout from '../../../Layouts/PublicLayout';
import Badge from '../../../Components/Common/Badge';
import {
    Image as ImageIcon,
    Calendar,
    ArrowLeft,
    Layers,
    X,
    ChevronLeft,
    ChevronRight,
    Maximize2,
} from 'lucide-react';

export default function Show({ gallery, otherGalleries = [] }) {
    const photos = gallery.photos || [];
    const [lightboxIndex, setLightboxIndex] = useState(null);

    const isLightboxOpen = lightboxIndex !== null;

    function openLightbox(index) {
        setLightboxIndex(index);
    }

    function closeLightbox() {
        setLightboxIndex(null);
    }

    function nextPhoto() {
        if (photos.length === 0) return;
        setLightboxIndex((prev) => (prev + 1) % photos.length);
    }

    function prevPhoto() {
        if (photos.length === 0) return;
        setLightboxIndex((prev) => (prev - 1 + photos.length) % photos.length);
    }

    useEffect(() => {
        function handleKeyDown(e) {
            if (!isLightboxOpen) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') nextPhoto();
            if (e.key === 'ArrowLeft') prevPhoto();
        }

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isLightboxOpen, photos.length]);

    const paragraphs = gallery.description
        ? gallery.description.split(/\n\s*\n/)
        : [];

    return (
        <PublicLayout title={gallery.title}>
            <article className="py-10 lg:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Back Link */}
                <div className="mb-6">
                    <Link
                        href="/galeri"
                        className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-600 hover:text-indigo-700"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Kembali ke Semua Galeri</span>
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-8 space-y-8">
                        <div className="space-y-4">
                            <div className="flex flex-wrap items-center gap-3">
                                <Badge variant="primary" size="md">
                                    Album Kegiatan
                                </Badge>
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
                                    <Layers className="w-3.5 h-3.5 text-slate-500" />
                                    <span>{photos.length} Foto Dokumentasi</span>
                                </span>
                            </div>

                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                                {gallery.title}
                            </h1>

                            {gallery.event_date && (
                                <div className="flex items-center gap-2 text-sm text-slate-600">
                                    <Calendar className="w-4 h-4 text-slate-400" />
                                    <span>
                                        Dilaksanakan pada{' '}
                                        {new Date(gallery.event_date).toLocaleDateString('id-ID', {
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric',
                                        })}
                                    </span>
                                </div>
                            )}

                            {paragraphs.length > 0 && (
                                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 text-slate-700 text-sm sm:text-base leading-relaxed space-y-3">
                                    {paragraphs.map((p, idx) => (
                                        <p key={idx} className="whitespace-pre-line">
                                            {p}
                                        </p>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Photo Grid */}
                        <div className="space-y-4">
                            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                                <ImageIcon className="w-5 h-5 text-indigo-600" />
                                <span>Foto Dokumentasi Kegiatan</span>
                            </h2>

                            {photos.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                    {photos.map((photo, idx) => (
                                        <div
                                            key={photo.id}
                                            onClick={() => openLightbox(idx)}
                                            className="group relative aspect-4/3 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 cursor-pointer shadow-xs hover:shadow-md transition-all duration-300"
                                        >
                                            <img
                                                src={`/storage/${photo.photo_path}`}
                                                alt={photo.caption || gallery.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                            <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3 text-white">
                                                <div className="self-end p-1.5 rounded-full bg-slate-900/60 backdrop-blur-xs">
                                                    <Maximize2 className="w-4 h-4" />
                                                </div>
                                                {photo.caption && (
                                                    <p className="text-xs font-medium line-clamp-2 bg-slate-900/70 p-1.5 rounded-md backdrop-blur-xs">
                                                        {photo.caption}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-slate-400">
                                    <ImageIcon className="w-10 h-10 mx-auto text-slate-300 mb-2" />
                                    <p className="text-sm font-medium">Belum ada foto yang ditambahkan pada album ini.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 sticky top-28">
                            <h2 className="text-base font-bold text-slate-900 mb-4 pb-3 border-b border-slate-200">
                                Album Galeri Lainnya
                            </h2>

                            {otherGalleries.length > 0 ? (
                                <div className="space-y-4">
                                    {otherGalleries.map((item) => {
                                        const coverSrc = item.cover_photo
                                            ? `/storage/${item.cover_photo}`
                                            : item.photos?.[0]?.photo_path
                                            ? `/storage/${item.photos[0].photo_path}`
                                            : null;

                                        return (
                                            <Link
                                                key={item.id}
                                                href={`/galeri/${item.slug}`}
                                                className="group flex gap-3 items-start"
                                            >
                                                {coverSrc ? (
                                                    <img
                                                        src={coverSrc}
                                                        alt={item.title}
                                                        className="w-16 h-14 rounded-lg object-cover border border-slate-200 shrink-0"
                                                    />
                                                ) : (
                                                    <div className="w-16 h-14 rounded-lg bg-indigo-50 text-indigo-400 flex items-center justify-center shrink-0 border border-indigo-100">
                                                        <ImageIcon className="w-6 h-6" />
                                                    </div>
                                                )}
                                                <div className="min-w-0">
                                                    <p className="text-xs font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2 leading-snug">
                                                        {item.title}
                                                    </p>
                                                    <p className="text-[11px] text-slate-400 mt-1">
                                                        {item.photos_count || 0} Foto
                                                    </p>
                                                </div>
                                            </Link>
                                        );
                                    })}
                                </div>
                            ) : (
                                <p className="text-xs text-slate-500">Tidak ada album galeri lainnya.</p>
                            )}

                            <div className="mt-6 pt-4 border-t border-slate-200">
                                <Link
                                    href="/galeri"
                                    className="block text-center text-xs font-semibold text-indigo-600 hover:text-indigo-700"
                                >
                                    Lihat Semua Galeri Foto →
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </article>

            {/* Interactive Lightbox Modal */}
            {isLightboxOpen && photos[lightboxIndex] && (
                <div
                    className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6"
                    onClick={closeLightbox}
                >
                    {/* Top Bar */}
                    <div
                        className="flex items-center justify-between text-white z-10"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="text-sm font-medium text-slate-300">
                            Foto <span className="font-bold text-white">{lightboxIndex + 1}</span> dari{' '}
                            <span className="font-bold text-white">{photos.length}</span>
                        </div>

                        <button
                            type="button"
                            onClick={closeLightbox}
                            className="p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-200 transition-colors"
                            title="Tutup (Esc)"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Main Image View */}
                    <div
                        className="relative flex-1 flex items-center justify-center py-4"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {photos.length > 1 && (
                            <button
                                type="button"
                                onClick={prevPhoto}
                                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white transition-colors z-20 shadow-lg"
                                title="Sebelumnya (Panah Kiri)"
                            >
                                <ChevronLeft className="w-6 h-6" />
                            </button>
                        )}

                        <div className="max-w-5xl max-h-[75vh] flex flex-col items-center">
                            <img
                                src={`/storage/${photos[lightboxIndex].photo_path}`}
                                alt={photos[lightboxIndex].caption || gallery.title}
                                className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-2xl"
                            />
                        </div>

                        {photos.length > 1 && (
                            <button
                                type="button"
                                onClick={nextPhoto}
                                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white transition-colors z-20 shadow-lg"
                                title="Selanjutnya (Panah Kanan)"
                            >
                                <ChevronRight className="w-6 h-6" />
                            </button>
                        )}
                    </div>

                    {/* Bottom Caption Bar */}
                    <div
                        className="text-center text-white pb-2 z-10"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {photos[lightboxIndex].caption ? (
                            <p className="text-sm font-medium text-slate-200 max-w-2xl mx-auto px-4 py-1.5 rounded-lg bg-slate-900/70 backdrop-blur-xs inline-block">
                                {photos[lightboxIndex].caption}
                            </p>
                        ) : (
                            <p className="text-xs text-slate-400 italic">
                                {gallery.title}
                            </p>
                        )}
                    </div>
                </div>
            )}
        </PublicLayout>
    );
}
