import React from 'react';
import { Link, router } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';
import Pagination from '../../../Components/Common/Pagination';
import Badge from '../../../Components/Common/Badge';
import { Plus, Search, Edit2, Trash2, Bell, ExternalLink, Calendar, Clock, User } from 'lucide-react';

export default function Index({ announcements, filters }) {
    function handleFilter(e) {
        e.preventDefault();
        const form = e.target;
        router.get(
            '/admin/announcements',
            {
                search: form.search.value,
                status: form.status.value,
            },
            { preserveState: true }
        );
    }

    function handleDelete(item) {
        if (confirm(`Apakah Anda yakin ingin menghapus pengumuman "${item.title}"?`)) {
            router.delete(`/admin/announcements/${item.id}`);
        }
    }

    const statusBadges = {
        published: <Badge variant="success" size="sm">Terbit</Badge>,
        draft: <Badge variant="neutral" size="sm">Draft</Badge>,
        archived: <Badge variant="warning" size="sm">Arsip</Badge>,
    };

    return (
        <AdminLayout title="Kelola Pengumuman">
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-xl font-bold text-slate-900">Pengumuman Sekolah</h1>
                        <p className="text-sm text-slate-500 mt-0.5">
                            Kelola jadwal, informasi penting, dan pemberitahuan resmi civitas sekolah.
                        </p>
                    </div>

                    <Link
                        href="/admin/announcements/create"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-lg shadow-sm transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        <span>Buat Pengumuman</span>
                    </Link>
                </div>

                {/* Filter & Search */}
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                    <form onSubmit={handleFilter} className="flex flex-col sm:flex-row gap-3">
                        <div className="flex-1 relative">
                            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                            <input
                                type="text"
                                name="search"
                                defaultValue={filters?.search || ''}
                                placeholder="Cari judul pengumuman..."
                                className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        <select
                            name="status"
                            defaultValue={filters?.status || ''}
                            className="px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
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
                    </form>
                </div>

                {/* Announcements Table */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-slate-600">
                            <thead className="bg-slate-50/80 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                <tr>
                                    <th className="px-6 py-3.5">Judul</th>
                                    <th className="px-6 py-3.5">Penulis</th>
                                    <th className="px-6 py-3.5">Status</th>
                                    <th className="px-6 py-3.5">Waktu Terbit</th>
                                    <th className="px-6 py-3.5">Berlaku Hingga</th>
                                    <th className="px-6 py-3.5 text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {announcements.data.length > 0 ? (
                                    announcements.data.map((item) => {
                                        const isExpired =
                                            item.expires_at && new Date(item.expires_at) < new Date();

                                        return (
                                            <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                                                <td className="px-6 py-4 max-w-sm">
                                                    <div className="font-semibold text-slate-900 line-clamp-2">
                                                        {item.title}
                                                    </div>
                                                    <div className="font-mono text-[11px] text-slate-400 truncate mt-0.5">
                                                        /{item.slug}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-xs text-slate-600">
                                                    <div className="flex items-center gap-1.5">
                                                        <User className="w-3.5 h-3.5 text-slate-400" />
                                                        <span>{item.author?.name || 'Admin'}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center gap-2">
                                                        {statusBadges[item.status] || item.status}
                                                        {isExpired && (
                                                            <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-red-50 text-red-600 border border-red-200">
                                                                Kedaluwarsa
                                                            </span>
                                                        )}
                                                    </div>
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
                                                <td className="px-6 py-4 whitespace-nowrap text-xs text-slate-500">
                                                    <div className="flex items-center gap-1.5">
                                                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                                                        <span>
                                                            {item.expires_at
                                                                ? new Date(item.expires_at).toLocaleDateString('id-ID', {
                                                                      day: 'numeric',
                                                                      month: 'short',
                                                                      year: 'numeric',
                                                                  })
                                                                : 'Selamanya'}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-right whitespace-nowrap">
                                                    <div className="flex items-center justify-end gap-1.5">
                                                        {item.status === 'published' && !isExpired && (
                                                            <a
                                                                href={`/pengumuman/${item.slug}`}
                                                                target="_blank"
                                                                rel="noreferrer"
                                                                className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors"
                                                                title="Lihat di Website"
                                                            >
                                                                <ExternalLink className="w-4 h-4" />
                                                            </a>
                                                        )}
                                                        <Link
                                                            href={`/admin/announcements/${item.id}/edit`}
                                                            className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors"
                                                            title="Edit Pengumuman"
                                                        >
                                                            <Edit2 className="w-4 h-4" />
                                                        </Link>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleDelete(item)}
                                                            className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                                                            title="Hapus Pengumuman"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-12 text-center text-slate-400">
                                            <Bell className="w-10 h-10 mx-auto text-slate-300 mb-2" />
                                            <p className="text-sm font-medium">Belum ada pengumuman yang ditemukan.</p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {announcements.links && (
                        <div className="px-6 py-4 border-t border-slate-100 flex justify-end">
                            <Pagination links={announcements.links} />
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
