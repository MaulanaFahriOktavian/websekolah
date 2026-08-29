import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import {
    LayoutDashboard,
    GraduationCap,
    Globe,
    Settings,
    FileText,
    Bell,
    FolderKanban,
    Users,
    Building2,
    Trophy,
    Image,
    Calendar,
    ChevronRight,
} from 'lucide-react';

export default function AdminSidebar({ isOpen, setIsOpen }) {
    const { url, props } = usePage();
    const { school } = props;
    const schoolName = school?.name || 'School CMS';

    const menuItems = [
        {
            title: 'Utama',
            items: [
                {
                    label: 'Dashboard',
                    href: '/admin',
                    icon: LayoutDashboard,
                    active: url === '/admin' || url === '/admin/dashboard',
                },
            ],
        },
        {
            title: 'Konten Website',
            items: [
                {
                    label: 'Berita & Artikel',
                    href: '/admin/news',
                    icon: FileText,
                    active: url.startsWith('/admin/news'),
                },
                {
                    label: 'Pengumuman',
                    href: '/admin/announcements',
                    icon: Bell,
                    active: url.startsWith('/admin/announcements'),
                },
                {
                    label: 'Kategori Berita',
                    href: '/admin/categories',
                    icon: FolderKanban,
                    active: url.startsWith('/admin/categories'),
                },
            ],
        },
        {
            title: 'Direktori & Fasilitas',
            items: [
                {
                    label: 'Data Guru',
                    href: '/admin/teachers',
                    icon: GraduationCap,
                    active: url.startsWith('/admin/teachers'),
                },
                {
                    label: 'Tenaga Kependidikan',
                    href: '/admin/staff',
                    icon: Users,
                    active: url.startsWith('/admin/staff'),
                },
                {
                    label: 'Fasilitas Sekolah',
                    href: '/admin/facilities',
                    icon: Building2,
                    active: url.startsWith('/admin/facilities'),
                },
                {
                    label: 'Prestasi Siswa',
                    href: '/admin/achievements',
                    icon: Trophy,
                    active: url.startsWith('/admin/achievements'),
                },
            ],
        },
        {
            title: 'Konfigurasi',
            items: [
                {
                    label: 'Profil Sekolah',
                    href: '/admin/school-profile',
                    icon: Settings,
                    active: url === '/admin/school-profile',
                },
            ],
        },
        {
            title: 'Modul CMS (Mendatang)',
            items: [
                {
                    label: 'Galeri Foto & Video',
                    href: '#',
                    icon: Image,
                    badge: 'Segera',
                    disabled: true,
                },
                {
                    label: 'Agenda & Kegiatan',
                    href: '#',
                    icon: Calendar,
                    badge: 'Segera',
                    disabled: true,
                },
            ],
        },
    ];

    return (
        <>
            {/* Mobile backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden backdrop-blur-xs transition-opacity"
                    onClick={() => setIsOpen(false)}
                />
            )}

            <aside
                className={`fixed top-0 left-0 bottom-0 z-50 w-64 bg-slate-900 text-slate-300 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                {/* Header / Brand */}
                <div className="h-16 px-6 flex items-center justify-between border-b border-slate-800">
                    <Link href="/admin" className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-sm">
                            <GraduationCap className="w-4 h-4" />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-bold text-white text-sm leading-tight line-clamp-1">
                                {schoolName}
                            </span>
                            <span className="text-[11px] font-medium text-indigo-400">
                                Admin CMS
                            </span>
                        </div>
                    </Link>
                </div>

                {/* Navigation Items */}
                <div className="flex-1 px-4 py-6 overflow-y-auto space-y-6">
                    {menuItems.map((group, groupIdx) => (
                        <div key={groupIdx} className="space-y-1">
                            <p className="px-3 text-[11px] font-semibold tracking-wider text-slate-500 uppercase">
                                {group.title}
                            </p>
                            <div className="mt-2 space-y-1">
                                {group.items.map((item, itemIdx) => {
                                    const Icon = item.icon;
                                    const content = (
                                        <>
                                            <Icon
                                                className={`w-4 h-4 shrink-0 ${
                                                    item.active
                                                        ? 'text-white'
                                                        : 'text-slate-400 group-hover:text-white'
                                                }`}
                                            />
                                            <span className="flex-1 text-sm font-medium">
                                                {item.label}
                                            </span>
                                            {item.badge && (
                                                <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700 font-medium">
                                                    {item.badge}
                                                </span>
                                            )}
                                            {item.active && (
                                                <ChevronRight className="w-3.5 h-3.5 text-white shrink-0" />
                                            )}
                                        </>
                                    );

                                    if (item.disabled) {
                                        return (
                                            <div
                                                key={itemIdx}
                                                className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-500 cursor-not-allowed opacity-60"
                                            >
                                                {content}
                                            </div>
                                        );
                                    }

                                    return (
                                        <Link
                                            key={itemIdx}
                                            href={item.href}
                                            className={`group flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                                                item.active
                                                    ? 'bg-indigo-600 text-white font-semibold shadow-xs'
                                                    : 'text-slate-400 hover:text-white hover:bg-slate-800/70'
                                            }`}
                                        >
                                            {content}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer Section: View Website */}
                <div className="p-4 border-t border-slate-800">
                    <Link
                        href="/"
                        className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors"
                    >
                        <Globe className="w-3.5 h-3.5" />
                        <span>Lihat Website Publik</span>
                    </Link>
                </div>
            </aside>
        </>
    );
}
