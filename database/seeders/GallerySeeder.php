<?php

namespace Database\Seeders;

use App\Models\Gallery;
use Illuminate\Database\Seeder;

class GallerySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $galleries = [
            [
                'title' => 'Upacara Peringatan Hari Kemerdekaan RI',
                'slug' => 'upacara-peringatan-hari-kemerdekaan-ri',
                'description' => 'Dokumentasi pelaksanaan upacara pengibaran bendera merah putih oleh pasukan pengibar bendera sekolah.',
                'cover_photo' => null,
                'event_date' => '2025-08-17',
                'sort_order' => 1,
                'is_active' => true,
            ],
            [
                'title' => 'Pentas Seni & Gelar Karya Budaya Siswa',
                'slug' => 'pentas-seni-gelar-karya-budaya-siswa',
                'description' => 'Ajang kreativitas tahunan menampilkan tarian tradisional, paduan suara, drama musikal, dan pameran seni rupa.',
                'cover_photo' => null,
                'event_date' => '2025-06-12',
                'sort_order' => 2,
                'is_active' => true,
            ],
            [
                'title' => 'Kemah Bakti Pramuka & Pelantikan Penggalang',
                'slug' => 'kemah-bakti-pramuka-pelantikan-penggalang',
                'description' => 'Kegiatan kepramukaan luar ruangan untuk melatih kemandirian, kepemimpinan, dan kerja sama tim.',
                'cover_photo' => null,
                'event_date' => '2025-04-22',
                'sort_order' => 3,
                'is_active' => true,
            ],
            [
                'title' => 'Pelaksanaan Asesmen Nasional Berbasis Komputer (ANBK)',
                'slug' => 'pelaksanaan-asesmen-nasional-berbasis-komputer-anbk',
                'description' => 'Suasana tertib dan lancar pelaksanaan asesmen literasi dan numerasi di laboratorium komputer sekolah.',
                'cover_photo' => null,
                'event_date' => '2025-09-18',
                'sort_order' => 4,
                'is_active' => true,
            ],
        ];

        foreach ($galleries as $item) {
            Gallery::firstOrCreate(
                ['slug' => $item['slug']],
                $item
            );
        }
    }
}
