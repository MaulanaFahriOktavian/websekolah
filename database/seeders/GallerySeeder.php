<?php

namespace Database\Seeders;

use App\Models\Gallery;
use App\Models\GalleryPhoto;
use Illuminate\Database\Seeder;

class GallerySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * Populates galleries table with 6 consistent DEMO albums and valid gallery photos.
     * Safe to run multiple times — idempotent via updateOrCreate.
     */
    public function run(): void
    {
        DemoAssetHelper::generateAll();

        $galleries = [
            [
                'title' => 'Masa Pengenalan Lingkungan Sekolah (MPLS)',
                'slug' => 'masa-pengenalan-lingkungan-sekolah-mpls',
                'description' => 'Dokumentasi hangat penyambutan peserta didik baru dengan kegiatan orientasi ramah, pengenalan guru, dan jelajah lingkungan sekolah.',
                'cover_photo' => 'galleries/gallery-01-cover.webp',
                'event_date' => '2025-07-15',
                'sort_order' => 1,
                'is_active' => true,
            ],
            [
                'title' => 'Upacara Peringatan Hari Kemerdekaan RI',
                'slug' => 'upacara-peringatan-hari-kemerdekaan-ri',
                'description' => 'Pelaksanaan upacara pengibaran bendera merah putih oleh pasukan pengibar bendera sekolah bersama dewan guru.',
                'cover_photo' => 'galleries/gallery-02-cover.webp',
                'event_date' => '2025-08-17',
                'sort_order' => 2,
                'is_active' => true,
            ],
            [
                'title' => 'Festival Literasi & Pameran Karya Siswa',
                'slug' => 'festival-literasi-pameran-karya-siswa',
                'description' => 'Pameran buku bacaan, mading kreatif 3D, dan gelar panggung ekspresi sastra siswa di perpustakaan sekolah.',
                'cover_photo' => 'galleries/gallery-03-cover.webp',
                'event_date' => '2025-05-18',
                'sort_order' => 3,
                'is_active' => true,
            ],
            [
                'title' => 'Pekan Olahraga & Lomba Antar Kelas (Classmeeting)',
                'slug' => 'pekan-olahraga-lomba-antar-kelas-classmeeting',
                'description' => 'Keseruan pertandingan futsal, bola voli, tarik tambang, dan cerdas cermat antarkelas usai penilaian semester.',
                'cover_photo' => 'galleries/gallery-04-cover.webp',
                'event_date' => '2025-06-20',
                'sort_order' => 4,
                'is_active' => true,
            ],
            [
                'title' => 'Gelar Unjuk Bakat Ekstrakurikuler Sekolah',
                'slug' => 'gelar-unjuk-bakat-ekstrakurikuler-sekolah',
                'description' => 'Atraksi memukau dari tim pramuka, tari tradisional, paskibra, karate, dan ensambel musik sekolah.',
                'cover_photo' => 'galleries/gallery-05-cover.webp',
                'event_date' => '2025-09-10',
                'sort_order' => 5,
                'is_active' => true,
            ],
            [
                'title' => 'Aksi Peduli Lingkungan & Penanaman Pohon',
                'slug' => 'aksi-peduli-lingkungan-penanaman-pohon',
                'description' => 'Kegiatan bakti sosial penghijauan lingkungan sekitar sekolah dan pembuatan kebun apotek hidup oleh kader adiwiyata.',
                'cover_photo' => 'galleries/gallery-06-cover.webp',
                'event_date' => '2025-10-04',
                'sort_order' => 6,
                'is_active' => true,
            ],
        ];

        foreach ($galleries as $idx => $item) {
            $gallery = Gallery::updateOrCreate(
                ['slug' => $item['slug']],
                $item
            );

            // Seed 3 photos per album
            for ($p = 1; $p <= 3; $p++) {
                $photoNum = ($idx * 3) + $p;
                $photoPath = sprintf('galleries/photos/photo-%02d.webp', $photoNum);

                GalleryPhoto::updateOrCreate(
                    [
                        'gallery_id' => $gallery->id,
                        'photo_path' => $photoPath,
                    ],
                    [
                        'caption' => sprintf('Dokumentasi %s - Momen #%d', $gallery->title, $p),
                        'sort_order' => $p,
                    ]
                );
            }
        }
    }
}
