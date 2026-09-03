import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';
import Card from '../../../Components/Common/Card';
import Badge from '../../../Components/Common/Badge';
import {
    ArrowLeft,
    Mail,
    Phone,
    User,
    Calendar,
    Trash2,
    Send,
    AlertCircle,
} from 'lucide-react';

export default function Show({ message }) {
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    function handleDelete() {
        router.delete(`/admin/contact-messages/${message.id}`);
    }

    const formattedDate = new Date(message.created_at).toLocaleDateString('id-ID', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });

    return (
        <AdminLayout title={`Pesan dari ${message.name}`}>
            <div className="space-y-6 max-w-4xl">
                {/* Back Button & Actions */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <Link
                        href="/admin/contact-messages"
                        className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Kembali ke Daftar Pesan</span>
                    </Link>

                    <button
                        type="button"
                        onClick={() => setShowDeleteConfirm(true)}
                        className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg transition-colors self-start sm:self-auto"
                    >
                        <Trash2 className="w-4 h-4" />
                        <span>Hapus Pesan</span>
                    </button>
                </div>

                {/* Main Message Card */}
                <Card className="border-slate-200 bg-white divide-y divide-slate-100">
                    {/* Header: Subject, Status, Date */}
                    <div className="pb-5 space-y-3">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                                Subjek Pesan
                            </span>
                            <Badge
                                variant={message.status === 'unread' ? 'primary' : 'slate'}
                                size="sm"
                            >
                                {message.status === 'unread' ? 'Belum Dibaca' : 'Sudah Dibaca'}
                            </Badge>
                        </div>
                        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                            {message.subject}
                        </h1>
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                            <Calendar className="w-3.5 h-3.5 text-slate-400" />
                            <span>Diterima pada {formattedDate}</span>
                        </div>
                    </div>

                    {/* Sender Information */}
                    <div className="py-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                        <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 mt-0.5">
                                <User className="w-4 h-4" />
                            </div>
                            <div className="min-w-0">
                                <span className="text-slate-400 block mb-0.5 font-medium">Pengirim</span>
                                <span className="font-semibold text-slate-800 text-sm block truncate">
                                    {message.name}
                                </span>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 mt-0.5">
                                <Mail className="w-4 h-4" />
                            </div>
                            <div className="min-w-0">
                                <span className="text-slate-400 block mb-0.5 font-medium">Alamat Email</span>
                                <a
                                    href={`mailto:${message.email}`}
                                    className="font-semibold text-indigo-600 hover:text-indigo-700 text-sm block truncate"
                                    title="Kirim email balasan"
                                >
                                    {message.email}
                                </a>
                            </div>
                        </div>

                        {message.phone && (
                            <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                                <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 mt-0.5">
                                <Phone className="w-4 h-4" />
                            </div>
                                <div className="min-w-0">
                                    <span className="text-slate-400 block mb-0.5 font-medium">Nomor Telepon / WA</span>
                                    <a
                                        href={`tel:${message.phone}`}
                                        className="font-semibold text-slate-800 hover:text-indigo-600 text-sm block truncate"
                                    >
                                        {message.phone}
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Message Body */}
                    <div className="pt-5 space-y-3">
                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                            Isi Pesan
                        </span>
                        <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/80 text-sm text-slate-800 leading-relaxed whitespace-pre-wrap font-normal">
                            {message.message}
                        </div>
                    </div>

                    {/* Quick Reply Action */}
                    <div className="pt-5 flex items-center justify-between">
                        <p className="text-xs text-slate-500">
                            Balas pesan ini langsung ke alamat email pengirim.
                        </p>
                        <a
                            href={`mailto:${message.email}?subject=Re: ${encodeURIComponent(message.subject)}`}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold text-xs transition-colors shadow-xs"
                        >
                            <Send className="w-3.5 h-3.5" />
                            <span>Balas via Email</span>
                        </a>
                    </div>
                </Card>

                {/* Delete Confirmation Modal */}
                {showDeleteConfirm && (
                    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
                        <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl border border-slate-200">
                            <div className="flex items-center gap-3 text-red-600">
                                <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center shrink-0">
                                    <AlertCircle className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900">Hapus Pesan</h3>
                                    <p className="text-xs text-slate-500">Tindakan ini tidak dapat dibatalkan</p>
                                </div>
                            </div>

                            <p className="text-sm text-slate-600 leading-relaxed">
                                Apakah Anda yakin ingin menghapus pesan dari{' '}
                                <strong className="text-slate-800">{message.name}</strong>?
                            </p>

                            <div className="flex justify-end gap-2.5 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setShowDeleteConfirm(false)}
                                    className="px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                                >
                                    Batal
                                </button>
                                <button
                                    type="button"
                                    onClick={handleDelete}
                                    className="px-4 py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors shadow-xs"
                                >
                                    Ya, Hapus
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
