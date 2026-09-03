<?php

namespace Database\Seeders;

use App\Models\Announcement;
use App\Models\User;
use Illuminate\Database\Seeder;

class AnnouncementSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * Populates announcements table with 6 published DEMO announcements.
     * Safe to run multiple times — idempotent via updateOrCreate.
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
                'title' => 'Jadwal Pelaksanaan Penilaian Akhir Semester (PAS)',
                'slug' => 'jadwal-pelaksanaan-penilaian-akhir-semester-pas',
                'content' => 'Diberitahukan kepada seluruh peserta didik bahwa Penilaian Akhir Semester (PAS) akan dilaksanakan mulai tanggal 1 hingga 8 Desember. Seluruh siswa diharapkan mempersiapkan kartu peserta ujian dan hadir 15 menit sebelum bel masuk berbunyi.',
                'status' => 'published',
                'published_at' => now()->subDays(1),
                'expires_at' => now()->addMonths(2),
            ],
            [
                'author_id' => $author->id,
                'title' => 'Pemberitahuan Libur Semester dan Kalender Akademik',
                'slug' => 'pemberitahuan-libur-semester-dan-kalender-akademik',
                'content' => 'Berdasarkan kalender pendidikan resmi, libur semester ganjil dimulai tanggal 22 Desember sampai dengan 4 Januari. Kegiatan belajar mengajar semester genap akan aktif kembali pada hari Senin, 5 Januari.',
                'status' => 'published',
                'published_at' => now()->subDays(2),
                'expires_at' => now()->addMonths(3),
            ],
            [
                'author_id' => $author->id,
                'title' => 'Undangan Rapat Koordinasi Komite Sekolah dan Orang Tua Murid',
                'slug' => 'undangan-rapat-koordinasi-komite-sekolah-orang-tua',
                'content' => 'Sekolah mengundang bapak/ibu orang tua/wali murid untuk menghadiri rapat pleno komite sekolah guna membahas evaluasi program kerja dan rencana penguatan sarana belajar. Pertemuan diadakan hari Sabtu di aula serbaguna.',
                'status' => 'published',
                'published_at' => now()->subDays(3),
                'expires_at' => now()->addMonths(1),
            ],
            [
                'author_id' => $author->id,
                'title' => 'Pendaftaran Anggota Baru Ekstrakurikuler Pilihan',
                'slug' => 'pendaftaran-anggota-baru-ekstrakurikuler-pilihan',
                'content' => 'Pendaftaran ekstrakurikuler pilihan (Pramuka, PMR, Paskibra, Robotik, Futsal, Tari, dan Paduan Suara) resmi dibuka. Formulir pendaftaran dapat diambil di ruang kesiswaan atau mendaftar melalui pembina masing-masing.',
                'status' => 'published',
                'published_at' => now()->subDays(4),
                'expires_at' => now()->addMonths(1),
            ],
            [
                'author_id' => $author->id,
                'title' => 'Jadwal Pembagian Laporan Hasil Belajar (Rapor) Siswa',
                'slug' => 'jadwal-pembagian-laporan-hasil-belajar-rapor-siswa',
                'content' => 'Penyerahan buku laporan hasil belajar peserta didik akan diserahkan langsung kepada orang tua/wali pada hari Jumat pukul 08.00 - 11.30 WIB di ruang kelas masing-masing bersama wali kelas.',
                'status' => 'published',
                'published_at' => now()->subDays(5),
                'expires_at' => now()->addMonths(2),
            ],
            [
                'author_id' => $author->id,
                'title' => 'Pendaftaran Lomba Kreativitas dan Literasi Antar Kelas',
                'slug' => 'pendaftaran-lomba-kreativitas-dan-literasi-antar-kelas',
                'content' => 'Dalam rangka menyemarakkan kegiatan jeda semester, OSIS mengadakan serangkaian lomba antarkelas meliputi cipta komik strip, mading 3D, dan cerdas cermat kebangsaan. Setiap perwakilan kelas wajib mengirimkan utusan.',
                'status' => 'published',
                'published_at' => now()->subDays(6),
                'expires_at' => now()->addMonths(1),
            ],
        ];

        foreach ($announcements as $announcement) {
            Announcement::updateOrCreate(
                ['slug' => $announcement['slug']],
                $announcement
            );
        }
    }
}
