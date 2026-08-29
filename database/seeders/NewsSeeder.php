<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\News;
use App\Models\User;
use Illuminate\Database\Seeder;

class NewsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $author = User::first();
        if (! $author) {
            return;
        }

        $beritaCategory = Category::where('slug', 'berita-sekolah')->first();
        $prestasiCategory = Category::where('slug', 'prestasi')->first();
        $akademikCategory = Category::where('slug', 'akademik')->first();

        $newsItems = [
            [
                'category_id' => $beritaCategory?->id ?? 1,
                'author_id' => $author->id,
                'title' => 'Pembukaan Tahun Ajaran Baru Berlangsung Khidmat dan Penuh Semangat',
                'slug' => 'pembukaan-tahun-ajaran-baru-berlangsung-khidmat',
                'excerpt' => 'Seluruh warga sekolah menyambut tahun ajaran baru dengan berbagai program pembelajaran inovatif.',
                'content' => "Tahun ajaran baru resmi dimulai dengan apel pagi dan penyambutan hangat bagi seluruh siswa baru dan lama.\n\nKepala sekolah dalam amanatnya menyampaikan pentingnya menjaga semangat belajar, kedisiplinan, dan integritas moral. Berbagai fasilitas laboratorium dan perpustakaan digital juga telah diperbarui untuk mendukung proses pembelajaran aktif dan kolaboratif.\n\nSemoga tahun ajaran ini membawa banyak prestasi dan kebaikan bagi seluruh civitas akademika.",
                'featured_image' => null,
                'status' => 'published',
                'published_at' => now()->subDays(2),
                'meta_title' => 'Pembukaan Tahun Ajaran Baru',
                'meta_description' => 'Liputan pembukaan tahun ajaran baru dengan semangat inovasi dan kolaborasi.',
            ],
            [
                'category_id' => $prestasiCategory?->id ?? 1,
                'author_id' => $author->id,
                'title' => 'Siswa Meraih Medali Emas pada Kompetisi Sains Tingkat Provinsi',
                'slug' => 'siswa-meraih-medali-emas-pada-kompetisi-sains-provinsi',
                'excerpt' => 'Prestasi membanggakan kembali ditorehkan oleh perwakilan siswa dalam ajang olimpiade sains.',
                'content' => "Tim olimpiade sains sekolah berhasil membawa pulang medali emas setelah melewati serangkaian seleksi dan ujian praktik yang kompetitif.\n\nKeberhasilan ini merupakan hasil dari dedikasi belajar yang konsisten serta bimbingan intensif dari para guru pembina. Sekolah berkomitmen untuk terus mendukung minat dan bakat siswa di bidang sains dan teknologi.",
                'featured_image' => null,
                'status' => 'published',
                'published_at' => now()->subDay(),
                'meta_title' => 'Siswa Raih Medali Emas Olimpiade Sains',
                'meta_description' => 'Prestasi siswa pada kompetisi sains tingkat provinsi dengan raihan medali emas.',
            ],
            [
                'category_id' => $akademikCategory?->id ?? 1,
                'author_id' => $author->id,
                'title' => 'Draft Rencana Pelaksanaan Asesmen Tengah Semester',
                'slug' => 'draft-rencana-pelaksanaan-asesmen-tengah-semester',
                'excerpt' => 'Dokumen persiapan teknis asesmen tengah semester untuk evaluasi pembelajaran.',
                'content' => 'Draf asesmen tengah semester sedang disiapkan oleh tim kurikulum untuk mengukur ketercapaian kompetensi pembelajaran siswa.',
                'featured_image' => null,
                'status' => 'draft',
                'published_at' => null,
                'meta_title' => null,
                'meta_description' => null,
            ],
        ];

        foreach ($newsItems as $item) {
            News::firstOrCreate(
                ['slug' => $item['slug']],
                $item
            );
        }
    }
}
