import React from 'react';
import { Link, router } from '@inertiajs/react';
import PublicLayout from '../../../Layouts/PublicLayout';
import Pagination from '../../../Components/Common/Pagination';
import Card from '../../../Components/Common/Card';
import Badge from '../../../Components/Common/Badge';
import { Calendar, User, ArrowRight, Search, Newspaper } from 'lucide-react';

export default function Index({ news, categories, filters }) {
    function handleSearch(e) {
        e.preventDefault();
        const search = e.target.cari.value;
        router.get(
            '/berita',
            {
                kategori: filters?.kategori || undefined,
                cari: search || undefined,
            },
            { preserveState: true }
        );
    }

    return (
        <PublicLayout title="Berita & Artikel">
            {/* Header Banner */}
            <section className="bg-gradient-to-b from-indigo-900 via-indigo-950 to-slate-900 text-white py-14 lg:py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-500/20 via-transparent to-transparent pointer-events-none" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="max-w-2xl space-y-4">
                        <Badge variant="primary" size="md">
                            Kabar & Informasi
                        </Badge>
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
                            Berita & Artikel Sekolah
                        </h1>
                        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                            Simak informasi terkini, liputan kegiatan, dan berbagai pencapaian membanggakan siswa kami.
                        </p>
                    </div>
                </div>
            </section>

            {/* Filter & Search Bar */}
            <section className="border-b border-slate-200 bg-white sticky top-20 z-20 shadow-xs">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    {/* Category Pills */}
                    <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
                        <Link
                            href="/berita"
                            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                                !filters?.kategori
                                    ? 'bg-indigo-600 text-white shadow-xs'
                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                        >
                            Semua Kategori
                        </Link>
                        {categories.map((cat) => (
                            <Link
                                key={cat.id}
                                href={`/berita?kategori=${cat.slug}${filters?.cari ? `&cari=${encodeURIComponent(filters.cari)}` : ''}`}
                                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                                    filters?.kategori === cat.slug
                                        ? 'bg-indigo-600 text-white shadow-xs'
                                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                }`}
                            >
                                {cat.name} ({cat.news_count})
                            </Link>
                        ))}
                    </div>

                    {/* Search Input */}
                    <form onSubmit={handleSearch} className="relative min-w-[240px]">
                        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                            type="text"
                            name="cari"
                            defaultValue={filters?.cari || ''}
                            placeholder="Cari berita..."
                            className="w-full pl-9 pr-4 py-1.5 text-xs rounded-full border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </form>
                </div>
            </section>

            {/* News Grid */}
            <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {news.data.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {news.data.map((item) => (
                            <Card
                                key={item.id}
                                className="group flex flex-col h-full overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-slate-200 p-0"
                            >
                                {/* Thumbnail */}
                                <Link href={`/berita/${item.slug}`} className="block relative aspect-16/9 overflow-hidden bg-slate-100">
                                    {item.featured_image ? (
                                        <img
                                            src={`/storage/${item.featured_image}`}
                                            alt={item.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-50 to-slate-100 text-indigo-300">
                                            <Newspaper className="w-12 h-12" />
                                        </div>
                                    )}
                                    {item.category && (
                                        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-indigo-600/90 backdrop-blur-xs text-white text-[11px] font-semibold tracking-wide shadow-xs">
                                            {item.category.name}
                                        </span>
                                    )}
                                </Link>

                                {/* Body */}
                                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-3 text-xs text-slate-400">
                                            <span className="flex items-center gap-1">
                                                <Calendar className="w-3.5 h-3.5" />
                                                {new Date(item.published_at).toLocaleDateString('id-ID', {
                                                    day: 'numeric',
                                                    month: 'short',
                                                    year: 'numeric',
                                                })}
                                            </span>
                                            {item.author && (
                                                <span className="flex items-center gap-1">
                                                    <User className="w-3.5 h-3.5" />
                                                    {item.author.name}
                                                </span>
                                            )}
                                        </div>

                                        <h2 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2 leading-snug">
                                            <Link href={`/berita/${item.slug}`}>
                                                {item.title}
                                            </Link>
                                        </h2>

                                        {item.excerpt && (
                                            <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed">
                                                {item.excerpt}
                                            </p>
                                        )}
                                    </div>

                                    <div className="pt-2">
                                        <Link
                                            href={`/berita/${item.slug}`}
                                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-700"
                                        >
                                            <span>Baca Selengkapnya</span>
                                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                                        </Link>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-lg mx-auto space-y-3">
                        <Newspaper className="w-12 h-12 mx-auto text-slate-300" />
                        <h3 className="text-lg font-bold text-slate-800">Belum Ada Berita</h3>
                        <p className="text-sm text-slate-500">
                            Tidak ada artikel berita yang sesuai dengan kategori atau kata kunci pencarian Anda.
                        </p>
                    </div>
                )}

                {/* Pagination */}
                {news.links && (
                    <div className="mt-12">
                        <Pagination links={news.links} />
                    </div>
                )}
            </section>
        </PublicLayout>
    );
}
