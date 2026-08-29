<?php

namespace Tests\Feature\Public;

use App\Models\Category;
use App\Models\News;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class NewsTest extends TestCase
{
    /**
     * Public news index renders successfully and filters only published articles.
     */
    public function test_public_news_index_only_shows_published_news(): void
    {
        $user = User::factory()->create();
        $category = Category::create(['name' => 'Akademik', 'slug' => 'akademik']);

        // Published news
        News::create([
            'category_id' => $category->id,
            'author_id' => $user->id,
            'title' => 'Berita Terbit',
            'slug' => 'berita-terbit',
            'content' => 'Konten...',
            'status' => 'published',
            'published_at' => now()->subDay(),
        ]);

        // Draft news
        News::create([
            'category_id' => $category->id,
            'author_id' => $user->id,
            'title' => 'Berita Draf',
            'slug' => 'berita-draf',
            'content' => 'Konten draf...',
            'status' => 'draft',
            'published_at' => null,
        ]);

        // Archived news
        News::create([
            'category_id' => $category->id,
            'author_id' => $user->id,
            'title' => 'Berita Arsip',
            'slug' => 'berita-arsip',
            'content' => 'Konten arsip...',
            'status' => 'archived',
            'published_at' => now()->subDays(10),
        ]);

        // Future scheduled news
        News::create([
            'category_id' => $category->id,
            'author_id' => $user->id,
            'title' => 'Berita Masa Depan',
            'slug' => 'berita-masa-depan',
            'content' => 'Konten masa depan...',
            'status' => 'published',
            'published_at' => now()->addDays(2),
        ]);

        $response = $this->get('/berita');

        $response->assertStatus(200);
        $response->assertInertia(fn (Assert $page) => $page
            ->component('Public/News/Index')
            ->has('news.data', 1)
            ->where('news.data.0.title', 'Berita Terbit')
        );
    }

    /**
     * Public news detail resolves by slug for published news.
     */
    public function test_public_news_detail_resolves_by_slug(): void
    {
        $user = User::factory()->create();
        $category = Category::create(['name' => 'Akademik', 'slug' => 'akademik']);

        $news = News::create([
            'category_id' => $category->id,
            'author_id' => $user->id,
            'title' => 'Detail Berita Sukses',
            'slug' => 'detail-berita-sukses',
            'content' => "Paragraf pertama berita.\n\nParagraf kedua berita.",
            'status' => 'published',
            'published_at' => now()->subHour(),
        ]);

        $response = $this->get("/berita/{$news->slug}");

        $response->assertStatus(200);
        $response->assertInertia(fn (Assert $page) => $page
            ->component('Public/News/Show')
            ->where('article.title', 'Detail Berita Sukses')
            ->has('latestNews')
        );
    }

    /**
     * Public news detail returns 404 for draft or unpublished news.
     */
    public function test_public_news_detail_returns_404_for_draft(): void
    {
        $user = User::factory()->create();
        $category = Category::create(['name' => 'Akademik', 'slug' => 'akademik']);

        $draftNews = News::create([
            'category_id' => $category->id,
            'author_id' => $user->id,
            'title' => 'Berita Draf Rahasia',
            'slug' => 'berita-draf-rahasia',
            'content' => 'Konten rahasia...',
            'status' => 'draft',
            'published_at' => null,
        ]);

        $response = $this->get("/berita/{$draftNews->slug}");

        $response->assertStatus(404);
    }

    /**
     * Public news detail returns 404 for future published news.
     */
    public function test_public_news_detail_returns_404_for_future_published(): void
    {
        $user = User::factory()->create();
        $category = Category::create(['name' => 'Akademik', 'slug' => 'akademik']);

        $futureNews = News::create([
            'category_id' => $category->id,
            'author_id' => $user->id,
            'title' => 'Berita Terbit Nanti',
            'slug' => 'berita-terbit-nanti',
            'content' => 'Konten...',
            'status' => 'published',
            'published_at' => now()->addDay(),
        ]);

        $response = $this->get("/berita/{$futureNews->slug}");

        $response->assertStatus(404);
    }
}
