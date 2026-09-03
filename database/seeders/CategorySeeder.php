<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * Populates categories table with consistent DEMO data.
     * Safe to run multiple times — idempotent via updateOrCreate.
     */
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Akademik',
                'slug' => 'akademik',
                'description' => 'Informasi kurikulum, pembelajaran, dan kalender pendidikan sekolah.',
                'sort_order' => 1,
                'is_active' => true,
            ],
            [
                'name' => 'Kegiatan Sekolah',
                'slug' => 'kegiatan-sekolah',
                'description' => 'Dokumentasi kegiatan upacara, peringatan hari besar, dan agenda sekolah.',
                'sort_order' => 2,
                'is_active' => true,
            ],
            [
                'name' => 'Prestasi',
                'slug' => 'prestasi',
                'description' => 'Capaian dan penghargaan membanggakan siswa serta sekolah.',
                'sort_order' => 3,
                'is_active' => true,
            ],
            [
                'name' => 'Ekstrakurikuler',
                'slug' => 'ekstrakurikuler',
                'description' => 'Aktivitas pengembangan bakat minat, keolahragaan, kepramukaan, dan seni.',
                'sort_order' => 4,
                'is_active' => true,
            ],
            [
                'name' => 'Teknologi',
                'slug' => 'teknologi',
                'description' => 'Inovasi pembelajaran digital, literasi TIK, dan komputasi sekolah.',
                'sort_order' => 5,
                'is_active' => true,
            ],
            [
                'name' => 'Informasi Sekolah',
                'slug' => 'informasi-sekolah',
                'description' => 'Pemberitahuan resmi kelembagaan, sarana prasarana, dan layanan publik.',
                'sort_order' => 6,
                'is_active' => true,
            ],
        ];

        foreach ($categories as $category) {
            Category::updateOrCreate(
                ['slug' => $category['slug']],
                $category
            );
        }
    }
}
