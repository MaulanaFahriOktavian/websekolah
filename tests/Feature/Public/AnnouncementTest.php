<?php

namespace Tests\Feature\Public;

use App\Models\Announcement;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class AnnouncementTest extends TestCase
{
    /**
     * Public announcements index only shows active published announcements.
     */
    public function test_public_announcements_index_only_shows_active(): void
    {
        $user = User::factory()->create();

        // Active published
        Announcement::create([
            'author_id' => $user->id,
            'title' => 'Pengumuman Aktif',
            'slug' => 'pengumuman-aktif',
            'content' => 'Konten aktif...',
            'status' => 'published',
            'published_at' => now()->subDay(),
            'expires_at' => now()->addDays(5),
        ]);

        // Active published without expiry
        Announcement::create([
            'author_id' => $user->id,
            'title' => 'Pengumuman Selamanya',
            'slug' => 'pengumuman-selamanya',
            'content' => 'Konten selamanya...',
            'status' => 'published',
            'published_at' => now()->subDay(),
            'expires_at' => null,
        ]);

        // Expired published (should NOT be visible)
        Announcement::create([
            'author_id' => $user->id,
            'title' => 'Pengumuman Kedaluwarsa',
            'slug' => 'pengumuman-kedaluwarsa',
            'content' => 'Konten kedaluwarsa...',
            'status' => 'published',
            'published_at' => now()->subMonths(1),
            'expires_at' => now()->subDay(),
        ]);

        // Draft (should NOT be visible)
        Announcement::create([
            'author_id' => $user->id,
            'title' => 'Pengumuman Draf',
            'slug' => 'pengumuman-draf',
            'content' => 'Konten draf...',
            'status' => 'draft',
            'published_at' => null,
            'expires_at' => null,
        ]);

        $response = $this->get('/pengumuman');

        $response->assertStatus(200);
        $response->assertInertia(fn (Assert $page) => $page
            ->component('Public/Announcements/Index')
            ->has('announcements.data', 2)
        );
    }

    /**
     * Public announcement detail resolves by slug for active announcement.
     */
    public function test_public_announcement_detail_resolves_by_slug(): void
    {
        $user = User::factory()->create();

        $announcement = Announcement::create([
            'author_id' => $user->id,
            'title' => 'Detail Pengumuman Sukses',
            'slug' => 'detail-pengumuman-sukses',
            'content' => 'Isi pengumuman...',
            'status' => 'published',
            'published_at' => now()->subHour(),
            'expires_at' => now()->addDays(3),
        ]);

        $response = $this->get("/pengumuman/{$announcement->slug}");

        $response->assertStatus(200);
        $response->assertInertia(fn (Assert $page) => $page
            ->component('Public/Announcements/Show')
            ->where('announcement.title', 'Detail Pengumuman Sukses')
            ->has('latestAnnouncements')
        );
    }

    /**
     * Public announcement detail returns 404 for expired announcement.
     */
    public function test_public_announcement_detail_returns_404_for_expired(): void
    {
        $user = User::factory()->create();

        $expired = Announcement::create([
            'author_id' => $user->id,
            'title' => 'Pengumuman Sudah Lewat',
            'slug' => 'pengumuman-sudah-lewat',
            'content' => 'Isi...',
            'status' => 'published',
            'published_at' => now()->subDays(10),
            'expires_at' => now()->subHour(),
        ]);

        $response = $this->get("/pengumuman/{$expired->slug}");

        $response->assertStatus(404);
    }

    /**
     * Public announcement detail returns 404 for draft announcement.
     */
    public function test_public_announcement_detail_returns_404_for_draft(): void
    {
        $user = User::factory()->create();

        $draft = Announcement::create([
            'author_id' => $user->id,
            'title' => 'Pengumuman Draf Tertutup',
            'slug' => 'pengumuman-draf-tertutup',
            'content' => 'Isi...',
            'status' => 'draft',
            'published_at' => null,
            'expires_at' => null,
        ]);

        $response = $this->get("/pengumuman/{$draft->slug}");

        $response->assertStatus(404);
    }
}
