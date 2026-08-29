import React from 'react';
import AdminLayout from '../../../Layouts/AdminLayout';
import StaffForm from './StaffForm';

export default function Edit({ staff }) {
    return (
        <AdminLayout title={`Edit Staf: ${staff.name}`}>
            <div className="space-y-6">
                <div>
                    <h1 className="text-xl font-bold text-slate-900">Edit Data Tenaga Kependidikan</h1>
                    <p className="text-sm text-slate-500 mt-0.5">
                        Perbarui informasi tugas, foto profil, pendidikan, atau status keaktifan staf.
                    </p>
                </div>

                <StaffForm staff={staff} isEdit={true} />
            </div>
        </AdminLayout>
    );
}
