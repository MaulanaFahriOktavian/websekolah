import React from 'react';
import { Link } from '@inertiajs/react';
import PublicLayout from '../../../Layouts/PublicLayout';
import Badge from '../../../Components/Common/Badge';
import { Calendar, Clock, User, ArrowLeft, Bell } from 'lucide-react';

export default function Show({ announcement, latestAnnouncements = [] }) {
    const formattedDate = new Date(announcement.published_at).toLocaleDateString('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });

    const paragraphs = announcement.content
        ? announcement.content.split(/\n\s*\n/)
        : [];

    return (
        <PublicLayout title={announcement.title}>
            <article className="py-10 lg:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Back */}
                <div className="mb-6">
                    <Link
                        href="/pengumuman"
                        className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-600 hover:text-indigo-700"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Kembali ke Semua Pengumuman</span>
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Main Detail */}
                    <div className="lg:col-span-8 space-y-6">
                        <div className="space-y-4">
                            <Badge variant="primary" size="md">
                                Pengumuman Resmi
                            </Badge>

                            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                                {announcement.title}
                            </h1>

                            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-500 border-y border-slate-100 py-3">
                                <div className="flex items-center gap-1.5">
                                    <Calendar className="w-4 h-4 text-indigo-500" />
                                    <span>{formattedDate}</span>
                                </div>
                                {announcement.expires_at && (
                                    <div className="flex items-center gap-1.5 text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200 text-xs">
                                        <Clock className="w-3.5 h-3.5" />
                                        <span>
                                            Berlaku hingga:{' '}
                                            {new Date(announcement.expires_at).toLocaleDateString('id-ID', {
                                                day: 'numeric',
                                                month: 'short',
                                                year: 'numeric',
                                            })}
                                        </span>
                                    </div>
                                )}
                                {announcement.author && (
                                    <div className="flex items-center gap-1.5">
                                        <User className="w-4 h-4 text-indigo-500" />
                                        <span>Diumumkan oleh: {announcement.author.name}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Content */}
                        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-xs text-slate-800 text-base sm:text-lg leading-relaxed space-y-4">
                            {paragraphs.map((p, idx) => (
                                <p key={idx} className="whitespace-pre-line">
                                    {p}
                                </p>
                            ))}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 sticky top-28">
                            <h2 className="text-base font-bold text-slate-900 mb-4 pb-3 border-b border-slate-200">
                                Pengumuman Lainnya
                            </h2>

                            {latestAnnouncements.length > 0 ? (
                                <div className="space-y-4">
                                    {latestAnnouncements.map((item) => (
                                        <Link
                                            key={item.id}
                                            href={`/pengumuman/${item.slug}`}
                                            className="group block space-y-1"
                                        >
                                            <p className="text-xs font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2">
                                                {item.title}
                                            </p>
                                            <p className="text-[11px] text-slate-400">
                                                {new Date(item.published_at).toLocaleDateString('id-ID', {
                                                    day: 'numeric',
                                                    month: 'short',
                                                    year: 'numeric',
                                                })}
                                            </p>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-xs text-slate-500">Tidak ada pengumuman lainnya.</p>
                            )}

                            <div className="mt-6 pt-4 border-t border-slate-200">
                                <Link
                                    href="/pengumuman"
                                    className="block text-center text-xs font-semibold text-indigo-600 hover:text-indigo-700"
                                >
                                    Lihat Semua Pengumuman →
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        </PublicLayout>
    );
}
