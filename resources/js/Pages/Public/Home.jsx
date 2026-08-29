import React from 'react';
import { usePage } from '@inertiajs/react';
import PublicLayout from '../../Layouts/PublicLayout';
import Button from '../../Components/Common/Button';
import Card from '../../Components/Common/Card';
import Badge from '../../Components/Common/Badge';
import {
    GraduationCap,
    Award,
    BookOpen,
    Users,
    ArrowRight,
    Shield,
    Sparkles,
    MapPin,
    Phone,
    Mail,
} from 'lucide-react';

export default function Home({ statistics, highlights }) {
    const { school } = usePage().props;

    // Use DB-driven data from shared props — no hardcoded school identity
    const schoolName      = school?.name           || 'Sekolah Kami';
    const schoolShortName = school?.short_name      || '';
    const accreditation   = school?.accreditation   || null;
    const npsn            = school?.npsn            || null;
    const vision          = school?.vision          || null;
    const mission         = school?.mission         || null;
    const principalName   = school?.principal_name  || null;
    const address         = school?.address         || null;
    const phone           = school?.phone           || null;
    const email           = school?.email           || null;

    const defaultStats = statistics || [
        { label: 'Siswa Aktif', value: '—', icon: Users },
        { label: 'Guru & Tenaga Ahli', value: '—', icon: GraduationCap },
        { label: 'Ekstrakurikuler', value: '—', icon: Sparkles },
        { label: 'Tingkat Kelulusan', value: '—', icon: Award },
    ];

    const defaultHighlights = highlights || [
        {
            title: 'Kurikulum Berkualitas',
            description:
                'Pembelajaran berpusat pada minat dan bakat siswa dengan integrasi teknologi modern.',
            icon: BookOpen,
        },
        {
            title: 'Penguatan Karakter',
            description:
                'Menumbuhkan integritas, budi pekerti luhur, dan jiwa kepemimpinan.',
            icon: Shield,
        },
        {
            title: 'Prestasi Akademik',
            description:
                'Membina siswa berprestasi di tingkat kabupaten, provinsi, hingga nasional.',
            icon: Award,
        },
    ];

    return (
        <PublicLayout title="Beranda">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-b from-indigo-900 via-indigo-950 to-slate-950 text-white py-20 lg:py-28">
                {/* Background glow */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-500/20 via-transparent to-transparent pointer-events-none" />
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl space-y-6">
                        {/* Accreditation badge */}
                        {(accreditation || npsn) && (
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-400/20 text-indigo-300 text-xs font-medium">
                                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                                <span>
                                    Website Resmi
                                    {accreditation && ` • Akreditasi ${accreditation}`}
                                    {npsn && ` • NPSN: ${npsn}`}
                                </span>
                            </div>
                        )}

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight sm:leading-none text-white">
                            Selamat Datang di{' '}
                            <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-indigo-200 to-amber-200">
                                {schoolName}
                            </span>
                        </h1>

                        {vision && (
                            <p className="text-lg sm:text-xl text-slate-300 font-normal leading-relaxed line-clamp-3">
                                {vision}
                            </p>
                        )}

                        <div className="pt-4 flex flex-wrap items-center gap-4">
                            <Button
                                href="#tentang"
                                variant="primary"
                                size="lg"
                                className="shadow-lg shadow-indigo-600/30"
                            >
                                <span>Jelajahi Profil</span>
                                <ArrowRight className="w-4 h-4" />
                            </Button>
                            <Button
                                href="/login"
                                variant="secondary"
                                size="lg"
                                className="bg-white/10 hover:bg-white/20 text-white border border-white/10"
                            >
                                <span>Masuk Portal CMS</span>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Quick Stats Strip */}
            <section className="relative -mt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-20">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {defaultStats.map((stat, idx) => {
                        const Icon = stat.icon;
                        return (
                            <div
                                key={idx}
                                className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-md shadow-slate-200/40 flex items-center gap-4"
                            >
                                <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                                    <Icon className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-slate-900 tracking-tight">
                                        {stat.value}
                                    </p>
                                    <p className="text-xs text-slate-500 font-medium">
                                        {stat.label}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Highlights / Core Values */}
            <section id="tentang" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
                    <Badge variant="primary" size="md">
                        Keunggulan Kami
                    </Badge>
                    <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
                        Membangun Masa Depan Gemilang
                    </h2>
                    <p className="text-sm text-slate-600">
                        Kami berkomitmen menghadirkan lingkungan belajar yang inovatif, inklusif, dan inspiratif.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {defaultHighlights.map((item, idx) => {
                        const Icon = item.icon;
                        return (
                            <Card
                                key={idx}
                                className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-slate-200"
                            >
                                <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center mb-5 shadow-md shadow-indigo-200">
                                    <Icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 mb-2">
                                    {item.title}
                                </h3>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                    {item.description}
                                </p>
                            </Card>
                        );
                    })}
                </div>
            </section>

            {/* Vision & Mission section (only if data exists) */}
            {(vision || mission) && (
                <section className="py-16 bg-slate-50 border-y border-slate-200">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            {vision && (
                                <div className="space-y-3">
                                    <Badge variant="primary" size="sm">Visi</Badge>
                                    <p className="text-slate-700 leading-relaxed">{vision}</p>
                                </div>
                            )}
                            {mission && (
                                <div className="space-y-3">
                                    <Badge variant="primary" size="sm">Misi</Badge>
                                    <p className="text-slate-700 leading-relaxed whitespace-pre-line">{mission}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            )}

            {/* Contact / Info Banner */}
            <section className="pb-20 pt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="rounded-3xl bg-slate-900 text-white p-8 sm:p-12 relative overflow-hidden border border-slate-800">
                    <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div className="space-y-4">
                            <Badge variant="success" size="md">
                                Hubungi Kami
                            </Badge>
                            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">
                                {schoolName}
                            </h3>
                            {principalName && (
                                <p className="text-sm text-slate-400">
                                    Kepala Sekolah: <span className="text-slate-200 font-medium">{principalName}</span>
                                </p>
                            )}
                        </div>

                        <div className="space-y-3">
                            {address && (
                                <div className="flex items-start gap-3 text-sm text-slate-300">
                                    <MapPin className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                                    <span>{address}</span>
                                </div>
                            )}
                            {phone && (
                                <div className="flex items-center gap-3 text-sm text-slate-300">
                                    <Phone className="w-4 h-4 text-indigo-400 shrink-0" />
                                    <span>{phone}</span>
                                </div>
                            )}
                            {email && (
                                <div className="flex items-center gap-3 text-sm text-slate-300">
                                    <Mail className="w-4 h-4 text-indigo-400 shrink-0" />
                                    <a href={`mailto:${email}`} className="hover:text-white transition-colors">
                                        {email}
                                    </a>
                                </div>
                            )}
                            {!address && !phone && !email && (
                                <p className="text-sm text-slate-500 italic">
                                    Informasi kontak belum diisi. Silakan lengkapi di panel admin.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
