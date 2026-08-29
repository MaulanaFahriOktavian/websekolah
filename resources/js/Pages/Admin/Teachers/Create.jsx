import React from 'react';
import AdminLayout from '../../../Layouts/AdminLayout';
import TeacherForm from './TeacherForm';

export default function Create() {
    return (
        <AdminLayout title="Tambah Data Guru">
            <div className="space-y-6">
                <div>
                    <h1 className="text-xl font-bold text-slate-900">Tambah Data Guru Baru</h1>
                    <p className="text-sm text-slate-500 mt-0.5">
                        Tambahkan profil tenaga pengajar untuk direktori resmi website sekolah.
                    </p>
                </div>

                <TeacherForm isEdit={false} />
            </div>
        </AdminLayout>
    );
}
