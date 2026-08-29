import React from 'react';
import AdminLayout from '../../../Layouts/AdminLayout';
import AnnouncementForm from './AnnouncementForm';

export default function Edit({ announcement }) {
    return (
        <AdminLayout title={`Edit Pengumuman: ${announcement.title}`}>
            <div className="space-y-6">
                <div>
                    <h1 className="text-xl font-bold text-slate-900">Edit Pengumuman</h1>
                    <p className="text-sm text-slate-500 mt-0.5">
                        Perbarui isi, status publikasi, atau tanggal kedaluwarsa pengumuman.
                    </p>
                </div>

                <AnnouncementForm announcement={announcement} isEdit={true} />
            </div>
        </AdminLayout>
    );
}
