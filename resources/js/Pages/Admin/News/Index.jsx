import React from 'react';
import { Link, router } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';
import Pagination from '../../../Components/Common/Pagination';
import Badge from '../../../Components/Common/Badge';
import { Plus, Search, Edit2, Trash2, Newspaper, ExternalLink, Calendar, User } from 'lucide-react';

export default function Index({ news, categories, filters }) {
    function handleFilter(e) {
        e.preventDefault();
        const form = e.target;
        router.get(
            '/admin/news',
            {
                search: form.search.value,
                category_id: form.category_id.value,
                status: form.status.value,
            },
            { preserveState: true }
        );
    }

    function handleDelete(item) {
        if (confirm(`Apakah Anda yakin ingin menghapus berita "${item.title}"?`)) {
            router.delete(`/admin/news/${item.id}`);
        }
    }

    const statusBadges = {
        published: <Badge variant="success" size="sm">Terbit</Badge>,
        draft: <Badge variant="neutral" size="sm">Draft</Badge>,
        archived: <Badge variant="warning" size="sm">Arsip</Badge>,
    };

    return (
        <AdminLayout title="Kelola Berita">
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-xl font-bold text-slate-900">Berita & Artikel</h1>
                        <p className="text-sm text-slate-500 mt-0.5">
                            Kelola publikasi berita, artikel kegiatan, dan prestasi sekolah.
                        </p>
                    </div>

                    <Link
                        href="/admin/news/create"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-lg shadow-sm transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        <span>Tulis Berita Baru</span>
                    </Link>
                </div>

                {/* Filter & Search */}
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                    <form onSubmit={handleFilter} className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                        <div className="sm:col-span-2 relative">
                            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                            <input
                                type="text"
                                name="search"
                                defaultValue={filters?.search || ''}
                                placeholder="Cari judul berita..."
                                className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        <div>
                            <select
                                name="category_id"
                                defaultValue={filters?.category_id || ''}
                                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                            >
                                <option value="">Semua Kategori</option>
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex gap-2">
                            <select
                                name="status"
                                defaultValue={filters?.status || ''}
                                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                            >
                                <option value="">Semua Status</option>
                                <option value="published">Terbit (Published)</option>
                                <option value="draft">Draft</option>
                                <option value="archived">Diarsipkan</option>
                            </select>

                            <button
                                type="submit"
                                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium rounded-lg transition-colors shrink-0"
                            >
                                Filter
                            </button>
                        </div>
                    </form>
                </div>

                {/* News Table */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-slate-600">
                            <thead className="bg-slate-50/80 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                <tr>
                                    <th className="px-6 py-3.5">Artikel</th>
                                    <th className="px-6 py-3.5">Kategori</th>
                                    <th className="px-6 py-3.5">Penulis</th>
                                    <th className="px-6 py-3.5">Status</th>
                                    <th className="px-6 py-3.5">Tanggal Terbit</th>
                                    <th className="px-6 py-3.5 text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {news.data.length > 0 ? (
                                    news.data.map((item) => (
                                        <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                                            <td className="px-6 py-4 max-w-sm">
                                                <div className="flex items-start gap-3">
                                                    {item.featured_image ? (
                                                        <img
                                                            src={`/storage/${item.featured_image}`}
                                                            alt={item.title}
                                                            className="w-12 h-12 rounded-lg object-cover border border-slate-200 shrink-0"
                                                        />
                                                    ) : (
                                                        <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 shrink-0 border border-slate-200">
                                                            <Newspaper className="w-6 h-6 text-slate-300" />
                                                        </div>
                                                    )}
                                                    <div className="min-w-0">
                                                        <p className="font-semibold text-slate-900 text-sm line-clamp-2">
                                                            {item.title}
                                                        </p>
                                                        <p className="font-mono text-[11px] text-slate-400 truncate mt-0.5">
                                                            /{item.slug}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-700">
                                                    {item.category?.name || 'Tanpa Kategori'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-xs text-slate-600">
                                                <div className="flex items-center gap-1.5">
                                                    <User className="w-3.5 h-3.5 text-slate-400" />
                                                    <span>{item.author?.name || 'Admin'}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {statusBadges[item.status] || item.status}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-xs text-slate-500">
                                                <div className="flex items-center gap-1.5">
                                                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                                                    <span>
                                                        {item.published_at
                                                            ? new Date(item.published_at).toLocaleDateString('id-ID', {
                                                                  day: 'numeric',
                                                                  month: 'short',
                                                                  year: 'numeric',
                                                              })
                                                            : '—'}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-right whitespace-nowrap">
                                                <div className="flex items-center justify-end gap-1.5">
                                                    {item.status === 'published' && (
                                                        <a
                                                            href={`/berita/${item.slug}`}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors"
                                                            title="Lihat di Website"
                                                        >
                                                            <ExternalLink className="w-4 h-4" />
                                                        </a>
                                                    )}
                                                    <Link
                                                        href={`/admin/news/${item.id}/edit`}
                                                        className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors"
                                                        title="Edit Berita"
                                                    >
                                                        <Edit2 className="w-4 h-4" />
                                                    </Link>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleDelete(item)}
                                                        className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                                                        title="Hapus Berita"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-12 text-center text-slate-400">
                                            <Newspaper className="w-10 h-10 mx-auto text-slate-300 mb-2" />
                                            <p className="text-sm font-medium">Tidak ada berita yang ditemukan.</p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {news.links && (
                        <div className="px-6 py-4 border-t border-slate-100 flex justify-end">
                            <Pagination links={news.links} />
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
