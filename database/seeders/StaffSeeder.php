<?php

namespace Database\Seeders;

use App\Models\Staff;
use Illuminate\Database\Seeder;

class StaffSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * Populates staff table with 6 consistent DEMO staff members and valid demo avatars.
     * Safe to run multiple times — idempotent via updateOrCreate.
     */
    public function run(): void
    {
        DemoAssetHelper::generateAll();

        $staffMembers = [
            [
                'name' => 'Suherman, S.AP. (Demo)',
                'nip' => 'DEMO-STAF-001',
                'position' => 'Kepala Tata Usaha',
                'education' => 'S1 Administrasi Publik',
                'photo' => 'staff/staff-01.webp',
                'bio' => 'Koordinator layanan administrasi umum, kepegawaian, dan pengelolaan arsip kelembagaan sekolah.',
                'sort_order' => 1,
                'is_active' => true,
            ],
            [
                'name' => 'Ratna Sari, S.E. (Demo)',
                'nip' => 'DEMO-STAF-002',
                'position' => 'Staf Administrasi & Keuangan',
                'education' => 'S1 Akuntansi',
                'photo' => 'staff/staff-02.webp',
                'bio' => 'Pengelola pembukuan, pelaporan keuangan operasional sekolah, dan layanan administrasi pembiayaan.',
                'sort_order' => 2,
                'is_active' => true,
            ],
            [
                'name' => 'Fajar Pratama, A.Md.Kom. (Demo)',
                'nip' => 'DEMO-STAF-003',
                'position' => 'Operator Dapodik & IT',
                'education' => 'D3 Manajemen Informatika',
                'photo' => 'staff/staff-03.webp',
                'bio' => 'Penanggung jawab sinkronisasi Dapodik, pengelolaan sistem informasi sekolah, dan pemeliharaan jaringan.',
                'sort_order' => 3,
                'is_active' => true,
            ],
            [
                'name' => 'Maya Kartika, S.I.Pust. (Demo)',
                'nip' => 'DEMO-STAF-004',
                'position' => 'Kepala Perpustakaan',
                'education' => 'S1 Ilmu Perpustakaan & Informasi',
                'photo' => 'staff/staff-04.webp',
                'bio' => 'Pengelola perpustakaan literasi, layanan katalog digital, dan inventarisasi bahan pustaka sekolah.',
                'sort_order' => 4,
                'is_active' => true,
            ],
            [
                'name' => 'Endang Sulistyowati, A.Md. (Demo)',
                'nip' => 'DEMO-STAF-005',
                'position' => 'Pranata Laboratorium IPA',
                'education' => 'D3 Analis Kimia & Laboratorium',
                'photo' => 'staff/staff-05.webp',
                'bio' => 'Laboran praktikum sains dengan standar pemeliharaan alat dan keselamatan kerja yang terstandarisasi.',
                'sort_order' => 5,
                'is_active' => true,
            ],
            [
                'name' => 'Agus Santoso (Demo)',
                'nip' => 'DEMO-STAF-006',
                'position' => 'Petugas Keamanan & Ketertiban',
                'education' => 'SMA / Sederajat',
                'photo' => 'staff/staff-06.webp',
                'bio' => 'Menjaga keamanan, ketertiban lingkungan belajar mengajar, serta kenyamanan akses tamu sekolah.',
                'sort_order' => 6,
                'is_active' => true,
            ],
        ];

        foreach ($staffMembers as $staff) {
            Staff::updateOrCreate(
                ['nip' => $staff['nip']],
                $staff
            );
        }
    }
}
