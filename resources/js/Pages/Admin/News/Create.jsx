import React from 'react';
import AdminLayout from '../../../Layouts/AdminLayout';
import NewsForm from './NewsForm';

export default function Create({ categories }) {
    return (
        <AdminLayout title="Tulis Berita Baru">
            <div className="space-y-6">
                <div>
                    <h1 className="text-xl font-bold text-slate-900">Tulis Berita Baru</h1>
                    <p className="text-sm text-slate-500 mt-0.5">
                        Publikasikan artikel, kabar prestasi, atau liputan kegiatan sekolah.
                    </p>
                </div>

                <NewsForm categories={categories} isEdit={false} />
            </div>
        </AdminLayout>
    );
}
