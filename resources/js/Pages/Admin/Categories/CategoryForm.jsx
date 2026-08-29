import React from 'react';
import { useForm, Link } from '@inertiajs/react';
import FormSection from '../../../Components/Admin/FormSection';
import InputField from '../../../Components/Admin/InputField';
import { Save, ArrowLeft } from 'lucide-react';

export default function CategoryForm({ category = null, isEdit = false }) {
    const { data, setData, post, put, processing, errors } = useForm({
        name: category?.name ?? '',
        description: category?.description ?? '',
        sort_order: category?.sort_order ?? 0,
        is_active: category?.is_active ?? true,
    });

    function handleSubmit(e) {
        e.preventDefault();
        if (isEdit) {
            put(`/admin/categories/${category.id}`);
        } else {
            post('/admin/categories');
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
            <FormSection
                title="Informasi Kategori"
                description="Kategori digunakan untuk mengelompokkan berita dan artikel sekolah."
            >
                <InputField
                    id="name"
                    label="Nama Kategori"
                    required
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    error={errors.name}
                    placeholder="contoh: Prestasi Siswa"
                />

                <InputField
                    id="description"
                    as="textarea"
                    label="Deskripsi (Opsional)"
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                    error={errors.description}
                    placeholder="Penjelasan singkat mengenai kategori ini..."
                    rows={3}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InputField
                        id="sort_order"
                        type="number"
                        min="0"
                        label="Urutan Tampil"
                        value={data.sort_order}
                        onChange={(e) => setData('sort_order', parseInt(e.target.value) || 0)}
                        error={errors.sort_order}
                        hint="Angka lebih kecil tampil lebih awal"
                    />

                    <div className="flex flex-col justify-center pt-2">
                        <label className="text-sm font-medium text-slate-700 mb-2">
                            Status Kategori
                        </label>
                        <label className="inline-flex items-center gap-2.5 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={data.is_active}
                                onChange={(e) => setData('is_active', e.target.checked)}
                                className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <span className="text-sm text-slate-700 font-medium">
                                Kategori Aktif
                            </span>
                        </label>
                    </div>
                </div>
            </FormSection>

            <div className="flex items-center justify-between pt-2">
                <Link
                    href="/admin/categories"
                    className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Kembali ke Daftar</span>
                </Link>

                <button
                    type="submit"
                    disabled={processing}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-sm font-semibold rounded-lg shadow-sm transition-colors"
                >
                    <Save className="w-4 h-4" />
                    <span>{processing ? 'Menyimpan...' : isEdit ? 'Perbarui Kategori' : 'Simpan Kategori'}</span>
                </button>
            </div>
        </form>
    );
}
