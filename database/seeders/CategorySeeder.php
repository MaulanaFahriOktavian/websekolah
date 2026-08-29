<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Berita Sekolah',
                'slug' => 'berita-sekolah',
                'description' => 'Informasi dan liputan seputar sekolah.',
                'sort_order' => 1,
                'is_active' => true,
            ],
            [
                'name' => 'Akademik',
                'slug' => 'akademik',
                'description' => 'Informasi pembelajaran, kurikulum, dan kalender pendidikan.',
                'sort_order' => 2,
                'is_active' => true,
            ],
            [
                'name' => 'Kesiswaan',
                'slug' => 'kesiswaan',
                'description' => 'Kegiatan OSIS, ekstrakurikuler, dan organisasi siswa.',
                'sort_order' => 3,
                'is_active' => true,
            ],
            [
                'name' => 'Prestasi',
                'slug' => 'prestasi',
                'description' => 'Pencapaian siswa dan sekolah di berbagai kompetisi.',
                'sort_order' => 4,
                'is_active' => true,
            ],
            [
                'name' => 'Kegiatan',
                'slug' => 'kegiatan',
                'description' => 'Dokumentasi acara, workshop, seminar, dan peringatan hari besar.',
                'sort_order' => 5,
                'is_active' => true,
            ],
        ];

        foreach ($categories as $category) {
            Category::firstOrCreate(
                ['slug' => $category['slug']],
                $category
            );
        }
    }
}
