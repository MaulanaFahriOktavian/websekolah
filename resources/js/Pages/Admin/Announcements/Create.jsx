import React from 'react';
import AdminLayout from '../../../Layouts/AdminLayout';
import AnnouncementForm from './AnnouncementForm';

export default function Create() {
    return (
        <AdminLayout title="Buat Pengumuman">
            <div className="space-y-6">
                <div>
                    <h1 className="text-xl font-bold text-slate-900">Buat Pengumuman Baru</h1>
                    <p className="text-sm text-slate-500 mt-0.5">
                        Tulis pemberitahuan resmi untuk siswa, orang tua, atau staf sekolah.
                    </p>
                </div>

                <AnnouncementForm isEdit={false} />
            </div>
        </AdminLayout>
    );
}
