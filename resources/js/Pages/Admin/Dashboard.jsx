import React from 'react';
import AdminLayout from '../../Layouts/AdminLayout';
import Card from '../../Components/Common/Card';
import Badge from '../../Components/Common/Badge';
import Button from '../../Components/Common/Button';
import {
    Activity,
    Users,
    FileText,
    Image,
    Layers,
    CheckCircle2,
    Clock,
    Sparkles,
    ArrowUpRight,
    Server,
} from 'lucide-react';

export default function Dashboard({ school, systemInfo }) {
    const schoolName = school?.name || 'Sekolah';

    const statCards = [
        {
            title: 'Arsitektur Sistem',
            value: 'Laravel + React',
            subtitle: 'Inertia.js Monolith',
            icon: Layers,
            badge: 'Aktif',
            badgeVariant: 'success',
        },
        {
            title: 'Styling Engine',
            value: 'Tailwind CSS v4',
            subtitle: 'Vite Bundler',
            icon: Sparkles,
            badge: 'Siap',
            badgeVariant: 'success',
        },
        {
            title: 'Basis Data',
            value: 'MySQL Ready',
            subtitle: 'Migrations & Seeders',
            icon: Server,
            badge: 'Terkonfigurasi',
            badgeVariant: 'primary',
        },
        {
            title: 'Status Modul',
            value: 'Fase 1 Selesai',
            subtitle: 'Menunggu Fase 2 CMS',
            icon: Activity,
            badge: 'Fondasi Siap',
            badgeVariant: 'warning',
        },
    ];

    const upcomingModules = [
        {
            name: 'Modul Berita & Artikel',
            description: 'Manajemen artikel, berita sekolah, kategori, dan publikasi media.',
            icon: FileText,
            phase: 'Fase 2',
        },
        {
            name: 'Modul Guru & Staf',
            description: 'Manajemen direktori tenaga pendidik, jabatan, dan profil.',
            icon: Users,
            phase: 'Fase 2',
        },
        {
            name: 'Modul Galeri & Media',
            description: 'Manajemen album foto kegiatan dan video dokumentasi sekolah.',
            icon: Image,
            phase: 'Fase 2',
        },
    ];

    return (
        <AdminLayout title="Dashboard CMS">
            <div className="space-y-8">
                {/* Welcome Card */}
                <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
                    <div className="relative z-10 max-w-2xl space-y-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-200 text-xs font-medium border border-indigo-400/20">
                            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                            <span>Control Panel Sekolah</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                            Selamat Datang di Panel CMS {schoolName}
                        </h2>
                        <p className="text-sm text-slate-300">
                            Fondasi Fase 1 (Laravel + Inertia + React + Tailwind CSS + Vite) telah berhasil dibangun dan siap untuk integrasi modul-modul CMS berikutnya.
                        </p>
                    </div>
                </div>

                {/* Status Metric Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {statCards.map((stat, idx) => {
                        const Icon = stat.icon;
                        return (
                            <Card key={idx} className="p-0 border-slate-200">
                                <div className="flex items-start justify-between">
                                    <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                                        <Icon className="w-5 h-5" />
                                    </div>
                                    <Badge variant={stat.badgeVariant} size="sm">
                                        {stat.badge}
                                    </Badge>
                                </div>
                                <div className="mt-4">
                                    <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                        {stat.title}
                                    </h4>
                                    <p className="text-xl font-bold text-slate-900 mt-1">
                                        {stat.value}
                                    </p>
                                    <p className="text-xs text-slate-500 mt-0.5">
                                        {stat.subtitle}
                                    </p>
                                </div>
                            </Card>
                        );
                    })}
                </div>

                {/* Next Phase Preparation Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left: Upcoming CMS Modules */}
                    <div className="lg:col-span-2 space-y-4">
                        <Card
                            title="Rencana Modul CMS Sekolah"
                            subtitle="Modul-modul ini akan diimplementasikan pada fase berikutnya"
                        >
                            <div className="divide-y divide-slate-100">
                                {upcomingModules.map((item, idx) => {
                                    const Icon = item.icon;
                                    return (
                                        <div
                                            key={idx}
                                            className="py-4 first:pt-0 last:pb-0 flex items-start justify-between gap-4"
                                        >
                                            <div className="flex items-start gap-3.5">
                                                <div className="w-9 h-9 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center shrink-0 mt-0.5">
                                                    <Icon className="w-4 h-4" />
                                                </div>
                                                <div>
                                                    <h5 className="text-sm font-semibold text-slate-800">
                                                        {item.name}
                                                    </h5>
                                                    <p className="text-xs text-slate-500 mt-0.5">
                                                        {item.description}
                                                    </p>
                                                </div>
                                            </div>
                                            <Badge variant="slate" size="sm">
                                                {item.phase}
                                            </Badge>
                                        </div>
                                    );
                                })}
                            </div>
                        </Card>
                    </div>

                    {/* Right: Quick School Info */}
                    <div className="space-y-4">
                        <Card
                            title="Identitas Terpusat"
                            subtitle="Dikelola via config/school.php"
                        >
                            <div className="space-y-3 text-xs">
                                <div>
                                    <span className="text-slate-500 block">Nama Sekolah:</span>
                                    <span className="font-semibold text-slate-800 text-sm">
                                        {schoolName}
                                    </span>
                                </div>
                                <div>
                                    <span className="text-slate-500 block">Akreditasi:</span>
                                    <span className="font-medium text-slate-800">
                                        {school?.accreditation || '-'}
                                    </span>
                                </div>
                                <div>
                                    <span className="text-slate-500 block">NPSN:</span>
                                    <span className="font-medium text-slate-800">
                                        {school?.npsn || '-'}
                                    </span>
                                </div>
                                <div>
                                    <span className="text-slate-500 block">Alamat:</span>
                                    <span className="text-slate-700">
                                        {school?.contact?.address || '-'}
                                    </span>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
