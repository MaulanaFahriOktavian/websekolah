import React from 'react';
import AdminLayout from '../../../Layouts/AdminLayout';
import AchievementForm from './AchievementForm';

export default function Edit({ achievement }) {
    return (
        <AdminLayout title={`Edit Prestasi: ${achievement.title}`}>
            <div className="space-y-6">
                <div>
                    <h1 className="text-xl font-bold text-slate-900">Edit Data Prestasi</h1>
                    <p className="text-sm text-slate-500 mt-0.5">
                        Perbarui peraih juara, tahun perolehan, foto, atau status keaktifan prestasi.
                    </p>
                </div>

                <AchievementForm achievement={achievement} isEdit={true} />
            </div>
        </AdminLayout>
    );
}
