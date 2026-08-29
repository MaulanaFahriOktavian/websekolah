import React, { useState } from 'react';
import { useForm, Link } from '@inertiajs/react';
import FormSection from '../../../Components/Admin/FormSection';
import InputField from '../../../Components/Admin/InputField';
import { Save, ArrowLeft, X, GraduationCap } from 'lucide-react';

export default function TeacherForm({ teacher = null, isEdit = false }) {
    const [photoPreview, setPhotoPreview] = useState(
        teacher?.photo ? `/storage/${teacher.photo}` : null
    );

    const { data, setData, post, processing, errors } = useForm({
        _method: isEdit ? 'PUT' : 'POST',
        name: teacher?.name ?? '',
        nip: teacher?.nip ?? '',
        position: teacher?.position ?? '',
        subject: teacher?.subject ?? '',
        education: teacher?.education ?? '',
        photo: null,
        bio: teacher?.bio ?? '',
        sort_order: teacher?.sort_order ?? 0,
        is_active: teacher?.is_active ?? true,
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
        setPhotoPreview(teacher?.photo ? `/storage/${teacher.photo}` : null);
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (isEdit) {
            post(`/admin/teachers/${teacher.id}`, {
                forceFormData: true,
            });
        } else {
            post('/admin/teachers', {
                forceFormData: true,
            });
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
            {/* 1. Identity & Position */}
            <FormSection
                title="Identitas & Jabatan Guru"
                description="Informasi nama lengkap beserta gelar, NIP, serta tugas mengajar."
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <InputField
                        id="name"
                        label="Nama Lengkap & Gelar"
                        required
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        error={errors.name}
                        placeholder="contoh: Drs. Budi Santoso, M.Pd."
                    />

                    <InputField
                        id="nip"
                        label="NIP (Nomor Induk Pegawai)"
                        value={data.nip}
                        onChange={(e) => setData('nip', e.target.value)}
                        error={errors.nip}
                        placeholder="18 digit NIP (kosongkan jika belum memiliki)"
                        hint="Opsional"
                    />

                    <InputField
                        id="position"
                        label="Jabatan / Tugas Tambahan"
                        value={data.position}
                        onChange={(e) => setData('position', e.target.value)}
                        error={errors.position}
                        placeholder="contoh: Kepala Sekolah / Guru Madya / Wali Kelas"
                    />

                    <InputField
                        id="subject"
                        label="Mata Pelajaran yang Diampu"
                        value={data.subject}
                        onChange={(e) => setData('subject', e.target.value)}
                        error={errors.subject}
                        placeholder="contoh: Matematika Peminatan"
                    />

                    <InputField
                        id="education"
                        label="Pendidikan Terakhir"
                        value={data.education}
                        onChange={(e) => setData('education', e.target.value)}
                        error={errors.education}
                        placeholder="contoh: S2 Pendidikan Matematika - UNY"
                    />

                    <InputField
                        id="sort_order"
                        type="number"
                        min="0"
                        label="Urutan Tampil"
                        value={data.sort_order}
                        onChange={(e) => setData('sort_order', parseInt(e.target.value) || 0)}
                        error={errors.sort_order}
                        hint="Angka lebih kecil akan tampil lebih awal (contoh: 1 untuk Kepala Sekolah)"
                    />
                </div>

                <InputField
                    id="bio"
                    as="textarea"
                    label="Profil Singkat / Pengalaman (Opsional)"
                    value={data.bio}
                    onChange={(e) => setData('bio', e.target.value)}
                    error={errors.bio}
                    placeholder="Catatan keahlian, riwayat singkat, atau pesan pengajaran..."
                    rows={3}
                />
            </FormSection>

            {/* 2. Photo Upload */}
            <FormSection
                title="Foto Profil Guru"
                description="Format foto formal rasio 3:4 atau 1:1. Format: JPG, PNG, WEBP (maks. 2MB)."
            >
                <div className="space-y-4">
                    {photoPreview && (
                        <div className="relative inline-block border border-slate-200 rounded-xl overflow-hidden shadow-xs bg-slate-50">
                            <img
                                src={photoPreview}
                                alt="Pratinjau Foto"
                                className="w-36 h-48 object-cover"
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

            {/* 3. Status Keaktifan */}
            <FormSection
                title="Status Kepegawaian"
                description="Guru nonaktif tidak akan ditampilkan pada website publik."
            >
                <label className="inline-flex items-center gap-2.5 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={data.is_active}
                        onChange={(e) => setData('is_active', e.target.checked)}
                        className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-sm text-slate-700 font-medium">
                        Status Guru Aktif (Ditampilkan di Website)
                    </span>
                </label>
            </FormSection>

            {/* Actions */}
            <div className="flex items-center justify-between pt-2">
                <Link
                    href="/admin/teachers"
                    className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Kembali ke Daftar Guru</span>
                </Link>

                <button
                    type="submit"
                    disabled={processing}
                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-sm font-semibold rounded-lg shadow-sm transition-colors"
                >
                    <Save className="w-4 h-4" />
                    <span>{processing ? 'Menyimpan...' : isEdit ? 'Perbarui Data Guru' : 'Simpan Data Guru'}</span>
                </button>
            </div>
        </form>
    );
}
