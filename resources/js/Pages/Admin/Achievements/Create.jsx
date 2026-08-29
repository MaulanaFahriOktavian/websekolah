import React from 'react';
import AdminLayout from '../../../Layouts/AdminLayout';
import AchievementForm from './AchievementForm';

export default function Create() {
    return (
        <AdminLayout title="Tambah Prestasi">
            <div className="space-y-6">
                <div>
                    <h1 className="text-xl font-bold text-slate-900">Tambah Prestasi Baru</h1>
                    <p className="text-sm text-slate-500 mt-0.5">
                        Tambahkan piagam, medali, atau kejuaraan siswa dan sekolah.
                    </p>
                </div>

                <AchievementForm isEdit={false} />
            </div>
        </AdminLayout>
    );
}
