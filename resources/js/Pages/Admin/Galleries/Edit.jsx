import React from 'react';
import AdminLayout from '../../../Layouts/AdminLayout';
import GalleryForm from './GalleryForm';

export default function Edit({ gallery }) {
    return (
        <AdminLayout title={`Edit Album: ${gallery.title}`}>
            <div className="space-y-6">
                <div>
                    <h1 className="text-xl font-bold text-slate-900">Edit Album Galeri</h1>
                    <p className="text-sm text-slate-500 mt-0.5">
                        Perbarui informasi kegiatan, tambah foto baru, perbarui takarir, atau kelola foto yang ada.
                    </p>
                </div>

                <GalleryForm gallery={gallery} isEdit={true} />
            </div>
        </AdminLayout>
    );
}
