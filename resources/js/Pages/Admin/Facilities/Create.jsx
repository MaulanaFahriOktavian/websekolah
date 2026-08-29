import React from 'react';
import AdminLayout from '../../../Layouts/AdminLayout';
import FacilityForm from './FacilityForm';

export default function Create() {
    return (
        <AdminLayout title="Tambah Fasilitas">
            <div className="space-y-6">
                <div>
                    <h1 className="text-xl font-bold text-slate-900">Tambah Fasilitas Baru</h1>
                    <p className="text-sm text-slate-500 mt-0.5">
                        Tambahkan ruang, sarana, atau fasilitas pendukung sekolah ke dalam sistem.
                    </p>
                </div>

                <FacilityForm isEdit={false} />
            </div>
        </AdminLayout>
    );
}
