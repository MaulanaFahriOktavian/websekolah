<?php

namespace Tests\Feature\Public;

use App\Models\Gallery;
use App\Models\GalleryPhoto;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class GalleryTest extends TestCase
{
    /**
     * Public gallery directory only shows active galleries.
     */
    public function test_public_gallery_directory_only_shows_active(): void
    {
        // Active gallery
        Gallery::create([
            'title' => 'Galeri Aktif',
            'slug' => 'galeri-aktif',
            'is_active' => true,
        ]);

        // Inactive gallery (should NOT be visible)
        Gallery::create([
            'title' => 'Galeri Nonaktif',
            'slug' => 'galeri-nonaktif',
            'is_active' => false,
        ]);

        $response = $this->get('/galeri');

        $response->assertStatus(200);
        $response->assertInertia(fn (Assert $page) => $page
            ->component('Public/Galleries/Index')
            ->has('galleries.data', 1)
            ->where('galleries.data.0.title', 'Galeri Aktif')
        );
    }

    /**
     * Public gallery detail resolves by slug with photos list.
     */
    public function test_public_gallery_detail_resolves_by_slug(): void
    {
        $gallery = Gallery::create([
            'title' => 'Kemah Bakti Pramuka',
            'slug' => 'kemah-bakti-pramuka',
            'description' => "Kegiatan kemah pramuka di bumi perkemahan.\n\nDiikuti seluruh siswa.",
            'is_active' => true,
        ]);

        GalleryPhoto::create([
            'gallery_id' => $gallery->id,
            'photo_path' => 'galleries/sample1.jpg',
            'caption' => 'Api Unggun',
        ]);

        $response = $this->get("/galeri/{$gallery->slug}");

        $response->assertStatus(200);
        $response->assertInertia(fn (Assert $page) => $page
            ->component('Public/Galleries/Show')
            ->where('gallery.title', 'Kemah Bakti Pramuka')
            ->has('gallery.photos', 1)
            ->has('otherGalleries')
        );
    }

    /**
     * Public gallery detail returns 404 for inactive gallery.
     */
    public function test_public_gallery_detail_returns_404_for_inactive(): void
    {
        $inactive = Gallery::create([
            'title' => 'Galeri Ditutup',
            'slug' => 'galeri-ditutup',
            'is_active' => false,
        ]);

        $response = $this->get("/galeri/{$inactive->slug}");

        $response->assertStatus(404);
    }

    /**
     * Public gallery search filter works.
     */
    public function test_public_gallery_search_filter_works(): void
    {
        Gallery::create([
            'title' => 'Pentas Musik Pelajar',
            'slug' => 'pentas-musik-pelajar',
            'is_active' => true,
        ]);

        Gallery::create([
            'title' => 'Lomba Olahraga Sekolah',
            'slug' => 'lomba-olahraga-sekolah',
            'is_active' => true,
        ]);

        $response = $this->get('/galeri?cari=Musik');

        $response->assertStatus(200);
        $response->assertInertia(fn (Assert $page) => $page
            ->component('Public/Galleries/Index')
            ->has('galleries.data', 1)
            ->where('galleries.data.0.title', 'Pentas Musik Pelajar')
        );
    }
}
