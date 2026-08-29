<?php

namespace Database\Seeders;

use App\Models\Staff;
use Illuminate\Database\Seeder;

class StaffSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $staffMembers = [
            [
                'name' => 'H. Suherman, S.AP.',
                'nip' => '197004101998031002',
                'position' => 'Kepala Tata Usaha',
                'education' => 'S1 Administrasi Publik',
                'bio' => 'Koordinator layanan administrasi umum, kepegawaian, dan pengelolaan arsip kelembagaan.',
                'sort_order' => 1,
                'is_active' => true,
            ],
            [
                'name' => 'Maya Kartika, S.I.Pust.',
                'nip' => null,
                'position' => 'Kepala Perpustakaan',
                'education' => 'S1 Ilmu Perpustakaan & Informasi',
                'bio' => 'Pengelola perpustakaan digital, pojok baca, dan inventarisasi bahan pustaka sekolah.',
                'sort_order' => 2,
                'is_active' => true,
            ],
            [
                'name' => 'Fajar Pratama, A.Md.Kom.',
                'nip' => null,
                'position' => 'Operator Data Pokok Pendidikan (Dapodik) & IT',
                'education' => 'D3 Manajemen Informatika',
                'bio' => 'Penanggung jawab sinkronisasi Dapodik, sistem informasi sekolah, dan jaringan komputer.',
                'sort_order' => 3,
                'is_active' => true,
            ],
            [
                'name' => 'Endang Sulistyowati, A.Md.',
                'nip' => null,
                'position' => 'Pranata Laboratorium IPA',
                'education' => 'D3 Analis Kimia & Laboratorium',
                'bio' => 'Laboran praktikum biologi, kimia, dan fisika dengan standar keselamatan laboratorium modern.',
                'sort_order' => 4,
                'is_active' => true,
            ],
            [
                'name' => 'Agus Santoso',
                'nip' => null,
                'position' => 'Staf Keamanan Sekolah',
                'education' => 'SMA / Sederajat',
                'bio' => 'Petugas keamanan yang menjaga ketertiban, keselamatan lingkungan belajar, dan kenyamanan tamu.',
                'sort_order' => 5,
                'is_active' => true,
            ],
        ];

        foreach ($staffMembers as $staff) {
            Staff::firstOrCreate(
                ['name' => $staff['name']],
                $staff
            );
        }
    }
}
