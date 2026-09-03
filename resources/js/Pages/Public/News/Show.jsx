import React from 'react';
import { Link, Head } from '@inertiajs/react';
import PublicLayout from '../../../Layouts/PublicLayout';
import Badge from '../../../Components/Common/Badge';
import Card from '../../../Components/Common/Card';
import { Calendar, User, ArrowLeft, Share2, Newspaper } from 'lucide-react';

export default function Show({ article, latestNews = [] }) {
    const formattedDate = new Date(article.published_at).toLocaleDateString('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });

    // Safe paragraph parser: splits by double newlines without dangerouslySetInnerHTML
    const paragraphs = article.content
        ? article.content.split(/\n\s*\n/)
        : [];

    return (
        <PublicLayout
            title={article.meta_title || article.title}
            description={article.meta_description || article.excerpt || article.title}
            image={article.featured_image}
            ogType="article"
        >

            <article className="py-10 lg:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Breadcrumbs / Back */}
                <div className="mb-6">
                    <Link
                        href="/berita"
                        className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-600 hover:text-indigo-700"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Kembali ke Semua Berita</span>
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Main Article Content */}
                    <div className="lg:col-span-8 space-y-8">
                        {/* Title & Metadata */}
                        <div className="space-y-4">
                            {article.category && (
                                <Link href={`/berita?kategori=${article.category.slug}`}>
                                    <Badge variant="primary" size="md">
                                        {article.category.name}
                                    </Badge>
                                </Link>
                            )}

                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                                {article.title}
                            </h1>

                            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-500 border-y border-slate-100 py-3">
                                <div className="flex items-center gap-1.5">
                                    <Calendar className="w-4 h-4 text-indigo-500" />
                                    <span>{formattedDate}</span>
                                </div>
                                {article.author && (
                                    <div className="flex items-center gap-1.5">
                                        <User className="w-4 h-4 text-indigo-500" />
                                        <span>Ditulis oleh: {article.author.name}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Featured Image */}
                        {article.featured_image && (
                            <div className="rounded-2xl overflow-hidden shadow-md border border-slate-200 bg-slate-100 aspect-16/9">
                                <img
                                    src={`/storage/${article.featured_image}`}
                                    alt={article.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        )}

                        {/* Excerpt Lead */}
                        {article.excerpt && (
                            <p className="text-lg sm:text-xl font-medium text-slate-700 leading-relaxed border-l-4 border-indigo-600 pl-4 py-1 italic bg-indigo-50/40 rounded-r-lg">
                                {article.excerpt}
                            </p>
                        )}

                        {/* Body Content — Safe multiline paragraphs */}
                        <div className="prose prose-slate max-w-none text-slate-800 text-base sm:text-lg leading-relaxed space-y-5">
                            {paragraphs.map((p, idx) => (
                                <p key={idx} className="whitespace-pre-line">
                                    {p}
                                </p>
                            ))}
                        </div>
                    </div>

                    {/* Sidebar with Latest News */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 sticky top-28">
                            <h2 className="text-base font-bold text-slate-900 mb-4 pb-3 border-b border-slate-200">
                                Berita Terbaru Lainnya
                            </h2>

                            {latestNews.length > 0 ? (
                                <div className="space-y-4">
                                    {latestNews.map((item) => (
                                        <Link
                                            key={item.id}
                                            href={`/berita/${item.slug}`}
                                            className="group flex gap-3 items-start"
                                        >
                                            {item.featured_image ? (
                                                <img
                                                    src={`/storage/${item.featured_image}`}
                                                    alt={item.title}
                                                    className="w-16 h-16 rounded-lg object-cover border border-slate-200 shrink-0"
                                                />
                                            ) : (
                                                <div className="w-16 h-16 rounded-lg bg-indigo-50 text-indigo-400 flex items-center justify-center shrink-0 border border-indigo-100">
                                                    <Newspaper className="w-6 h-6" />
                                                </div>
                                            )}
                                            <div className="min-w-0">
                                                <p className="text-xs font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2 leading-snug">
                                                    {item.title}
                                                </p>
                                                <p className="text-[11px] text-slate-400 mt-1">
                                                    {new Date(item.published_at).toLocaleDateString('id-ID', {
                                                        day: 'numeric',
                                                        month: 'short',
                                                        year: 'numeric',
                                                    })}
                                                </p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-xs text-slate-500">Belum ada berita lainnya.</p>
                            )}

                            <div className="mt-6 pt-4 border-t border-slate-200">
                                <Link
                                    href="/berita"
                                    className="block text-center text-xs font-semibold text-indigo-600 hover:text-indigo-700"
                                >
                                    Lihat Semua Berita →
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        </PublicLayout>
    );
}
