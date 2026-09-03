<?php

namespace Database\Seeders;

use App\Models\Teacher;
use Illuminate\Database\Seeder;

class TeacherSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * Populates teachers table with 12 consistent DEMO teachers and valid demo avatar images.
     * Safe to run multiple times — idempotent via updateOrCreate.
     */
    public function run(): void
    {
        DemoAssetHelper::generateAll();

        $teachers = [
            [
                'name' => 'Ahmad Pratama, S.Pd. (Demo)',
                'nip' => 'DEMO-GURU-001',
                'position' => 'Guru Mata Pelajaran',
                'subject' => 'Matematika',
                'education' => 'S1 Pendidikan Matematika',
                'photo' => 'teachers/teacher-01.webp',
                'bio' => 'Pengajar matematika dengan pendekatan kontekstual dan pembina club matematika sekolah.',
                'sort_order' => 1,
                'is_active' => true,
            ],
            [
                'name' => 'Siti Rahmawati, M.Pd. (Demo)',
                'nip' => 'DEMO-GURU-002',
                'position' => 'Wakil Kepala Sekolah Bidang Kurikulum',
                'subject' => 'Ilmu Pengetahuan Alam (IPA)',
                'education' => 'S2 Pendidikan Sains',
                'photo' => 'teachers/teacher-02.webp',
                'bio' => 'Koordinator pengembangan kurikulum dan pembina tim olimpiade sains sekolah.',
                'sort_order' => 2,
                'is_active' => true,
            ],
            [
                'name' => 'Budi Santoso, S.Pd. (Demo)',
                'nip' => 'DEMO-GURU-003',
                'position' => 'Wakil Kepala Sekolah Bidang Kesiswaan',
                'subject' => 'Pendidikan Jasmani, Olahraga & Kesehatan',
                'education' => 'S1 Pendidikan Kepelatihan Olahraga',
                'photo' => 'teachers/teacher-03.webp',
                'bio' => 'Pembina OSIS dan penggerak kegiatan ekstrakurikuler olahraga serta kepemimpinan siswa.',
                'sort_order' => 3,
                'is_active' => true,
            ],
            [
                'name' => 'Dewi Anggraini, S.Pd. (Demo)',
                'nip' => 'DEMO-GURU-004',
                'position' => 'Guru Mata Pelajaran',
                'subject' => 'Bahasa Indonesia',
                'education' => 'S1 Pendidikan Bahasa dan Sastra Indonesia',
                'photo' => 'teachers/teacher-04.webp',
                'bio' => 'Penggiat gerakan literasi sekolah dan pembimbing lomba penulisan kreatif serta debat bahasa.',
                'sort_order' => 4,
                'is_active' => true,
            ],
            [
                'name' => 'Hendra Gunawan, S.Kom., Gr. (Demo)',
                'nip' => 'DEMO-GURU-005',
                'position' => 'Guru Mata Pelajaran',
                'subject' => 'Informatika',
                'education' => 'S1 Teknik Informatika & PPG',
                'photo' => 'teachers/teacher-05.webp',
                'bio' => 'Pengajar computational thinking, pemrograman dasar, dan literasi digital sekolah.',
                'sort_order' => 5,
                'is_active' => true,
            ],
            [
                'name' => 'Nurul Hidayati, S.Psi. (Demo)',
                'nip' => 'DEMO-GURU-006',
                'position' => 'Guru Bimbingan dan Konseling',
                'subject' => 'Bimbingan Konseling (BK)',
                'education' => 'S1 Psikologi Pendidikan',
                'photo' => 'teachers/teacher-06.webp',
                'bio' => 'Konselor ramah yang mendampingi pengembangan potensi diri, minat bakat, dan karakter siswa.',
                'sort_order' => 6,
                'is_active' => true,
            ],
            [
                'name' => 'Dian Permatasari, M.Pd. (Demo)',
                'nip' => 'DEMO-GURU-007',
                'position' => 'Guru Mata Pelajaran',
                'subject' => 'Bahasa Inggris',
                'education' => 'S2 Pendidikan Bahasa Inggris',
                'photo' => 'teachers/teacher-07.webp',
                'bio' => 'Pembimbing English Club dan fasilitator kompetisi pidato serta debat bahasa Inggris.',
                'sort_order' => 7,
                'is_active' => true,
            ],
            [
                'name' => 'Rizky Kurniawan, S.Pd. (Demo)',
                'nip' => 'DEMO-GURU-008',
                'position' => 'Guru Mata Pelajaran',
                'subject' => 'Ilmu Pengetahuan Sosial (IPS)',
                'education' => 'S1 Pendidikan IPS',
                'photo' => 'teachers/teacher-08.webp',
                'bio' => 'Pengajar wawasan sosial, geografi nusantara, dan pembina karya ilmiah remaja bidang sosial.',
                'sort_order' => 8,
                'is_active' => true,
            ],
            [
                'name' => 'Fitri Handayani, S.Pd. (Demo)',
                'nip' => 'DEMO-GURU-009',
                'position' => 'Guru Mata Pelajaran',
                'subject' => 'Pendidikan Pancasila & Kewarganegaraan',
                'education' => 'S1 Pendidikan Pancasila & Kewarganegaraan',
                'photo' => 'teachers/teacher-09.webp',
                'bio' => 'Penggerak penguatan profil pelajar berkarakter, wawasan kebangsaan, dan budaya demokrasi.',
                'sort_order' => 9,
                'is_active' => true,
            ],
            [
                'name' => 'Wahyu Lestari, S.Pd.I. (Demo)',
                'nip' => 'DEMO-GURU-010',
                'position' => 'Guru Mata Pelajaran',
                'subject' => 'Pendidikan Agama Islam',
                'education' => 'S1 Pendidikan Agama Islam',
                'photo' => 'teachers/teacher-10.webp',
                'bio' => 'Pembina kerohanian Islam, pembiasaan tadarus pagi, dan penanaman akhlak mulia siswa.',
                'sort_order' => 10,
                'is_active' => true,
            ],
            [
                'name' => 'Tri Wahyuni, S.Sn. (Demo)',
                'nip' => 'DEMO-GURU-011',
                'position' => 'Guru Mata Pelajaran',
                'subject' => 'Seni Budaya & Prakarya',
                'education' => 'S1 Pendidikan Seni Rupa & Kriya',
                'photo' => 'teachers/teacher-11.webp',
                'bio' => 'Membina bakat seni lukis, kriya tangan, dan pameran karya seni tahunan sekolah.',
                'sort_order' => 11,
                'is_active' => true,
            ],
            [
                'name' => 'Agus Priyanto, S.Pd. (Demo)',
                'nip' => 'DEMO-GURU-012',
                'position' => 'Guru Mata Pelajaran',
                'subject' => 'Prakarya & Kewirausahaan',
                'education' => 'S1 Pendidikan Keterampilan & Teknologi',
                'photo' => 'teachers/teacher-12.webp',
                'bio' => 'Membimbing keterampilan terapan dan pengenalan wirausaha kreatif berbasis potensi lokal.',
                'sort_order' => 12,
                'is_active' => true,
            ],
        ];

        foreach ($teachers as $teacher) {
            Teacher::updateOrCreate(
                ['nip' => $teacher['nip']],
                $teacher
            );
        }
    }
}
