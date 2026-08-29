import React from 'react';
import { Link } from '@inertiajs/react';
import PublicLayout from '../../../Layouts/PublicLayout';
import Badge from '../../../Components/Common/Badge';
import { Building2, Users, ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function Show({ facility, otherFacilities = [] }) {
    const paragraphs = facility.description
        ? facility.description.split(/\n\s*\n/)
        : [];

    return (
        <PublicLayout title={facility.name}>
            <article className="py-10 lg:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Back Link */}
                <div className="mb-6">
                    <Link
                        href="/fasilitas"
                        className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-600 hover:text-indigo-700"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Kembali ke Semua Fasilitas</span>
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-8 space-y-8">
                        <div className="space-y-4">
                            <Badge variant="primary" size="md">
                                Sarana Sekolah
                            </Badge>

                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                                {facility.name}
                            </h1>

                            {facility.capacity && (
                                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-800 text-sm font-semibold">
                                    <Users className="w-4 h-4 text-indigo-600" />
                                    <span>Kapasitas Daya Tampung: {facility.capacity} Orang / Siswa</span>
                                </div>
                            )}
                        </div>

                        {/* Photo Banner */}
                        {facility.photo ? (
                            <div className="rounded-2xl overflow-hidden shadow-md border border-slate-200 bg-slate-100 aspect-16/9">
                                <img
                                    src={`/storage/${facility.photo}`}
                                    alt={facility.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        ) : (
                            <div className="rounded-2xl overflow-hidden border border-slate-200 bg-gradient-to-br from-indigo-50 to-slate-100 aspect-16/9 flex flex-col items-center justify-center text-indigo-300">
                                <Building2 className="w-20 h-20 mb-2 opacity-50" />
                                <span className="text-sm font-medium text-slate-400">
                                    Dokumentasi foto fasilitas
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
                                Fasilitas Lainnya
                            </h2>

                            {otherFacilities.length > 0 ? (
                                <div className="space-y-4">
                                    {otherFacilities.map((item) => (
                                        <Link
                                            key={item.id}
                                            href={`/fasilitas/${item.slug}`}
                                            className="group flex gap-3 items-start"
                                        >
                                            {item.photo ? (
                                                <img
                                                    src={`/storage/${item.photo}`}
                                                    alt={item.name}
                                                    className="w-16 h-14 rounded-lg object-cover border border-slate-200 shrink-0"
                                                />
                                            ) : (
                                                <div className="w-16 h-14 rounded-lg bg-indigo-50 text-indigo-400 flex items-center justify-center shrink-0 border border-indigo-100">
                                                    <Building2 className="w-6 h-6" />
                                                </div>
                                            )}
                                            <div className="min-w-0">
                                                <p className="text-xs font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2 leading-snug">
                                                    {item.name}
                                                </p>
                                                {item.capacity && (
                                                    <p className="text-[11px] text-slate-400 mt-1">
                                                        Kapasitas {item.capacity} orang
                                                    </p>
                                                )}
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-xs text-slate-500">Tidak ada fasilitas lainnya.</p>
                            )}

                            <div className="mt-6 pt-4 border-t border-slate-200">
                                <Link
                                    href="/fasilitas"
                                    className="block text-center text-xs font-semibold text-indigo-600 hover:text-indigo-700"
                                >
                                    Lihat Semua Fasilitas →
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        </PublicLayout>
    );
}
