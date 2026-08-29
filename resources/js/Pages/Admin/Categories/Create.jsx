import React from 'react';
import AdminLayout from '../../../Layouts/AdminLayout';
import CategoryForm from './CategoryForm';

export default function Create() {
    return (
        <AdminLayout title="Tambah Kategori">
            <div className="space-y-6">
                <div>
                    <h1 className="text-xl font-bold text-slate-900">Tambah Kategori Baru</h1>
                    <p className="text-sm text-slate-500 mt-0.5">
                        Buat kategori baru untuk mengorganisir konten berita sekolah.
                    </p>
                </div>

                <CategoryForm isEdit={false} />
            </div>
        </AdminLayout>
    );
}
