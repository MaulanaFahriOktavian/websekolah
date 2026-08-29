import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Menu, X, GraduationCap, Phone, Mail, Clock, ArrowRight } from 'lucide-react';
import Button from '../Common/Button';

export default function Navbar() {
    const { url, props } = usePage();
    const { school } = props;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const schoolName = school?.name || 'SMA Harapan Bangsa';
    const schoolTagline = school?.tagline || 'Sekolah Unggul Berkarakter';
    const contact = school?.contact || {};

    const navLinks = [
        { label: 'Beranda', href: '/', active: url === '/' },
        { label: 'Berita', href: '/berita', active: url.startsWith('/berita') },
        { label: 'Pengumuman', href: '/pengumuman', active: url.startsWith('/pengumuman') },
        { label: 'Guru', href: '/guru', active: url.startsWith('/guru') },
        { label: 'Staf', href: '/staf', active: url.startsWith('/staf') },
        { label: 'Fasilitas', href: '/fasilitas', active: url.startsWith('/fasilitas') },
        { label: 'Prestasi', href: '/prestasi', active: url.startsWith('/prestasi') },
    ];

    return (
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-xs">
            {/* Topbar Info */}
            <div className="hidden lg:block bg-slate-900 text-slate-300 text-xs py-2 px-6">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        {contact.phone && (
                            <div className="flex items-center gap-1.5 hover:text-white transition-colors">
                                <Phone className="w-3.5 h-3.5 text-indigo-400" />
                                <span>{contact.phone}</span>
                            </div>
                        )}
                        {contact.email && (
                            <div className="flex items-center gap-1.5 hover:text-white transition-colors">
                                <Mail className="w-3.5 h-3.5 text-indigo-400" />
                                <span>{contact.email}</span>
                            </div>
                        )}
                        {contact.office_hours && (
                            <div className="flex items-center gap-1.5 text-slate-400">
                                <Clock className="w-3.5 h-3.5 text-slate-400" />
                                <span>{contact.office_hours}</span>
                            </div>
                        )}
                    </div>
                    <div className="flex items-center gap-3">
                        <Link
                            href="/admin"
                            className="text-slate-300 hover:text-white transition-colors font-medium flex items-center gap-1"
                        >
                            <span>Panel Admin</span>
                            <ArrowRight className="w-3 h-3" />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Main Navbar */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Brand */}
                    <Link href="/" className="flex items-center gap-3.5 group">
                        <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-indigo-200 group-hover:scale-105 transition-transform duration-200">
                            <GraduationCap className="w-6 h-6" />
                        </div>
                        <div>
                            <span className="block font-bold text-slate-900 text-lg leading-tight tracking-tight">
                                {schoolName}
                            </span>
                            <span className="block text-xs font-medium text-slate-500 tracking-wide line-clamp-1">
                                {schoolTagline}
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-1">
                        {navLinks.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                                    item.active
                                        ? 'text-indigo-600 bg-indigo-50/70 font-semibold'
                                        : 'text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/50'
                                }`}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Right Action */}
                    <div className="hidden md:flex items-center gap-3">
                        <Button
                            href="/admin"
                            variant="primary"
                            size="sm"
                        >
                            Portal Sekolah
                        </Button>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <div className="flex md:hidden">
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
                            aria-label="Toggle Menu"
                        >
                            {mobileMenuOpen ? (
                                <X className="w-6 h-6" />
                            ) : (
                                <Menu className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {mobileMenuOpen && (
                <div className="md:hidden border-t border-slate-100 bg-white px-4 pt-3 pb-6 space-y-2 shadow-lg">
                    {navLinks.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className={`block px-3 py-2.5 rounded-lg text-base font-medium ${
                                item.active
                                    ? 'bg-indigo-50 text-indigo-600 font-semibold'
                                    : 'text-slate-700 hover:bg-indigo-50 hover:text-indigo-600'
                            }`}
                        >
                            {item.label}
                        </Link>
                    ))}
                    <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
                        <Button
                            href="/admin"
                            variant="primary"
                            className="w-full"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Masuk Panel Admin
                        </Button>
                    </div>
                </div>
            )}
        </header>
    );
}
