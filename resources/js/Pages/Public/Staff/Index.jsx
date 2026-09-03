import React from 'react';
import { router } from '@inertiajs/react';
import PublicLayout from '../../../Layouts/PublicLayout';
import Pagination from '../../../Components/Common/Pagination';
import Card from '../../../Components/Common/Card';
import Badge from '../../../Components/Common/Badge';
import { Search, Users, Award } from 'lucide-react';

export default function Index({ staff, filters }) {
    function handleSearch(e) {
        e.preventDefault();
        const search = e.target.cari.value;
        router.get(
            '/staf',
            { cari: search || undefined },
            { preserveState: true }
        );
    }

    return (
        <PublicLayout
            title="Tenaga Kependidikan"
            description="Profil dan direktori tenaga kependidikan dan staf administrasi sekolah."
            ogType="website"
        >
            {/* Institutional Header */}
            <section className="bg-slate-900 text-white py-12 lg:py-16 border-b border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-2xl space-y-3">
                        <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400">
                            Tenaga Kependidikan
                        </span>
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
                            Staf & Tata Usaha
                        </h1>
                        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                            Tim tata usaha, administrasi, perpustakaan, laboratorium, dan layanan pendukung yang memastikan kelancaran operasional kelembagaan sekolah.
                        </p>
                    </div>
                </div>
            </section>

            {/* Search Bar */}
            <section className="border-b border-slate-200 bg-white sticky top-20 z-20 shadow-xs">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        Daftar Staf Resmi Sekolah
                    </p>

                    <form onSubmit={handleSearch} className="relative w-full sm:max-w-xs">
                        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                            type="text"
                            name="cari"
                            defaultValue={filters?.cari || ''}
                            placeholder="Cari nama atau jabatan staf..."
                            className="w-full pl-9 pr-4 py-1.5 text-xs rounded-full border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </form>
                </div>
            </section>

            {/* Staff Grid */}
            <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {staff.data.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {staff.data.map((member) => (
                            <Card
                                key={member.id}
                                className="group flex flex-col overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-slate-200 p-0 text-center bg-white"
                            >
                                {/* Photo */}
                                <div className="aspect-3/4 w-full bg-slate-100 relative overflow-hidden flex items-center justify-center">
                                    {member.photo ? (
                                        <img
                                            src={`/storage/${member.photo}`}
                                            alt={member.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-tr from-emerald-100 via-slate-100 to-emerald-50 text-emerald-500">
                                            <Users className="w-16 h-16 opacity-40 mb-2" />
                                            <span className="text-3xl font-bold text-emerald-600">
                                                {member.name.charAt(0)}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Body */}
                                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                                    <div>
                                        {member.position && (
                                            <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100 mb-2">
                                                {member.position}
                                            </span>
                                        )}

                                        <h2 className="font-bold text-slate-900 text-base leading-snug">
                                            {member.name}
                                        </h2>

                                        {member.education && (
                                            <p className="text-[11px] text-slate-500 flex items-center justify-center gap-1.5 mt-2">
                                                <Award className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                                <span>{member.education}</span>
                                            </p>
                                        )}
                                    </div>

                                    {member.bio && (
                                        <p className="text-xs text-slate-500 line-clamp-2 border-t border-slate-100 pt-2 italic">
                                            "{member.bio}"
                                        </p>
                                    )}
                                </div>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-lg mx-auto space-y-3">
                        <Users className="w-12 h-12 mx-auto text-slate-300" />
                        <h3 className="text-lg font-bold text-slate-800">Belum Ada Data Staf</h3>
                        <p className="text-sm text-slate-500">
                            Tidak ditemukan data tenaga kependidikan yang sesuai dengan kata kunci pencarian Anda.
                        </p>
                    </div>
                )}

                {/* Pagination */}
                {staff.links && (
                    <div className="mt-12">
                        <Pagination links={staff.links} />
                    </div>
                )}
            </section>
        </PublicLayout>
    );
}
