import React from 'react';
import { Link, router } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';
import Pagination from '../../../Components/Common/Pagination';
import Badge from '../../../Components/Common/Badge';
import { Plus, Search, Edit2, Trash2, Trophy, ExternalLink, Calendar, Award } from 'lucide-react';

export default function Index({ achievements, categories = [], levels = [], years = [], filters }) {
    function handleFilter(e) {
        e.preventDefault();
        const form = e.target;
        router.get(
            '/admin/achievements',
            {
                search: form.search.value,
                category: form.category.value,
                level: form.level.value,
                year: form.year.value,
                status: form.status.value,
            },
            { preserveState: true }
        );
    }

    function handleDelete(item) {
        if (confirm(`Apakah Anda yakin ingin menghapus data prestasi "${item.title}"?`)) {
            router.delete(`/admin/achievements/${item.id}`);
        }
    }

    return (
        <AdminLayout title="Prestasi Siswa & Sekolah">
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-xl font-bold text-slate-900">Prestasi & Penghargaan</h1>
                        <p className="text-sm text-slate-500 mt-0.5">
                            Kelola rekam jejak juara akademik, olahraga, seni, sains, dan kejuaraan siswa.
                        </p>
                    </div>

                    <Link
                        href="/admin/achievements/create"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-lg shadow-sm transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        <span>Tambah Prestasi</span>
                    </Link>
                </div>

                {/* Filter & Search */}
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                    <form onSubmit={handleFilter} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
                        <div className="sm:col-span-2 relative">
                            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                            <input
                                type="text"
                                name="search"
                                defaultValue={filters?.search || ''}
                                placeholder="Cari judul, peraih, atau rincian..."
                                className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        <select
                            name="category"
                            defaultValue={filters?.category || ''}
                            className="px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                        >
                            <option value="">Semua Kategori</option>
                            {categories.map((c) => (
                                <option key={c} value={c}>
                                    {c}
                                </option>
                            ))}
                        </select>

                        <select
                            name="level"
                            defaultValue={filters?.level || ''}
                            className="px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                        >
                            <option value="">Semua Tingkat</option>
                            {levels.map((lvl) => (
                                <option key={lvl} value={lvl}>
                                    {lvl}
                                </option>
                            ))}
                        </select>

                        <select
                            name="year"
                            defaultValue={filters?.year || ''}
                            className="px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                        >
                            <option value="">Semua Tahun</option>
                            {years.map((y) => (
                                <option key={y} value={y}>
                                    {y}
                                </option>
                            ))}
                        </select>

                        <select
                            name="status"
                            defaultValue={filters?.status || ''}
                            className="px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                        >
                            <option value="">Semua Status</option>
                            <option value="1">Aktif</option>
                            <option value="0">Nonaktif</option>
                        </select>

                        <div className="sm:col-span-2 lg:col-span-6 flex justify-end">
                            <button
                                type="submit"
                                className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium rounded-lg transition-colors"
                            >
                                Terapkan Filter
                            </button>
                        </div>
                    </form>
                </div>

                {/* Achievements Table */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-slate-600">
                            <thead className="bg-slate-50/80 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                <tr>
                                    <th className="px-6 py-3.5">Urutan</th>
                                    <th className="px-6 py-3.5">Prestasi & Peraih</th>
                                    <th className="px-6 py-3.5">Kategori / Tingkat</th>
                                    <th className="px-6 py-3.5">Tahun</th>
                                    <th className="px-6 py-3.5">Status</th>
                                    <th className="px-6 py-3.5 text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {achievements.data.length > 0 ? (
                                    achievements.data.map((item) => (
                                        <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                                            <td className="px-6 py-4 font-mono text-xs text-slate-400">
                                                {item.sort_order}
                                            </td>
                                            <td className="px-6 py-4 max-w-sm">
                                                <div className="flex items-center gap-3">
                                                    {item.photo ? (
                                                        <img
                                                            src={`/storage/${item.photo}`}
                                                            alt={item.title}
                                                            className="w-12 h-12 rounded-lg object-cover border border-slate-200 shrink-0"
                                                        />
                                                    ) : (
                                                        <div className="w-12 h-12 rounded-lg bg-amber-50 text-amber-500 flex items-center justify-center font-bold text-xs shrink-0 border border-amber-100">
                                                            <Trophy className="w-6 h-6" />
                                                        </div>
                                                    )}
                                                    <div className="min-w-0">
                                                        <p className="font-semibold text-slate-900 text-sm line-clamp-1">
                                                            {item.title}
                                                        </p>
                                                        {item.recipient && (
                                                            <p className="text-xs text-slate-500 line-clamp-1">
                                                                Peraih: {item.recipient}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="space-y-1">
                                                    {item.category && (
                                                        <span className="inline-block px-2 py-0.5 rounded text-[11px] font-semibold bg-indigo-50 text-indigo-700 mr-1.5">
                                                            {item.category}
                                                        </span>
                                                    )}
                                                    {item.level && (
                                                        <span className="inline-block px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-100 text-slate-600">
                                                            {item.level}
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-xs text-slate-700 font-medium">
                                                {item.year || '—'}
                                            </td>
                                            <td className="px-6 py-4">
                                                {item.is_active ? (
                                                    <Badge variant="success" size="sm">
                                                        Aktif
                                                    </Badge>
                                                ) : (
                                                    <Badge variant="neutral" size="sm">
                                                        Nonaktif
                                                    </Badge>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-right whitespace-nowrap">
                                                <div className="flex items-center justify-end gap-1.5">
                                                    {item.is_active && (
                                                        <a
                                                            href={`/prestasi/${item.slug}`}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors"
                                                            title="Lihat di Website"
                                                        >
                                                            <ExternalLink className="w-4 h-4" />
                                                        </a>
                                                    )}
                                                    <Link
                                                        href={`/admin/achievements/${item.id}/edit`}
                                                        className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors"
                                                        title="Edit Prestasi"
                                                    >
                                                        <Edit2 className="w-4 h-4" />
                                                    </Link>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleDelete(item)}
                                                        className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                                                        title="Hapus Prestasi"
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
                                            <Trophy className="w-10 h-10 mx-auto text-slate-300 mb-2" />
                                            <p className="text-sm font-medium">Belum ada data prestasi yang ditemukan.</p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {achievements.links && (
                        <div className="px-6 py-4 border-t border-slate-100 flex justify-end">
                            <Pagination links={achievements.links} />
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
