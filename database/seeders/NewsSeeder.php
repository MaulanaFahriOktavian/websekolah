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
     *
     * Populates news table with 12 published DEMO news articles with valid demo featured images.
     * Safe to run multiple times — idempotent via updateOrCreate.
     */
    public function run(): void
    {
        DemoAssetHelper::generateAll();

        $author = User::first();
        if (! $author) {
            return;
        }

        $cats = Category::pluck('id', 'slug')->toArray();
        $defaultCatId = ! empty($cats) ? reset($cats) : 1;

        $newsItems = [
            [
                'category_id' => $cats['kegiatan-sekolah'] ?? $defaultCatId,
                'author_id' => $author->id,
                'title' => 'Upacara Peringatan Hari Pendidikan Nasional Berlangsung Khidmat',
                'slug' => 'upacara-peringatan-hari-pendidikan-nasional-berlangsung-khidmat',
                'excerpt' => 'Seluruh civitas akademika mengenakan pakaian adat nusantara dalam rangka memperingati Hari Pendidikan Nasional.',
                'content' => "Upacara peringatan Hari Pendidikan Nasional di halaman utama sekolah berlangsung dengan tertib dan penuh nuansa kebudayaan. Para guru dan perwakilan peserta didik mengenakan busana tradisional dari berbagai daerah nusantara.\n\nDalam amanatnya, pembina upacara menekankan pentingnya semangat merdeka belajar serta keteladanan Ki Hajar Dewantara dalam menumbuhkan generasi yang mandiri dan berbudi pekerti luhur.\n\nAcara ditutup dengan persembahan paduan suara siswa yang membawakan lagu-lagu perjuangan nasional.",
                'featured_image' => 'news/news-01.webp',
                'status' => 'published',
                'published_at' => now()->subDays(1),
                'meta_title' => 'Upacara Peringatan Hardiknas Sekolah Demo',
                'meta_description' => 'Upacara peringatan Hari Pendidikan Nasional dengan nuansa kebudayaan nusantara.',
            ],
            [
                'category_id' => $cats['prestasi'] ?? $defaultCatId,
                'author_id' => $author->id,
                'title' => 'Tim Robotik Siswa Raih Penghargaan pada Kompetisi Teknologi Pelajar',
                'slug' => 'tim-robotik-siswa-raih-penghargaan-pada-kompetisi-teknologi-pelajar',
                'excerpt' => 'Karya inovasi robot pemilah sampah otomatis berhasil meraih apresiasi dewan juri tingkat daerah.',
                'content' => "Prestasi gemilang ditorehkan oleh perwakilan tim ekstrakurikuler robotik sekolah dalam ajang kompetisi teknologi inovasi pelajar. Tim berhasil merancang prototipe robot otomatis yang mampu membedakan sampah organik dan anorganik berbasis sensor warna.\n\nPembina ekstrakurikuler menyampaikan rasa bangga atas kerja keras tim selama dua bulan masa perancangan dan pengujian. Keberhasilan ini menjadi motivasi bagi siswa lain untuk giat mendalami bidang STEM.",
                'featured_image' => 'news/news-02.webp',
                'status' => 'published',
                'published_at' => now()->subDays(2),
                'meta_title' => 'Prestasi Tim Robotik Siswa di Kompetisi Teknologi',
                'meta_description' => 'Inovasi robot pemilah sampah raih penghargaan membanggakan di ajang teknologi pelajar.',
            ],
            [
                'category_id' => $cats['akademik'] ?? $defaultCatId,
                'author_id' => $author->id,
                'title' => 'Penerapan Metode Pembelajaran Saintifik Berbasis Proyek di Kelas',
                'slug' => 'penerapan-metode-pembelajaran-saintifik-berbasis-proyek-di-kelas',
                'excerpt' => 'Guru IPA dan Matematika mengintegrasikan pembelajaran berbasis proyek untuk melatih daya kritis peserta didik.',
                'content' => "Untuk meningkatkan pemahaman konseptual, para pendidik mengimplementasikan metode project-based learning (PjBL) pada materi sains terpadu. Para siswa dibagi ke dalam kelompok kecil untuk mengamati fenomena alam di lingkungan sekitar sekolah dan mempresentasikannya.\n\nAntusiasme belajar siswa terlihat meningkat signifikan karena mereka diajak menemukan solusi secara langsung dari permasalahan nyata.",
                'featured_image' => 'news/news-03.webp',
                'status' => 'published',
                'published_at' => now()->subDays(3),
                'meta_title' => 'Pembelajaran Saintifik Berbasis Proyek di Sekolah',
                'meta_description' => 'Inovasi pembelajaran berbasis proyek untuk mengasah nalar kritis siswa.',
            ],
            [
                'category_id' => $cats['ekstrakurikuler'] ?? $defaultCatId,
                'author_id' => $author->id,
                'title' => 'Kemah Bersama Anggota Pramuka Penggalang Latih Kemandirian',
                'slug' => 'kemah-bersama-anggota-pramuka-penggalang-latih-kemandirian',
                'excerpt' => 'Kegiatan kepramukaan luar ruangan diisi dengan pelatihan navigasi darat, api unggun, dan bakti sosial.',
                'content' => "Gerakan Pramuka Gugus Depan pangkalan sekolah menyelenggarakan perkemahan akhir pekan yang diikuti oleh seluruh siswa tingkat penggalang. Berbagai kecakapan hidup dilatihkan, mulai dari mendirikan tenda, memasak mandiri, hingga pionering tali temali.\n\nKegiatan ini bertujuan memupuk solidaritas, disiplin waktu, dan kepedulian terhadap kelestarian alam sekitar tempat perkemahan.",
                'featured_image' => 'news/news-04.webp',
                'status' => 'published',
                'published_at' => now()->subDays(4),
                'meta_title' => 'Kemah Pramuka Penggalang Latih Kemandirian Siswa',
                'meta_description' => 'Perkemahan akhir pekan kepramukaan untuk menumbuhkan solidaritas dan disiplin diri.',
            ],
            [
                'category_id' => $cats['informasi-sekolah'] ?? $defaultCatId,
                'author_id' => $author->id,
                'title' => 'Gerakan Sekolah Sehat dan Aksi Pungut Sampah Berkelanjutan',
                'slug' => 'gerakan-sekolah-sehat-dan-aksi-pungut-sampah-berkelanjutan',
                'excerpt' => 'Warga sekolah bergotong royong merawat taman kelas dan memastikan kebersihan lingkungan belajar.',
                'content' => "Sebagai komitmen mewujudkan lingkungan belajar yang asri dan sehat, kegiatan Jumat Bersih rutin dilaksanakan oleh seluruh guru, karyawan, dan siswa. Aksi difokuskan pada pemilahan sampah di sumbernya dan pembuatan kompos daun kering di bank sampah sekolah.\n\nDengan lingkungan yang bersih dan nyaman, suasana kegiatan belajar mengajar menjadi semakin kondusif dan menyenangkan.",
                'featured_image' => 'news/news-05.webp',
                'status' => 'published',
                'published_at' => now()->subDays(5),
                'meta_title' => 'Aksi Lingkungan dan Gerakan Sekolah Sehat',
                'meta_description' => 'Gotong royong kebersihan lingkungan sekolah dan pemilahan sampah terpadu.',
            ],
            [
                'category_id' => $cats['teknologi'] ?? $defaultCatId,
                'author_id' => $author->id,
                'title' => 'Sosialisasi Literasi Digital dan Etika Bermedia Sosial bagi Remaja',
                'slug' => 'sosialisasi-literasi-digital-dan-etika-bermedia-sosial-bagi-remaja',
                'excerpt' => 'Workshop edukasi internet sehat mengajak siswa bijak memilah informasi dan mencegah perundungan siber.',
                'content' => "Bekerja sama dengan narasumber teknologi dan psikologi remaja, sekolah mengadakan sosialisasi cerdas bermedia sosial. Materi mencakup bahaya penyebaran berita bohong (hoaks), perlindungan data privasi pribadi, serta etika kesantunan dalam berkomunikasi di ruang digital.\n\nPara peserta didik diajak menjadi kreator konten edukatif yang menyebarkan pengaruh positif di platform media sosial.",
                'featured_image' => 'news/news-06.webp',
                'status' => 'published',
                'published_at' => now()->subDays(6),
                'meta_title' => 'Literasi Digital dan Etika Media Sosial Remaja',
                'meta_description' => 'Edukasi penggunaan internet sehat dan pencegahan cyberbullying bagi peserta didik.',
            ],
            [
                'category_id' => $cats['kegiatan-sekolah'] ?? $defaultCatId,
                'author_id' => $author->id,
                'title' => 'Bulan Bahasa Disemarakkan dengan Beragam Lomba Literasi',
                'slug' => 'bulan-bahasa-disemarakkan-dengan-beragam-lomba-literasi',
                'excerpt' => 'Mulai dari cipta puisi, mendongeng kisah daerah, hingga debat bahasa Indonesia diikuti penuh antusias.',
                'content' => "Peringatan Bulan Bahasa tahun ini berlangsung meriah dengan partisipasi aktif seluruh perwakilan kelas. Panggung kreasi sekolah menjadi wadah unjuk keterampilan berpidato, membaca puisi, dan bazar buku bacaan bergambar.\n\nProgram ini merupakan bagian dari penguatan budaya gemar membaca dan mencintai bahasa persatuan di kalangan generasi muda.",
                'featured_image' => 'news/news-07.webp',
                'status' => 'published',
                'published_at' => now()->subDays(7),
                'meta_title' => 'Semarak Peringatan Bulan Bahasa dan Literasi',
                'meta_description' => 'Lomba literasi cipta puisi, mendongeng, dan debat bahasa meriahkan bulan bahasa.',
            ],
            [
                'category_id' => $cats['prestasi'] ?? $defaultCatId,
                'author_id' => $author->id,
                'title' => 'Keluarga Besar Sekolah Berbagi Kebahagiaan dalam Aksi Peduli Sosial',
                'slug' => 'keluarga-besar-sekolah-berbagi-kebahagiaan-dalam-aksi-peduli-sosial',
                'excerpt' => 'Penyaluran paket perlengkapan sekolah dan santunan bagi anak yatim di sekitar lingkungan sekolah.',
                'content' => "Melalui program OSIS Peduli, warga sekolah menghimpun donasi sukarela berupa buku tulis, alat belajar, dan sembako untuk disalurkan kepada warga yang membutuhkan di sekitar lingkungan sekolah.\n\nKegiatan sosial ini bertujuan mengasah kepekaan nurani, empati, dan rasa persaudaraan peserta didik terhadap sesama masyarakat.",
                'featured_image' => 'news/news-08.webp',
                'status' => 'published',
                'published_at' => now()->subDays(8),
                'meta_title' => 'Aksi Sosial Peduli Sesama Warga Sekolah',
                'meta_description' => 'Penyaluran bantuan perlengkapan belajar dan santunan sosial oleh pengurus OSIS.',
            ],
            [
                'category_id' => $cats['ekstrakurikuler'] ?? $defaultCatId,
                'author_id' => $author->id,
                'title' => 'Laga Persahabatan Bola Voli Antar Sekolah Bangun Sportivitas',
                'slug' => 'laga-persahabatan-bola-voli-antar-sekolah-bangun-sportivitas',
                'excerpt' => 'Tim voli putra dan putri menjamu sekolah mitra dalam pertandingan uji coba yang penuh sportivitas.',
                'content' => "Pertandingan persahabatan bola voli berlangsung meriah di lapangan olahraga terbuka sekolah. Kegiatan ini diselenggarakan guna mempererat tali silaturahmi antar pelajar sekaligus ajang evaluasi latihan tim jelang kejuaraan daerah.\n\nSeluruh pemain menunjukkan disiplin taktik dan respek yang tinggi sepanjang pertandingan.",
                'featured_image' => 'news/news-09.webp',
                'status' => 'published',
                'published_at' => now()->subDays(9),
                'meta_title' => 'Pertandingan Persahabatan Bola Voli Pelajar',
                'meta_description' => 'Ajang uji coba olahraga bola voli untuk mengasah sportivitas dan teknik bermain tim.',
            ],
            [
                'category_id' => $cats['akademik'] ?? $defaultCatId,
                'author_id' => $author->id,
                'title' => 'Workshop Peningkatan Kompetensi Guru dalam Pemanfaatan Media Pembelajaran AI',
                'slug' => 'workshop-peningkatan-kompetensi-guru-media-ai',
                'excerpt' => 'Tenaga pendidik mengikuti bimbingan teknis perancangan materi ajar adaptif berbasis kecerdasan buatan.',
                'content' => "Dalam upaya adaptasi teknologi terkini, para guru mengikuti pelatihan intensif pemanfaatan perangkat kecerdasan buatan sebagai asisten penyusunan asesmen dan lembar kerja siswa interaktif.\n\nPelatihan ini diharapkan membantu guru menciptakan media pembelajaran yang lebih variatif, menarik, dan relevan dengan karakteristik peserta didik zaman sekarang.",
                'featured_image' => 'news/news-10.webp',
                'status' => 'published',
                'published_at' => now()->subDays(10),
                'meta_title' => 'Workshop Pemanfaatan AI untuk Guru Sekolah',
                'meta_description' => 'Peningkatan kompetensi guru dalam merancang materi ajar interaktif dengan AI.',
            ],
            [
                'category_id' => $cats['informasi-sekolah'] ?? $defaultCatId,
                'author_id' => $author->id,
                'title' => 'Gelar Karya Proyek Penguatan Profil Pelajar Tampilkan Kreativitas',
                'slug' => 'gelar-karya-proyek-penguatan-profil-pelajar-kreativitas',
                'excerpt' => 'Pameran kreasi daur ulang, bazar kuliner tradisional, dan panggung pertunjukan karya siswa.',
                'content' => "Gedung serbaguna dan selasar sekolah dipadati pengunjung yang menyaksikan pameran Gelar Karya siswa. Berbagai stan menampilkan karya inovasi kewirausahaan muda, kerajinan berbahan limbah, hingga stan infografis pelestarian budaya lokal.\n\nKegiatan ini diapresiasi oleh komite sekolah dan para orang tua yang hadir memberikan dukungan penuh.",
                'featured_image' => 'news/news-11.webp',
                'status' => 'published',
                'published_at' => now()->subDays(11),
                'meta_title' => 'Pameran Gelar Karya Siswa Menampilkan Kreativitas',
                'meta_description' => 'Pameran karya inovasi, seni kriya, dan kewirausahaan siswa yang inspiratif.',
            ],
            [
                'category_id' => $cats['kegiatan-sekolah'] ?? $defaultCatId,
                'author_id' => $author->id,
                'title' => 'Peringatan Hari Pahlawan: Meneladani Semangat Juang Melalui Karya Nyata',
                'slug' => 'peringatan-hari-pahlawan-meneladani-semangat-juang',
                'excerpt' => 'Refleksi nilai kepahlawanan ditunjukkan melalui aksi nyata belajar sungguh-sungguh dan berprestasi.',
                'content' => "Memperingati Hari Pahlawan Nasional, sekolah menggelar serangkaian kegiatan reflektif meliputi hening cipta serentak, nonton bareng film dokumenter perjuangan kemerdekaan, dan lomba penulisan esai sejarah perjuangan bangsa.\n\nMelalui kegiatan ini, generasi muda diingatkan bahwa perjuangan masa kini adalah melawan kebodohan dan kemalasan dengan terus berkarya dan berprestasi.",
                'featured_image' => 'news/news-12.webp',
                'status' => 'published',
                'published_at' => now()->subDays(12),
                'meta_title' => 'Peringatan Hari Pahlawan Nasional di Sekolah',
                'meta_description' => 'Meneladani pengorbanan para pejuang dengan semangat belajar dan berkarya nyata.',
            ],
        ];

        foreach ($newsItems as $item) {
            News::updateOrCreate(
                ['slug' => $item['slug']],
                $item
            );
        }
    }
}
