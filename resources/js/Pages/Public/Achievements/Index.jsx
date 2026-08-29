import React from 'react';
import { Link, router } from '@inertiajs/react';
import PublicLayout from '../../../Layouts/PublicLayout';
import Pagination from '../../../Components/Common/Pagination';
import Card from '../../../Components/Common/Card';
import Badge from '../../../Components/Common/Badge';
import { Search, Trophy, Calendar, Award, User, ArrowRight } from 'lucide-react';

export default function Index({ achievements, categories = [], years = [], filters }) {
    function handleSearch(e) {
        e.preventDefault();
        const search = e.target.cari.value;
        router.get(
            '/prestasi',
            {
                ...filters,
                cari: search || undefined,
            },
            { preserveState: true }
        );
    }

    function handleCategoryClick(cat) {
        const nextCategory = filters?.kategori === cat ? undefined : cat;
        router.get(
            '/prestasi',
            {
                ...filters,
                kategori: nextCategory,
            },
            { preserveState: true }
        );
    }

    function handleYearChange(e) {
        const year = e.target.value;
        router.get(
            '/prestasi',
            {
                ...filters,
                tahun: year || undefined,
            },
            { preserveState: true }
        );
    }

    return (
        <PublicLayout title="Prestasi & Kejuaraan Siswa">
            {/* Hero Banner */}
            <section className="bg-gradient-to-b from-indigo-900 via-indigo-950 to-slate-900 text-white py-14 lg:py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-amber-500/20 via-transparent to-transparent pointer-events-none" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="max-w-2xl space-y-4">
                        <Badge variant="primary" size="md">
                            Prestasi & Penghargaan
                        </Badge>
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
                            Galeri Prestasi Siswa
                        </h1>
                        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                            Apresiasi dan rekam jejak capaian membanggakan siswa di bidang akademik, sains, olahraga, serta seni dan budaya.
                        </p>
                    </div>
                </div>
            </section>

            {/* Filter & Search Bar */}
            <section className="border-b border-slate-200 bg-white sticky top-20 z-20 shadow-xs">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    {/* Category Filter Pills */}
                    <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
                        <button
                            type="button"
                            onClick={() => handleCategoryClick(undefined)}
                            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                                !filters?.kategori
                                    ? 'bg-indigo-600 text-white'
                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                        >
                            Semua Kategori
                        </button>
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                type="button"
                                onClick={() => handleCategoryClick(cat)}
                                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                                    filters?.kategori === cat
                                        ? 'bg-indigo-600 text-white'
                                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Search & Year Filters */}
                    <div className="flex items-center gap-3 w-full md:w-auto shrink-0">
                        {years.length > 0 && (
                            <select
                                value={filters?.tahun || ''}
                                onChange={handleYearChange}
                                className="px-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-slate-700 font-medium"
                            >
                                <option value="">Semua Tahun</option>
                                {years.map((y) => (
                                    <option key={y} value={y}>
                                        Tahun {y}
                                    </option>
                                ))}
                            </select>
                        )}

                        <form onSubmit={handleSearch} className="relative flex-1 md:w-64">
                            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                            <input
                                type="text"
                                name="cari"
                                defaultValue={filters?.cari || ''}
                                placeholder="Cari prestasi / nama siswa..."
                                className="w-full pl-9 pr-4 py-1.5 text-xs rounded-full border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </form>
                    </div>
                </div>
            </section>

            {/* Achievements Grid */}
            <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {achievements.data.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {achievements.data.map((item) => (
                            <Card
                                key={item.id}
                                className="group flex flex-col overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-slate-200 p-0 bg-white"
                            >
                                {/* Photo */}
                                <Link
                                    href={`/prestasi/${item.slug}`}
                                    className="block relative aspect-16/10 overflow-hidden bg-slate-100"
                                >
                                    {item.photo ? (
                                        <img
                                            src={`/storage/${item.photo}`}
                                            alt={item.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-amber-50 to-orange-50 text-amber-400">
                                            <Trophy className="w-14 h-14" />
                                        </div>
                                    )}

                                    {item.year && (
                                        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-slate-900/85 backdrop-blur-xs text-amber-400 text-[11px] font-bold shadow-xs">
                                            {item.year}
                                        </span>
                                    )}

                                    {item.level && (
                                        <span className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-indigo-900/85 backdrop-blur-xs text-white text-[11px] font-semibold shadow-xs">
                                            {item.level}
                                        </span>
                                    )}
                                </Link>

                                {/* Body */}
                                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                                    <div className="space-y-2.5">
                                        {item.category && (
                                            <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100">
                                                {item.category}
                                            </span>
                                        )}

                                        <h2 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors leading-snug">
                                            <Link href={`/prestasi/${item.slug}`}>
                                                {item.title}
                                            </Link>
                                        </h2>

                                        {item.recipient && (
                                            <p className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                                                <User className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                                                <span>{item.recipient}</span>
                                            </p>
                                        )}

                                        {item.description && (
                                            <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                                                {item.description}
                                            </p>
                                        )}
                                    </div>

                                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                                        <Link
                                            href={`/prestasi/${item.slug}`}
                                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-700"
                                        >
                                            <span>Rincian Prestasi</span>
                                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                                        </Link>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-lg mx-auto space-y-3">
                        <Trophy className="w-12 h-12 mx-auto text-slate-300" />
                        <h3 className="text-lg font-bold text-slate-800">Belum Ada Data Prestasi</h3>
                        <p className="text-sm text-slate-500">
                            Tidak ditemukan prestasi siswa yang sesuai dengan kata kunci pencarian Anda.
                        </p>
                    </div>
                )}

                {/* Pagination */}
                {achievements.links && (
                    <div className="mt-12">
                        <Pagination links={achievements.links} />
                    </div>
                )}
            </section>
        </PublicLayout>
    );
}
