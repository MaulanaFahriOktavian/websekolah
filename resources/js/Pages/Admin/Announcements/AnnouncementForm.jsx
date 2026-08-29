import React from 'react';
import { useForm, Link } from '@inertiajs/react';
import FormSection from '../../../Components/Admin/FormSection';
import InputField from '../../../Components/Admin/InputField';
import { Save, ArrowLeft } from 'lucide-react';

export default function AnnouncementForm({ announcement = null, isEdit = false }) {
    const { data, setData, post, put, processing, errors } = useForm({
        title: announcement?.title ?? '',
        content: announcement?.content ?? '',
        status: announcement?.status ?? 'draft',
        published_at: announcement?.published_at ? announcement.published_at.substring(0, 16) : '',
        expires_at: announcement?.expires_at ? announcement.expires_at.substring(0, 16) : '',
    });

    function handleSubmit(e) {
        e.preventDefault();
        if (isEdit) {
            put(`/admin/announcements/${announcement.id}`);
        } else {
            post('/admin/announcements');
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
            {/* 1. Main Info */}
            <FormSection
                title="Informasi Pengumuman"
                description="Judul dan isi pemberitahuan resmi untuk siswa, guru, atau orang tua."
            >
                <InputField
                    id="title"
                    label="Judul Pengumuman"
                    required
                    value={data.title}
                    onChange={(e) => setData('title', e.target.value)}
                    error={errors.title}
                    placeholder="contoh: Jadwal Ujian Akhir Semester Ganjil 2026"
                />

                <InputField
                    id="content"
                    as="textarea"
                    label="Isi Pengumuman"
                    required
                    value={data.content}
                    onChange={(e) => setData('content', e.target.value)}
                    error={errors.content}
                    placeholder="Tulis detail pengumuman secara lengkap di sini. Gunakan baris baru untuk memisahkan paragraf..."
                    rows={10}
                />
            </FormSection>

            {/* 2. Publication & Expiry */}
            <FormSection
                title="Status & Masa Berlaku"
                description="Tentukan waktu tayang dan batas kedaluwarsa pengumuman."
            >
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <InputField
                        id="status"
                        as="select"
                        label="Status"
                        required
                        value={data.status}
                        onChange={(e) => setData('status', e.target.value)}
                        error={errors.status}
                    >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                        <option value="archived">Archived</option>
                    </InputField>

                    <InputField
                        id="published_at"
                        type="datetime-local"
                        label="Waktu Terbit"
                        value={data.published_at}
                        onChange={(e) => setData('published_at', e.target.value)}
                        error={errors.published_at}
                        hint="Kosongkan untuk otomatis menggunakan waktu sekarang"
                    />

                    <InputField
                        id="expires_at"
                        type="datetime-local"
                        label="Waktu Berakhir (Opsional)"
                        value={data.expires_at}
                        onChange={(e) => setData('expires_at', e.target.value)}
                        error={errors.expires_at}
                        hint="Setelah waktu ini, pengumuman tidak tampil di website publik"
                    />
                </div>
            </FormSection>

            {/* Action Bar */}
            <div className="flex items-center justify-between pt-2">
                <Link
                    href="/admin/announcements"
                    className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Kembali ke Daftar</span>
                </Link>

                <button
                    type="submit"
                    disabled={processing}
                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-sm font-semibold rounded-lg shadow-sm transition-colors"
                >
                    <Save className="w-4 h-4" />
                    <span>{processing ? 'Menyimpan...' : isEdit ? 'Perbarui Pengumuman' : 'Simpan Pengumuman'}</span>
                </button>
            </div>
        </form>
    );
}
