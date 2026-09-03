import React, { useState, useRef, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import {
    Menu,
    X,
    ChevronDown,
    Building2,
    Sparkles,
    BookOpen,
    Users,
    GraduationCap,
    Trophy,
    Bell,
    Image,
} from 'lucide-react';

export default function Navbar() {
    const { url, props } = usePage();
    const { school } = props;

    const [mobileOpen, setMobileOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null); // 'tentang' | 'informasi' | null
    const dropdownRef = useRef(null);

    const schoolName = school?.name || 'Sekolah';
    const schoolTagline = school?.tagline || 'Situs Resmi Lembaga Pendidikan';
    const logoPath = school?.logo_path
        ? `/storage/${school.logo_path.replace(/^\/?storage\/?/, '')}`
        : null;

    // Close desktop dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpenDropdown(null);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Close menus on URL change
    useEffect(() => {
        setMobileOpen(false);
        setOpenDropdown(null);
    }, [url]);

    const isTentangActive =
        url.startsWith('/tentang') ||
        url.startsWith('/visi-misi') ||
        url.startsWith('/guru') ||
        url.startsWith('/staf');

    const isInformasiActive =
        url.startsWith('/fasilitas') ||
        url.startsWith('/prestasi') ||
        url.startsWith('/pengumuman') ||
        url.startsWith('/galeri');

    return (
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Brand / Logo */}
                    <Link href="/" className="flex items-center gap-3.5 min-w-0 group">
                        {logoPath ? (
                            <img
                                src={logoPath}
                                alt={schoolName}
                                className="h-10 w-10 object-contain shrink-0 rounded-lg p-0.5 border border-slate-200 bg-white shadow-xs"
                            />
                        ) : (
                            <div className="h-10 w-10 rounded-lg bg-slate-900 text-white flex items-center justify-center shrink-0 border border-slate-800">
                                <GraduationCap className="w-5 h-5 text-amber-400" />
                            </div>
                        )}
                        <div className="min-w-0">
                            <span className="block font-bold text-slate-900 text-base sm:text-lg tracking-tight truncate leading-tight group-hover:text-indigo-900 transition-colors">
                                {schoolName}
                            </span>
                            <span className="block text-xs text-slate-500 font-normal tracking-wide truncate line-clamp-1 mt-0.5">
                                {schoolTagline}
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Navigation Links */}
                    <nav ref={dropdownRef} className="hidden md:flex items-center gap-1 text-sm font-medium">
                        {/* Beranda */}
                        <Link
                            href="/"
                            className={`px-3.5 py-2 rounded-lg transition-colors ${
                                url === '/'
                                    ? 'text-indigo-700 bg-indigo-50/70 font-semibold'
                                    : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100/70'
                            }`}
                        >
                            Beranda
                        </Link>

                        {/* Dropdown 1: Tentang */}
                        <div className="relative">
                            <button
                                type="button"
                                onClick={() =>
                                    setOpenDropdown(openDropdown === 'tentang' ? null : 'tentang')
                                }
                                aria-expanded={openDropdown === 'tentang'}
                                className={`inline-flex items-center gap-1 px-3.5 py-2 rounded-lg transition-colors cursor-pointer ${
                                    isTentangActive
                                        ? 'text-indigo-700 bg-indigo-50/70 font-semibold'
                                        : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100/70'
                                }`}
                            >
                                <span>Tentang</span>
                                <ChevronDown
                                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                                        openDropdown === 'tentang' ? 'rotate-180' : ''
                                    }`}
                                />
                            </button>

                            {openDropdown === 'tentang' && (
                                <div className="absolute left-0 mt-1.5 w-56 bg-white rounded-xl shadow-lg border border-slate-200/80 py-2 z-50">
                                    <Link
                                        href="/tentang"
                                        className="flex items-center gap-2.5 px-4 py-2.5 text-xs sm:text-sm text-slate-700 hover:bg-slate-50 hover:text-indigo-700 transition-colors"
                                    >
                                        <Building2 className="w-4 h-4 text-slate-400" />
                                        <span>Profil Sekolah</span>
                                    </Link>
                                    <Link
                                        href="/visi-misi"
                                        className="flex items-center gap-2.5 px-4 py-2.5 text-xs sm:text-sm text-slate-700 hover:bg-slate-50 hover:text-indigo-700 transition-colors"
                                    >
                                        <BookOpen className="w-4 h-4 text-slate-400" />
                                        <span>Visi & Misi</span>
                                    </Link>
                                    <div className="my-1 border-t border-slate-100" />
                                    <Link
                                        href="/guru"
                                        className="flex items-center gap-2.5 px-4 py-2.5 text-xs sm:text-sm text-slate-700 hover:bg-slate-50 hover:text-indigo-700 transition-colors"
                                    >
                                        <GraduationCap className="w-4 h-4 text-slate-400" />
                                        <span>Dewan Guru</span>
                                    </Link>
                                    <Link
                                        href="/staf"
                                        className="flex items-center gap-2.5 px-4 py-2.5 text-xs sm:text-sm text-slate-700 hover:bg-slate-50 hover:text-indigo-700 transition-colors"
                                    >
                                        <Users className="w-4 h-4 text-slate-400" />
                                        <span>Tenaga Kependidikan</span>
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Dropdown 2: Informasi */}
                        <div className="relative">
                            <button
                                type="button"
                                onClick={() =>
                                    setOpenDropdown(openDropdown === 'informasi' ? null : 'informasi')
                                }
                                aria-expanded={openDropdown === 'informasi'}
                                className={`inline-flex items-center gap-1 px-3.5 py-2 rounded-lg transition-colors cursor-pointer ${
                                    isInformasiActive
                                        ? 'text-indigo-700 bg-indigo-50/70 font-semibold'
                                        : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100/70'
                                }`}
                            >
                                <span>Informasi</span>
                                <ChevronDown
                                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                                        openDropdown === 'informasi' ? 'rotate-180' : ''
                                    }`}
                                />
                            </button>

                            {openDropdown === 'informasi' && (
                                <div className="absolute left-0 mt-1.5 w-56 bg-white rounded-xl shadow-lg border border-slate-200/80 py-2 z-50">
                                    <Link
                                        href="/fasilitas"
                                        className="flex items-center gap-2.5 px-4 py-2.5 text-xs sm:text-sm text-slate-700 hover:bg-slate-50 hover:text-indigo-700 transition-colors"
                                    >
                                        <Sparkles className="w-4 h-4 text-slate-400" />
                                        <span>Sarana & Fasilitas</span>
                                    </Link>
                                    <Link
                                        href="/prestasi"
                                        className="flex items-center gap-2.5 px-4 py-2.5 text-xs sm:text-sm text-slate-700 hover:bg-slate-50 hover:text-indigo-700 transition-colors"
                                    >
                                        <Trophy className="w-4 h-4 text-slate-400" />
                                        <span>Prestasi Sekolah</span>
                                    </Link>
                                    <Link
                                        href="/pengumuman"
                                        className="flex items-center gap-2.5 px-4 py-2.5 text-xs sm:text-sm text-slate-700 hover:bg-slate-50 hover:text-indigo-700 transition-colors"
                                    >
                                        <Bell className="w-4 h-4 text-slate-400" />
                                        <span>Pengumuman Resmi</span>
                                    </Link>
                                    <Link
                                        href="/galeri"
                                        className="flex items-center gap-2.5 px-4 py-2.5 text-xs sm:text-sm text-slate-700 hover:bg-slate-50 hover:text-indigo-700 transition-colors"
                                    >
                                        <Image className="w-4 h-4 text-slate-400" />
                                        <span>Galeri Foto</span>
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Berita */}
                        <Link
                            href="/berita"
                            className={`px-3.5 py-2 rounded-lg transition-colors ${
                                url.startsWith('/berita')
                                    ? 'text-indigo-700 bg-indigo-50/70 font-semibold'
                                    : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100/70'
                            }`}
                        >
                            Berita
                        </Link>

                        {/* Kontak */}
                        <Link
                            href="/kontak"
                            className={`px-3.5 py-2 rounded-lg transition-colors ${
                                url.startsWith('/kontak')
                                    ? 'text-indigo-700 bg-indigo-50/70 font-semibold'
                                    : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100/70'
                            }`}
                        >
                            Kontak
                        </Link>
                    </nav>

                    {/* Right CTA */}
                    <div className="hidden md:flex items-center gap-3">
                        <Link
                            href="/kontak"
                            className="inline-flex items-center justify-center px-4 py-2 text-xs font-semibold uppercase tracking-wider text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/80 rounded-lg border border-slate-200/80 transition-colors"
                        >
                            Hubungi Sekolah
                        </Link>
                    </div>

                    {/* Mobile Toggle Button */}
                    <div className="flex md:hidden items-center gap-2">
                        <button
                            type="button"
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
                            aria-label="Buka Menu Navigasi"
                        >
                            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation Drawer */}
            {mobileOpen && (
                <div className="md:hidden border-t border-slate-200/80 bg-white px-4 pt-3 pb-6 space-y-3 max-h-[85vh] overflow-y-auto">
                    {/* Primary Links */}
                    <div className="space-y-1">
                        <Link
                            href="/"
                            className={`block px-3 py-2 rounded-lg text-sm font-medium ${
                                url === '/'
                                    ? 'bg-indigo-50 text-indigo-700 font-semibold'
                                    : 'text-slate-700 hover:bg-slate-50'
                            }`}
                        >
                            Beranda
                        </Link>

                        {/* Group Tentang */}
                        <div className="pt-2">
                            <span className="block px-3 pb-1 text-xs font-semibold uppercase tracking-wider text-slate-400">
                                Tentang Sekolah
                            </span>
                            <div className="space-y-0.5 pl-2">
                                <Link
                                    href="/tentang"
                                    className="block px-3 py-1.5 rounded-lg text-sm text-slate-700 hover:bg-slate-50"
                                >
                                    Profil Sekolah
                                </Link>
                                <Link
                                    href="/visi-misi"
                                    className="block px-3 py-1.5 rounded-lg text-sm text-slate-700 hover:bg-slate-50"
                                >
                                    Visi & Misi
                                </Link>
                                <Link
                                    href="/guru"
                                    className="block px-3 py-1.5 rounded-lg text-sm text-slate-700 hover:bg-slate-50"
                                >
                                    Dewan Guru
                                </Link>
                                <Link
                                    href="/staf"
                                    className="block px-3 py-1.5 rounded-lg text-sm text-slate-700 hover:bg-slate-50"
                                >
                                    Tenaga Kependidikan
                                </Link>
                            </div>
                        </div>

                        {/* Group Informasi */}
                        <div className="pt-2">
                            <span className="block px-3 pb-1 text-xs font-semibold uppercase tracking-wider text-slate-400">
                                Informasi & Layanan
                            </span>
                            <div className="space-y-0.5 pl-2">
                                <Link
                                    href="/fasilitas"
                                    className="block px-3 py-1.5 rounded-lg text-sm text-slate-700 hover:bg-slate-50"
                                >
                                    Sarana & Fasilitas
                                </Link>
                                <Link
                                    href="/prestasi"
                                    className="block px-3 py-1.5 rounded-lg text-sm text-slate-700 hover:bg-slate-50"
                                >
                                    Prestasi Sekolah
                                </Link>
                                <Link
                                    href="/pengumuman"
                                    className="block px-3 py-1.5 rounded-lg text-sm text-slate-700 hover:bg-slate-50"
                                >
                                    Pengumuman Resmi
                                </Link>
                                <Link
                                    href="/galeri"
                                    className="block px-3 py-1.5 rounded-lg text-sm text-slate-700 hover:bg-slate-50"
                                >
                                    Galeri Foto
                                </Link>
                            </div>
                        </div>

                        {/* Single Links */}
                        <div className="pt-2">
                            <Link
                                href="/berita"
                                className={`block px-3 py-2 rounded-lg text-sm font-medium ${
                                    url.startsWith('/berita')
                                        ? 'bg-indigo-50 text-indigo-700 font-semibold'
                                        : 'text-slate-700 hover:bg-slate-50'
                                }`}
                            >
                                Berita & Informasi Terkini
                            </Link>
                            <Link
                                href="/kontak"
                                className={`block px-3 py-2 rounded-lg text-sm font-medium ${
                                    url.startsWith('/kontak')
                                        ? 'bg-indigo-50 text-indigo-700 font-semibold'
                                        : 'text-slate-700 hover:bg-slate-50'
                                }`}
                            >
                                Kontak & Layanan Informasi
                            </Link>
                        </div>
                    </div>

                </div>
            )}
        </header>
    );
}
