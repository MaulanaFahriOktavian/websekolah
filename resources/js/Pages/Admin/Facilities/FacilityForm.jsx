import React, { useState } from 'react';
import { useForm, Link } from '@inertiajs/react';
import FormSection from '../../../Components/Admin/FormSection';
import InputField from '../../../Components/Admin/InputField';
import { Save, ArrowLeft, X, Building2 } from 'lucide-react';

export default function FacilityForm({ facility = null, isEdit = false }) {
    const [photoPreview, setPhotoPreview] = useState(
        facility?.photo ? `/storage/${facility.photo}` : null
    );

    const { data, setData, post, processing, errors } = useForm({
        _method: isEdit ? 'PUT' : 'POST',
        name: facility?.name ?? '',
        description: facility?.description ?? '',
        capacity: facility?.capacity ?? '',
        photo: null,
        sort_order: facility?.sort_order ?? 0,
        is_active: facility?.is_active ?? true,
    });

    function handlePhotoChange(e) {
        const file = e.target.files[0];
        if (file) {
            setData('photo', file);
            setPhotoPreview(URL.createObjectURL(file));
        }
    }

    function removeSelectedPhoto() {
        setData('photo', null);
        setPhotoPreview(facility?.photo ? `/storage/${facility.photo}` : null);
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (isEdit) {
            post(`/admin/facilities/${facility.id}`, {
                forceFormData: true,
            });
        } else {
            post('/admin/facilities', {
                forceFormData: true,
            });
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
            {/* 1. Main Info */}
            <FormSection
                title="Informasi Fasilitas"
                description="Nama fasilitas atau sarana prasarana penunjang kegiatan belajar mengajar."
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="md:col-span-2">
                        <InputField
                            id="name"
                            label="Nama Fasilitas"
                            required
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            error={errors.name}
                            placeholder="contoh: Laboratorium Komputer & Multimedia"
                        />
                    </div>

                    <InputField
                        id="capacity"
                        type="number"
                        min="0"
                        label="Kapasitas (Orang / Siswa)"
                        value={data.capacity}
                        onChange={(e) => setData('capacity', e.target.value)}
                        error={errors.capacity}
                        placeholder="contoh: 40"
                        hint="Opsional. Kosongkan jika fasilitas tidak memiliki kapasitas tertentu."
                    />

                    <InputField
                        id="sort_order"
                        type="number"
                        min="0"
                        label="Urutan Tampil"
                        value={data.sort_order}
                        onChange={(e) => setData('sort_order', parseInt(e.target.value) || 0)}
                        error={errors.sort_order}
                        hint="Angka lebih kecil akan tampil lebih awal di halaman website"
                    />
                </div>

                <InputField
                    id="description"
                    as="textarea"
                    label="Deskripsi Fasilitas"
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                    error={errors.description}
                    placeholder="Uraikan kelengkapan peralatan, fungsi, atau kenyamanan fasilitas..."
                    rows={4}
                />
            </FormSection>

            {/* 2. Photo */}
            <FormSection
                title="Foto Fasilitas"
                description="Format foto rasio 16:9 atau 4:3. Format: JPG, PNG, WEBP (maks. 2MB)."
            >
                <div className="space-y-4">
                    {photoPreview && (
                        <div className="relative inline-block border border-slate-200 rounded-xl overflow-hidden shadow-xs bg-slate-50">
                            <img
                                src={photoPreview}
                                alt="Pratinjau Foto Fasilitas"
                                className="max-h-56 w-auto object-cover"
                            />
                            {data.photo && (
                                <button
                                    type="button"
                                    onClick={removeSelectedPhoto}
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
                            id="photo"
                            type="file"
                            accept="image/jpeg,image/png,image/jpg,image/webp"
                            onChange={handlePhotoChange}
                            className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer"
                        />
                        {errors.photo && (
                            <p className="mt-1 text-xs text-red-500">{errors.photo}</p>
                        )}
                    </div>
                </div>
            </FormSection>

            {/* 3. Status */}
            <FormSection
                title="Status Publikasi"
                description="Fasilitas nonaktif tidak akan ditampilkan pada direktori website publik."
            >
                <label className="inline-flex items-center gap-2.5 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={data.is_active}
                        onChange={(e) => setData('is_active', e.target.checked)}
                        className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-sm text-slate-700 font-medium">
                        Status Fasilitas Aktif (Ditampilkan di Website)
                    </span>
                </label>
            </FormSection>

            {/* Actions */}
            <div className="flex items-center justify-between pt-2">
                <Link
                    href="/admin/facilities"
                    className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Kembali ke Daftar Fasilitas</span>
                </Link>

                <button
                    type="submit"
                    disabled={processing}
                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-sm font-semibold rounded-lg shadow-sm transition-colors"
                >
                    <Save className="w-4 h-4" />
                    <span>{processing ? 'Menyimpan...' : isEdit ? 'Perbarui Fasilitas' : 'Simpan Fasilitas'}</span>
                </button>
            </div>
        </form>
    );
}
