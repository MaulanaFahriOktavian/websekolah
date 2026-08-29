import React, { useState } from 'react';
import { useForm, Link } from '@inertiajs/react';
import FormSection from '../../../Components/Admin/FormSection';
import InputField from '../../../Components/Admin/InputField';
import { Save, ArrowLeft, Image as ImageIcon, X } from 'lucide-react';

export default function NewsForm({ news = null, categories = [], isEdit = false }) {
    const [imagePreview, setImagePreview] = useState(
        news?.featured_image ? `/storage/${news.featured_image}` : null
    );

    const { data, setData, post, put, processing, errors } = useForm({
        _method: isEdit ? 'PUT' : 'POST',
        category_id: news?.category_id ?? (categories[0]?.id ?? ''),
        title: news?.title ?? '',
        excerpt: news?.excerpt ?? '',
        content: news?.content ?? '',
        featured_image: null,
        status: news?.status ?? 'draft',
        published_at: news?.published_at ? news.published_at.substring(0, 16) : '',
        meta_title: news?.meta_title ?? '',
        meta_description: news?.meta_description ?? '',
    });

    function handleImageChange(e) {
        const file = e.target.files[0];
        if (file) {
            setData('featured_image', file);
            setImagePreview(URL.createObjectURL(file));
        }
    }

    function removeSelectedImage() {
        setData('featured_image', null);
        setImagePreview(news?.featured_image ? `/storage/${news.featured_image}` : null);
    }

    function handleSubmit(e) {
        e.preventDefault();

        // Inertia multipart PUT must be submitted as POST with _method = 'PUT'
        if (isEdit) {
            post(`/admin/news/${news.id}`, {
                forceFormData: true,
            });
        } else {
            post('/admin/news', {
                forceFormData: true,
            });
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
            {/* 1. Main Content */}
            <FormSection
                title="Konten Berita"
                description="Judul, kategori, dan isi artikel berita."
            >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div className="md:col-span-2">
                        <InputField
                            id="title"
                            label="Judul Berita"
                            required
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            error={errors.title}
                            placeholder="contoh: Pembukaan Tahun Ajaran Baru 2026/2027"
                        />
                    </div>

                    <InputField
                        id="category_id"
                        as="select"
                        label="Kategori"
                        required
                        value={data.category_id}
                        onChange={(e) => setData('category_id', e.target.value)}
                        error={errors.category_id}
                    >
                        <option value="" disabled>Pilih Kategori</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name}
                            </option>
                        ))}
                    </InputField>
                </div>

                <InputField
                    id="excerpt"
                    as="textarea"
                    label="Ringkasan Singkat (Excerpt)"
                    value={data.excerpt}
                    onChange={(e) => setData('excerpt', e.target.value)}
                    error={errors.excerpt}
                    placeholder="Ringkasan 1-2 kalimat untuk pratinjau kartu berita..."
                    rows={2}
                    hint="Maks. 500 karakter. Ditampilkan pada daftar berita publik."
                />

                <InputField
                    id="content"
                    as="textarea"
                    label="Isi Berita Lengkap"
                    required
                    value={data.content}
                    onChange={(e) => setData('content', e.target.value)}
                    error={errors.content}
                    placeholder="Tulis artikel berita di sini. Gunakan baris baru (Enter) untuk memisahkan paragraf..."
                    rows={12}
                />
            </FormSection>

            {/* 2. Media & Gambar Utama */}
            <FormSection
                title="Gambar Unggulan (Featured Image)"
                description="Unggah gambar utama untuk berita ini. Format: JPG, PNG, WEBP (maks. 2MB)."
            >
                <div className="space-y-4">
                    {imagePreview && (
                        <div className="relative inline-block border border-slate-200 rounded-xl overflow-hidden shadow-xs bg-slate-50">
                            <img
                                src={imagePreview}
                                alt="Pratinjau Gambar"
                                className="max-h-56 w-auto object-cover"
                            />
                            {data.featured_image && (
                                <button
                                    type="button"
                                    onClick={removeSelectedImage}
                                    className="absolute top-2 right-2 p-1.5 bg-slate-900/70 hover:bg-slate-900 text-white rounded-full transition-colors"
                                    title="Batalkan Pilihan"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                    )}

                    <div>
                        <input
                            id="featured_image"
                            type="file"
                            accept="image/jpeg,image/png,image/jpg,image/webp"
                            onChange={handleImageChange}
                            className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer"
                        />
                        {errors.featured_image && (
                            <p className="mt-1 text-xs text-red-500">{errors.featured_image}</p>
                        )}
                    </div>
                </div>
            </FormSection>

            {/* 3. Publikasi & Status */}
            <FormSection
                title="Status Publikasi"
                description="Atur status dan jadwal terbit berita."
            >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <InputField
                        id="status"
                        as="select"
                        label="Status Berita"
                        required
                        value={data.status}
                        onChange={(e) => setData('status', e.target.value)}
                        error={errors.status}
                    >
                        <option value="draft">Draft (Belum Terbit)</option>
                        <option value="published">Published (Terbit)</option>
                        <option value="archived">Archived (Diarsipkan)</option>
                    </InputField>

                    <InputField
                        id="published_at"
                        type="datetime-local"
                        label="Tanggal & Waktu Terbit"
                        value={data.published_at}
                        onChange={(e) => setData('published_at', e.target.value)}
                        error={errors.published_at}
                        hint="Kosongkan untuk otomatis menggunakan waktu saat ini ketika diterbitkan."
                    />
                </div>
            </FormSection>

            {/* 4. Optimasi SEO (Opsional) */}
            <FormSection
                title="Metadata SEO (Opsional)"
                description="Pengaturan judul dan deskripsi khusus untuk mesin pencari."
            >
                <InputField
                    id="meta_title"
                    label="Meta Title"
                    value={data.meta_title}
                    onChange={(e) => setData('meta_title', e.target.value)}
                    error={errors.meta_title}
                    placeholder="Kosongkan untuk menggunakan judul berita"
                />

                <InputField
                    id="meta_description"
                    as="textarea"
                    label="Meta Description"
                    value={data.meta_description}
                    onChange={(e) => setData('meta_description', e.target.value)}
                    error={errors.meta_description}
                    placeholder="Deskripsi singkat artikel untuk mesin pencari Google..."
                    rows={2}
                />
            </FormSection>

            {/* Action Bar */}
            <div className="flex items-center justify-between pt-2">
                <Link
                    href="/admin/news"
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
                    <span>{processing ? 'Menyimpan...' : isEdit ? 'Perbarui Berita' : 'Simpan Berita'}</span>
                </button>
            </div>
        </form>
    );
}
