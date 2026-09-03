<?php

namespace Database\Seeders;

class DemoAssetHelper
{
    /**
     * Get absolute path into storage/app/public.
     */
    public static function getStoragePath(string $subpath = ''): string
    {
        $base = realpath(__DIR__.'/../../storage/app/public');
        if (! $base) {
            $base = __DIR__.'/../../storage/app/public';
        }

        return $subpath ? $base.'/'.ltrim($subpath, '/\\') : $base;
    }

    /**
     * Ensure all necessary storage subdirectories exist.
     */
    public static function initDirectories(): void
    {
        $dirs = [
            self::getStoragePath('school'),
            self::getStoragePath('teachers'),
            self::getStoragePath('staff'),
            self::getStoragePath('facilities'),
            self::getStoragePath('news'),
            self::getStoragePath('achievements'),
            self::getStoragePath('galleries'),
            self::getStoragePath('galleries/photos'),
        ];

        foreach ($dirs as $dir) {
            if (! is_dir($dir)) {
                mkdir($dir, 0755, true);
            }
        }
    }

    /**
     * Generate all demo assets if they don't already exist.
     */
    public static function generateAll(): void
    {
        self::initDirectories();

        self::generateSchoolAssets();
        self::generateTeacherAssets();
        self::generateStaffAssets();
        self::generateFacilityAssets();
        self::generateNewsAssets();
        self::generateAchievementAssets();
        self::generateGalleryAssets();
    }

    /**
     * School Logo, Hero, and Principal Photo.
     */
    private static function generateSchoolAssets(): void
    {
        // 1. Logo (256x256 PNG)
        $logoPath = self::getStoragePath('school/demo-logo.png');
        if (! file_exists($logoPath)) {
            $im = imagecreatetruecolor(256, 256);
            imagesavealpha($im, true);
            $trans = imagecolorallocatealpha($im, 0, 0, 0, 127);
            imagefill($im, 0, 0, $trans);

            $primary = imagecolorallocate($im, 79, 70, 229); // indigo-600
            $dark = imagecolorallocate($im, 49, 46, 129); // indigo-900
            $gold = imagecolorallocate($im, 251, 191, 36); // amber-400
            $white = imagecolorallocate($im, 255, 255, 255);

            imagefilledellipse($im, 128, 128, 240, 240, $dark);
            imagefilledellipse($im, 128, 128, 220, 220, $primary);
            imageellipse($im, 128, 128, 206, 206, $gold);

            // Center geometric emblem
            imagefilledpolygon($im, [128, 60, 180, 95, 128, 130, 76, 95], $gold);
            imagefilledrectangle($im, 98, 135, 158, 175, $white);
            imagefilledellipse($im, 128, 155, 40, 40, $primary);

            imagestring($im, 4, 88, 190, 'SDN DEMO', $gold);
            imagestring($im, 2, 100, 210, 'EST. 2005', $white);

            imagepng($im, $logoPath);
            imagedestroy($im);
        }

        // 2. Hero Background (1200x500 WebP)
        $heroPath = self::getStoragePath('school/demo-hero.webp');
        if (! file_exists($heroPath)) {
            $im = imagecreatetruecolor(1200, 500);
            for ($y = 0; $y < 500; $y++) {
                $r = (int) (15 + ($y / 500) * 35);
                $g = (int) (23 + ($y / 500) * 35);
                $b = (int) (42 + ($y / 500) * 80);
                $lineCol = imagecolorallocate($im, $r, $g, $b);
                imageline($im, 0, $y, 1200, $y, $lineCol);
            }

            $gridCol = imagecolorallocate($im, 45, 55, 80);
            for ($x = 0; $x < 1200; $x += 60) {
                imageline($im, $x, 0, $x, 500, $gridCol);
            }
            for ($y = 0; $y < 500; $y += 60) {
                imageline($im, 0, $y, 1200, $y, $gridCol);
            }

            // Campus silhouette shapes
            $buildingCol = imagecolorallocate($im, 30, 41, 59);
            imagefilledrectangle($im, 100, 260, 350, 500, $buildingCol);
            imagefilledrectangle($im, 370, 200, 750, 500, $buildingCol);
            imagefilledrectangle($im, 770, 240, 1100, 500, $buildingCol);

            $accent = imagecolorallocate($im, 99, 102, 241);
            $gold = imagecolorallocate($im, 251, 191, 36);
            $white = imagecolorallocate($im, 255, 255, 255);

            imagefilledrectangle($im, 380, 210, 820, 265, imagecolorallocate($im, 15, 23, 42));
            imagerectangle($im, 380, 210, 820, 265, $accent);
            imagestring($im, 5, 430, 225, 'SEKOLAH DEMO NUSANTARA', $white);
            imagestring($im, 4, 480, 245, 'CAMPUS OVERVIEW [DEMO]', $gold);

            imagewebp($im, $heroPath, 85);
            imagedestroy($im);
        }

        // 3. Principal Photo (400x500 WebP)
        $principalPath = self::getStoragePath('school/demo-principal.webp');
        if (! file_exists($principalPath)) {
            self::renderAvatar(
                $principalPath,
                'KEPALA SEKOLAH',
                'Drs. H. Purnomo, M.Pd.',
                [30, 41, 59],
                [99, 102, 241],
                'KEPALA SEKOLAH'
            );
        }
    }

    /**
     * 12 Teacher Portraits.
     */
    private static function generateTeacherAssets(): void
    {
        $palettes = [
            [[30, 58, 138], [59, 130, 246]],   // Blue (Matematika)
            [[6, 78, 59], [16, 185, 129]],     // Emerald (IPA)
            [[124, 45, 18], [249, 115, 22]],   // Orange (PJOK)
            [[88, 28, 135], [168, 85, 247]],   // Purple (Bahasa)
            [[49, 46, 129], [99, 102, 241]],   // Indigo (Informatika)
            [[136, 19, 55], [244, 63, 94]],    // Rose (BK)
            [[15, 76, 92], [20, 184, 166]],    // Teal (B. Inggris)
            [[120, 53, 15], [217, 119, 6]],    // Amber (IPS)
            [[20, 83, 45], [34, 197, 94]],     // Green (PPKn)
            [[19, 78, 74], [13, 148, 136]],    // Cyan (PAI)
            [[112, 26, 117], [217, 70, 239]],  // Fuchsia (Seni)
            [[51, 65, 85], [100, 116, 139]],   // Slate (Prakarya)
        ];

        for ($i = 1; $i <= 12; $i++) {
            $filename = sprintf('teachers/teacher-%02d.webp', $i);
            $fullPath = self::getStoragePath($filename);
            if (! file_exists($fullPath)) {
                $theme = $palettes[($i - 1) % count($palettes)];
                self::renderAvatar(
                    $fullPath,
                    sprintf('GURU DEMO %02d', $i),
                    sprintf('DEMO-GURU-%03d', $i),
                    $theme[0],
                    $theme[1],
                    'PENDIDIK'
                );
            }
        }
    }

    /**
     * 6 Staff Portraits.
     */
    private static function generateStaffAssets(): void
    {
        $palettes = [
            [[15, 76, 92], [20, 184, 166]],    // Teal
            [[30, 58, 138], [59, 130, 246]],   // Blue
            [[49, 46, 129], [99, 102, 241]],   // Indigo
            [[88, 28, 135], [168, 85, 247]],   // Purple
            [[6, 78, 59], [16, 185, 129]],     // Emerald
            [[51, 65, 85], [100, 116, 139]],   // Slate
        ];

        for ($i = 1; $i <= 6; $i++) {
            $filename = sprintf('staff/staff-%02d.webp', $i);
            $fullPath = self::getStoragePath($filename);
            if (! file_exists($fullPath)) {
                $theme = $palettes[($i - 1) % count($palettes)];
                self::renderAvatar(
                    $fullPath,
                    sprintf('STAF DEMO %02d', $i),
                    sprintf('DEMO-STAF-%03d', $i),
                    $theme[0],
                    $theme[1],
                    'TENAGA KEPENDIDIKAN'
                );
            }
        }
    }

    /**
     * 8 Facility Images.
     */
    private static function generateFacilityAssets(): void
    {
        $facilities = [
            ['Lab Komputer', 'INFORMATIKA & TIK', [49, 46, 129], [99, 102, 241]],
            ['Perpustakaan', 'RUANG BACA DIGITAL', [120, 53, 15], [245, 158, 11]],
            ['Lab IPA', 'SAINS & PENELITIAN', [6, 78, 59], [16, 185, 129]],
            ['Multimedia', 'AUDIO VISUAL STUDIO', [88, 28, 135], [168, 85, 247]],
            ['Lapangan Olahraga', 'SARANA OLAHRAGA', [124, 45, 18], [249, 115, 22]],
            ['Ruang Kesenian', 'STUDIO SENI & BUDAYA', [112, 26, 117], [217, 70, 239]],
            ['Klinik UKS', 'KESEHATAN SISWA', [159, 18, 57], [244, 63, 94]],
            ['Mushola Sekolah', 'TEMPAT IBADAH', [19, 78, 74], [20, 184, 166]],
        ];

        foreach ($facilities as $idx => $fac) {
            $filename = sprintf('facilities/facility-%02d.webp', $idx + 1);
            $fullPath = self::getStoragePath($filename);
            if (! file_exists($fullPath)) {
                self::renderFacilityGraphic($fullPath, $fac[0], $fac[1], $fac[2], $fac[3]);
            }
        }
    }

    /**
     * 12 News Featured Images.
     */
    private static function generateNewsAssets(): void
    {
        $newsList = [
            ['KEGIATAN', 'Hari Pendidikan Nasional', [30, 58, 138], [59, 130, 246]],
            ['PRESTASI', 'Kompetisi Robotika Pelajar', [120, 53, 15], [245, 158, 11]],
            ['AKADEMIK', 'Pembelajaran Proyek Saintifik', [6, 78, 59], [16, 185, 129]],
            ['EKSTRAKURIKULER', 'Kemah Pramuka Penggalang', [124, 45, 18], [249, 115, 22]],
            ['LINGKUNGAN', 'Gerakan Sekolah Sehat & Bersih', [20, 83, 45], [34, 197, 94]],
            ['TEKNOLOGI', 'Literasi & Etika Digital Remaja', [49, 46, 129], [99, 102, 241]],
            ['LITERASI', 'Semarak Perayaan Bulan Bahasa', [88, 28, 135], [168, 85, 247]],
            ['SOSIAL', 'Aksi Peduli Berbagi Sesama', [159, 18, 57], [244, 63, 94]],
            ['OLAHRAGA', 'Laga Voli Antar Pelajar', [15, 76, 92], [20, 184, 166]],
            ['PELATIHAN', 'Workshop Inovasi AI Guru', [51, 65, 85], [100, 116, 139]],
            ['KREATIF', 'Pameran Gelar Karya Siswa', [112, 26, 117], [217, 70, 239]],
            ['KEBANGSAAN', 'Peringatan Hari Pahlawan', [136, 19, 55], [225, 29, 72]],
        ];

        foreach ($newsList as $idx => $news) {
            $filename = sprintf('news/news-%02d.webp', $idx + 1);
            $fullPath = self::getStoragePath($filename);
            if (! file_exists($fullPath)) {
                self::renderLandscapeCard($fullPath, $news[0], $news[1], $news[2], $news[3], 'BERITA SEKOLAH');
            }
        }
    }

    /**
     * 10 Achievement Images.
     */
    private static function generateAchievementAssets(): void
    {
        $achievements = [
            ['PROVINSI', 'Juara 1 Sains Matematika', [120, 53, 15], [245, 158, 11]],
            ['NASIONAL', 'Juara 2 LKIR Remaja', [30, 58, 138], [59, 130, 246]],
            ['KABUPATEN', 'Juara 1 Basket Pelajar', [124, 45, 18], [249, 115, 22]],
            ['PROVINSI', 'Juara 1 Tari Tradisional', [88, 28, 135], [168, 85, 247]],
            ['NASIONAL', 'Medali Emas Pencak Silat', [6, 78, 59], [16, 185, 129]],
            ['KABUPATEN', 'Juara 1 Cipta & Baca Puisi', [112, 26, 117], [217, 70, 239]],
            ['PROVINSI', 'Juara 2 Robotika Inovasi', [49, 46, 129], [99, 102, 241]],
            ['KABUPATEN', 'Juara 1 Pidato B. Inggris', [15, 76, 92], [20, 184, 166]],
            ['NASIONAL', 'Harapan 1 Olimpiade IPS', [51, 65, 85], [100, 116, 139]],
            ['PROVINSI', 'Medali Perak Renang 50M', [14, 116, 144], [6, 182, 212]],
        ];

        foreach ($achievements as $idx => $ach) {
            $filename = sprintf('achievements/achievement-%02d.webp', $idx + 1);
            $fullPath = self::getStoragePath($filename);
            if (! file_exists($fullPath)) {
                self::renderLandscapeCard($fullPath, 'PRESTASI '.$ach[0], $ach[1], $ach[2], $ach[3], 'PIALA & PENGHARGAAN');
            }
        }
    }

    /**
     * 6 Gallery Covers + 18 Gallery Photos.
     */
    private static function generateGalleryAssets(): void
    {
        $galleries = [
            ['MPLS 2025', 'Penyambutan Siswa Baru', [49, 46, 129], [99, 102, 241]],
            ['HUT RI KE-80', 'Upacara Pengibaran Bendera', [136, 19, 55], [225, 29, 72]],
            ['LITERASI', 'Pekan Buku & Kreasi Sastra', [120, 53, 15], [245, 158, 11]],
            ['CLASSMEETING', 'Lomba Olahraga Antar Kelas', [30, 58, 138], [59, 130, 246]],
            ['EKSKUL EXPO', 'Gelar Bakat Ekstrakurikuler', [88, 28, 135], [168, 85, 247]],
            ['ADIWIYATA', 'Aksi Tanam Pohon & Bersih', [6, 78, 59], [16, 185, 129]],
        ];

        // 6 Covers
        foreach ($galleries as $idx => $gal) {
            $covFilename = sprintf('galleries/gallery-%02d-cover.webp', $idx + 1);
            $covFullPath = self::getStoragePath($covFilename);
            if (! file_exists($covFullPath)) {
                self::renderLandscapeCard($covFullPath, $gal[0], $gal[1], $gal[2], $gal[3], 'ALBUM DOKUMENTASI');
            }

            // 3 Photos per album (total 18 photos)
            for ($p = 1; $p <= 3; $p++) {
                $photoNum = ($idx * 3) + $p;
                $pFilename = sprintf('galleries/photos/photo-%02d.webp', $photoNum);
                $pFullPath = self::getStoragePath($pFilename);
                if (! file_exists($pFullPath)) {
                    self::renderLandscapeCard(
                        $pFullPath,
                        sprintf('%s - FOTO %d', $gal[0], $p),
                        sprintf('Dokumentasi foto kegiatan #%d', $p),
                        $gal[2],
                        $gal[3],
                        'GALERI FOTO [DEMO]'
                    );
                }
            }
        }
    }

    /**
     * Render a clean 400x500 portrait avatar.
     */
    private static function renderAvatar(
        string $targetPath,
        string $title,
        string $subtitle,
        array $darkRgb,
        array $lightRgb,
        string $badgeText
    ): void {
        $im = imagecreatetruecolor(400, 500);

        for ($y = 0; $y < 500; $y++) {
            $t = $y / 500;
            $r = (int) ($darkRgb[0] * (1 - $t) + $lightRgb[0] * $t);
            $g = (int) ($darkRgb[1] * (1 - $t) + $lightRgb[1] * $t);
            $b = (int) ($darkRgb[2] * (1 - $t) + $lightRgb[2] * $t);
            $col = imagecolorallocate($im, $r, $g, $b);
            imageline($im, 0, $y, 400, $y, $col);
        }

        $white = imagecolorallocate($im, 255, 255, 255);
        $gold = imagecolorallocate($im, 251, 191, 36);
        $avatarBody = imagecolorallocate($im, 241, 245, 249);
        $accent = imagecolorallocate($im, $lightRgb[0], $lightRgb[1], $lightRgb[2]);

        imagefilledellipse($im, 200, 160, 110, 110, $avatarBody);
        imagefilledellipse($im, 200, 310, 220, 170, $avatarBody);
        imagefilledpolygon($im, [200, 225, 215, 255, 200, 305, 185, 255], $accent);

        $cardBg = imagecolorallocate($im, 15, 23, 42);
        imagefilledrectangle($im, 60, 25, 340, 60, $cardBg);
        imagerectangle($im, 60, 25, 340, 60, $accent);
        $badgeX = (int) (200 - (strlen($badgeText) * 8) / 2);
        imagestring($im, 4, max(70, $badgeX), 35, $badgeText, $gold);

        imagefilledrectangle($im, 30, 410, 370, 475, $cardBg);
        imagerectangle($im, 30, 410, 370, 475, $accent);

        $subX = (int) (200 - (strlen($subtitle) * 8) / 2);
        imagestring($im, 4, max(40, $subX), 425, $subtitle, $white);

        $demoNote = '[DEMO AVATAR]';
        $noteX = (int) (200 - (strlen($demoNote) * 8) / 2);
        imagestring($im, 3, max(40, $noteX), 448, $demoNote, $gold);

        imagewebp($im, $targetPath, 85);
        imagedestroy($im);
    }

    /**
     * Render a clean 800x500 facility graphic.
     */
    private static function renderFacilityGraphic(
        string $targetPath,
        string $name,
        string $subtitle,
        array $darkRgb,
        array $lightRgb
    ): void {
        $im = imagecreatetruecolor(800, 500);

        for ($y = 0; $y < 500; $y++) {
            $t = $y / 500;
            $r = (int) ($darkRgb[0] * (1 - $t) + $lightRgb[0] * $t);
            $g = (int) ($darkRgb[1] * (1 - $t) + $lightRgb[1] * $t);
            $b = (int) ($darkRgb[2] * (1 - $t) + $lightRgb[2] * $t);
            $col = imagecolorallocate($im, $r, $g, $b);
            imageline($im, 0, $y, 800, $y, $col);
        }

        $decorCol = imagecolorallocate($im, 255, 255, 255);
        for ($i = 0; $i < 6; $i++) {
            imagerectangle($im, 40 + $i * 12, 40 + $i * 12, 760 - $i * 12, 460 - $i * 12, imagecolorallocatealpha($im, 255, 255, 255, 115));
        }

        $cardBg = imagecolorallocate($im, 15, 23, 42);
        $accent = imagecolorallocate($im, $lightRgb[0], $lightRgb[1], $lightRgb[2]);
        $gold = imagecolorallocate($im, 251, 191, 36);

        imagefilledrectangle($im, 150, 170, 650, 330, $cardBg);
        imagerectangle($im, 150, 170, 650, 330, $accent);

        $nameX = (int) (400 - (strlen($name) * 9) / 2);
        imagestring($im, 5, max(160, $nameX), 210, $name, $decorCol);

        $subX = (int) (400 - (strlen($subtitle) * 8) / 2);
        imagestring($im, 4, max(160, $subX), 245, $subtitle, $gold);

        imagestring($im, 3, 315, 285, 'FASILITAS SEKOLAH [DEMO]', $decorCol);

        imagewebp($im, $targetPath, 85);
        imagedestroy($im);
    }

    /**
     * Render a clean 800x500 landscape card (for News, Achievements, Galleries).
     */
    private static function renderLandscapeCard(
        string $targetPath,
        string $tag,
        string $title,
        array $darkRgb,
        array $lightRgb,
        string $categoryHeader
    ): void {
        $im = imagecreatetruecolor(800, 500);

        for ($y = 0; $y < 500; $y++) {
            $t = $y / 500;
            $r = (int) ($darkRgb[0] * (1 - $t) + $lightRgb[0] * $t);
            $g = (int) ($darkRgb[1] * (1 - $t) + $lightRgb[1] * $t);
            $b = (int) ($darkRgb[2] * (1 - $t) + $lightRgb[2] * $t);
            $col = imagecolorallocate($im, $r, $g, $b);
            imageline($im, 0, $y, 800, $y, $col);
        }

        $white = imagecolorallocate($im, 255, 255, 255);
        $gold = imagecolorallocate($im, 251, 191, 36);
        $cardBg = imagecolorallocate($im, 15, 23, 42);
        $accent = imagecolorallocate($im, $lightRgb[0], $lightRgb[1], $lightRgb[2]);

        $grid = imagecolorallocatealpha($im, 255, 255, 255, 118);
        for ($x = 0; $x < 800; $x += 50) {
            imageline($im, $x, 0, $x, 500, $grid);
        }

        imagefilledrectangle($im, 100, 140, 700, 360, $cardBg);
        imagerectangle($im, 100, 140, 700, 360, $accent);

        $headX = (int) (400 - (strlen($categoryHeader) * 8) / 2);
        imagestring($im, 4, max(120, $headX), 170, $categoryHeader, $accent);

        $tagX = (int) (400 - (strlen($tag) * 9) / 2);
        imagestring($im, 5, max(120, $tagX), 210, $tag, $gold);

        $titleX = (int) (400 - (strlen($title) * 8) / 2);
        imagestring($im, 4, max(120, $titleX), 250, $title, $white);

        imagestring($im, 3, 335, 305, '[DEMO ASSET]', imagecolorallocate($im, 148, 163, 184));

        imagewebp($im, $targetPath, 85);
        imagedestroy($im);
    }
}
