import React from 'react';
import { Link, router } from '@inertiajs/react';
import PublicLayout from '../../../Layouts/PublicLayout';
import Pagination from '../../../Components/Common/Pagination';
import Card from '../../../Components/Common/Card';
import Badge from '../../../Components/Common/Badge';
import { Calendar, Bell, ArrowRight, Search, Clock, User } from 'lucide-react';

export default function Index({ announcements, filters }) {
    function handleSearch(e) {
        e.preventDefault();
        const search = e.target.cari.value;
        router.get(
            '/pengumuman',
            { cari: search || undefined },
            { preserveState: true }
        );
    }

    return (
        <PublicLayout title="Pengumuman Sekolah">
            {/* Header Banner */}
            <section className="bg-gradient-to-b from-indigo-900 via-indigo-950 to-slate-900 text-white py-14 lg:py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-500/20 via-transparent to-transparent pointer-events-none" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="max-w-2xl space-y-4">
                        <Badge variant="primary" size="md">
                            Pemberitahuan Resmi
                        </Badge>
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
                            Pengumuman Sekolah
                        </h1>
                        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                            Informasi jadwal, kegiatan penting, dan pengumuman resmi bagi seluruh siswa, guru, dan orang tua.
                        </p>
                    </div>
                </div>
            </section>

            {/* Search Bar */}
            <section className="border-b border-slate-200 bg-white sticky top-20 z-20 shadow-xs">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        Daftar Pengumuman Aktif
                    </p>

                    <form onSubmit={handleSearch} className="relative w-full max-w-xs">
                        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                            type="text"
                            name="cari"
                            defaultValue={filters?.cari || ''}
                            placeholder="Cari pengumuman..."
                            className="w-full pl-9 pr-4 py-1.5 text-xs rounded-full border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </form>
                </div>
            </section>

            {/* Announcements List */}
            <section className="py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
                {announcements.data.length > 0 ? (
                    <div className="space-y-4">
                        {announcements.data.map((item) => (
                            <Card
                                key={item.id}
                                className="group hover:shadow-md transition-all duration-300 hover:border-indigo-200 border-slate-200 p-6"
                            >
                                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                                    <div className="space-y-2 flex-1">
                                        <div className="flex items-center gap-3 text-xs text-slate-400">
                                            <span className="flex items-center gap-1">
                                                <Calendar className="w-3.5 h-3.5 text-indigo-500" />
                                                {new Date(item.published_at).toLocaleDateString('id-ID', {
                                                    day: 'numeric',
                                                    month: 'long',
                                                    year: 'numeric',
                                                })}
                                            </span>
                                            {item.expires_at && (
                                                <span className="flex items-center gap-1 text-slate-400">
                                                    <Clock className="w-3.5 h-3.5" />
                                                    Berlaku s.d.{' '}
                                                    {new Date(item.expires_at).toLocaleDateString('id-ID', {
                                                        day: 'numeric',
                                                        month: 'short',
                                                        year: 'numeric',
                                                    })}
                                                </span>
                                            )}
                                        </div>

                                        <h2 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                                            <Link href={`/pengumuman/${item.slug}`}>
                                                {item.title}
                                            </Link>
                                        </h2>

                                        <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed">
                                            {item.content}
                                        </p>
                                    </div>

                                    <div className="sm:self-center shrink-0">
                                        <Link
                                            href={`/pengumuman/${item.slug}`}
                                            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-600 hover:text-white transition-colors text-xs font-semibold"
                                        >
                                            <span>Rincian</span>
                                            <ArrowRight className="w-3.5 h-3.5" />
                                        </Link>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-lg mx-auto space-y-3">
                        <Bell className="w-12 h-12 mx-auto text-slate-300" />
                        <h3 className="text-lg font-bold text-slate-800">Tidak Ada Pengumuman</h3>
                        <p className="text-sm text-slate-500">
                            Saat ini belum ada pengumuman aktif yang dipublikasikan.
                        </p>
                    </div>
                )}

                {/* Pagination */}
                {announcements.links && (
                    <div className="mt-8">
                        <Pagination links={announcements.links} />
                    </div>
                )}
            </section>
        </PublicLayout>
    );
}
