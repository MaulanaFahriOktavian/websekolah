<?php

namespace Database\Seeders;

use App\Models\Achievement;
use Illuminate\Database\Seeder;

class AchievementSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $achievements = [
            [
                'title' => 'Juara 1 Olimpiade Sains Pelajar Bidang Matematika',
                'slug' => 'juara-1-olimpiade-sains-pelajar-bidang-matematika',
                'category' => 'Akademik',
                'level' => 'Tingkat Provinsi',
                'year' => 2025,
                'achievement_date' => '2025-08-15',
                'recipient' => 'Aditya Pratama (Kelas IX-A)',
                'description' => 'Meraih medali emas dalam kompetisi pemecahan masalah matematika tingkat provinsi dengan skor tertinggi.',
                'photo' => null,
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
                'recipient' => 'Tim Riset Lingkungan Hidup',
                'description' => 'Inovasi pengolahan limbah organik sekolah menjadi pupuk cair ramah lingkungan.',
                'photo' => null,
                'sort_order' => 2,
                'is_active' => true,
            ],
            [
                'title' => 'Juara 1 Kejuaraan Bola Basket Pelajar Daerah',
                'slug' => 'juara-1-kejuaraan-bola-basket-pelajar-daerah',
                'category' => 'Olahraga',
                'level' => 'Tingkat Kabupaten/Kota',
                'year' => 2024,
                'achievement_date' => '2024-11-10',
                'recipient' => 'Tim Basket Putra',
                'description' => 'Meraih piala bergilir kejuaraan basket antar pelajar setelah memenangkan babak final dengan skor meyakinkan.',
                'photo' => null,
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
                'recipient' => 'Sanggar Seni Tari Sekolah',
                'description' => 'Penampilan tari kreasi daerah yang memukau dewan juri dalam festival kebudayaan daerah.',
                'photo' => null,
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
                'recipient' => 'Rizky Kurniawan (Kelas VIII-C)',
                'description' => 'Meraih medali emas kategori tanding kelas D putra pada kejuaraan silat pelajar tingkat nasional.',
                'photo' => null,
                'sort_order' => 5,
                'is_active' => true,
            ],
        ];

        foreach ($achievements as $item) {
            Achievement::firstOrCreate(
                ['slug' => $item['slug']],
                $item
            );
        }
    }
}
