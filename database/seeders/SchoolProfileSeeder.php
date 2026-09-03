<?php

namespace Database\Seeders;

use App\Models\SchoolProfile;
use Illuminate\Database\Seeder;

class SchoolProfileSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * Populates exactly one school profile record with consistent and realistic DEMO data and images.
     * Safe to run multiple times — idempotent via updateOrCreate.
     */
    public function run(): void
    {
        DemoAssetHelper::generateAll();

        $existing = SchoolProfile::find(1);
        if ($existing && ! str_contains($existing->name, 'Demo')) {
            // Profile has already been customized (e.g. SMPN 4 Kembang) via Admin CMS.
            // Do NOT overwrite real school data!
            return;
        }

        SchoolProfile::updateOrCreate(
            ['id' => 1],
            [
                // Identity
                'name' => 'Sekolah Demo Nusantara',
                'short_name' => 'SDN Demo',
                'npsn' => 'DEMO00001',
                'level' => 'Sekolah Menengah Pertama (SMP)',
                'status' => 'Negeri',
                'tagline' => 'Mewujudkan Generasi Cerdas, Berkarakter, dan Berbudaya Lingkungan',
                'description' => 'Website resmi Sekolah Demo Nusantara sebagai sarana informasi publik, transparansi akademik, dan komunikasi interaktif antara civitas akademika, peserta didik, orang tua, serta masyarakat.',

                // Contact
                'address' => 'Jl. Nusantara Pendidikan No. 45, Kecamatan Kembang, Kabupaten Demo 59400',
                'phone' => '(0291) 555-0123',
                'email' => 'info@sekolahdemo.sch.id',
                'website' => 'https://sekolahdemo.sch.id',

                // Branding with real demo image assets
                'logo_path' => 'school/demo-logo.png',
                'favicon_path' => null,
                'hero_image_path' => 'school/demo-hero.webp',

                // Academic info
                'founded_year' => 2005,
                'accreditation' => 'A',

                // Principal
                'principal_name' => 'Drs. H. Purnomo, M.Pd. (Kepala Sekolah Demo)',
                'principal_photo_path' => 'school/demo-principal.webp',
                'principal_greeting' => 'Selamat datang di media komunikasi dan informasi resmi Sekolah Demo Nusantara. Platform ini dihadirkan untuk memberikan akses informasi terbuka terkait kurikulum pembelajaran, kegiatan kesiswaan, prestasi, dan sarana kolaborasi seluruh keluarga besar sekolah. Mari bersama mewujudkan ekosistem pendidikan yang unggul dan berdaya saing.',

                // Content
                'vision' => 'Terwujudnya insan cendekia yang unggul dalam prestasi, luhur dalam budi pekerti, mandiri, dan berwawasan lingkungan global.',
                'mission' => "1. Menyelenggarakan proses pembelajaran yang inovatif, efektif, dan berpusat pada potensi peserta didik.\n2. Membina karakter religius, disiplin, dan budi pekerti luhur melalui keteladanan dan pembiasaan positif.\n3. Mengembangkan bakat, minat, dan kreativitas siswa di bidang akademik, sains, seni, dan olahraga.\n4. Memanfaatkan teknologi informasi dalam tata kelola administrasi dan pembelajaran modern.\n5. Membangun kepedulian warga sekolah terhadap kelestarian lingkungan hidup dan kearifan lokal.",
                'history' => 'Sekolah Demo Nusantara didirikan pada tahun 2005 atas inisiatif pemenuhan akses pendidikan bermutu di wilayah Kembang. Sejak awal berdirinya, sekolah terus bertransformasi dengan menambah fasilitas ruang belajar, sarana laboratorium terpadu, dan peningkatan kualifikasi pendidik, sehingga mampu melahirkan ribuan lulusan yang berprestasi dan berintegritas.',

                // Geolocation
                'latitude' => -6.58900000,
                'longitude' => 110.74500000,
                'maps_url' => 'https://maps.google.com/?q=-6.5890,110.7450',

                // Social media
                'facebook_url' => 'https://facebook.com/sekolahdemonusantara',
                'instagram_url' => 'https://instagram.com/sekolahdemonusantara',
                'youtube_url' => 'https://youtube.com/@sekolahdemonusantara',
                'tiktok_url' => 'https://tiktok.com/@sekolahdemonusantara',
            ]
        );
    }
}
