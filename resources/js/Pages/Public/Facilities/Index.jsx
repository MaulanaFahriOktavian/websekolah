import React from 'react';
import { Link, router } from '@inertiajs/react';
import PublicLayout from '../../../Layouts/PublicLayout';
import Pagination from '../../../Components/Common/Pagination';
import Card from '../../../Components/Common/Card';
import Badge from '../../../Components/Common/Badge';
import { Search, Building2, Users, ArrowRight } from 'lucide-react';

export default function Index({ facilities, filters }) {
    function handleSearch(e) {
        e.preventDefault();
        const search = e.target.cari.value;
        router.get(
            '/fasilitas',
            { cari: search || undefined },
            { preserveState: true }
        );
    }

    return (
        <PublicLayout
            title="Fasilitas Sekolah"
            description="Informasi sarana, prasarana, laboratorium, dan fasilitas penunjang belajar mengajar sekolah."
            ogType="website"
        >
            {/* Institutional Header */}
            <section className="bg-slate-900 text-white py-12 lg:py-16 border-b border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-2xl space-y-3">
                        <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400">
                            Sarana & Prasarana
                        </span>
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
                            Sarana & Fasilitas Sekolah
                        </h1>
                        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                            Lingkungan belajar modern dengan fasilitas lengkap dan terawat untuk mendukung eksplorasi keilmuan, kreativitas, dan kesehatan warga sekolah.
                        </p>
                    </div>
                </div>
            </section>

            {/* Search Bar */}
            <section className="border-b border-slate-200 bg-white sticky top-20 z-20 shadow-xs">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        Daftar Sarana & Fasilitas Pembelajaran
                    </p>

                    <form onSubmit={handleSearch} className="relative w-full sm:max-w-xs">
                        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                            type="text"
                            name="cari"
                            defaultValue={filters?.cari || ''}
                            placeholder="Cari fasilitas..."
                            className="w-full pl-9 pr-4 py-1.5 text-xs rounded-full border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </form>
                </div>
            </section>

            {/* Facilities Grid */}
            <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {facilities.data.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {facilities.data.map((item) => (
                            <Card
                                key={item.id}
                                className="group flex flex-col overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-slate-200 p-0 bg-white"
                            >
                                {/* Photo */}
                                <Link
                                    href={`/fasilitas/${item.slug}`}
                                    className="block relative aspect-16/10 overflow-hidden bg-slate-100"
                                >
                                    {item.photo ? (
                                        <img
                                            src={`/storage/${item.photo}`}
                                            alt={item.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 to-slate-100 text-indigo-300">
                                            <Building2 className="w-14 h-14" />
                                        </div>
                                    )}

                                    {item.capacity && (
                                        <span className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-slate-900/80 backdrop-blur-xs text-white text-[11px] font-semibold flex items-center gap-1.5 shadow-xs">
                                            <Users className="w-3 h-3 text-indigo-300" />
                                            <span>Kapasitas {item.capacity} Orang</span>
                                        </span>
                                    )}
                                </Link>

                                {/* Body */}
                                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                                    <div className="space-y-2">
                                        <h2 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors leading-snug">
                                            <Link href={`/fasilitas/${item.slug}`}>
                                                {item.name}
                                            </Link>
                                        </h2>

                                        {item.description && (
                                            <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed">
                                                {item.description}
                                            </p>
                                        )}
                                    </div>

                                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                                        <Link
                                            href={`/fasilitas/${item.slug}`}
                                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-700"
                                        >
                                            <span>Lihat Rincian Fasilitas</span>
                                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                                        </Link>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-lg mx-auto space-y-3">
                        <Building2 className="w-12 h-12 mx-auto text-slate-300" />
                        <h3 className="text-lg font-bold text-slate-800">Belum Ada Fasilitas</h3>
                        <p className="text-sm text-slate-500">
                            Tidak ditemukan fasilitas yang sesuai dengan kata kunci pencarian Anda.
                        </p>
                    </div>
                )}

                {/* Pagination */}
                {facilities.links && (
                    <div className="mt-12">
                        <Pagination links={facilities.links} />
                    </div>
                )}
            </section>
        </PublicLayout>
    );
}
