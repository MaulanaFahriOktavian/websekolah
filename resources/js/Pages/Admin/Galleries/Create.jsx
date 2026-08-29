import React from 'react';
import AdminLayout from '../../../Layouts/AdminLayout';
import GalleryForm from './GalleryForm';

export default function Create() {
    return (
        <AdminLayout title="Buat Album Galeri">
            <div className="space-y-6">
                <div>
                    <h1 className="text-xl font-bold text-slate-900">Buat Album Galeri Baru</h1>
                    <p className="text-sm text-slate-500 mt-0.5">
                        Unggah dokumentasi foto kegiatan sekolah dalam satu album terstruktur.
                    </p>
                </div>

                <GalleryForm isEdit={false} />
            </div>
        </AdminLayout>
    );
}
