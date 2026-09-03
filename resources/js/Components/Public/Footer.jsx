import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { GraduationCap, MapPin, Phone, Mail, Clock, Award } from 'lucide-react';

export default function Footer() {
    const { school } = usePage().props;

    const schoolName = school?.name || 'Sekolah';
    const schoolTagline = school?.tagline || 'Website Resmi Sekolah';
    const npsn = school?.npsn || null;
    const accreditation = school?.accreditation || null;
    const establishedYear = school?.established_year ?? school?.founded_year ?? null;
    const contact = school?.contact || {};
    const social = school?.social || {};
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-slate-950 text-slate-300 border-t border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {/* Column 1: School Identity */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md">
                                <GraduationCap className="w-5 h-5" />
                            </div>
                            <span className="font-bold text-white text-lg">
                                {schoolName}
                            </span>
                        </div>
                        <p className="text-sm text-slate-400 leading-relaxed">
                            {schoolTagline}
                        </p>
                        {(accreditation || npsn) && (
                            <div className="flex flex-wrap items-center gap-2 pt-2">
                                {accreditation && (
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-xs text-slate-300">
                                        <Award className="w-3.5 h-3.5 text-amber-400" />
                                        Akreditasi: {accreditation}
                                    </span>
                                )}
                                {npsn && (
                                    <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-xs text-slate-300">
                                        NPSN: {npsn}
                                    </span>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Column 2: Quick Links */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
                            Navigasi
                        </h4>
                        <ul className="space-y-2.5 text-sm">
                            <li>
                                <Link href="/" className="hover:text-indigo-400 transition-colors">
                                    Beranda
                                </Link>
                            </li>
                            <li>
                                <a href="#tentang" className="hover:text-indigo-400 transition-colors">
                                    Profil Sekolah
                                </a>
                            </li>
                            <li>
                                <a href="#akademik" className="hover:text-indigo-400 transition-colors">
                                    Program Akademik
                                </a>
                            </li>
                            <li>
                                <a href="#berita" className="hover:text-indigo-400 transition-colors">
                                    Informasi & Pengumuman
                                </a>
                            </li>
                            <li>
                                <Link href="/admin" className="hover:text-indigo-400 transition-colors">
                                    Portal CMS
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 3: Contact Details */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
                            Kontak & Lokasi
                        </h4>
                        <ul className="space-y-3 text-sm text-slate-400">
                            {contact.address && (
                                <li className="flex items-start gap-2.5">
                                    <MapPin className="w-4 h-4 text-indigo-400 shrink-0 mt-1" />
                                    <span>{contact.address}</span>
                                </li>
                            )}
                            {contact.phone && (
                                <li className="flex items-center gap-2.5">
                                    <Phone className="w-4 h-4 text-indigo-400 shrink-0" />
                                    <span>{contact.phone}</span>
                                </li>
                            )}
                            {contact.email && (
                                <li className="flex items-center gap-2.5">
                                    <Mail className="w-4 h-4 text-indigo-400 shrink-0" />
                                    <span>{contact.email}</span>
                                </li>
                            )}
                            {contact.office_hours && (
                                <li className="flex items-center gap-2.5">
                                    <Clock className="w-4 h-4 text-indigo-400 shrink-0" />
                                    <span>{contact.office_hours}</span>
                                </li>
                            )}
                        </ul>
                    </div>

                    {/* Column 4: Social / Est */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
                            Informasi Tambahan
                        </h4>
                        <p className="text-sm text-slate-400 leading-relaxed">
                            Mencetak generasi penerus bangsa yang unggul, berkarakter, dan berintegritas tinggi{establishedYear ? ` sejak tahun ${establishedYear}` : ''}.
                        </p>
                        <div className="pt-2 flex items-center gap-3 text-slate-400 text-xs">
                            <span>Kunjungi kanal media sosial resmi sekolah kami.</span>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
                    <p>
                        &copy; {currentYear} {schoolName}. All rights reserved.
                    </p>
                    <p className="text-slate-500">
                        School CMS Platform &bull; Powered by Laravel & React
                    </p>
                </div>
            </div>
        </footer>
    );
}
