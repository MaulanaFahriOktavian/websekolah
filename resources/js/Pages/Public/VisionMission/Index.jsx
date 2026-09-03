import React from 'react';
import { Link } from '@inertiajs/react';
import PublicLayout from '../../../Layouts/PublicLayout';
import Badge from '../../../Components/Common/Badge';
import { Eye, Target, ArrowLeft, Info } from 'lucide-react';

export default function VisionMission({ profile }) {
    const name    = profile?.name    || 'Profil Sekolah';
    const vision  = profile?.vision  || null;
    const mission = profile?.mission || null;
    const tagline = profile?.tagline || null;

    // Parse mission into lines (numbered items)
    const missionLines = mission
        ? mission.split('\n').map((l) => l.trim()).filter(Boolean)
        : [];

    const hasContent = vision || mission;

    return (
        <PublicLayout
            title="Visi & Misi"
            description={tagline || (vision ? `Visi: ${vision}` : 'Visi dan Misi resmi sekolah.')}
            ogType="website"
        >
            {/* Hero */}
            <section className="bg-gradient-to-b from-indigo-900 via-indigo-950 to-slate-900 text-white py-14 lg:py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-500/20 via-transparent to-transparent pointer-events-none" />
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 space-y-4">
                    <Badge variant="primary" size="md">Arah & Tujuan</Badge>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                        Visi & Misi
                    </h1>
                    <p className="text-slate-300 text-base max-w-xl leading-relaxed">
                        {tagline || `Komitmen dan arah perjuangan ${name} dalam mencetak generasi penerus bangsa.`}
                    </p>
                    <div className="pt-2">
                        <Link
                            href="/tentang"
                            className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-300 hover:text-white transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            <span>Kembali ke Profil Sekolah</span>
                        </Link>
                    </div>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
                {hasContent ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                        {/* Vision */}
                        {vision && (
                            <div className="space-y-5">
                                <div className="flex items-center gap-3">
                                    <div className="w-11 h-11 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-200 shrink-0">
                                        <Eye className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <Badge variant="primary" size="sm">Visi</Badge>
                                        <h2 className="text-xl font-bold text-slate-900 mt-1">Visi Sekolah</h2>
                                    </div>
                                </div>
                                <div className="bg-gradient-to-br from-indigo-50 to-indigo-100/40 rounded-2xl border border-indigo-100 p-8">
                                    <p className="text-slate-800 text-base sm:text-lg font-medium leading-relaxed italic whitespace-pre-line">
                                        &ldquo;{vision}&rdquo;
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Mission */}
                        {mission && (
                            <div className="space-y-5">
                                <div className="flex items-center gap-3">
                                    <div className="w-11 h-11 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-200 shrink-0">
                                        <Target className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <Badge variant="success" size="sm">Misi</Badge>
                                        <h2 className="text-xl font-bold text-slate-900 mt-1">Misi Sekolah</h2>
                                    </div>
                                </div>
                                <div className="bg-white rounded-2xl border border-slate-200 p-8 space-y-3">
                                    {missionLines.length > 0 ? (
                                        <ol className="space-y-3">
                                            {missionLines.map((line, i) => (
                                                <li key={i} className="flex gap-3 items-start text-slate-700 text-sm sm:text-base leading-relaxed">
                                                    <span className="shrink-0 w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold flex items-center justify-center mt-0.5">
                                                        {i + 1}
                                                    </span>
                                                    <span>{line.replace(/^\d+[\.\)]\s*/, '')}</span>
                                                </li>
                                            ))}
                                        </ol>
                                    ) : (
                                        <p className="text-slate-700 whitespace-pre-line">{mission}</p>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="text-center py-16 space-y-3 text-slate-400">
                        <Info className="w-12 h-12 mx-auto text-slate-300" />
                        <p className="text-lg font-medium text-slate-600">Visi & Misi belum diisi.</p>
                        <p className="text-sm">
                            Silakan lengkapi di{' '}
                            <Link href="/admin/school-profile" className="text-indigo-600 hover:underline">
                                Panel Admin → Profil Sekolah → Visi, Misi & Sejarah
                            </Link>.
                        </p>
                    </div>
                )}

                {/* CTA */}
                <div className="mt-14 pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
                    <Link href="/tentang" className="text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-2">
                        <ArrowLeft className="w-4 h-4" />
                        Profil Sekolah
                    </Link>
                    <Link href="/kontak" className="text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-2">
                        Kontak Kami
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>
            </div>
        </PublicLayout>
    );
}
