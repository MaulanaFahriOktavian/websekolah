<?php

namespace Database\Seeders;

use App\Models\Teacher;
use Illuminate\Database\Seeder;

class TeacherSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $teachers = [
            [
                'name' => 'Drs. H. Ahmad Fauzi, M.Pd.',
                'nip' => '196805121994031005',
                'position' => 'Kepala Sekolah',
                'subject' => 'Matematika',
                'education' => 'S2 Manajemen Pendidikan',
                'bio' => 'Berpengalaman lebih dari 25 tahun dalam bidang kepemimpinan dan manajemen mutu pendidikan sekolah menengah.',
                'sort_order' => 1,
                'is_active' => true,
            ],
            [
                'name' => 'Siti Rahmawati, S.Pd., M.Si.',
                'nip' => '197508202002122003',
                'position' => 'Wakil Kepala Sekolah Bidang Kurikulum',
                'subject' => 'Fisika',
                'education' => 'S2 Ilmu Fisika',
                'bio' => 'Pengembang kurikulum sains berbasis teknologi dan pembina olimpiade fisika sekolah.',
                'sort_order' => 2,
                'is_active' => true,
            ],
            [
                'name' => 'Bambang Sudarmono, S.Pd.',
                'nip' => '198203152008011009',
                'position' => 'Wakil Kepala Sekolah Bidang Kesiswaan',
                'subject' => 'Pendidikan Jasmani & Olahraga',
                'education' => 'S1 Pendidikan Kepelatihan Olahraga',
                'bio' => 'Pembina OSIS dan penggerak berbagai ekstrakurikuler olahraga serta kepemimpinan siswa.',
                'sort_order' => 3,
                'is_active' => true,
            ],
            [
                'name' => 'Dewi Anggraini, S.Pd.',
                'nip' => null,
                'position' => 'Guru Mata Pelajaran',
                'subject' => 'Bahasa Indonesia',
                'education' => 'S1 Pendidikan Bahasa dan Sastra Indonesia',
                'bio' => 'Pengampu literasi sekolah dan pembimbing lomba penulisan kreatif serta debat bahasa.',
                'sort_order' => 4,
                'is_active' => true,
            ],
            [
                'name' => 'Rian Hidayat, S.Kom., Gr.',
                'nip' => null,
                'position' => 'Guru Mata Pelajaran',
                'subject' => 'Informatika',
                'education' => 'S1 Teknik Informatika & PPG',
                'bio' => 'Pengajar computational thinking, pemrograman dasar, dan literasi digital generasi muda.',
                'sort_order' => 5,
                'is_active' => true,
            ],
            [
                'name' => 'Nurul Hidayati, S.Psi.',
                'nip' => null,
                'position' => 'Guru Bimbingan dan Konseling',
                'subject' => 'Bimbingan Konseling (BK)',
                'education' => 'S1 Psikologi Pendidikan',
                'bio' => 'Konselor ramah yang mendampingi pengembangan potensi diri, minat bakat, dan karier siswa.',
                'sort_order' => 6,
                'is_active' => true,
            ],
        ];

        foreach ($teachers as $teacher) {
            Teacher::firstOrCreate(
                ['name' => $teacher['name']],
                $teacher
            );
        }
    }
}
