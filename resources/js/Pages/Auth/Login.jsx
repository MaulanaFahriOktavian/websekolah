import React from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
import { GraduationCap, LogIn, AlertCircle } from 'lucide-react';

export default function Login() {
    const { school } = usePage().props;
    const schoolName = school?.name || 'Admin CMS';

    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    function handleSubmit(e) {
        e.preventDefault();
        post('/login', {
            onFinish: () => reset('password'),
        });
    }

    return (
        <>
            <Head title={`Masuk — ${schoolName}`} />

            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 flex items-center justify-center p-4">
                {/* Background decoration */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
                    <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-700/10 rounded-full blur-3xl" />
                </div>

                <div className="relative w-full max-w-md">
                    {/* Card */}
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl shadow-2xl shadow-black/40 p-8">
                        {/* Logo / Brand */}
                        <div className="flex flex-col items-center mb-8">
                            <div className="w-14 h-14 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-600/40 mb-4">
                                <GraduationCap className="w-7 h-7 text-white" />
                            </div>
                            <h1 className="text-xl font-bold text-white tracking-tight text-center">
                                {schoolName}
                            </h1>
                            <p className="text-sm text-slate-400 mt-1">
                                Portal Administrator
                            </p>
                        </div>

                        {/* Global auth error */}
                        {errors.email && !data.email && (
                            <div className="mb-5 flex items-center gap-2.5 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg px-4 py-3 text-sm">
                                <AlertCircle className="w-4 h-4 shrink-0" />
                                <span>{errors.email}</span>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Email */}
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-slate-300 mb-1.5"
                                >
                                    Email
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    autoComplete="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className={`w-full px-4 py-2.5 rounded-lg bg-white/5 border text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ${
                                        errors.email
                                            ? 'border-red-500/50 focus:ring-red-500'
                                            : 'border-white/10 hover:border-white/20'
                                    }`}
                                    placeholder="admin@sekolah.test"
                                    required
                                />
                                {errors.email && data.email && (
                                    <p className="mt-1.5 text-xs text-red-400">{errors.email}</p>
                                )}
                            </div>

                            {/* Password */}
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium text-slate-300 mb-1.5"
                                >
                                    Password
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    autoComplete="current-password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    className={`w-full px-4 py-2.5 rounded-lg bg-white/5 border text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ${
                                        errors.password
                                            ? 'border-red-500/50 focus:ring-red-500'
                                            : 'border-white/10 hover:border-white/20'
                                    }`}
                                    placeholder="••••••••"
                                    required
                                />
                                {errors.password && (
                                    <p className="mt-1.5 text-xs text-red-400">{errors.password}</p>
                                )}
                            </div>

                            {/* Remember me */}
                            <div className="flex items-center gap-2">
                                <input
                                    id="remember"
                                    type="checkbox"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                    className="w-4 h-4 rounded border-white/20 bg-white/5 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-0"
                                />
                                <label htmlFor="remember" className="text-sm text-slate-400 select-none">
                                    Ingat saya
                                </label>
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-sm rounded-lg transition-colors shadow-lg shadow-indigo-600/30 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-transparent"
                            >
                                {processing ? (
                                    <>
                                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        <span>Memproses...</span>
                                    </>
                                ) : (
                                    <>
                                        <LogIn className="w-4 h-4" />
                                        <span>Masuk ke Dashboard</span>
                                    </>
                                )}
                            </button>
                        </form>

                        <p className="mt-6 text-center text-xs text-slate-600">
                            Akses terbatas untuk administrator yang berwenang.
                        </p>
                    </div>

                    {/* Back link */}
                    <p className="mt-5 text-center">
                        <a
                            href="/"
                            className="text-sm text-slate-500 hover:text-slate-300 transition-colors"
                        >
                            ← Kembali ke website
                        </a>
                    </p>
                </div>
            </div>
        </>
    );
}
