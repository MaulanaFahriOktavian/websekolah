import React from 'react';
import { Link } from '@inertiajs/react';
import PublicLayout from '../../../Layouts/PublicLayout';
import Badge from '../../../Components/Common/Badge';
import {
    User,
    CalendarDays,
    Award,
    BookOpen,
    Info,
    ArrowRight,
    GraduationCap,
} from 'lucide-react';

export default function About({ profile }) {
    const name             = profile?.name             || 'Profil Sekolah';
    const tagline          = profile?.tagline          || null;
    const description      = profile?.description      || null;
    const history          = profile?.history          || null;
    const principalName    = profile?.principal_name   || null;
    const principalPhoto   = profile?.principal_photo_path || null;
    const principalGreeting = profile?.principal_greeting || null;
    const foundedYear      = profile?.founded_year     || null;
    const accreditation    = profile?.accreditation    || null;
    const npsn             = profile?.npsn             || null;
    const level            = profile?.level            || null;
    const status           = profile?.status           || null;
    const heroImage        = profile?.hero_image_path  || null;

    const hasInfo = foundedYear || accreditation || npsn || level || status;

    return (
        <PublicLayout title="Tentang Sekolah" description={tagline || description || `Profil resmi ${name}`}>
            {/* Hero */}
            <section className="relative overflow-hidden bg-gradient-to-b from-indigo-900 via-indigo-950 to-slate-900 text-white py-16 lg:py-24">
                {heroImage && (
                    <div
                        className="absolute inset-0 bg-cover bg-center opacity-20"
                        style={{ backgroundImage: `url('/storage/${heroImage}')` }}
                    />
                )}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-500/20 via-transparent to-transparent pointer-events-none" />
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
                    <div className="max-w-3xl space-y-5">
                        <Badge variant="primary" size="md">Tentang Kami</Badge>
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                            {name}
                        </h1>
                        {tagline && (
                            <p className="text-lg text-slate-300 font-normal leading-relaxed">
                                {tagline}
                            </p>
                        )}
                        <div className="flex flex-wrap gap-3 pt-2">
                            <Link
                                href="/visi-misi"
                                className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-lg transition-colors"
                            >
                                <Eye className="w-4 h-4" />
                                <span>Visi & Misi</span>
                            </Link>
                            <Link
                                href="/kontak"
                                className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 text-sm font-semibold rounded-lg transition-colors"
                            >
                                <span>Kontak Kami</span>
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-14">

                {/* Quick Info Cards */}
                {hasInfo && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                        {foundedYear && (
                            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 text-center space-y-1">
                                <CalendarDays className="w-5 h-5 mx-auto text-indigo-500" />
                                <p className="text-xl font-bold text-slate-900">{foundedYear}</p>
                                <p className="text-xs text-slate-500">Tahun Berdiri</p>
                            </div>
                        )}
                        {accreditation && (
                            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 text-center space-y-1">
                                <Award className="w-5 h-5 mx-auto text-amber-500" />
                                <p className="text-xl font-bold text-slate-900">{accreditation}</p>
                                <p className="text-xs text-slate-500">Akreditasi</p>
                            </div>
                        )}
                        {npsn && (
                            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 text-center space-y-1">
                                <Info className="w-5 h-5 mx-auto text-slate-400" />
                                <p className="text-sm font-bold text-slate-900 font-mono">{npsn}</p>
                                <p className="text-xs text-slate-500">NPSN</p>
                            </div>
                        )}
                        {level && (
                            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 text-center space-y-1">
                                <GraduationCap className="w-5 h-5 mx-auto text-indigo-500" />
                                <p className="text-sm font-bold text-slate-900">{level}</p>
                                <p className="text-xs text-slate-500">Jenjang</p>
                            </div>
                        )}
                        {status && (
                            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 text-center space-y-1">
                                <BookOpen className="w-5 h-5 mx-auto text-emerald-500" />
                                <p className="text-sm font-bold text-slate-900">{status}</p>
                                <p className="text-xs text-slate-500">Status</p>
                            </div>
                        )}
                    </div>
                )}

                {/* Description */}
                {description && (
                    <section className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                        <div className="lg:col-span-2 space-y-4">
                            <h2 className="text-2xl font-bold text-slate-900">Tentang {name}</h2>
                            <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed">
                                {description.split(/\n\s*\n/).map((para, i) => (
                                    <p key={i} className="whitespace-pre-line mb-4">{para}</p>
                                ))}
                            </div>
                        </div>
                        <div className="lg:col-span-1">
                            <div className="bg-indigo-50 rounded-2xl p-6 border border-indigo-100 space-y-4 sticky top-28">
                                <h3 className="font-bold text-indigo-900 text-sm uppercase tracking-wide">Tautan Cepat</h3>
                                <ul className="space-y-2 text-sm">
                                    {[
                                        { href: '/visi-misi', label: 'Visi & Misi' },
                                        { href: '/kontak', label: 'Kontak & Lokasi' },
                                        { href: '/guru', label: 'Daftar Guru' },
                                        { href: '/fasilitas', label: 'Fasilitas Sekolah' },
                                        { href: '/prestasi', label: 'Prestasi Siswa' },
                                    ].map((link) => (
                                        <li key={link.href}>
                                            <Link href={link.href} className="flex items-center gap-2 text-indigo-700 hover:text-indigo-900 font-medium">
                                                <ArrowRight className="w-3.5 h-3.5" />
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </section>
                )}

                {/* Principal Greeting */}
                {(principalName || principalGreeting) && (
                    <section className="bg-slate-50 rounded-3xl border border-slate-200 p-8 lg:p-12">
                        <div className="flex flex-col lg:flex-row gap-8 items-start">
                            {/* Photo */}
                            <div className="shrink-0">
                                {principalPhoto ? (
                                    <img
                                        src={`/storage/${principalPhoto}`}
                                        alt={principalName || 'Kepala Sekolah'}
                                        className="w-32 h-32 rounded-2xl object-cover border-4 border-white shadow-lg"
                                    />
                                ) : (
                                    <div className="w-32 h-32 rounded-2xl bg-indigo-100 border-4 border-white shadow-lg flex items-center justify-center">
                                        <User className="w-14 h-14 text-indigo-400" />
                                    </div>
                                )}
                                {principalName && (
                                    <div className="mt-3 text-center">
                                        <p className="text-sm font-bold text-slate-900">{principalName}</p>
                                        <p className="text-xs text-slate-500">Kepala Sekolah</p>
                                    </div>
                                )}
                            </div>

                            {/* Greeting */}
                            <div className="flex-1 space-y-4">
                                <Badge variant="primary" size="sm">Sambutan Kepala Sekolah</Badge>
                                <h2 className="text-xl font-bold text-slate-900">
                                    Selamat Datang di {name}
                                </h2>
                                {principalGreeting ? (
                                    <div className="text-slate-700 text-sm sm:text-base leading-relaxed space-y-3">
                                        {principalGreeting.split(/\n\s*\n/).map((para, i) => (
                                            <p key={i} className="whitespace-pre-line">{para}</p>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-slate-500 italic text-sm">Sambutan kepala sekolah belum diisi.</p>
                                )}
                            </div>
                        </div>
                    </section>
                )}

                {/* History */}
                {history && (
                    <section className="space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                                <BookOpen className="w-5 h-5" />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900">Sejarah Sekolah</h2>
                        </div>
                        <div className="bg-white rounded-2xl border border-slate-200 p-6 lg:p-8 text-slate-700 leading-relaxed space-y-4">
                            {history.split(/\n\s*\n/).map((para, i) => (
                                <p key={i} className="whitespace-pre-line">{para}</p>
                            ))}
                        </div>
                    </section>
                )}

                {/* Fallback when no data */}
                {!description && !principalGreeting && !history && !hasInfo && (
                    <div className="text-center py-16 text-slate-400 space-y-3">
                        <Info className="w-12 h-12 mx-auto text-slate-300" />
                        <p className="text-lg font-medium text-slate-600">Profil sekolah belum dilengkapi.</p>
                        <p className="text-sm">Silakan lengkapi data di <Link href="/admin/school-profile" className="text-indigo-600 hover:underline">Panel Admin → Profil Sekolah</Link>.</p>
                    </div>
                )}
            </div>
        </PublicLayout>
    );
}

// Needed because Eye is used in JSX above
function Eye(props) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
            <circle cx={12} cy={12} r={3} />
        </svg>
    );
}
