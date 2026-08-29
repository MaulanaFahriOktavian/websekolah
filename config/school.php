<?php

return [
    /*
    |--------------------------------------------------------------------------
    | School Identity & Branding
    |--------------------------------------------------------------------------
    |
    | Configuration for single-school deployment. Centralizes school metadata,
    | branding, contact information, and SEO parameters.
    |
    */

    'name' => env('SCHOOL_NAME', 'SMA Negeri 1 Harapan Bangsa'),
    'tagline' => env('SCHOOL_TAGLINE', 'Unggul dalam Prestasi, Berkarakter, dan Berwawasan Global'),
    'npsn' => env('SCHOOL_NPSN', '10293847'),
    'accreditation' => env('SCHOOL_ACCREDITATION', 'A (Unggul)'),
    'established_year' => env('SCHOOL_ESTABLISHED_YEAR', 1985),
    'logo_url' => env('SCHOOL_LOGO_URL', null),

    'contact' => [
        'address' => env('SCHOOL_ADDRESS', 'Jl. Pendidikan No. 123, Kel. Suka Maju, Kec. Cerdas, Kota Pendidikan 12345'),
        'phone' => env('SCHOOL_PHONE', '(021) 123-4567'),
        'whatsapp' => env('SCHOOL_WHATSAPP', '+62 812-3456-7890'),
        'email' => env('SCHOOL_EMAIL', 'info@sman1harapanbangsa.sch.id'),
        'office_hours' => env('SCHOOL_OFFICE_HOURS', 'Senin - Jumat: 07.00 - 15.30 WIB'),
    ],

    'social' => [
        'facebook' => env('SCHOOL_FB', 'https://facebook.com'),
        'instagram' => env('SCHOOL_IG', 'https://instagram.com'),
        'youtube' => env('SCHOOL_YT', 'https://youtube.com'),
        'twitter' => env('SCHOOL_TWITTER', 'https://x.com'),
    ],

    'seo' => [
        'meta_description' => env(
            'SCHOOL_META_DESCRIPTION',
            'Website Resmi SMA Negeri 1 Harapan Bangsa - Sekolah Unggulan Berkarakter dan Berprestasi.'
        ),
        'meta_keywords' => env(
            'SCHOOL_META_KEYWORDS',
            'sekolah, sma, pendidikan, sma negeri 1 harapan bangsa, sekolah unggulan'
        ),
    ],
];
