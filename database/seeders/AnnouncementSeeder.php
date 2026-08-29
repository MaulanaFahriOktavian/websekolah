<?php

namespace Database\Seeders;

use App\Models\Announcement;
use App\Models\User;
use Illuminate\Database\Seeder;

class AnnouncementSeeder extends Seeder
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

        $announcements = [
            [
                'author_id' => $author->id,
                'title' => 'Jadwal Pengambilan Rapor dan Libur Semester Ganjil',
                'slug' => 'jadwal-pengambilan-rapor-dan-libur-semester-ganjil',
                'content' => "Diberitahukan kepada seluruh orang tua/wali murid bahwa pembagian laporan hasil belajar (rapor) akan dilaksanakan sesuai jadwal berikut:\n\n1. Tanggal: Jumat, 20 Desember\n2. Waktu: Pukul 08.00 - 11.30 WIB\n3. Tempat: Ruang kelas masing-masing\n\nLibur semester dimulai tanggal 23 Desember hingga 5 Januari. Kegiatan belajar mengajar semester genap akan aktif kembali pada hari Senin, 6 Januari.",
                'status' => 'published',
                'published_at' => now()->subDays(3),
                'expires_at' => now()->addMonths(1),
            ],
            [
                'author_id' => $author->id,
                'title' => 'Sosialisasi Program Beasiswa dan Pembinaan Bakat Siswa',
                'slug' => 'sosialisasi-program-beasiswa-dan-pembinaan-bakat-siswa',
                'content' => "Sekolah membuka kesempatan bagi siswa berprestasi untuk mengikuti seleksi program beasiswa pembinaan bakat akademik dan non-akademik.\n\nInformasi persyaratan dan pendaftaran dapat dilihat melalui ruang bimbingan konseling selama jam kerja.",
                'status' => 'published',
                'published_at' => now()->subDays(1),
                'expires_at' => now()->addDays(14),
            ],
            [
                'author_id' => $author->id,
                'title' => 'Pengumuman Lampau yang Sudah Kedaluwarsa',
                'slug' => 'pengumuman-lampau-yang-sudah-kedaluwarsa',
                'content' => 'Pengumuman ini telah melewati tanggal berakhir dan tidak boleh muncul di daftar publik.',
                'status' => 'published',
                'published_at' => now()->subMonths(2),
                'expires_at' => now()->subDays(5),
            ],
            [
                'author_id' => $author->id,
                'title' => 'Draft Pengumuman Kegiatan Kerja Bakti',
                'slug' => 'draft-pengumuman-kegiatan-kerja-bakti',
                'content' => 'Rencana pengumuman kerja bakti kebersihan lingkungan sekolah.',
                'status' => 'draft',
                'published_at' => null,
                'expires_at' => null,
            ],
        ];

        foreach ($announcements as $announcement) {
            Announcement::firstOrCreate(
                ['slug' => $announcement['slug']],
                $announcement
            );
        }
    }
}
