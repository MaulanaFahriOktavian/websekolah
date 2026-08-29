import React from 'react';
import AdminLayout from '../../../Layouts/AdminLayout';
import NewsForm from './NewsForm';

export default function Edit({ news, categories }) {
    return (
        <AdminLayout title={`Edit Berita: ${news.title}`}>
            <div className="space-y-6">
                <div>
                    <h1 className="text-xl font-bold text-slate-900">Edit Berita</h1>
                    <p className="text-sm text-slate-500 mt-0.5">
                        Perbarui konten, gambar, status publikasi, atau metadata berita.
                    </p>
                </div>

                <NewsForm news={news} categories={categories} isEdit={true} />
            </div>
        </AdminLayout>
    );
}
