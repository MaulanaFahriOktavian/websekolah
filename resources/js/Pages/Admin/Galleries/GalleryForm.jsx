import React, { useState } from 'react';
import { useForm, Link, router } from '@inertiajs/react';
import FormSection from '../../../Components/Admin/FormSection';
import InputField from '../../../Components/Admin/InputField';
import { Save, ArrowLeft, X, Image as ImageIcon, Trash2, Plus, Calendar } from 'lucide-react';

export default function GalleryForm({ gallery = null, isEdit = false }) {
    const [coverPreview, setCoverPreview] = useState(
        gallery?.cover_photo ? `/storage/${gallery.cover_photo}` : null
    );
    const [newPhotoFiles, setNewPhotoFiles] = useState([]);
    const [newPhotoPreviews, setNewPhotoPreviews] = useState([]);
    const [newCaptions, setNewCaptions] = useState([]);
    const [existingCaptions, setExistingCaptions] = useState(() => {
        const initial = {};
        if (gallery?.photos) {
            gallery.photos.forEach((p) => {
                initial[p.id] = p.caption || '';
            });
        }
        return initial;
    });

    const { data, setData, post, processing, errors } = useForm({
        _method: isEdit ? 'PUT' : 'POST',
        title: gallery?.title ?? '',
        description: gallery?.description ?? '',
        event_date: gallery?.event_date
            ? gallery.event_date.substring(0, 10)
            : '',
        cover_photo: null,
        sort_order: gallery?.sort_order ?? 0,
        is_active: gallery?.is_active ?? true,
        photos: [],
        photo_captions: [],
        existing_captions: {},
    });

    function handleCoverChange(e) {
        const file = e.target.files[0];
        if (file) {
            setData('cover_photo', file);
            setCoverPreview(URL.createObjectURL(file));
        }
    }

    function removeCover() {
        setData('cover_photo', null);
        setCoverPreview(gallery?.cover_photo ? `/storage/${gallery.cover_photo}` : null);
    }

    function handleMultiPhotoChange(e) {
        const files = Array.from(e.target.files);
        if (files.length > 0) {
            const updatedFiles = [...newPhotoFiles, ...files];
            const updatedPreviews = [
                ...newPhotoPreviews,
                ...files.map((file) => URL.createObjectURL(file)),
            ];
            const updatedCaptions = [
                ...newCaptions,
                ...files.map(() => ''),
            ];

            setNewPhotoFiles(updatedFiles);
            setNewPhotoPreviews(updatedPreviews);
            setNewCaptions(updatedCaptions);

            setData('photos', updatedFiles);
            setData('photo_captions', updatedCaptions);
        }
    }

    function removeNewPhoto(index) {
        const updatedFiles = newPhotoFiles.filter((_, i) => i !== index);
        const updatedPreviews = newPhotoPreviews.filter((_, i) => i !== index);
        const updatedCaptions = newCaptions.filter((_, i) => i !== index);

        setNewPhotoFiles(updatedFiles);
        setNewPhotoPreviews(updatedPreviews);
        setNewCaptions(updatedCaptions);

        setData('photos', updatedFiles);
        setData('photo_captions', updatedCaptions);
    }

    function handleNewCaptionChange(index, value) {
        const updated = [...newCaptions];
        updated[index] = value;
        setNewCaptions(updated);
        setData('photo_captions', updated);
    }

    function handleExistingCaptionChange(photoId, value) {
        const updated = { ...existingCaptions, [photoId]: value };
        setExistingCaptions(updated);
        setData('existing_captions', updated);
    }

    function handleDeleteExistingPhoto(photo) {
        if (confirm('Apakah Anda yakin ingin menghapus foto ini dari album?')) {
            router.delete(`/admin/galleries/photos/${photo.id}`, {
                preserveScroll: true,
            });
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (isEdit) {
            post(`/admin/galleries/${gallery.id}`, {
                forceFormData: true,
            });
        } else {
            post('/admin/galleries', {
                forceFormData: true,
            });
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
            {/* 1. Main Info */}
            <FormSection
                title="Informasi Album Galeri"
                description="Judul album kegiatan, tanggal pelaksanaan, dan deskripsi dokumentasi."
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="md:col-span-2">
                        <InputField
                            id="title"
                            label="Judul Album Kegiatan"
                            required
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            error={errors.title}
                            placeholder="contoh: Dokumentasi Upacara Peringatan Hari Kemerdekaan RI"
                        />
                    </div>

                    <InputField
                        id="event_date"
                        type="date"
                        label="Tanggal Kegiatan (Opsional)"
                        value={data.event_date}
                        onChange={(e) => setData('event_date', e.target.value)}
                        error={errors.event_date}
                        hint="Tanggal berlangsungnya kegiatan / dokumentasi"
                    />

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
                    label="Deskripsi / Catatan Kegiatan"
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                    error={errors.description}
                    placeholder="Uraikan rangkaian acara, lokasi, atau momen penting yang terdokumentasi..."
                    rows={3}
                />
            </FormSection>

            {/* 2. Cover Photo */}
            <FormSection
                title="Foto Sampul Album (Cover)"
                description="Foto utama yang tampil pada kartu album di halaman daftar galeri. Format: JPG, PNG, WEBP (maks. 2MB). Jika dikosongkan, sistem akan otomatis menggunakan foto pertama dalam album."
            >
                <div className="space-y-4">
                    {coverPreview && (
                        <div className="relative inline-block border border-slate-200 rounded-xl overflow-hidden shadow-xs bg-slate-50">
                            <img
                                src={coverPreview}
                                alt="Pratinjau Sampul"
                                className="max-h-52 w-auto object-cover"
                            />
                            {data.cover_photo && (
                                <button
                                    type="button"
                                    onClick={removeCover}
                                    className="absolute top-2 right-2 p-1.5 bg-slate-900/70 hover:bg-slate-900 text-white rounded-full transition-colors"
                                    title="Batalkan Sampul Baru"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                    )}

                    <div>
                        <input
                            id="cover_photo"
                            type="file"
                            accept="image/jpeg,image/png,image/jpg,image/webp"
                            onChange={handleCoverChange}
                            className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer"
                        />
                        {errors.cover_photo && (
                            <p className="mt-1 text-xs text-red-500">{errors.cover_photo}</p>
                        )}
                    </div>
                </div>
            </FormSection>

            {/* 3. Existing Photos (Edit Mode) */}
            {isEdit && gallery?.photos && gallery.photos.length > 0 && (
                <FormSection
                    title={`Foto Dalam Album (${gallery.photos.length} Foto)`}
                    description="Kelola foto yang sudah tersimpan dalam album ini. Anda dapat memperbarui takarir (caption) atau menghapus foto."
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {gallery.photos.map((photo) => (
                            <div
                                key={photo.id}
                                className="relative border border-slate-200 rounded-xl overflow-hidden bg-slate-50 flex flex-col justify-between group shadow-xs"
                            >
                                <div className="aspect-4/3 w-full bg-slate-100 overflow-hidden relative">
                                    <img
                                        src={`/storage/${photo.photo_path}`}
                                        alt={photo.caption || 'Foto Galeri'}
                                        className="w-full h-full object-cover"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleDeleteExistingPhoto(photo)}
                                        className="absolute top-2 right-2 p-1.5 bg-red-600/90 hover:bg-red-600 text-white rounded-lg opacity-90 transition-opacity shadow-xs"
                                        title="Hapus Foto Ini"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                                <div className="p-2.5 bg-white border-t border-slate-100">
                                    <input
                                        type="text"
                                        placeholder="Takarir / Keterangan foto..."
                                        value={existingCaptions[photo.id] || ''}
                                        onChange={(e) => handleExistingCaptionChange(photo.id, e.target.value)}
                                        className="w-full text-xs px-2.5 py-1.5 rounded-md border border-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </FormSection>
            )}

            {/* 4. Upload New Photos */}
            <FormSection
                title="Unggah Foto Tambahan"
                description="Pilih satu atau beberapa foto sekaligus untuk ditambahkan ke album ini (maks. 20 foto per unggahan, maks. 2MB per foto)."
            >
                <div className="space-y-4">
                    <input
                        type="file"
                        multiple
                        accept="image/jpeg,image/png,image/jpg,image/webp"
                        onChange={handleMultiPhotoChange}
                        className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer"
                    />
                    {errors.photos && (
                        <p className="mt-1 text-xs text-red-500">{errors.photos}</p>
                    )}

                    {/* Previews for new files */}
                    {newPhotoPreviews.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-2">
                            {newPhotoPreviews.map((previewUrl, idx) => (
                                <div
                                    key={idx}
                                    className="border border-indigo-100 rounded-xl overflow-hidden bg-indigo-50/40 flex flex-col justify-between shadow-xs"
                                >
                                    <div className="aspect-4/3 w-full bg-slate-100 overflow-hidden relative">
                                        <img
                                            src={previewUrl}
                                            alt="Foto Baru"
                                            className="w-full h-full object-cover"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeNewPhoto(idx)}
                                            className="absolute top-2 right-2 p-1.5 bg-slate-900/80 hover:bg-slate-900 text-white rounded-lg transition-colors"
                                            title="Batalkan Foto"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <div className="p-2.5 bg-white border-t border-indigo-100">
                                        <input
                                            type="text"
                                            placeholder="Takarir / Keterangan foto (opsional)..."
                                            value={newCaptions[idx] || ''}
                                            onChange={(e) => handleNewCaptionChange(idx, e.target.value)}
                                            className="w-full text-xs px-2.5 py-1.5 rounded-md border border-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </FormSection>

            {/* 5. Status */}
            <FormSection
                title="Status Publikasi"
                description="Album galeri nonaktif tidak akan ditampilkan pada direktori website publik."
            >
                <label className="inline-flex items-center gap-2.5 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={data.is_active}
                        onChange={(e) => setData('is_active', e.target.checked)}
                        className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-sm text-slate-700 font-medium">
                        Status Album Aktif (Ditampilkan di Website)
                    </span>
                </label>
            </FormSection>

            {/* Actions */}
            <div className="flex items-center justify-between pt-2">
                <Link
                    href="/admin/galleries"
                    className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Kembali ke Daftar Galeri</span>
                </Link>

                <button
                    type="submit"
                    disabled={processing}
                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-sm font-semibold rounded-lg shadow-sm transition-colors"
                >
                    <Save className="w-4 h-4" />
                    <span>{processing ? 'Menyimpan...' : isEdit ? 'Perbarui Album Galeri' : 'Simpan Album Galeri'}</span>
                </button>
            </div>
        </form>
    );
}
