import React from 'react';
import { Link, router } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';
import Pagination from '../../../Components/Common/Pagination';
import Badge from '../../../Components/Common/Badge';
import { Plus, Search, Edit2, Trash2, FolderKanban, Newspaper } from 'lucide-react';

export default function Index({ categories, filters }) {
    function handleSearch(e) {
        e.preventDefault();
        const search = e.target.search.value;
        router.get('/admin/categories', { search }, { preserveState: true });
    }

    function handleDelete(category) {
        if (confirm(`Apakah Anda yakin ingin menghapus kategori "${category.name}"?`)) {
            router.delete(`/admin/categories/${category.id}`);
        }
    }

    return (
        <AdminLayout title="Kategori Berita">
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-xl font-bold text-slate-900">Kategori Berita</h1>
                        <p className="text-sm text-slate-500 mt-0.5">
                            Kelola kategori untuk pengelompokan berita dan artikel website.
                        </p>
                    </div>

                    <Link
                        href="/admin/categories/create"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-lg shadow-sm transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        <span>Tambah Kategori</span>
                    </Link>
                </div>

                {/* Filter & Search Bar */}
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                    <form onSubmit={handleSearch} className="flex gap-2">
                        <div className="relative flex-1">
                            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                            <input
                                type="text"
                                name="search"
                                defaultValue={filters?.search || ''}
                                placeholder="Cari nama atau slug kategori..."
                                className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium rounded-lg transition-colors"
                        >
                            Cari
                        </button>
                    </form>
                </div>

                {/* Categories Table */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-slate-600">
                            <thead className="bg-slate-50/80 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                <tr>
                                    <th className="px-6 py-3.5">Urutan</th>
                                    <th className="px-6 py-3.5">Nama & Slug</th>
                                    <th className="px-6 py-3.5">Deskripsi</th>
                                    <th className="px-6 py-3.5">Jumlah Berita</th>
                                    <th className="px-6 py-3.5">Status</th>
                                    <th className="px-6 py-3.5 text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {categories.data.length > 0 ? (
                                    categories.data.map((cat) => (
                                        <tr key={cat.id} className="hover:bg-slate-50/60 transition-colors">
                                            <td className="px-6 py-4 font-mono text-xs text-slate-400">
                                                {cat.sort_order}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="font-semibold text-slate-900">
                                                    {cat.name}
                                                </div>
                                                <div className="font-mono text-xs text-slate-400 mt-0.5">
                                                    /{cat.slug}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-xs text-slate-500 max-w-xs truncate">
                                                {cat.description || '—'}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="inline-flex items-center gap-1.5 text-xs text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md">
                                                    <Newspaper className="w-3.5 h-3.5 text-slate-400" />
                                                    <span>{cat.news_count} artikel</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                {cat.is_active ? (
                                                    <Badge variant="success" size="sm">
                                                        Aktif
                                                    </Badge>
                                                ) : (
                                                    <Badge variant="neutral" size="sm">
                                                        Nonaktif
                                                    </Badge>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Link
                                                        href={`/admin/categories/${cat.id}/edit`}
                                                        className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors"
                                                        title="Edit Kategori"
                                                    >
                                                        <Edit2 className="w-4 h-4" />
                                                    </Link>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleDelete(cat)}
                                                        className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                                                        title="Hapus Kategori"
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
                                            <FolderKanban className="w-10 h-10 mx-auto text-slate-300 mb-2" />
                                            <p className="text-sm font-medium">Belum ada kategori yang ditemukan.</p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {categories.links && (
                        <div className="px-6 py-4 border-t border-slate-100 flex justify-end">
                            <Pagination links={categories.links} />
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
