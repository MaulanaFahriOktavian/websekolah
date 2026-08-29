import React from 'react';
import { Link } from '@inertiajs/react';
import PublicLayout from '../../../Layouts/PublicLayout';
import Badge from '../../../Components/Common/Badge';
import { Trophy, Calendar, Award, User, ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function Show({ achievement, relatedAchievements = [] }) {
    const paragraphs = achievement.description
        ? achievement.description.split(/\n\s*\n/)
        : [];

    return (
        <PublicLayout title={achievement.title}>
            <article className="py-10 lg:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Back Link */}
                <div className="mb-6">
                    <Link
                        href="/prestasi"
                        className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-600 hover:text-indigo-700"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Kembali ke Semua Prestasi</span>
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-8 space-y-8">
                        <div className="space-y-4">
                            <div className="flex flex-wrap items-center gap-2">
                                {achievement.category && (
                                    <Badge variant="primary" size="md">
                                        {achievement.category}
                                    </Badge>
                                )}
                                {achievement.level && (
                                    <Badge variant="neutral" size="md">
                                        {achievement.level}
                                    </Badge>
                                )}
                                {achievement.year && (
                                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
                                        Tahun {achievement.year}
                                    </span>
                                )}
                            </div>

                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                                {achievement.title}
                            </h1>

                            {/* Recipient & Date info card */}
                            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-wrap items-center gap-6 text-sm">
                                {achievement.recipient && (
                                    <div className="flex items-center gap-2 text-slate-800 font-semibold">
                                        <User className="w-4 h-4 text-indigo-600 shrink-0" />
                                        <span>Peraih: {achievement.recipient}</span>
                                    </div>
                                )}
                                {achievement.achievement_date && (
                                    <div className="flex items-center gap-2 text-slate-600 text-xs">
                                        <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                                        <span>
                                            {new Date(achievement.achievement_date).toLocaleDateString('id-ID', {
                                                day: 'numeric',
                                                month: 'long',
                                                year: 'numeric',
                                            })}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Photo Banner */}
                        {achievement.photo ? (
                            <div className="rounded-2xl overflow-hidden shadow-md border border-slate-200 bg-slate-100 aspect-16/9">
                                <img
                                    src={`/storage/${achievement.photo}`}
                                    alt={achievement.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        ) : (
                            <div className="rounded-2xl overflow-hidden border border-slate-200 bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 aspect-16/9 flex flex-col items-center justify-center text-amber-400">
                                <Trophy className="w-20 h-20 mb-2 opacity-60" />
                                <span className="text-sm font-medium text-amber-800">
                                    Dokumentasi Prestasi Siswa
                                </span>
                            </div>
                        )}

                        {/* Description Content */}
                        {paragraphs.length > 0 && (
                            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-xs space-y-4 text-slate-800 text-base sm:text-lg leading-relaxed">
                                {paragraphs.map((p, idx) => (
                                    <p key={idx} className="whitespace-pre-line">
                                        {p}
                                    </p>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 sticky top-28">
                            <h2 className="text-base font-bold text-slate-900 mb-4 pb-3 border-b border-slate-200">
                                Prestasi Terkait Lainnya
                            </h2>

                            {relatedAchievements.length > 0 ? (
                                <div className="space-y-4">
                                    {relatedAchievements.map((item) => (
                                        <Link
                                            key={item.id}
                                            href={`/prestasi/${item.slug}`}
                                            className="group flex gap-3 items-start"
                                        >
                                            {item.photo ? (
                                                <img
                                                    src={`/storage/${item.photo}`}
                                                    alt={item.title}
                                                    className="w-16 h-14 rounded-lg object-cover border border-slate-200 shrink-0"
                                                />
                                            ) : (
                                                <div className="w-16 h-14 rounded-lg bg-amber-50 text-amber-500 flex items-center justify-center shrink-0 border border-amber-100">
                                                    <Trophy className="w-6 h-6" />
                                                </div>
                                            )}
                                            <div className="min-w-0">
                                                <p className="text-xs font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2 leading-snug">
                                                    {item.title}
                                                </p>
                                                {item.recipient && (
                                                    <p className="text-[11px] text-slate-400 mt-1 truncate">
                                                        {item.recipient}
                                                    </p>
                                                )}
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-xs text-slate-500">Tidak ada prestasi terkait lainnya.</p>
                            )}

                            <div className="mt-6 pt-4 border-t border-slate-200">
                                <Link
                                    href="/prestasi"
                                    className="block text-center text-xs font-semibold text-indigo-600 hover:text-indigo-700"
                                >
                                    Lihat Semua Galeri Prestasi →
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        </PublicLayout>
    );
}
