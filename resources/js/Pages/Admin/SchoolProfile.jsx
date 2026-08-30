import React, { useState } from 'react';
import { useForm, router } from '@inertiajs/react';
import AdminLayout from '../../Layouts/AdminLayout';
import FormSection from '../../Components/Admin/FormSection';
import InputField from '../../Components/Admin/InputField';
import {
    Save,
    School,
    Phone,
    BookOpen,
    User,
    Eye,
    FileText,
    Image as ImageIcon,
    MapPin,
    Share2,
    X,
    Trash2,
} from 'lucide-react';

const TABS = [
    { id: 'identity',   label: 'Identitas',         icon: School },
    { id: 'profile',    label: 'Profil & Sambutan',  icon: User },
    { id: 'branding',   label: 'Branding',           icon: ImageIcon },
    { id: 'contact',    label: 'Kontak & Lokasi',    icon: MapPin },
    { id: 'content',    label: 'Visi, Misi & Sejarah', icon: BookOpen },
    { id: 'social',     label: 'Media Sosial',       icon: Share2 },
];

function ImageUploadField({ label, currentPath, previewState, onFileChange, onClear, hint }) {
    return (
        <div className="space-y-3">
            <label className="block text-sm font-medium text-slate-700">{label}</label>
            {(previewState || currentPath) && (
                <div className="relative inline-flex border border-slate-200 rounded-xl overflow-hidden shadow-xs bg-slate-50">
                    <img
                        src={previewState || `/storage/${currentPath}`}
                        alt={label}
                        className="max-h-40 w-auto object-contain"
                    />
                    {previewState && (
                        <button
                            type="button"
                            onClick={() => onClear('preview')}
                            className="absolute top-2 right-2 p-1 bg-slate-900/70 hover:bg-slate-900 text-white rounded-full"
                            title="Batalkan pilihan file"
                        >
                            <X className="w-3.5 h-3.5" />
                        </button>
                    )}
                </div>
            )}
            <div className="flex flex-col sm:flex-row gap-2">
                <input
                    type="file"
                    accept="image/*"
                    onChange={onFileChange}
                    className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer"
                />
                {currentPath && !previewState && (
                    <button
                        type="button"
                        onClick={() => onClear('delete')}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors shrink-0"
                    >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Hapus</span>
                    </button>
                )}
            </div>
            {hint && <p className="text-xs text-slate-500">{hint}</p>}
        </div>
    );
}

export default function SchoolProfile({ profile }) {
    const [activeTab, setActiveTab] = useState('identity');

    // Image previews
    const [logoPrev, setLogoPrev] = useState(null);
    const [faviconPrev, setFaviconPrev] = useState(null);
    const [heroPrev, setHeroPrev] = useState(null);
    const [principalPhotoPrev, setPrincipalPhotoPrev] = useState(null);

    const { data, setData, post, processing, errors, isDirty } = useForm({
        _method:              'PUT',
        name:                 profile?.name                 ?? '',
        short_name:           profile?.short_name           ?? '',
        npsn:                 profile?.npsn                 ?? '',
        level:                profile?.level                ?? '',
        status:               profile?.status               ?? '',
        tagline:              profile?.tagline              ?? '',
        description:          profile?.description          ?? '',
        address:              profile?.address              ?? '',
        phone:                profile?.phone                ?? '',
        email:                profile?.email                ?? '',
        website:              profile?.website              ?? '',
        logo:                 null,
        favicon:              null,
        hero_image:           null,
        founded_year:         profile?.founded_year         ?? '',
        accreditation:        profile?.accreditation        ?? '',
        principal_name:       profile?.principal_name       ?? '',
        principal_photo:      null,
        principal_greeting:   profile?.principal_greeting   ?? '',
        vision:               profile?.vision               ?? '',
        mission:              profile?.mission              ?? '',
        history:              profile?.history              ?? '',
        latitude:             profile?.latitude             ?? '',
        longitude:            profile?.longitude            ?? '',
        maps_url:             profile?.maps_url             ?? '',
        facebook_url:         profile?.facebook_url         ?? '',
        instagram_url:        profile?.instagram_url        ?? '',
        youtube_url:          profile?.youtube_url          ?? '',
        tiktok_url:           profile?.tiktok_url           ?? '',
    });

    function handleSubmit(e) {
        e.preventDefault();
        post('/admin/school-profile', { forceFormData: true });
    }

    function handleImageChange(field, setter) {
        return (e) => {
            const file = e.target.files[0];
            if (file) {
                setData(field, file);
                setter(URL.createObjectURL(file));
            }
        };
    }

    function handleImageClear(field, dbField, setter) {
        return (action) => {
            if (action === 'preview') {
                setData(field, null);
                setter(null);
            } else {
                // Delete from DB
                router.delete(`/admin/school-profile/image/${dbField}`, {
                    preserveScroll: true,
                    onSuccess: () => setter(null),
                });
            }
        };
    }

    const tabContent = {
        identity: (
            <FormSection title="Identitas Sekolah" description="Nama resmi, jenjang, status, dan informasi dasar sekolah.">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="md:col-span-2">
                        <InputField id="name" label="Nama Lengkap Sekolah" required value={data.name}
                            onChange={(e) => setData('name', e.target.value)} error={errors.name}
                            placeholder="contoh: SMA Negeri 1 Kota Maju" />
                    </div>
                    <InputField id="short_name" label="Nama Singkat" value={data.short_name}
                        onChange={(e) => setData('short_name', e.target.value)} error={errors.short_name}
                        placeholder="contoh: SMAN 1 Kota Maju" hint="Maks. 50 karakter" />
                    <InputField id="npsn" label="NPSN" value={data.npsn}
                        onChange={(e) => setData('npsn', e.target.value)} error={errors.npsn}
                        placeholder="8 digit NPSN" hint="Nomor Pokok Sekolah Nasional" />
                    <InputField id="level" label="Jenjang" value={data.level}
                        onChange={(e) => setData('level', e.target.value)} error={errors.level}
                        placeholder="contoh: SMA / SMK / SMP / SD" />
                    <InputField id="status" label="Status" value={data.status}
                        onChange={(e) => setData('status', e.target.value)} error={errors.status}
                        placeholder="Negeri / Swasta" />
                    <InputField id="founded_year" label="Tahun Berdiri" type="number" min="1900"
                        max={new Date().getFullYear()} value={data.founded_year}
                        onChange={(e) => setData('founded_year', e.target.value)} error={errors.founded_year}
                        placeholder="contoh: 1975" />
                    <InputField id="accreditation" label="Akreditasi" value={data.accreditation}
                        onChange={(e) => setData('accreditation', e.target.value)} error={errors.accreditation}
                        placeholder="contoh: A" hint="Maks. 10 karakter" />
                    <div className="md:col-span-2">
                        <InputField id="tagline" label="Tagline / Motto Sekolah" value={data.tagline}
                            onChange={(e) => setData('tagline', e.target.value)} error={errors.tagline}
                            placeholder="contoh: Unggul dalam Prestasi, Berkarakter, Berwawasan Global"
                            hint="Maks. 255 karakter — ditampilkan di hero homepage dan footer" />
                    </div>
                </div>
            </FormSection>
        ),

        profile: (
            <>
                <FormSection title="Tentang Sekolah" description="Deskripsi umum profil sekolah.">
                    <InputField id="description" as="textarea" label="Deskripsi / Tentang Sekolah"
                        value={data.description} onChange={(e) => setData('description', e.target.value)}
                        error={errors.description}
                        placeholder="Uraikan profil umum sekolah, keunggulan, dan program unggulan..." rows={5} />
                </FormSection>
                <FormSection title="Kepala Sekolah & Sambutan" description="Informasi dan pesan resmi dari kepala sekolah.">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="md:col-span-2">
                            <InputField id="principal_name" label="Nama Kepala Sekolah" value={data.principal_name}
                                onChange={(e) => setData('principal_name', e.target.value)} error={errors.principal_name}
                                placeholder="Dr. Budi Santoso, M.Pd." />
                        </div>
                        <div className="md:col-span-2">
                            <InputField id="principal_greeting" as="textarea" label="Sambutan Kepala Sekolah"
                                value={data.principal_greeting}
                                onChange={(e) => setData('principal_greeting', e.target.value)}
                                error={errors.principal_greeting}
                                placeholder="Dengan mengucap syukur kepada Tuhan Yang Maha Esa..." rows={6} />
                        </div>
                    </div>
                </FormSection>
            </>
        ),

        branding: (
            <FormSection title="Branding & Identitas Visual"
                description="Logo, favicon, dan gambar hero untuk tampilan website. Format: JPG/PNG/WEBP (logo & hero), PNG/ICO (favicon).">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <ImageUploadField
                        label="Logo Sekolah"
                        currentPath={profile?.logo_path}
                        previewState={logoPrev}
                        onFileChange={handleImageChange('logo', setLogoPrev)}
                        onClear={handleImageClear('logo', 'logo_path', setLogoPrev)}
                        hint="Maks. 2MB — JPEG, PNG, WEBP. Tampil di navbar, footer, dan favicon fallback."
                    />
                    {errors.logo && <p className="text-xs text-red-500">{errors.logo}</p>}

                    <ImageUploadField
                        label="Favicon"
                        currentPath={profile?.favicon_path}
                        previewState={faviconPrev}
                        onFileChange={handleImageChange('favicon', setFaviconPrev)}
                        onClear={handleImageClear('favicon', 'favicon_path', setFaviconPrev)}
                        hint="Maks. 512KB — PNG atau ICO. Ditampilkan sebagai ikon tab browser."
                    />
                    {errors.favicon && <p className="text-xs text-red-500">{errors.favicon}</p>}

                    <div className="md:col-span-2">
                        <ImageUploadField
                            label="Hero Image (Gambar Utama Homepage)"
                            currentPath={profile?.hero_image_path}
                            previewState={heroPrev}
                            onFileChange={handleImageChange('hero_image', setHeroPrev)}
                            onClear={handleImageClear('hero_image', 'hero_image_path', setHeroPrev)}
                            hint="Maks. 4MB — JPEG, PNG, WEBP. Gambar latar bagian hero di halaman beranda."
                        />
                        {errors.hero_image && <p className="text-xs text-red-500">{errors.hero_image}</p>}
                    </div>

                    <div className="md:col-span-2">
                        <ImageUploadField
                            label="Foto Kepala Sekolah"
                            currentPath={profile?.principal_photo_path}
                            previewState={principalPhotoPrev}
                            onFileChange={handleImageChange('principal_photo', setPrincipalPhotoPrev)}
                            onClear={handleImageClear('principal_photo', 'principal_photo_path', setPrincipalPhotoPrev)}
                            hint="Maks. 2MB — JPEG, PNG, WEBP. Tampil di halaman Tentang dan sambutan kepala sekolah."
                        />
                        {errors.principal_photo && <p className="text-xs text-red-500">{errors.principal_photo}</p>}
                    </div>
                </div>
            </FormSection>
        ),

        contact: (
            <>
                <FormSection title="Informasi Kontak" description="Alamat, telepon, email, dan website resmi.">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="md:col-span-2">
                            <InputField id="address" as="textarea" label="Alamat Lengkap" value={data.address}
                                onChange={(e) => setData('address', e.target.value)} error={errors.address}
                                placeholder="Jl. Pendidikan No. 1, Kelurahan..." rows={3} />
                        </div>
                        <InputField id="phone" label="Nomor Telepon" type="tel" value={data.phone}
                            onChange={(e) => setData('phone', e.target.value)} error={errors.phone}
                            placeholder="(021) 123-4567" />
                        <InputField id="email" label="Email Resmi" type="email" value={data.email}
                            onChange={(e) => setData('email', e.target.value)} error={errors.email}
                            placeholder="info@sekolah.sch.id" />
                        <div className="md:col-span-2">
                            <InputField id="website" label="Website" type="url" value={data.website}
                                onChange={(e) => setData('website', e.target.value)} error={errors.website}
                                placeholder="https://www.sekolah.sch.id" />
                        </div>
                    </div>
                </FormSection>
                <FormSection title="Lokasi & Peta" description="Koordinat GPS dan tautan Google Maps untuk embed peta.">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <InputField id="latitude" label="Latitude" type="number" value={data.latitude}
                            onChange={(e) => setData('latitude', e.target.value)} error={errors.latitude}
                            placeholder="contoh: -6.200000" hint="Nilai antara -90 dan 90" />
                        <InputField id="longitude" label="Longitude" type="number" value={data.longitude}
                            onChange={(e) => setData('longitude', e.target.value)} error={errors.longitude}
                            placeholder="contoh: 106.816666" hint="Nilai antara -180 dan 180" />
                        <div className="md:col-span-2">
                            <InputField id="maps_url" label="Google Maps URL" type="url" value={data.maps_url}
                                onChange={(e) => setData('maps_url', e.target.value)} error={errors.maps_url}
                                placeholder="https://maps.google.com/..."
                                hint="URL Google Maps untuk tombol 'Lihat di Peta' dan iframe embed" />
                        </div>
                    </div>
                </FormSection>
            </>
        ),

        content: (
            <>
                <FormSection title="Visi & Misi" description="Pernyataan visi dan misi resmi sekolah.">
                    <InputField id="vision" as="textarea" label="Visi" value={data.vision}
                        onChange={(e) => setData('vision', e.target.value)} error={errors.vision}
                        placeholder="Menjadi sekolah unggulan yang..." rows={3} />
                    <div className="mt-4">
                        <InputField id="mission" as="textarea" label="Misi" value={data.mission}
                            onChange={(e) => setData('mission', e.target.value)} error={errors.mission}
                            placeholder="1. Menyelenggarakan pembelajaran yang berpusat pada siswa..." rows={6}
                            hint="Pisahkan setiap poin misi dengan baris baru" />
                    </div>
                </FormSection>
                <FormSection title="Sejarah Sekolah" description="Narasi sejarah berdiri dan perkembangan sekolah.">
                    <InputField id="history" as="textarea" label="Sejarah" value={data.history}
                        onChange={(e) => setData('history', e.target.value)} error={errors.history}
                        placeholder="Sekolah ini didirikan pada tahun..." rows={8} />
                </FormSection>
            </>
        ),

        social: (
            <FormSection title="Media Sosial" description="Tautan ke kanal media sosial resmi sekolah. Kosongkan jika tidak ada.">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <InputField id="facebook_url" label="Facebook" type="url" value={data.facebook_url}
                        onChange={(e) => setData('facebook_url', e.target.value)} error={errors.facebook_url}
                        placeholder="https://facebook.com/namaSekolah" />
                    <InputField id="instagram_url" label="Instagram" type="url" value={data.instagram_url}
                        onChange={(e) => setData('instagram_url', e.target.value)} error={errors.instagram_url}
                        placeholder="https://instagram.com/namaSekolah" />
                    <InputField id="youtube_url" label="YouTube" type="url" value={data.youtube_url}
                        onChange={(e) => setData('youtube_url', e.target.value)} error={errors.youtube_url}
                        placeholder="https://youtube.com/@namaSekolah" />
                    <InputField id="tiktok_url" label="TikTok" type="url" value={data.tiktok_url}
                        onChange={(e) => setData('tiktok_url', e.target.value)} error={errors.tiktok_url}
                        placeholder="https://tiktok.com/@namaSekolah" />
                </div>
            </FormSection>
        ),
    };

    return (
        <AdminLayout title="Profil Sekolah">
            <div className="space-y-6">
                {/* Page header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-bold text-slate-900">Profil & Identitas Sekolah</h1>
                        <p className="text-sm text-slate-500 mt-0.5">
                            Kelola seluruh informasi identitas, kontak, branding, dan media sosial sekolah.
                        </p>
                    </div>
                    <button
                        type="submit"
                        form="school-profile-form"
                        disabled={processing}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-lg transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        <Save className="w-4 h-4" />
                        {processing ? 'Menyimpan...' : 'Simpan Semua Perubahan'}
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex overflow-x-auto gap-1 border-b border-slate-200 pb-0 -mb-px">
                    {TABS.map((tab) => {
                        const Icon = tab.icon;
                        return (
                            <button
                                key={tab.id}
                                type="button"
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                                    activeTab === tab.id
                                        ? 'border-indigo-600 text-indigo-600'
                                        : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                                }`}
                            >
                                <Icon className="w-4 h-4" />
                                <span>{tab.label}</span>
                            </button>
                        );
                    })}
                </div>

                {/* Form */}
                <form id="school-profile-form" onSubmit={handleSubmit} className="space-y-6">
                    {tabContent[activeTab]}

                    {/* Mobile save */}
                    <div className="flex justify-end md:hidden">
                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-sm font-semibold rounded-lg transition-colors"
                        >
                            <Save className="w-4 h-4" />
                            {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
