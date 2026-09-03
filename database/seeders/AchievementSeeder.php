<?php

namespace Database\Seeders;

use App\Models\Achievement;
use Illuminate\Database\Seeder;

class AchievementSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * Populates achievements table with 10 consistent DEMO achievements and valid demo photos.
     * Safe to run multiple times — idempotent via updateOrCreate.
     */
    public function run(): void
    {
        DemoAssetHelper::generateAll();

        $achievements = [
            [
                'title' => 'Juara 1 Olimpiade Sains Pelajar Bidang Matematika',
                'slug' => 'juara-1-olimpiade-sains-pelajar-bidang-matematika',
                'category' => 'Akademik',
                'level' => 'Tingkat Provinsi',
                'year' => 2025,
                'achievement_date' => '2025-08-15',
                'recipient' => 'Siswa Berprestasi Demo 1 (Kelas IX-A)',
                'description' => 'Meraih medali emas dalam kompetisi pemecahan masalah matematika tingkat provinsi dengan skor tertinggi.',
                'photo' => 'achievements/achievement-01.webp',
                'sort_order' => 1,
                'is_active' => true,
            ],
            [
                'title' => 'Juara 2 Lomba Karya Tulis Ilmiah Remaja (LKIR)',
                'slug' => 'juara-2-lomba-karya-tulis-ilmiah-remaja-lkir',
                'category' => 'Sains & Riset',
                'level' => 'Tingkat Nasional',
                'year' => 2025,
                'achievement_date' => '2025-05-20',
                'recipient' => 'Tim Riset Lingkungan Hidup Demo',
                'description' => 'Inovasi pengolahan limbah organik sekolah menjadi pupuk cair ramah lingkungan.',
                'photo' => 'achievements/achievement-02.webp',
                'sort_order' => 2,
                'is_active' => true,
            ],
            [
                'title' => 'Juara 1 Kejuaraan Bola Basket Pelajar Daerah',
                'slug' => 'juara-1-kejuaraan-bola-basket-pelajar-daerah',
                'category' => 'Olahraga',
                'level' => 'Tingkat Kabupaten/Kota',
                'year' => 2025,
                'achievement_date' => '2025-07-10',
                'recipient' => 'Tim Basket Putra Demo',
                'description' => 'Meraih piala bergilir kejuaraan basket antar pelajar setelah memenangkan babak final dengan skor meyakinkan.',
                'photo' => 'achievements/achievement-03.webp',
                'sort_order' => 3,
                'is_active' => true,
            ],
            [
                'title' => 'Juara 1 Festival Seni & Tari Tradisional Pelajar',
                'slug' => 'juara-1-festival-seni-tari-tradisional-pelajar',
                'category' => 'Seni & Budaya',
                'level' => 'Tingkat Provinsi',
                'year' => 2024,
                'achievement_date' => '2024-09-25',
                'recipient' => 'Sanggar Seni Tari Sekolah Demo',
                'description' => 'Penampilan tari kreasi nusantara yang memukau dewan juri dalam festival kebudayaan daerah.',
                'photo' => 'achievements/achievement-04.webp',
                'sort_order' => 4,
                'is_active' => true,
            ],
            [
                'title' => 'Medali Emas Kejuaraan Pencak Silat Antar Pelajar',
                'slug' => 'medali-emas-kejuaraan-pencak-silat-antar-pelajar',
                'category' => 'Olahraga',
                'level' => 'Tingkat Nasional',
                'year' => 2025,
                'achievement_date' => '2025-02-18',
                'recipient' => 'Siswa Atlet Silat Demo (Kelas VIII-C)',
                'description' => 'Meraih medali emas kategori tanding kelas D putra pada kejuaraan silat pelajar tingkat nasional.',
                'photo' => 'achievements/achievement-05.webp',
                'sort_order' => 5,
                'is_active' => true,
            ],
            [
                'title' => 'Juara 1 Lomba Cipta & Baca Puisi Tingkat Pelajar',
                'slug' => 'juara-1-lomba-cipta-baca-puisi-tingkat-pelajar',
                'category' => 'Literasi',
                'level' => 'Tingkat Kabupaten/Kota',
                'year' => 2025,
                'achievement_date' => '2025-03-14',
                'recipient' => 'Siswi Penggiat Puisi Demo (Kelas IX-B)',
                'description' => 'Mendapatkan nilai tertinggi dalam penghayatan, keindahan rima, dan artikulasi pembacaan puisi bertema lingkungan.',
                'photo' => 'achievements/achievement-06.webp',
                'sort_order' => 6,
                'is_active' => true,
            ],
            [
                'title' => 'Juara 2 Kompetisi Robotika & Inovasi Teknologi',
                'slug' => 'juara-2-kompetisi-robotika-inovasi-teknologi',
                'category' => 'Teknologi',
                'level' => 'Tingkat Provinsi',
                'year' => 2024,
                'achievement_date' => '2024-11-28',
                'recipient' => 'Tim Robotik Kreatif Demo',
                'description' => 'Rancangan prototype robot transporter serbaguna berhasil menembus babak final dan meraih posisi runner-up.',
                'photo' => 'achievements/achievement-07.webp',
                'sort_order' => 7,
                'is_active' => true,
            ],
            [
                'title' => 'Juara 1 Lomba Pidato Bahasa Inggris (English Speech)',
                'slug' => 'juara-1-lomba-pidato-bahasa-inggris-english-speech',
                'category' => 'Bahasa & Komunikasi',
                'level' => 'Tingkat Kabupaten/Kota',
                'year' => 2025,
                'achievement_date' => '2025-06-05',
                'recipient' => 'Siswa Debat Bahasa Demo (Kelas VIII-A)',
                'description' => 'Menyajikan pidato bertajuk Sustainable Future dengan kelancaran vokal, tata bahasa akurat, dan argumen kuat.',
                'photo' => 'achievements/achievement-08.webp',
                'sort_order' => 8,
                'is_active' => true,
            ],
            [
                'title' => 'Juara Harapan 1 Olimpiade IPS & Geografi Remaja',
                'slug' => 'juara-harapan-1-olimpiade-ips-geografi-remaja',
                'category' => 'Akademik',
                'level' => 'Tingkat Nasional',
                'year' => 2024,
                'achievement_date' => '2024-10-15',
                'recipient' => 'Siswa Cerdas IPS Demo (Kelas IX-C)',
                'description' => 'Membuktikan pemahaman mendalam tentang sejarah kebangsaan dan peta interaktif nusantara di ajang nasional.',
                'photo' => 'achievements/achievement-09.webp',
                'sort_order' => 9,
                'is_active' => true,
            ],
            [
                'title' => 'Medali Perak Kejuaraan Renang Gaya Bebas 50 Meter',
                'slug' => 'medali-perak-kejuaraan-renang-gaya-bebas-50-meter',
                'category' => 'Olahraga',
                'level' => 'Tingkat Provinsi',
                'year' => 2025,
                'achievement_date' => '2025-04-12',
                'recipient' => 'Siswa Atlet Renang Demo (Kelas VII-B)',
                'description' => 'Mencatatkan waktu impresif pada putaran final nomor 50 meter gaya bebas putra kejuaraan renang pelajar.',
                'photo' => 'achievements/achievement-10.webp',
                'sort_order' => 10,
                'is_active' => true,
            ],
        ];

        foreach ($achievements as $item) {
            Achievement::updateOrCreate(
                ['slug' => $item['slug']],
                $item
            );
        }
    }
}
