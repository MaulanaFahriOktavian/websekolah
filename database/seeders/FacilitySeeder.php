<?php

namespace Database\Seeders;

use App\Models\Facility;
use Illuminate\Database\Seeder;

class FacilitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $facilities = [
            [
                'name' => 'Perpustakaan Digital & Ruang Baca',
                'slug' => 'perpustakaan-digital-ruang-baca',
                'description' => 'Pusat sumber belajar dengan ribuan koleksi buku fisik, e-book, ruang baca ber-AC, dan area diskusi yang nyaman.',
                'capacity' => 100,
                'photo' => null,
                'sort_order' => 1,
                'is_active' => true,
            ],
            [
                'name' => 'Laboratorium Komputer & Multimedia',
                'slug' => 'laboratorium-komputer-multimedia',
                'description' => 'Fasilitas praktikum komputer terhubung jaringan internet berkecepatan tinggi untuk pembelajaran informatika dan asesmen digital.',
                'capacity' => 45,
                'photo' => null,
                'sort_order' => 2,
                'is_active' => true,
            ],
            [
                'name' => 'Laboratorium Sains & IPA Terpadu',
                'slug' => 'laboratorium-sains-ipa-terpadu',
                'description' => 'Laboratorium lengkap untuk eksperimen fisika, biologi, dan kimia yang dilengkapi standar keselamatan kerja modern.',
                'capacity' => 40,
                'photo' => null,
                'sort_order' => 3,
                'is_active' => true,
            ],
            [
                'name' => 'Lapangan Olahraga Multifungsi',
                'slug' => 'lapangan-olahraga-multifungsi',
                'description' => 'Sarana olahraga luar ruangan untuk bola basket, bola voli, bulu tangkis, dan futsal.',
                'capacity' => null,
                'photo' => null,
                'sort_order' => 4,
                'is_active' => true,
            ],
            [
                'name' => 'Ruang Unit Kesehatan Sekolah (UKS)',
                'slug' => 'ruang-unit-kesehatan-sekolah-uks',
                'description' => 'Layanan pertolongan pertama pada kecelakaan dan pemeriksaan kesehatan berkala dengan tempat tidur pasien dan tenaga medis mitra.',
                'capacity' => 8,
                'photo' => null,
                'sort_order' => 5,
                'is_active' => true,
            ],
        ];

        foreach ($facilities as $facility) {
            Facility::firstOrCreate(
                ['slug' => $facility['slug']],
                $facility
            );
        }
    }
}
