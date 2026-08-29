import React from 'react';
import AdminLayout from '../../../Layouts/AdminLayout';
import FacilityForm from './FacilityForm';

export default function Edit({ facility }) {
    return (
        <AdminLayout title={`Edit Fasilitas: ${facility.name}`}>
            <div className="space-y-6">
                <div>
                    <h1 className="text-xl font-bold text-slate-900">Edit Data Fasilitas</h1>
                    <p className="text-sm text-slate-500 mt-0.5">
                        Perbarui nama, foto, deskripsi, kapasitas, atau status keaktifan fasilitas.
                    </p>
                </div>

                <FacilityForm facility={facility} isEdit={true} />
            </div>
        </AdminLayout>
    );
}
