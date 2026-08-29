import React from 'react';
import AdminLayout from '../../../Layouts/AdminLayout';
import StaffForm from './StaffForm';

export default function Create() {
    return (
        <AdminLayout title="Tambah Tenaga Kependidikan">
            <div className="space-y-6">
                <div>
                    <h1 className="text-xl font-bold text-slate-900">Tambah Tenaga Kependidikan Baru</h1>
                    <p className="text-sm text-slate-500 mt-0.5">
                        Tambahkan profil staf tata usaha, pustakawan, laboran, atau petugas pendukung lainnya.
                    </p>
                </div>

                <StaffForm isEdit={false} />
            </div>
        </AdminLayout>
    );
}
