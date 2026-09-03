import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import {
    GraduationCap,
    MapPin,
    Phone,
    Mail,
    Award,
    Clock,
    ArrowUpRight,
} from 'lucide-react';

function InstagramIcon(props) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
    );
}

function FacebookIcon(props) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
    );
}

function YoutubeIcon(props) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
            <path d="m10 15 5-3-5-3z" />
        </svg>
    );
}

function TikTokIcon(props) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
        </svg>
    );
}

export default function Footer() {
    const { school } = usePage().props;

    const schoolName = school?.name || 'Sekolah Kami';
    const schoolTagline =
        school?.tagline ||
        'Lembaga pendidikan yang berkomitmen membina generasi cerdas, berkarakter, dan berintegritas.';
    const npsn = school?.npsn || null;
    const accreditation = school?.accreditation || null;
    const establishedYear =
        school?.established_year ?? school?.founded_year ?? null;
    const address = school?.address || school?.contact?.address || null;
    const phone = school?.phone || school?.contact?.phone || null;
    const email = school?.email || school?.contact?.email || null;
    const logoPath = school?.logo_path
        ? `/storage/${school.logo_path.replace(/^\/?storage\/?/, '')}`
        : null;

    const facebookUrl = school?.facebook_url || null;
    const instagramUrl = school?.instagram_url || null;
    const youtubeUrl = school?.youtube_url || null;
    const tiktokUrl = school?.tiktok_url || null;

    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-slate-950 text-slate-400 border-t border-slate-800">
            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-14">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
                    {/* Col 1: Identity & Description (4 cols) */}
                    <div className="lg:col-span-4 space-y-3.5">
                        <div className="flex items-center gap-3">
                            {logoPath ? (
                                <img
                                    src={logoPath}
                                    alt={schoolName}
                                    className="h-9 w-9 object-contain rounded-lg p-0.5 bg-white shrink-0"
                                />
                            ) : (
                                <div className="h-9 w-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-amber-400 shrink-0">
                                    <GraduationCap className="w-5 h-5" />
                                </div>
                            )}
                            <span className="font-bold text-white text-base sm:text-lg tracking-tight">
                                {schoolName}
                            </span>
                        </div>

                        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                            {schoolTagline}
                        </p>

                        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                            {accreditation && (
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300">
                                    <Award className="w-3.5 h-3.5 text-amber-400" />
                                    <span>Akreditasi: {accreditation}</span>
                                </span>
                            )}
                            {npsn && (
                                <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300 font-mono">
                                    NPSN: {npsn}
                                </span>
                            )}
                            {establishedYear && (
                                <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-400">
                                    Berdiri: {establishedYear}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Col 2: Navigation - Profil (2 cols) */}
                    <div className="lg:col-span-2 space-y-3">
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
                            Profil
                        </h4>
                        <ul className="space-y-2 text-xs sm:text-sm">
                            <li>
                                <Link href="/tentang" className="hover:text-white transition-colors">
                                    Profil Sekolah
                                </Link>
                            </li>
                            <li>
                                <Link href="/visi-misi" className="hover:text-white transition-colors">
                                    Visi & Misi
                                </Link>
                            </li>
                            <li>
                                <Link href="/guru" className="hover:text-white transition-colors">
                                    Dewan Guru
                                </Link>
                            </li>
                            <li>
                                <Link href="/staf" className="hover:text-white transition-colors">
                                    Staf Tata Usaha
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Col 3: Navigation - Informasi (2 cols) */}
                    <div className="lg:col-span-2 space-y-3">
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
                            Informasi
                        </h4>
                        <ul className="space-y-2 text-xs sm:text-sm">
                            <li>
                                <Link href="/fasilitas" className="hover:text-white transition-colors">
                                    Sarana & Fasilitas
                                </Link>
                            </li>
                            <li>
                                <Link href="/prestasi" className="hover:text-white transition-colors">
                                    Prestasi Siswa
                                </Link>
                            </li>
                            <li>
                                <Link href="/berita" className="hover:text-white transition-colors">
                                    Kabar & Berita
                                </Link>
                            </li>
                            <li>
                                <Link href="/pengumuman" className="hover:text-white transition-colors">
                                    Pengumuman Resmi
                                </Link>
                            </li>
                            <li>
                                <Link href="/galeri" className="hover:text-white transition-colors">
                                    Galeri Kegiatan
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Col 4: Kontak & Saluran Resmi (4 cols) */}
                    <div className="lg:col-span-4 space-y-3">
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
                            Kontak & Lokasi
                        </h4>
                        <div className="space-y-2 text-xs sm:text-sm">
                            {address && (
                                <div className="flex items-start gap-2.5">
                                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                                    <span>{address}</span>
                                </div>
                            )}
                            {phone && (
                                <div className="flex items-center gap-2.5">
                                    <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                    <a href={`tel:${phone.replace(/[^0-9+]/g, '')}`} className="hover:text-white transition-colors">
                                        {phone}
                                    </a>
                                </div>
                            )}
                            {email && (
                                <div className="flex items-center gap-2.5">
                                    <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                    <a href={`mailto:${email}`} className="hover:text-white transition-colors">
                                        {email}
                                    </a>
                                </div>
                            )}
                            <div className="flex items-center gap-2.5 text-slate-400">
                                <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                <span>Senin – Jumat: 07.00 – 15.30 WIB</span>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="pt-2 flex items-center gap-2">
                            {instagramUrl && (
                                <a
                                    href={instagramUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Instagram Resmi Sekolah"
                                    className="p-1.5 rounded-md bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors"
                                >
                                    <InstagramIcon className="w-3.5 h-3.5" />
                                </a>
                            )}
                            {facebookUrl && (
                                <a
                                    href={facebookUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Facebook Resmi Sekolah"
                                    className="p-1.5 rounded-md bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors"
                                >
                                    <FacebookIcon className="w-3.5 h-3.5" />
                                </a>
                            )}
                            {youtubeUrl && (
                                <a
                                    href={youtubeUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="YouTube Resmi Sekolah"
                                    className="p-1.5 rounded-md bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors"
                                >
                                    <YoutubeIcon className="w-3.5 h-3.5" />
                                </a>
                            )}
                            {tiktokUrl && (
                                <a
                                    href={tiktokUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="TikTok Resmi Sekolah"
                                    className="p-1.5 rounded-md bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors"
                                >
                                    <TikTokIcon className="w-3.5 h-3.5" />
                                </a>
                            )}
                            <Link
                                href="/kontak"
                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs transition-colors ml-1"
                            >
                                <span>Peta & Formulir</span>
                                <ArrowUpRight className="w-3 h-3" />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-10 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
                    <p>
                        &copy; {currentYear} {schoolName}. Hak Cipta Dilindungi Undang-Undang.
                    </p>
                    <div className="flex items-center gap-3 text-slate-400">
                        <Link href="/tentang" className="hover:text-slate-300 transition-colors">
                            Tentang
                        </Link>
                        <span>&bull;</span>
                        <Link href="/kontak" className="hover:text-slate-300 transition-colors">
                            Kontak
                        </Link>
                        <span>&bull;</span>
                        <Link href="/login" className="hover:text-slate-300 transition-colors">
                            Portal Admin
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
