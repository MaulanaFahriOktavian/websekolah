import React, { useState } from 'react';
import { Link, useForm, usePage } from '@inertiajs/react';
import PublicLayout from '../../../Layouts/PublicLayout';
import Badge from '../../../Components/Common/Badge';
import {
    MapPin,
    Phone,
    Mail,
    Globe,
    Map,
    Info,
    Send,
    AlertCircle,
    CheckCircle2,
} from 'lucide-react';

function FacebookIcon({ className }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M13.5 22v-9h3l.5-3h-3.5V7.5c0-.9.5-1.5 1.5-1.5H17V3.2c-.6-.1-1.7-.2-2.9-.2-2.9 0-4.9 1.8-4.9 5.1V10h-3v3h3v9h3.8Z" />
        </svg>
    );
}

function InstagramIcon({ className }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke="currentColor" strokeWidth="1.7" />
            <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.7" />
            <circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" />
        </svg>
    );
}

function YoutubeIcon({ className }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M21.5 12.2c0-1.5-.1-3-.3-4.1-.2-1-.8-1.8-1.7-2.3C18.2 5.3 15.8 5 12 5s-6.2.3-7.5.8c-.9.5-1.5 1.3-1.7 2.3C2.6 9.2 2.5 10.7 2.5 12.2s.1 3 .3 4.1c.2 1 .8 1.8 1.7 2.3C5.8 18.7 8.2 19 12 19s6.2-.3 7.5-.8c.9-.5 1.5-1.3 1.7-2.3.2-1.1.3-2.6.3-4.1Zm-11.1 3.1V9.7l6.3 2.8-6.3 2.8Z" />
        </svg>
    );
}

function TikTokIcon({ className }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.15 8.15 0 0 0 4.77 1.52V6.76a4.85 4.85 0 0 1-1-.07Z" />
        </svg>
    );
}

export default function Contact({ profile }) {
    const { flash } = usePage().props;
    const [showSuccessNotification, setShowSuccessNotification] = useState(!!flash?.message);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/kontak', {
            onSuccess: () => {
                reset();
                setShowSuccessNotification(true);
                setTimeout(() => setShowSuccessNotification(false), 5000);
            },
        });
    };

    const name      = profile?.name        || null;
    const address   = profile?.address     || null;
    const phone     = profile?.phone       || null;
    const email     = profile?.email       || null;
    const website   = profile?.website     || null;
    const latitude  = profile?.latitude    || null;
    const longitude = profile?.longitude   || null;
    const mapsUrl   = profile?.maps_url    || null;
    const facebook  = profile?.facebook_url  || null;
    const instagram = profile?.instagram_url || null;
    const youtube   = profile?.youtube_url   || null;
    const tiktok    = profile?.tiktok_url    || null;

    const hasSocial  = facebook || instagram || youtube || tiktok;
    const hasContact = address || phone || email || website;

    return (
        <PublicLayout
            title="Kontak & Lokasi"
            description={address ? `Informasi kontak dan alamat resmi: ${address}` : 'Informasi kontak, lokasi, dan formulir pesan resmi sekolah.'}
            ogType="website"
        >
            {/* Hero */}
            <section className="bg-gradient-to-b from-indigo-900 via-indigo-950 to-slate-900 text-white py-14 lg:py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-500/20 via-transparent to-transparent pointer-events-none" />
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 space-y-4">
                    <Badge variant="primary" size="md">Kontak & Lokasi</Badge>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
                        Hubungi Kami
                    </h1>
                    <p className="text-slate-300 text-base max-w-xl leading-relaxed">
                        Kami siap melayani pertanyaan, informasi pendaftaran, dan berbagai keperluan komunikasi Anda.
                    </p>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
                {/* Success Message */}
                {showSuccessNotification && flash?.message && (
                    <div className="mb-8 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex gap-3">
                        <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
                        <div>
                            <h3 className="font-semibold text-emerald-900">{flash.message.title}</h3>
                            <p className="text-sm text-emerald-700 mt-1">{flash.message.text}</p>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                    {/* Left: Contact Info & Social */}
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900 mb-6">Informasi Kontak</h2>
                            {hasContact ? (
                                <div className="space-y-4">
                                    {address && (
                                        <div className="flex gap-4 p-5 bg-white rounded-2xl border border-slate-200 shadow-xs">
                                            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                                                <MapPin className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Alamat</p>
                                                <p className="text-sm text-slate-700 whitespace-pre-line leading-relaxed">{address}</p>
                                                {mapsUrl && (
                                                    <a
                                                        href={mapsUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-1.5 mt-2 text-xs font-semibold text-indigo-600 hover:text-indigo-700"
                                                    >
                                                        <Map className="w-3.5 h-3.5" />
                                                        Lihat di Google Maps
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                    {phone && (
                                        <div className="flex gap-4 p-5 bg-white rounded-2xl border border-slate-200 shadow-xs">
                                            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                                                <Phone className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Telepon</p>
                                                <a href={`tel:${phone}`} className="text-sm text-slate-700 hover:text-indigo-600 font-medium">{phone}</a>
                                            </div>
                                        </div>
                                    )}
                                    {email && (
                                        <div className="flex gap-4 p-5 bg-white rounded-2xl border border-slate-200 shadow-xs">
                                            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                                                <Mail className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Email</p>
                                                <a href={`mailto:${email}`} className="text-sm text-slate-700 hover:text-indigo-600 font-medium">{email}</a>
                                            </div>
                                        </div>
                                    )}
                                    {website && (
                                        <div className="flex gap-4 p-5 bg-white rounded-2xl border border-slate-200 shadow-xs">
                                            <div className="w-10 h-10 rounded-xl bg-slate-50 text-slate-600 flex items-center justify-center shrink-0">
                                                <Globe className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Website</p>
                                                <a href={website} target="_blank" rel="noopener noreferrer"
                                                    className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">{website}</a>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="bg-slate-50 rounded-2xl border border-slate-200 p-8 text-center text-slate-400">
                                    <Info className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                                    <p className="text-sm">Informasi kontak belum tersedia.</p>
                                </div>
                            )}
                        </div>

                        {/* Coordinates */}
                        {(latitude && longitude) && (
                            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5">
                                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Koordinat GPS</p>
                                <p className="text-sm font-mono text-slate-700">
                                    {parseFloat(latitude).toFixed(6)}, {parseFloat(longitude).toFixed(6)}
                                </p>
                            </div>
                        )}

                        {/* Social Media */}
                        {hasSocial && (
                            <div>
                                <h2 className="text-lg font-bold text-slate-900 mb-4">Media Sosial Resmi</h2>
                                <div className="flex flex-wrap gap-3">
                                    {facebook && (
                                        <a href={facebook} target="_blank" rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#1877F2] text-white text-sm font-semibold rounded-xl hover:opacity-90 transition-opacity shadow-xs">
                                            <FacebookIcon className="w-4 h-4" />
                                            Facebook
                                        </a>
                                    )}
                                    {instagram && (
                                        <a href={instagram} target="_blank" rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white text-sm font-semibold rounded-xl hover:opacity-90 transition-opacity shadow-xs">
                                            <InstagramIcon className="w-4 h-4" />
                                            Instagram
                                        </a>
                                    )}
                                    {youtube && (
                                        <a href={youtube} target="_blank" rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#FF0000] text-white text-sm font-semibold rounded-xl hover:opacity-90 transition-opacity shadow-xs">
                                            <YoutubeIcon className="w-4 h-4" />
                                            YouTube
                                        </a>
                                    )}
                                    {tiktok && (
                                        <a href={tiktok} target="_blank" rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-900 text-white text-sm font-semibold rounded-xl hover:opacity-90 transition-opacity shadow-xs">
                                            <TikTokIcon className="w-4 h-4" />
                                            TikTok
                                        </a>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right: Contact Form */}
                    <div>
                        <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl border border-slate-200 p-8 shadow-sm">
                            <h2 className="text-2xl font-bold text-slate-900 mb-2">Kirim Pesan</h2>
                            <p className="text-sm text-slate-600 mb-6">
                                Isi formulir di bawah untuk menghubungi kami. Kami akan merespons secepat mungkin.
                            </p>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                {/* Name */}
                                <div>
                                    <label htmlFor="name" className="block text-sm font-semibold text-slate-900 mb-1.5">
                                        Nama Lengkap <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="name"
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="Nama Anda"
                                        className={`w-full px-4 py-2.5 rounded-xl border ${
                                            errors.name
                                                ? 'border-red-500 bg-red-50 focus:ring-red-500'
                                                : 'border-slate-300 bg-white focus:ring-indigo-500'
                                        } focus:outline-none focus:ring-2 transition-colors text-sm`}
                                    />
                                    {errors.name && (
                                        <p className="text-xs text-red-600 mt-1.5 flex items-center gap-1">
                                            <AlertCircle className="w-3.5 h-3.5" />
                                            {errors.name}
                                        </p>
                                    )}
                                </div>

                                {/* Email */}
                                <div>
                                    <label htmlFor="email" className="block text-sm font-semibold text-slate-900 mb-1.5">
                                        Email <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        placeholder="email@contoh.com"
                                        className={`w-full px-4 py-2.5 rounded-xl border ${
                                            errors.email
                                                ? 'border-red-500 bg-red-50 focus:ring-red-500'
                                                : 'border-slate-300 bg-white focus:ring-indigo-500'
                                        } focus:outline-none focus:ring-2 transition-colors text-sm`}
                                    />
                                    {errors.email && (
                                        <p className="text-xs text-red-600 mt-1.5 flex items-center gap-1">
                                            <AlertCircle className="w-3.5 h-3.5" />
                                            {errors.email}
                                        </p>
                                    )}
                                </div>

                                {/* Phone */}
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-semibold text-slate-900 mb-1.5">
                                        Nomor Telepon <span className="text-slate-400 font-normal">(Opsional)</span>
                                    </label>
                                    <input
                                        id="phone"
                                        type="tel"
                                        value={data.phone}
                                        onChange={(e) => setData('phone', e.target.value)}
                                        placeholder="+62 xxx-xxxx-xxxx"
                                        className={`w-full px-4 py-2.5 rounded-xl border ${
                                            errors.phone
                                                ? 'border-red-500 bg-red-50 focus:ring-red-500'
                                                : 'border-slate-300 bg-white focus:ring-indigo-500'
                                        } focus:outline-none focus:ring-2 transition-colors text-sm`}
                                    />
                                    {errors.phone && (
                                        <p className="text-xs text-red-600 mt-1.5 flex items-center gap-1">
                                            <AlertCircle className="w-3.5 h-3.5" />
                                            {errors.phone}
                                        </p>
                                    )}
                                </div>

                                {/* Subject */}
                                <div>
                                    <label htmlFor="subject" className="block text-sm font-semibold text-slate-900 mb-1.5">
                                        Subjek/Topik <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="subject"
                                        type="text"
                                        value={data.subject}
                                        onChange={(e) => setData('subject', e.target.value)}
                                        placeholder="Topik pertanyaan Anda"
                                        className={`w-full px-4 py-2.5 rounded-xl border ${
                                            errors.subject
                                                ? 'border-red-500 bg-red-50 focus:ring-red-500'
                                                : 'border-slate-300 bg-white focus:ring-indigo-500'
                                        } focus:outline-none focus:ring-2 transition-colors text-sm`}
                                    />
                                    {errors.subject && (
                                        <p className="text-xs text-red-600 mt-1.5 flex items-center gap-1">
                                            <AlertCircle className="w-3.5 h-3.5" />
                                            {errors.subject}
                                        </p>
                                    )}
                                </div>

                                {/* Message */}
                                <div>
                                    <label htmlFor="message" className="block text-sm font-semibold text-slate-900 mb-1.5">
                                        Pesan <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        id="message"
                                        value={data.message}
                                        onChange={(e) => setData('message', e.target.value)}
                                        placeholder="Tulis pesan Anda di sini..."
                                        rows="5"
                                        className={`w-full px-4 py-2.5 rounded-xl border ${
                                            errors.message
                                                ? 'border-red-500 bg-red-50 focus:ring-red-500'
                                                : 'border-slate-300 bg-white focus:ring-indigo-500'
                                        } focus:outline-none focus:ring-2 transition-colors text-sm resize-none`}
                                    />
                                    {errors.message && (
                                        <p className="text-xs text-red-600 mt-1.5 flex items-center gap-1">
                                            <AlertCircle className="w-3.5 h-3.5" />
                                            {errors.message}
                                        </p>
                                    )}
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full mt-6 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-300 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm"
                                >
                                    {processing ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-slate-300 border-t-white rounded-full animate-spin" />
                                            Mengirim...
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-4 h-4" />
                                            Kirim Pesan
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Map Section - Full Width Below */}
                {mapsUrl && (
                    <div className="mt-16 pt-12 border-t border-slate-200">
                        <h2 className="text-2xl font-bold text-slate-900 mb-6">Lokasi Sekolah</h2>
                        <div className="aspect-video rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-100">
                            <iframe
                                src={mapsUrl.includes('embed') ? mapsUrl : `https://maps.google.com/maps?q=${latitude || ''},${longitude || ''}&output=embed`}
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Lokasi Sekolah"
                            />
                        </div>
                    </div>
                )}
            </div>
        </PublicLayout>
    );
}
