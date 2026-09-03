<?php

namespace Database\Seeders;

use App\Models\Facility;
use Illuminate\Database\Seeder;

class FacilitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * Populates facilities table with 8 consistent DEMO facilities and valid demo images.
     * Safe to run multiple times — idempotent via updateOrCreate.
     */
    public function run(): void
    {
        DemoAssetHelper::generateAll();

        $facilities = [
            [
                'name' => 'Laboratorium Komputer',
                'slug' => 'laboratorium-komputer',
                'description' => 'Fasilitas komputer modern berpendingin udara yang dilengkapi akses internet cepat untuk pembelajaran informatika, koding, dan simulasi asesmen digital.',
                'capacity' => 45,
                'photo' => 'facilities/facility-01.webp',
                'sort_order' => 1,
                'is_active' => true,
            ],
            [
                'name' => 'Perpustakaan & Ruang Baca Digital',
                'slug' => 'perpustakaan-ruang-baca-digital',
                'description' => 'Pusat sumber belajar nyaman yang menyediakan ribuan koleksi buku fisik, modul pengayaan, e-book, dan ruang diskusi kelompok.',
                'capacity' => 80,
                'photo' => 'facilities/facility-02.webp',
                'sort_order' => 2,
                'is_active' => true,
            ],
            [
                'name' => 'Laboratorium IPA Terpadu',
                'slug' => 'laboratorium-ipa-terpadu',
                'description' => 'Laboratorium sains lengkap untuk eksperimen fisika, biologi, dan kimia yang dilengkapi peralatan mikroskopik serta standar keselamatan tinggi.',
                'capacity' => 40,
                'photo' => 'facilities/facility-03.webp',
                'sort_order' => 3,
                'is_active' => true,
            ],
            [
                'name' => 'Ruang Multimedia & Audio Visual',
                'slug' => 'ruang-multimedia-audio-visual',
                'description' => 'Ruang presentasi dan pemutaran media pembelajaran interaktif dengan proyektor resolusi tinggi dan tata suara profesional.',
                'capacity' => 60,
                'photo' => 'facilities/facility-04.webp',
                'sort_order' => 4,
                'is_active' => true,
            ],
            [
                'name' => 'Lapangan Olahraga Multifungsi',
                'slug' => 'lapangan-olahraga-multifungsi',
                'description' => 'Sarana olahraga luar ruangan berstandar untuk aktivitas senam pagi, bola basket, bola voli, bulu tangkis, dan futsal.',
                'capacity' => 200,
                'photo' => 'facilities/facility-05.webp',
                'sort_order' => 5,
                'is_active' => true,
            ],
            [
                'name' => 'Ruang Kesenian & Budaya',
                'slug' => 'ruang-kesenian-budaya',
                'description' => 'Studio ekspresi seni untuk latihan gamelan tradisional, alat musik modern, tari kreasi daerah, dan persiapan pementasan budaya.',
                'capacity' => 35,
                'photo' => 'facilities/facility-06.webp',
                'sort_order' => 6,
                'is_active' => true,
            ],
            [
                'name' => 'Unit Kesehatan Sekolah (UKS)',
                'slug' => 'unit-kesehatan-sekolah-uks',
                'description' => 'Ruang pertolongan pertama pada gangguan kesehatan ringan, dilengkapi tempat tidur pasien terpisah, obat-obatan standar, dan tim PMR.',
                'capacity' => 10,
                'photo' => 'facilities/facility-07.webp',
                'sort_order' => 7,
                'is_active' => true,
            ],
            [
                'name' => 'Mushola Al-Ikhlas Sekolah',
                'slug' => 'mushola-al-ikhlas-sekolah',
                'description' => 'Tempat ibadah bersih dan representatif untuk salat berjamaah, pembinaan rohani Islam, dan peringatan hari besar keagamaan.',
                'capacity' => 150,
                'photo' => 'facilities/facility-08.webp',
                'sort_order' => 8,
                'is_active' => true,
            ],
        ];

        foreach ($facilities as $facility) {
            Facility::updateOrCreate(
                ['slug' => $facility['slug']],
                $facility
            );
        }
    }
}
