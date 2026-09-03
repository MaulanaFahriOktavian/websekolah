import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import PublicLayout from '../../Layouts/PublicLayout';
import {
    ArrowRight,
    MapPin,
    Phone,
    Mail,
    Clock,
    ExternalLink,
    ChevronRight,
} from 'lucide-react';

export default function Home() {
    const { school } = usePage().props;

    const schoolName = school?.name || 'Sekolah Kami';
    const schoolShortName = school?.short_name || '';
    const tagline =
        school?.tagline ||
        'Membina Peserta Didik Berkarakter, Cerdas, dan Berintegritas';
    const description =
        school?.description ||
        'Lembaga pendidikan formal yang berkomitmen menyelenggarakan pembelajaran bermutu, adaptif, dan berorientasi pada kemandirian siswa.';
    const vision = school?.vision || null;
    const mission = school?.mission || null;
    const address = school?.address || school?.contact?.address || null;
    const phone = school?.phone || school?.contact?.phone || null;
    const email = school?.email || school?.contact?.email || null;
    const mapsUrl = school?.maps_url || null;
    const heroImage = school?.hero_image_path
        ? `/storage/${school.hero_image_path.replace(/^\/?storage\/?/, '')}`
        : null;

    // Parse mission lines into clean list
    const missionLines = mission
        ? mission
              .split('\n')
              .map((line) => line.trim())
              .filter(Boolean)
        : [];

    const highlights = [
        {
            number: '01',
            title: 'Pembelajaran Berkualitas',
            description:
                'Pendekatan belajar yang menitikberatkan pada penguasaan konsep esensial, literasi, numerasi, serta kemampuan bernalar kritis.',
        },
        {
            number: '02',
            title: 'Pengembangan Karakter',
            description:
                'Penanaman nilai budi pekerti luhur, kedisiplinan, kejujuran, dan rasa tanggung jawab sosial melalui pembiasaan harian terpadu.',
        },
        {
            number: '03',
            title: 'Pengembangan Bakat & Prestasi',
            description:
                'Wadah bimbingan terstruktur untuk mengembangkan potensi siswa di bidang sains, keolahragaan, kepramukaan, dan kreativitas seni.',
        },
        {
            number: '04',
            title: 'Lingkungan Belajar',
            description:
                'Kawasan sekolah yang asri, tertib, dan aman dengan dukungan sarana prasarana yang terpelihara untuk kenyamanan proses belajar.',
        },
    ];

    return (
        <PublicLayout
            title="Beranda"
            description={tagline}
            image={heroImage}
            ogType="website"
        >
            {/* 1. HERO SECTION — FULL-WIDTH EDITORIAL PHOTOGRAPHY BACKGROUND */}
            <section className="relative w-full min-h-[620px] sm:min-h-[660px] lg:min-h-[720px] xl:min-h-[760px] flex items-center bg-slate-950 text-white overflow-hidden">
                {/* School Photo as Background */}
                {heroImage ? (
                    <div
                        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
                        style={{ backgroundImage: `url('${heroImage}')` }}
                        role="img"
                        aria-label={`Gedung dan lingkungan ${schoolName}`}
                    />
                ) : (
                    <div className="absolute inset-0 w-full h-full bg-slate-900 bg-gradient-to-b from-slate-900 to-slate-950" />
                )}

                {/* Editorial Directional Dark Overlay */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background:
                            'linear-gradient(90deg, rgba(8, 15, 30, 0.88) 0%, rgba(8, 15, 30, 0.72) 42%, rgba(8, 15, 30, 0.35) 100%)',
                    }}
                />

                {/* Left-Aligned Hero Content (max-w ~680px) */}
                <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
                    <div className="max-w-[680px] space-y-5">
                        {/* Small Eyebrow */}
                        <span className="inline-block text-xs sm:text-sm font-semibold uppercase tracking-widest text-slate-300 drop-shadow-xs">
                            PROFIL LEMBAGA PENDIDIKAN
                        </span>

                        {/* H1: High weight, large font, tight line-height, white */}
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] drop-shadow-xs">
                            {schoolName}
                        </h1>

                        {/* Description / Tagline: 1-2 lines on desktop */}
                        <p className="text-base sm:text-lg lg:text-xl text-slate-200 font-normal leading-relaxed max-w-2xl line-clamp-3 lg:line-clamp-2 drop-shadow-xs">
                            {tagline || description}
                        </p>

                        {/* CTAs: Simple primary solid + secondary transparent outline */}
                        <div className="pt-3 flex flex-wrap items-center gap-4">
                            <Link
                                href="/tentang"
                                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-white hover:bg-slate-100 text-slate-950 text-sm font-semibold tracking-wide transition-colors shadow-sm"
                            >
                                <span>Profil Sekolah</span>
                                <ArrowRight className="w-4 h-4 text-slate-950" />
                            </Link>
                            <Link
                                href="/fasilitas"
                                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-transparent hover:bg-white/10 text-white border border-white/40 hover:border-white text-sm font-semibold tracking-wide transition-colors"
                            >
                                <span>Jelajahi Informasi</span>
                                <ChevronRight className="w-4 h-4 text-white/70" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. KEUNGGULAN SECTION — 4 EDITORIAL ITEMS (01, 02, 03, 04) */}
            <section id="keunggulan" className="py-16 lg:py-24 bg-slate-50 border-b border-slate-200/80">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Section Heading */}
                    <div className="max-w-2xl space-y-2 mb-12 lg:mb-16">
                        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                            Komitmen Pendidikan
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                            Pilar Pembinaan dan Mutu Pembelajaran
                        </h2>
                        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                            Fokus kelembagaan dalam membimbing perkembangan nalar, budi pekerti, dan kecakapan siswa secara seimbang.
                        </p>
                    </div>

                    {/* 4 Items in Editorial Layout */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
                        {highlights.map((item) => (
                            <div
                                key={item.number}
                                className="flex flex-col justify-between pt-5 border-t border-slate-300 space-y-3"
                            >
                                <div>
                                    <span className="block font-mono text-xl font-bold text-slate-400 mb-3">
                                        {item.number}
                                    </span>
                                    <h3 className="text-base font-bold text-slate-900 tracking-tight mb-2">
                                        {item.title}
                                    </h3>
                                    <p className="text-sm text-slate-600 leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3. VISI & MISI SECTION — INSTITUTIONAL CONTENT BLOCK */}
            {(vision || mission) && (
                <section className="py-16 lg:py-24 bg-white border-b border-slate-200/80">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-8 sm:p-12 lg:p-14">
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
                                {/* Left Column: Visi */}
                                <div className="lg:col-span-5 space-y-4">
                                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                                        Visi Lembaga
                                    </span>
                                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                                        Arah Pengembangan Sekolah
                                    </h3>
                                    {vision ? (
                                        <blockquote className="pt-2 text-base sm:text-lg text-slate-800 font-medium leading-relaxed italic border-l-3 border-slate-900 pl-4">
                                            &ldquo;{vision}&rdquo;
                                        </blockquote>
                                    ) : (
                                        <p className="text-slate-500 italic text-sm">Visi sekolah belum diisi.</p>
                                    )}
                                </div>

                                {/* Right Column: Misi */}
                                <div className="lg:col-span-7 space-y-4 lg:pl-6 lg:border-l lg:border-slate-200">
                                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                                        Misi Lembaga
                                    </span>
                                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                                        Langkah Pembinaan
                                    </h3>

                                    {missionLines.length > 0 ? (
                                        <ol className="space-y-3 pt-1">
                                            {missionLines.map((line, idx) => (
                                                <li
                                                    key={idx}
                                                    className="flex items-start gap-3.5 text-sm sm:text-base text-slate-700 leading-relaxed"
                                                >
                                                    <span className="shrink-0 w-6 h-6 rounded-full bg-white text-slate-700 text-xs font-bold font-mono flex items-center justify-center mt-0.5 border border-slate-300">
                                                        {idx + 1}
                                                    </span>
                                                    <span className="pt-0.5">
                                                        {line.replace(/^\d+[\.\)]\s*/, '')}
                                                    </span>
                                                </li>
                                            ))}
                                        </ol>
                                    ) : mission ? (
                                        <p className="text-slate-700 leading-relaxed whitespace-pre-line text-sm sm:text-base">
                                            {mission}
                                        </p>
                                    ) : (
                                        <p className="text-slate-500 italic text-sm">Misi sekolah belum diisi.</p>
                                    )}

                                    <div className="pt-3">
                                        <Link
                                            href="/visi-misi"
                                            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900 hover:text-indigo-700 transition-colors"
                                        >
                                            <span>Rincian Visi & Misi Selengkapnya</span>
                                            <ArrowRight className="w-4 h-4" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* 4. HUBUNGI KAMI SECTION — SIMPLE TWO-COLUMN */}
            <section className="py-16 lg:py-20 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-2xl border border-slate-200/80 p-8 sm:p-12 shadow-xs">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
                            {/* Left: Info & Actions */}
                            <div className="space-y-4">
                                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                                    Layanan Informasi
                                </span>
                                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                                    Komunikasi & Layanan Sekolah
                                </h2>
                                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                                    Pertanyaan mengenai informasi pendaftaran, layanan administrasi kesiswaan, atau agenda kelembagaan dapat dikonfirmasikan melalui kontak resmi kami.
                                </p>
                                <div className="pt-2 flex flex-wrap items-center gap-3">
                                    <Link
                                        href="/kontak"
                                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold transition-colors shadow-xs"
                                    >
                                        <Mail className="w-4 h-4" />
                                        <span>Hubungi Sekolah</span>
                                    </Link>
                                    {mapsUrl && (
                                        <a
                                            href={mapsUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 text-sm font-semibold transition-colors"
                                        >
                                            <MapPin className="w-4 h-4 text-slate-500" />
                                            <span>Lihat Lokasi</span>
                                            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                                        </a>
                                    )}
                                </div>
                            </div>

                            {/* Right: Contact Details */}
                            <div className="space-y-4 pt-1 lg:pt-0">
                                {address && (
                                    <div className="flex items-start gap-3.5 text-slate-700">
                                        <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600 shrink-0 border border-slate-200 mt-0.5">
                                            <MapPin className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                                                Alamat Lembaga
                                            </p>
                                            <p className="text-sm text-slate-800 mt-0.5 font-medium">
                                                {address}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {phone && (
                                    <div className="flex items-start gap-3.5 text-slate-700">
                                        <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600 shrink-0 border border-slate-200 mt-0.5">
                                            <Phone className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                                                Telepon Kantor
                                            </p>
                                            <a
                                                href={`tel:${phone.replace(/[^0-9+]/g, '')}`}
                                                className="text-sm text-slate-800 hover:text-indigo-700 transition-colors mt-0.5 block font-medium"
                                            >
                                                {phone}
                                            </a>
                                        </div>
                                    </div>
                                )}

                                {email && (
                                    <div className="flex items-start gap-3.5 text-slate-700">
                                        <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600 shrink-0 border border-slate-200 mt-0.5">
                                            <Mail className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                                                Surat Elektronik
                                            </p>
                                            <a
                                                href={`mailto:${email}`}
                                                className="text-sm text-slate-800 hover:text-indigo-700 transition-colors mt-0.5 block font-medium"
                                            >
                                                {email}
                                            </a>
                                        </div>
                                    </div>
                                )}

                                <div className="flex items-start gap-3.5 text-slate-700">
                                    <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600 shrink-0 border border-slate-200 mt-0.5">
                                        <Clock className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                                            Jam Layanan Kantor
                                        </p>
                                        <p className="text-sm text-slate-800 mt-0.5 font-medium">
                                            Senin – Jumat: 07.00 – 15.30 WIB
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
