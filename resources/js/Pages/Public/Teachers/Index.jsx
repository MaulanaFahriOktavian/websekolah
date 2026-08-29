import React from 'react';
import { router } from '@inertiajs/react';
import PublicLayout from '../../../Layouts/PublicLayout';
import Pagination from '../../../Components/Common/Pagination';
import Card from '../../../Components/Common/Card';
import Badge from '../../../Components/Common/Badge';
import { Search, GraduationCap, BookOpen, Award } from 'lucide-react';

export default function Index({ teachers, filters }) {
    function handleSearch(e) {
        e.preventDefault();
        const search = e.target.cari.value;
        router.get(
            '/guru',
            { cari: search || undefined },
            { preserveState: true }
        );
    }

    return (
        <PublicLayout title="Direktori Guru & Pendidik">
            {/* Hero Banner */}
            <section className="bg-gradient-to-b from-indigo-900 via-indigo-950 to-slate-900 text-white py-14 lg:py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-500/20 via-transparent to-transparent pointer-events-none" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="max-w-2xl space-y-4">
                        <Badge variant="primary" size="md">
                            Tenaga Pendidik
                        </Badge>
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
                            Guru & Tenaga Pengajar
                        </h1>
                        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                            Mengenal para pendidik profesional dan berdedikasi tinggi yang membimbing siswa menuju prestasi gemilang.
                        </p>
                    </div>
                </div>
            </section>

            {/* Search Bar */}
            <section className="border-b border-slate-200 bg-white sticky top-20 z-20 shadow-xs">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        Daftar Guru Resmi Sekolah
                    </p>

                    <form onSubmit={handleSearch} className="relative w-full sm:max-w-xs">
                        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                            type="text"
                            name="cari"
                            defaultValue={filters?.cari || ''}
                            placeholder="Cari nama, mata pelajaran, atau jabatan..."
                            className="w-full pl-9 pr-4 py-1.5 text-xs rounded-full border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </form>
                </div>
            </section>

            {/* Teachers Grid */}
            <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {teachers.data.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {teachers.data.map((teacher) => (
                            <Card
                                key={teacher.id}
                                className="group flex flex-col overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-slate-200 p-0 text-center bg-white"
                            >
                                {/* Photo */}
                                <div className="aspect-3/4 w-full bg-slate-100 relative overflow-hidden flex items-center justify-center">
                                    {teacher.photo ? (
                                        <img
                                            src={`/storage/${teacher.photo}`}
                                            alt={teacher.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-tr from-indigo-100 via-slate-100 to-indigo-50 text-indigo-400">
                                            <GraduationCap className="w-16 h-16 opacity-40 mb-2" />
                                            <span className="text-3xl font-bold text-indigo-500">
                                                {teacher.name.charAt(0)}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Body */}
                                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                                    <div>
                                        {teacher.position && (
                                            <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100 mb-2">
                                                {teacher.position}
                                            </span>
                                        )}

                                        <h2 className="font-bold text-slate-900 text-base leading-snug">
                                            {teacher.name}
                                        </h2>

                                        {teacher.subject && (
                                            <p className="text-xs font-medium text-slate-600 flex items-center justify-center gap-1.5 mt-2">
                                                <BookOpen className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                                                <span>{teacher.subject}</span>
                                            </p>
                                        )}

                                        {teacher.education && (
                                            <p className="text-[11px] text-slate-500 flex items-center justify-center gap-1.5 mt-1">
                                                <Award className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                                <span>{teacher.education}</span>
                                            </p>
                                        )}
                                    </div>

                                    {teacher.bio && (
                                        <p className="text-xs text-slate-500 line-clamp-2 border-t border-slate-100 pt-2 italic">
                                            "{teacher.bio}"
                                        </p>
                                    )}
                                </div>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-lg mx-auto space-y-3">
                        <GraduationCap className="w-12 h-12 mx-auto text-slate-300" />
                        <h3 className="text-lg font-bold text-slate-800">Belum Ada Data Guru</h3>
                        <p className="text-sm text-slate-500">
                            Tidak ditemukan data guru yang sesuai dengan kata kunci pencarian Anda.
                        </p>
                    </div>
                )}

                {/* Pagination */}
                {teachers.links && (
                    <div className="mt-12">
                        <Pagination links={teachers.links} />
                    </div>
                )}
            </section>
        </PublicLayout>
    );
}
