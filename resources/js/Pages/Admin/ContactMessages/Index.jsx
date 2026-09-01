import React, { useState } from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';
import Card from '../../../Components/Common/Card';
import Badge from '../../../Components/Common/Badge';
import { Mail, Eye, Trash2, Search, AlertCircle, MessageSquare } from 'lucide-react';

export default function Index({ messages, stats, filters }) {
    const { flash } = usePage().props;
    const [deleteId, setDeleteId] = useState(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    function handleSearch(e) {
        e.preventDefault();
        const search = e.target.cari.value;
        router.get('/admin/contact-messages', {
            status: filters.status || 'all',
            cari: search || undefined,
        }, { preserveState: true });
    }

    function handleStatusFilter(newStatus) {
        router.get('/admin/contact-messages', {
            status: newStatus || 'all',
            cari: filters.cari || undefined,
        }, { preserveState: true });
    }

    function handleDelete(id) {
        router.delete(`/admin/contact-messages/${id}`, {
            onSuccess: () => {
                setShowDeleteConfirm(false);
                setDeleteId(null);
            },
        });
    }

    const statusLabels = {
        unread: { label: 'Belum Dibaca', variant: 'primary' },
        read: { label: 'Sudah Dibaca', variant: 'secondary' },
        replied: { label: 'Dibalas', variant: 'success' },
    };

    return (
        <AdminLayout title="Pesan Kontak">
            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Pesan Kontak Pengunjung</h1>
                    <p className="text-sm text-slate-600 mt-1">Kelola pesan yang dikirim melalui formulir kontak website</p>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center">
                                <MessageSquare className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-blue-700 uppercase tracking-wider">Total Pesan</p>
                                <p className="text-2xl font-bold text-blue-900">{stats.total}</p>
                            </div>
                        </div>
                    </Card>

                    <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-orange-600 text-white flex items-center justify-center">
                                <Mail className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-orange-700 uppercase tracking-wider">Belum Dibaca</p>
                                <p className="text-2xl font-bold text-orange-900">{stats.unread}</p>
                            </div>
                        </div>
                    </Card>

                    <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
                                <Eye className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">Sudah Dibaca</p>
                                <p className="text-2xl font-bold text-emerald-900">{stats.read}</p>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Filters and Search */}
                <div className="space-y-4">
                    {/* Status Filter */}
                    <div className="flex gap-2 flex-wrap">
                        <button
                            onClick={() => handleStatusFilter('all')}
                            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                                filters.status === 'all'
                                    ? 'bg-slate-900 text-white'
                                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                            }`}
                        >
                            Semua
                        </button>
                        <button
                            onClick={() => handleStatusFilter('unread')}
                            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                                filters.status === 'unread'
                                    ? 'bg-orange-600 text-white'
                                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                            }`}
                        >
                            Belum Dibaca
                        </button>
                        <button
                            onClick={() => handleStatusFilter('read')}
                            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                                filters.status === 'read'
                                    ? 'bg-emerald-600 text-white'
                                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                            }`}
                        >
                            Sudah Dibaca
                        </button>
                    </div>

                    {/* Search */}
                    <form onSubmit={handleSearch} className="flex gap-2">
                        <div className="flex-1 relative">
                            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                name="cari"
                                defaultValue={filters.cari || ''}
                                placeholder="Cari nama, email, atau subjek..."
                                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 text-sm"
                            />
                        </div>
                        <button
                            type="submit"
                            className="px-6 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 font-semibold text-sm transition-colors"
                        >
                            Cari
                        </button>
                    </form>
                </div>

                {/* Messages List */}
                {messages.data.length > 0 ? (
                    <div className="space-y-3">
                        {messages.data.map((msg) => (
                            <Card key={msg.id} className="hover:shadow-md transition-shadow">
                                <div className="flex items-start gap-4">
                                    {/* Status Indicator */}
                                    <div className="flex-shrink-0">
                                        {msg.status === 'unread' && (
                                            <div className="w-3 h-3 rounded-full bg-orange-500 mt-2"></div>
                                        )}
                                    </div>

                                    {/* Message Info */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="font-semibold text-slate-900 truncate">{msg.name}</h3>
                                            <Badge variant={statusLabels[msg.status].variant} size="sm">
                                                {statusLabels[msg.status].label}
                                            </Badge>
                                        </div>

                                        <div className="text-sm text-slate-600 space-y-1">
                                            <p className="truncate">
                                                <span className="font-medium">Email:</span> {msg.email}
                                            </p>
                                            {msg.phone && (
                                                <p className="truncate">
                                                    <span className="font-medium">Telepon:</span> {msg.phone}
                                                </p>
                                            )}
                                            <p className="truncate">
                                                <span className="font-medium">Subjek:</span> {msg.subject}
                                            </p>
                                            <p className="text-slate-500 text-xs">
                                                {new Date(msg.created_at).toLocaleString('id-ID', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                })}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex gap-2 flex-shrink-0">
                                        <Link
                                            href={`/admin/contact-messages/${msg.id}`}
                                            className="inline-flex items-center gap-2 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 font-semibold text-sm transition-colors"
                                        >
                                            <Eye className="w-4 h-4" />
                                            Lihat
                                        </Link>
                                        <button
                                            onClick={() => {
                                                setDeleteId(msg.id);
                                                setShowDeleteConfirm(true);
                                            }}
                                            className="inline-flex items-center gap-2 px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 font-semibold text-sm transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                            Hapus
                                        </button>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <Card className="text-center py-12 bg-slate-50">
                        <AlertCircle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                        <p className="text-slate-500 font-medium">Tidak ada pesan ditemukan</p>
                        <p className="text-slate-400 text-sm mt-1">Pesan kontak dari pengunjung akan muncul di sini</p>
                    </Card>
                )}

                {/* Pagination */}
                {messages.last_page > 1 && (
                    <div className="flex items-center justify-center gap-2 mt-6">
                        {messages.current_page > 1 && (
                            <Link
                                href={messages.prev_page_url}
                                className="px-3 py-2 border border-slate-300 rounded-lg hover:bg-slate-100 font-semibold text-sm"
                            >
                                ← Sebelumnya
                            </Link>
                        )}
                        <span className="text-sm text-slate-600">
                            Halaman {messages.current_page} dari {messages.last_page}
                        </span>
                        {messages.current_page < messages.last_page && (
                            <Link
                                href={messages.next_page_url}
                                className="px-3 py-2 border border-slate-300 rounded-lg hover:bg-slate-100 font-semibold text-sm"
                            >
                                Berikutnya →
                            </Link>
                        )}
                    </div>
                )}

                {/* Delete Confirmation Modal */}
                {showDeleteConfirm && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                        <Card className="max-w-sm w-full">
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
                                        <AlertCircle className="w-5 h-5" />
                                    </div>
                                    <h3 className="font-bold text-slate-900">Hapus Pesan</h3>
                                </div>
                                <p className="text-slate-600">
                                    Apakah Anda yakin ingin menghapus pesan ini? Tindakan ini tidak dapat dibatalkan.
                                </p>
                                <div className="flex gap-3 justify-end">
                                    <button
                                        onClick={() => {
                                            setShowDeleteConfirm(false);
                                            setDeleteId(null);
                                        }}
                                        className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-100 font-semibold text-sm transition-colors"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        onClick={() => handleDelete(deleteId)}
                                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold text-sm transition-colors"
                                    >
                                        Hapus Sekarang
                                    </button>
                                </div>
                            </div>
                        </Card>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
