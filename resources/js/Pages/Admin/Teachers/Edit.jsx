import React from 'react';
import AdminLayout from '../../../Layouts/AdminLayout';
import TeacherForm from './TeacherForm';

export default function Edit({ teacher }) {
    return (
        <AdminLayout title={`Edit Guru: ${teacher.name}`}>
            <div className="space-y-6">
                <div>
                    <h1 className="text-xl font-bold text-slate-900">Edit Data Guru</h1>
                    <p className="text-sm text-slate-500 mt-0.5">
                        Perbarui informasi pengajar, foto profil, gelar, atau status keaktifan.
                    </p>
                </div>

                <TeacherForm teacher={teacher} isEdit={true} />
            </div>
        </AdminLayout>
    );
}
