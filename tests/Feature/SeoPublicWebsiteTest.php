<?php

namespace Tests\Feature;

use App\Models\Achievement;
use App\Models\Announcement;
use App\Models\Category;
use App\Models\Facility;
use App\Models\Gallery;
use App\Models\GalleryPhoto;
use App\Models\News;
use App\Models\SchoolProfile;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class SeoPublicWebsiteTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Homepage receives shared school SEO-related props.
     */
    public function test_homepage_receives_school_seo_props(): void
    {
        SchoolProfile::create([
            'id' => 1,
            'name' => 'Test School',
            'short_name' => 'TS',
            'tagline' => 'Test tagline for SEO testing',
            'description' => 'Test school description for public website testing.',
            'logo_path' => 'school/test-logo.png',
            'hero_image_path' => 'school/test-hero.jpg',
            'status' => 'Negeri',
        ]);

        $response = $this->get('/');

        $response->assertStatus(200);
        $response->assertInertia(fn (Assert $page) => $page
            ->component('Public/Home')
            ->where('school.name', 'Test School')
            ->where('school.tagline', 'Test tagline for SEO testing')
            ->where('school.seo.meta_description', 'Test tagline for SEO testing')
            ->where('school.logo_path', 'school/test-logo.png')
            ->where('school.hero_image_path', 'school/test-hero.jpg')
        );
    }

    /**
     * Shared app_url and current_url are available for SEO metadata.
     */
    public function test_shared_seo_urls_are_available(): void
    {
        $response = $this->get('/berita');

        $response->assertStatus(200);
        $response->assertInertia(fn (Assert $page) => $page
            ->component('Public/News/Index')
            ->has('app_url')
            ->has('current_url')
            ->where('current_url', url('/berita'))
        );
    }

    /**
     * Canonical source URL does not include query string parameters.
     */
    public function test_canonical_source_url_does_not_include_query_string(): void
    {
        $response = $this->get('/berita?cari=ujian&kategori=akademik&page=2');

        $response->assertStatus(200);
        $response->assertInertia(fn (Assert $page) => $page
            ->component('Public/News/Index')
            ->where('current_url', url('/berita'))
        );
    }

    /**
     * Detail news receives all required attributes for SEO metadata.
     */
    public function test_news_detail_receives_seo_attributes(): void
    {
        $user = User::factory()->create();
        $category = Category::create(['name' => 'Akademik', 'slug' => 'akademik']);

        $news = News::create([
            'category_id' => $category->id,
            'author_id' => $user->id,
            'title' => 'Judul Berita SEO',
            'slug' => 'judul-berita-seo',
            'excerpt' => 'Ringkasan singkat berita untuk SEO description.',
            'content' => 'Konten lengkap berita sekolah...',
            'featured_image' => 'news/seo-thumbnail.jpg',
            'meta_title' => 'Custom Meta Title Berita',
            'meta_description' => 'Custom meta description berita untuk search engine.',
            'status' => 'published',
            'published_at' => now(),
        ]);

        $response = $this->get("/berita/{$news->slug}");

        $response->assertStatus(200);
        $response->assertInertia(fn (Assert $page) => $page
            ->component('Public/News/Show')
            ->where('article.title', 'Judul Berita SEO')
            ->where('article.meta_title', 'Custom Meta Title Berita')
            ->where('article.meta_description', 'Custom meta description berita untuk search engine.')
            ->where('article.excerpt', 'Ringkasan singkat berita untuk SEO description.')
            ->where('article.featured_image', 'news/seo-thumbnail.jpg')
        );
    }

    /**
     * Public detail pages (Announcement, Facility, Achievement, Gallery) provide SEO data.
     */
    public function test_public_detail_pages_provide_seo_data(): void
    {
        $user = User::factory()->create();

        // Announcement
        $announcement = Announcement::create([
            'author_id' => $user->id,
            'title' => 'Pengumuman Libur Nasional',
            'slug' => 'pengumuman-libur-nasional',
            'excerpt' => 'Ringkasan pengumuman libur.',
            'content' => 'Isi pengumuman libur...',
            'status' => 'published',
            'published_at' => now(),
        ]);

        $responseAnnouncement = $this->get("/pengumuman/{$announcement->slug}");
        $responseAnnouncement->assertStatus(200);
        $responseAnnouncement->assertInertia(fn (Assert $page) => $page
            ->component('Public/Announcements/Show')
            ->where('announcement.title', 'Pengumuman Libur Nasional')
        );

        // Facility
        $facility = Facility::create([
            'name' => 'Laboratorium Komputer',
            'slug' => 'laboratorium-komputer',
            'description' => 'Fasilitas laboratorium komputer modern.',
            'photo' => 'facilities/lab.jpg',
            'is_active' => true,
        ]);

        $responseFacility = $this->get("/fasilitas/{$facility->slug}");
        $responseFacility->assertStatus(200);
        $responseFacility->assertInertia(fn (Assert $page) => $page
            ->component('Public/Facilities/Show')
            ->where('facility.name', 'Laboratorium Komputer')
            ->where('facility.photo', 'facilities/lab.jpg')
        );

        // Achievement
        $achievement = Achievement::create([
            'title' => 'Juara 1 Olimpiade Sains',
            'slug' => 'juara-1-olimpiade-sains',
            'category' => 'Akademik',
            'level' => 'Nasional',
            'year' => 2026,
            'description' => 'Prestasi membanggakan di tingkat nasional.',
            'photo' => 'achievements/trophy.jpg',
            'is_active' => true,
        ]);

        $responseAchievement = $this->get("/prestasi/{$achievement->slug}");
        $responseAchievement->assertStatus(200);
        $responseAchievement->assertInertia(fn (Assert $page) => $page
            ->component('Public/Achievements/Show')
            ->where('achievement.title', 'Juara 1 Olimpiade Sains')
            ->where('achievement.photo', 'achievements/trophy.jpg')
        );

        // Gallery
        $gallery = Gallery::create([
            'title' => 'Dokumentasi Upacara Bendera',
            'slug' => 'dokumentasi-upacara-bendera',
            'description' => 'Foto-foto kegiatan upacara bendera.',
            'is_active' => true,
        ]);
        GalleryPhoto::create([
            'gallery_id' => $gallery->id,
            'photo_path' => 'galleries/upacara.jpg',
            'sort_order' => 1,
        ]);

        $responseGallery = $this->get("/galeri/{$gallery->slug}");
        $responseGallery->assertStatus(200);
        $responseGallery->assertInertia(fn (Assert $page) => $page
            ->component('Public/Galleries/Show')
            ->where('gallery.title', 'Dokumentasi Upacara Bendera')
        );
    }
}
