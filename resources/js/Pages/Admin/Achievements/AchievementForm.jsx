import React, { useState } from 'react';
import { useForm, Link } from '@inertiajs/react';
import FormSection from '../../../Components/Admin/FormSection';
import InputField from '../../../Components/Admin/InputField';
import { Save, ArrowLeft, X, Trophy } from 'lucide-react';

export default function AchievementForm({ achievement = null, isEdit = false }) {
    const [photoPreview, setPhotoPreview] = useState(
        achievement?.photo ? `/storage/${achievement.photo}` : null
    );

    const { data, setData, post, processing, errors } = useForm({
        _method: isEdit ? 'PUT' : 'POST',
        title: achievement?.title ?? '',
        category: achievement?.category ?? '',
        level: achievement?.level ?? '',
        year: achievement?.year ?? new Date().getFullYear(),
        achievement_date: achievement?.achievement_date
            ? achievement.achievement_date.substring(0, 10)
            : '',
        recipient: achievement?.recipient ?? '',
        description: achievement?.description ?? '',
        photo: null,
        sort_order: achievement?.sort_order ?? 0,
        is_active: achievement?.is_active ?? true,
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
        setPhotoPreview(achievement?.photo ? `/storage/${achievement.photo}` : null);
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (isEdit) {
            post(`/admin/achievements/${achievement.id}`, {
                forceFormData: true,
            });
        } else {
            post('/admin/achievements', {
                forceFormData: true,
            });
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
            {/* 1. Main Info */}
            <FormSection
                title="Informasi Prestasi & Kejuaraan"
                description="Judul penghargaan, bidang perlombaan, dan tingkat kejuaraan."
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="md:col-span-2">
                        <InputField
                            id="title"
                            label="Nama Prestasi / Kejuaraan"
                            required
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            error={errors.title}
                            placeholder="contoh: Juara 1 Olimpiade Sains Pelajar Bidang Matematika"
                        />
                    </div>

                    <InputField
                        id="category"
                        label="Kategori / Bidang"
                        value={data.category}
                        onChange={(e) => setData('category', e.target.value)}
                        error={errors.category}
                        placeholder="contoh: Akademik / Olahraga / Seni & Budaya / Sains & Riset"
                        hint="Opsional"
                    />

                    <InputField
                        id="level"
                        label="Tingkat Kejuaraan"
                        value={data.level}
                        onChange={(e) => setData('level', e.target.value)}
                        error={errors.level}
                        placeholder="contoh: Tingkat Kabupaten / Provinsi / Nasional / Internasional"
                        hint="Opsional"
                    />

                    <InputField
                        id="year"
                        type="number"
                        min="1900"
                        max={new Date().getFullYear() + 1}
                        label="Tahun Prestasi"
                        value={data.year}
                        onChange={(e) => setData('year', e.target.value)}
                        error={errors.year}
                        placeholder="contoh: 2025"
                        hint="Tahun perolehan prestasi"
                    />

                    <InputField
                        id="achievement_date"
                        type="date"
                        label="Tanggal Perolehan (Opsional)"
                        value={data.achievement_date}
                        onChange={(e) => setData('achievement_date', e.target.value)}
                        error={errors.achievement_date}
                        hint="Tanggal penyerahan medali/sertifikat"
                    />

                    <div className="md:col-span-2">
                        <InputField
                            id="recipient"
                            label="Peraih Prestasi / Nama Siswa / Tim"
                            value={data.recipient}
                            onChange={(e) => setData('recipient', e.target.value)}
                            error={errors.recipient}
                            placeholder="contoh: Aditya Pratama (Kelas IX-A) atau Tim Basket Putra"
                            hint="Nama individu peraih penghargaan atau nama delegasi tim"
                        />
                    </div>

                    <InputField
                        id="sort_order"
                        type="number"
                        min="0"
                        label="Urutan Tampil"
                        value={data.sort_order}
                        onChange={(e) => setData('sort_order', parseInt(e.target.value) || 0)}
                        error={errors.sort_order}
                        hint="Angka lebih kecil tampil lebih awal (prioritas unggulan)"
                    />
                </div>

                <InputField
                    id="description"
                    as="textarea"
                    label="Uraian & Catatan Prestasi"
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                    error={errors.description}
                    placeholder="Uraikan rincian penyelenggara lomba, babak final, atau pencapaian perolehan medali..."
                    rows={4}
                />
            </FormSection>

            {/* 2. Photo */}
            <FormSection
                title="Foto Dokumentasi / Piagam"
                description="Format foto penyerahan piala, medali, atau piagam penghargaan (JPG, PNG, WEBP maks 2MB)."
            >
                <div className="space-y-4">
                    {photoPreview && (
                        <div className="relative inline-block border border-slate-200 rounded-xl overflow-hidden shadow-xs bg-slate-50">
                            <img
                                src={photoPreview}
                                alt="Pratinjau Foto Prestasi"
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
                description="Prestasi nonaktif tidak akan ditampilkan pada direktori website publik."
            >
                <label className="inline-flex items-center gap-2.5 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={data.is_active}
                        onChange={(e) => setData('is_active', e.target.checked)}
                        className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-sm text-slate-700 font-medium">
                        Status Prestasi Aktif (Ditampilkan di Website)
                    </span>
                </label>
            </FormSection>

            {/* Actions */}
            <div className="flex items-center justify-between pt-2">
                <Link
                    href="/admin/achievements"
                    className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Kembali ke Daftar Prestasi</span>
                </Link>

                <button
                    type="submit"
                    disabled={processing}
                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-sm font-semibold rounded-lg shadow-sm transition-colors"
                >
                    <Save className="w-4 h-4" />
                    <span>{processing ? 'Menyimpan...' : isEdit ? 'Perbarui Prestasi' : 'Simpan Prestasi'}</span>
                </button>
            </div>
        </form>
    );
}
