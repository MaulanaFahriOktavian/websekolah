import React from 'react';
import { useForm } from '@inertiajs/react';
import AdminLayout from '../../Layouts/AdminLayout';
import FormSection from '../../Components/Admin/FormSection';
import InputField from '../../Components/Admin/InputField';
import { Save, School, Phone, BookOpen, User, Eye, FileText } from 'lucide-react';

export default function SchoolProfile({ profile }) {
    const { data, setData, put, processing, errors, isDirty } = useForm({
        name:                 profile?.name                 ?? '',
        short_name:           profile?.short_name           ?? '',
        npsn:                 profile?.npsn                 ?? '',
        level:                profile?.level                ?? '',
        status:               profile?.status               ?? '',
        address:              profile?.address              ?? '',
        phone:                profile?.phone                ?? '',
        email:                profile?.email                ?? '',
        website:              profile?.website              ?? '',
        logo_path:            profile?.logo_path            ?? '',
        favicon_path:         profile?.favicon_path         ?? '',
        founded_year:         profile?.founded_year         ?? '',
        accreditation:        profile?.accreditation        ?? '',
        principal_name:       profile?.principal_name       ?? '',
        principal_photo_path: profile?.principal_photo_path ?? '',
        vision:               profile?.vision               ?? '',
        mission:              profile?.mission              ?? '',
        history:              profile?.history              ?? '',
    });

    function handleSubmit(e) {
        e.preventDefault();
        put('/admin/school-profile');
    }

    return (
        <AdminLayout title="Profil Sekolah">
            <div className="space-y-6">
                {/* Page header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-bold text-slate-900">Profil Sekolah</h1>
                        <p className="text-sm text-slate-500 mt-0.5">
                            Informasi identitas, kontak, dan profil resmi sekolah.
                        </p>
                    </div>
                    <button
                        type="submit"
                        form="school-profile-form"
                        disabled={processing || !isDirty}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-lg transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        <Save className="w-4 h-4" />
                        {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                    </button>
                </div>

                <form id="school-profile-form" onSubmit={handleSubmit} className="space-y-6">

                    {/* 1. Identity */}
                    <FormSection
                        title="Identitas Sekolah"
                        description="Nama resmi dan informasi dasar sekolah."
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="md:col-span-2">
                                <InputField
                                    id="name"
                                    label="Nama Lengkap Sekolah"
                                    required
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    error={errors.name}
                                    placeholder="contoh: SMA Negeri 1 Kota Maju"
                                />
                            </div>
                            <InputField
                                id="short_name"
                                label="Nama Singkat"
                                value={data.short_name}
                                onChange={(e) => setData('short_name', e.target.value)}
                                error={errors.short_name}
                                placeholder="contoh: SMAN 1 KOTMAJ"
                                hint="Maks. 50 karakter"
                            />
                            <InputField
                                id="npsn"
                                label="NPSN"
                                value={data.npsn}
                                onChange={(e) => setData('npsn', e.target.value)}
                                error={errors.npsn}
                                placeholder="8 digit NPSN"
                                hint="Nomor Pokok Sekolah Nasional"
                            />
                            <InputField
                                id="level"
                                label="Jenjang"
                                value={data.level}
                                onChange={(e) => setData('level', e.target.value)}
                                error={errors.level}
                                placeholder="contoh: SMA / SMK / SMP / SD"
                            />
                            <InputField
                                id="status"
                                label="Status"
                                value={data.status}
                                onChange={(e) => setData('status', e.target.value)}
                                error={errors.status}
                                placeholder="Negeri / Swasta"
                            />
                            <InputField
                                id="founded_year"
                                label="Tahun Berdiri"
                                type="number"
                                min="1900"
                                max={new Date().getFullYear()}
                                value={data.founded_year}
                                onChange={(e) => setData('founded_year', e.target.value)}
                                error={errors.founded_year}
                                placeholder="contoh: 1975"
                            />
                            <InputField
                                id="accreditation"
                                label="Akreditasi"
                                value={data.accreditation}
                                onChange={(e) => setData('accreditation', e.target.value)}
                                error={errors.accreditation}
                                placeholder="contoh: A"
                                hint="Maks. 10 karakter"
                            />
                        </div>
                    </FormSection>

                    {/* 2. Contact */}
                    <FormSection
                        title="Informasi Kontak"
                        description="Alamat, nomor telepon, email, dan website resmi."
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="md:col-span-2">
                                <InputField
                                    id="address"
                                    as="textarea"
                                    label="Alamat Lengkap"
                                    value={data.address}
                                    onChange={(e) => setData('address', e.target.value)}
                                    error={errors.address}
                                    placeholder="Jl. Pendidikan No. 1, Kelurahan..."
                                    rows={3}
                                />
                            </div>
                            <InputField
                                id="phone"
                                label="Nomor Telepon"
                                type="tel"
                                value={data.phone}
                                onChange={(e) => setData('phone', e.target.value)}
                                error={errors.phone}
                                placeholder="(021) 123-4567"
                            />
                            <InputField
                                id="email"
                                label="Email Resmi"
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                error={errors.email}
                                placeholder="info@sekolah.sch.id"
                            />
                            <div className="md:col-span-2">
                                <InputField
                                    id="website"
                                    label="Website"
                                    type="url"
                                    value={data.website}
                                    onChange={(e) => setData('website', e.target.value)}
                                    error={errors.website}
                                    placeholder="https://www.sekolah.sch.id"
                                />
                            </div>
                        </div>
                    </FormSection>

                    {/* 3. Branding */}
                    <FormSection
                        title="Branding & Logo"
                        description="Path logo dan favicon. Upload file terpisah akan tersedia di fase berikutnya."
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <InputField
                                id="logo_path"
                                label="Path Logo"
                                value={data.logo_path}
                                onChange={(e) => setData('logo_path', e.target.value)}
                                error={errors.logo_path}
                                placeholder="/storage/logo.png"
                                hint="Path relatif ke file logo"
                            />
                            <InputField
                                id="favicon_path"
                                label="Path Favicon"
                                value={data.favicon_path}
                                onChange={(e) => setData('favicon_path', e.target.value)}
                                error={errors.favicon_path}
                                placeholder="/storage/favicon.ico"
                                hint="Path relatif ke file favicon"
                            />
                        </div>
                    </FormSection>

                    {/* 4. Principal */}
                    <FormSection
                        title="Informasi Kepala Sekolah"
                        description="Nama dan foto kepala sekolah yang ditampilkan di profil publik."
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <InputField
                                id="principal_name"
                                label="Nama Kepala Sekolah"
                                value={data.principal_name}
                                onChange={(e) => setData('principal_name', e.target.value)}
                                error={errors.principal_name}
                                placeholder="Dr. Budi Santoso, M.Pd."
                            />
                            <InputField
                                id="principal_photo_path"
                                label="Path Foto Kepala Sekolah"
                                value={data.principal_photo_path}
                                onChange={(e) => setData('principal_photo_path', e.target.value)}
                                error={errors.principal_photo_path}
                                placeholder="/storage/principal.jpg"
                            />
                        </div>
                    </FormSection>

                    {/* 5. Vision & Mission */}
                    <FormSection
                        title="Visi & Misi"
                        description="Pernyataan visi dan misi resmi sekolah."
                    >
                        <InputField
                            id="vision"
                            as="textarea"
                            label="Visi"
                            value={data.vision}
                            onChange={(e) => setData('vision', e.target.value)}
                            error={errors.vision}
                            placeholder="Menjadi sekolah unggulan yang..."
                            rows={3}
                        />
                        <InputField
                            id="mission"
                            as="textarea"
                            label="Misi"
                            value={data.mission}
                            onChange={(e) => setData('mission', e.target.value)}
                            error={errors.mission}
                            placeholder="1. Menyelenggarakan pembelajaran yang..."
                            rows={5}
                        />
                    </FormSection>

                    {/* 6. History */}
                    <FormSection
                        title="Sejarah Sekolah"
                        description="Narasi sejarah berdiri dan perkembangan sekolah."
                    >
                        <InputField
                            id="history"
                            as="textarea"
                            label="Sejarah"
                            value={data.history}
                            onChange={(e) => setData('history', e.target.value)}
                            error={errors.history}
                            placeholder="Sekolah ini didirikan pada tahun..."
                            rows={7}
                        />
                    </FormSection>

                    {/* Mobile save button */}
                    <div className="flex justify-end md:hidden">
                        <button
                            type="submit"
                            disabled={processing || !isDirty}
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
