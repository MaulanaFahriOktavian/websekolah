import React from 'react';
import AdminLayout from '../../../Layouts/AdminLayout';
import CategoryForm from './CategoryForm';

export default function Edit({ category }) {
    return (
        <AdminLayout title={`Edit Kategori: ${category.name}`}>
            <div className="space-y-6">
                <div>
                    <h1 className="text-xl font-bold text-slate-900">Edit Kategori</h1>
                    <p className="text-sm text-slate-500 mt-0.5">
                        Perbarui nama, deskripsi, urutan, atau status keaktifan kategori.
                    </p>
                </div>

                <CategoryForm category={category} isEdit={true} />
            </div>
        </AdminLayout>
    );
}
