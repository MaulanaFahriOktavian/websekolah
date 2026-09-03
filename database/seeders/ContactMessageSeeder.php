<?php

namespace Database\Seeders;

use App\Models\ContactMessage;
use Illuminate\Database\Seeder;

class ContactMessageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * Populates contact_messages table with 5 DEMO contact messages.
     * Safe to run multiple times — idempotent via updateOrCreate.
     */
    public function run(): void
    {
        $messages = [
            [
                'name' => 'Demo Pengunjung 1',
                'email' => 'pengunjung1@demo.test',
                'phone' => '081200000001',
                'subject' => 'Informasi Jadwal Penerimaan Peserta Didik Baru',
                'message' => 'Halo, saya ingin menanyakan jadwal resmi dan berkas persyaratan untuk pendaftaran peserta didik baru tahun ajaran mendatang. Terima kasih.',
                'status' => 'unread',
            ],
            [
                'name' => 'Demo Pengunjung 2',
                'email' => 'pengunjung2@demo.test',
                'phone' => '081200000002',
                'subject' => 'Pertanyaan Mengenai Kegiatan Ekstrakurikuler',
                'message' => 'Selamat siang, apakah sekolah menyediakan ekstrakurikuler di bidang teknologi atau robotika? Mohon informasinya.',
                'status' => 'unread',
            ],
            [
                'name' => 'Demo Pengunjung 3',
                'email' => 'pengunjung3@demo.test',
                'phone' => '081200000003',
                'subject' => 'Apresiasi Kegiatan Bulan Bahasa',
                'message' => 'Kami sangat mengapresiasi pagelaran seni dan literasi yang diselenggarakan sekolah kemarin. Acaranya sangat menginspirasi para siswa.',
                'status' => 'read',
            ],
            [
                'name' => 'Demo Pengunjung 4',
                'email' => 'pengunjung4@demo.test',
                'phone' => '081200000004',
                'subject' => 'Penawaran Kerjasama Pelatihan Literasi Digital',
                'message' => 'Salam hormat, perkenankan kami mengajukan proposal kegiatan workshop literasi digital dan keamanan internet untuk peserta didik.',
                'status' => 'read',
            ],
            [
                'name' => 'Demo Pengunjung 5',
                'email' => 'pengunjung5@demo.test',
                'phone' => '081200000005',
                'subject' => 'Konsultasi Layanan Bimbingan Konseling',
                'message' => 'Selamat pagi bapak/ibu guru BK, kami selaku orang tua ingin berkonsultasi mengenai peminatan bakat dan studi lanjut putra kami.',
                'status' => 'unread',
            ],
        ];

        foreach ($messages as $item) {
            ContactMessage::updateOrCreate(
                [
                    'email' => $item['email'],
                    'subject' => $item['subject'],
                ],
                $item
            );
        }
    }
}
