import React from 'react';
import { Link, router } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';
import Pagination from '../../../Components/Common/Pagination';
import Badge from '../../../Components/Common/Badge';
import { Plus, Search, Edit2, Trash2, Image as ImageIcon, ExternalLink, Calendar, Layers } from 'lucide-react';

export default function Index({ galleries, filters }) {
    function handleFilter(e) {
        e.preventDefault();
        const form = e.target;
        router.get(
            '/admin/galleries',
            {
                search: form.search.value,
                status: form.status.value,
            },
            { preserveState: true }
        );
    }

    function handleDelete(item) {
        if (confirm(`Apakah Anda yakin ingin menghapus album galeri "${item.title}" beserta seluruh fotonya?`)) {
            router.delete(`/admin/galleries/${item.id}`);
        }
    }

    return (
        <AdminLayout title="Galeri Dokumentasi">
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-xl font-bold text-slate-900">Galeri Foto & Dokumentasi Kegiatan</h1>
                        <p className="text-sm text-slate-500 mt-0.5">
                            Kelola album foto kegiatan, upacara, pentas seni, lomba, dan dokumentasi sekolah.
                        </p>
                    </div>

                    <Link
                        href="/admin/galleries/create"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-lg shadow-sm transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        <span>Buat Album Baru</span>
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
                                placeholder="Cari judul album atau deskripsi kegiatan..."
                                className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        <select
                            name="status"
                            defaultValue={filters?.status || ''}
                            className="px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                        >
                            <option value="">Semua Status</option>
                            <option value="1">Aktif</option>
                            <option value="0">Nonaktif</option>
                        </select>

                        <button
                            type="submit"
                            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium rounded-lg transition-colors shrink-0"
                        >
                            Filter
                        </button>
                    </form>
                </div>

                {/* Galleries Table */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-slate-600">
                            <thead className="bg-slate-50/80 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                <tr>
                                    <th className="px-6 py-3.5">Urutan</th>
                                    <th className="px-6 py-3.5">Album & Foto</th>
                                    <th className="px-6 py-3.5">Jumlah Foto</th>
                                    <th className="px-6 py-3.5">Tanggal Acara</th>
                                    <th className="px-6 py-3.5">Status</th>
                                    <th className="px-6 py-3.5 text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {galleries.data.length > 0 ? (
                                    galleries.data.map((item) => {
                                        const coverSrc = item.cover_photo
                                            ? `/storage/${item.cover_photo}`
                                            : item.photos?.[0]?.photo_path
                                            ? `/storage/${item.photos[0].photo_path}`
                                            : null;

                                        return (
                                            <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                                                <td className="px-6 py-4 font-mono text-xs text-slate-400">
                                                    {item.sort_order}
                                                </td>
                                                <td className="px-6 py-4 max-w-sm">
                                                    <div className="flex items-center gap-3">
                                                        {coverSrc ? (
                                                            <img
                                                                src={coverSrc}
                                                                alt={item.title}
                                                                className="w-14 h-11 rounded-lg object-cover border border-slate-200 shrink-0"
                                                            />
                                                        ) : (
                                                            <div className="w-14 h-11 rounded-lg bg-indigo-50 text-indigo-400 flex items-center justify-center font-bold text-xs shrink-0 border border-indigo-100">
                                                                <ImageIcon className="w-5 h-5" />
                                                            </div>
                                                        )}
                                                        <div className="min-w-0">
                                                            <p className="font-semibold text-slate-900 text-sm line-clamp-1">
                                                                {item.title}
                                                            </p>
                                                            <p className="font-mono text-xs text-slate-400 truncate">
                                                                /{item.slug}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-100 text-slate-700">
                                                        <Layers className="w-3.5 h-3.5 text-slate-500" />
                                                        <span>{item.photos_count || 0} Foto</span>
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-xs text-slate-600">
                                                    {item.event_date ? (
                                                        <span className="flex items-center gap-1.5">
                                                            <Calendar className="w-3.5 h-3.5 text-slate-400" />
                                                            <span>
                                                                {new Date(item.event_date).toLocaleDateString('id-ID', {
                                                                    day: 'numeric',
                                                                    month: 'short',
                                                                    year: 'numeric',
                                                                })}
                                                            </span>
                                                        </span>
                                                    ) : (
                                                        <span className="text-slate-400">—</span>
                                                    )}
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
                                                                href={`/galeri/${item.slug}`}
                                                                target="_blank"
                                                                rel="noreferrer"
                                                                className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors"
                                                                title="Lihat di Website"
                                                            >
                                                                <ExternalLink className="w-4 h-4" />
                                                            </a>
                                                        )}
                                                        <Link
                                                            href={`/admin/galleries/${item.id}/edit`}
                                                            className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors"
                                                            title="Edit Album"
                                                        >
                                                            <Edit2 className="w-4 h-4" />
                                                        </Link>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleDelete(item)}
                                                            className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                                                            title="Hapus Album"
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
                                            <ImageIcon className="w-10 h-10 mx-auto text-slate-300 mb-2" />
                                            <p className="text-sm font-medium">Belum ada album galeri yang ditemukan.</p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {galleries.links && (
                        <div className="px-6 py-4 border-t border-slate-100 flex justify-end">
                            <Pagination links={galleries.links} />
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
