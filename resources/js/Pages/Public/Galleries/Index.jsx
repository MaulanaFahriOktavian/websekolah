import React from 'react';
import { Link, router } from '@inertiajs/react';
import PublicLayout from '../../../Layouts/PublicLayout';
import Pagination from '../../../Components/Common/Pagination';
import Card from '../../../Components/Common/Card';
import Badge from '../../../Components/Common/Badge';
import { Search, Image as ImageIcon, Calendar, Layers, ArrowRight } from 'lucide-react';

export default function Index({ galleries, filters }) {
    function handleSearch(e) {
        e.preventDefault();
        const search = e.target.cari.value;
        router.get(
            '/galeri',
            { cari: search || undefined },
            { preserveState: true }
        );
    }

    return (
        <PublicLayout title="Galeri Foto & Dokumentasi Kegiatan">
            {/* Hero Banner */}
            <section className="bg-gradient-to-b from-indigo-900 via-indigo-950 to-slate-900 text-white py-14 lg:py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-500/20 via-transparent to-transparent pointer-events-none" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="max-w-2xl space-y-4">
                        <Badge variant="primary" size="md">
                            Dokumentasi Sekolah
                        </Badge>
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
                            Galeri Foto Kegiatan
                        </h1>
                        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                            Momen berharga dan dokumentasi visual berbagai aktivitas, upacara, perlombaan, dan karya siswa sekolah.
                        </p>
                    </div>
                </div>
            </section>

            {/* Search Bar */}
            <section className="border-b border-slate-200 bg-white sticky top-20 z-20 shadow-xs">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        Koleksi Album Dokumentasi
                    </p>

                    <form onSubmit={handleSearch} className="relative w-full sm:max-w-xs">
                        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                            type="text"
                            name="cari"
                            defaultValue={filters?.cari || ''}
                            placeholder="Cari album kegiatan..."
                            className="w-full pl-9 pr-4 py-1.5 text-xs rounded-full border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </form>
                </div>
            </section>

            {/* Galleries Grid */}
            <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {galleries.data.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {galleries.data.map((item) => {
                            const coverSrc = item.cover_photo
                                ? `/storage/${item.cover_photo}`
                                : item.photos?.[0]?.photo_path
                                ? `/storage/${item.photos[0].photo_path}`
                                : null;

                            return (
                                <Card
                                    key={item.id}
                                    className="group flex flex-col overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-slate-200 p-0 bg-white"
                                >
                                    {/* Cover Photo */}
                                    <Link
                                        href={`/galeri/${item.slug}`}
                                        className="block relative aspect-16/10 overflow-hidden bg-slate-100"
                                    >
                                        {coverSrc ? (
                                            <img
                                                src={coverSrc}
                                                alt={item.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 to-slate-100 text-indigo-300">
                                                <ImageIcon className="w-14 h-14" />
                                            </div>
                                        )}

                                        {/* Photo Count Badge */}
                                        <span className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-slate-900/80 backdrop-blur-xs text-white text-[11px] font-semibold flex items-center gap-1.5 shadow-xs">
                                            <Layers className="w-3.5 h-3.5 text-indigo-300" />
                                            <span>{item.photos_count || 0} Foto</span>
                                        </span>
                                    </Link>

                                    {/* Body */}
                                    <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                                        <div className="space-y-2">
                                            {item.event_date && (
                                                <p className="text-xs text-slate-500 flex items-center gap-1.5">
                                                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                                                    <span>
                                                        {new Date(item.event_date).toLocaleDateString('id-ID', {
                                                            day: 'numeric',
                                                            month: 'long',
                                                            year: 'numeric',
                                                        })}
                                                    </span>
                                                </p>
                                            )}

                                            <h2 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors leading-snug">
                                                <Link href={`/galeri/${item.slug}`}>
                                                    {item.title}
                                                </Link>
                                            </h2>

                                            {item.description && (
                                                <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed">
                                                    {item.description}
                                                </p>
                                            )}
                                        </div>

                                        <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                                            <Link
                                                href={`/galeri/${item.slug}`}
                                                className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-700"
                                            >
                                                <span>Buka Album Foto</span>
                                                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                                            </Link>
                                        </div>
                                    </div>
                                </Card>
                            );
                        })}
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-lg mx-auto space-y-3">
                        <ImageIcon className="w-12 h-12 mx-auto text-slate-300" />
                        <h3 className="text-lg font-bold text-slate-800">Belum Ada Album Galeri</h3>
                        <p className="text-sm text-slate-500">
                            Tidak ditemukan album foto kegiatan yang sesuai dengan kata kunci pencarian Anda.
                        </p>
                    </div>
                )}

                {/* Pagination */}
                {galleries.links && (
                    <div className="mt-12">
                        <Pagination links={galleries.links} />
                    </div>
                )}
            </section>
        </PublicLayout>
    );
}
