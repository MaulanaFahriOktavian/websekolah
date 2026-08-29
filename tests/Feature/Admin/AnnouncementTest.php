<?php

namespace Tests\Feature\Admin;

use App\Models\Announcement;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class AnnouncementTest extends TestCase
{
    /**
     * Guest cannot access announcements.
     */
    public function test_guest_cannot_access_announcements(): void
    {
        $response = $this->get('/admin/announcements');

        $response->assertRedirect('/login');
    }

    /**
     * Authenticated user can view announcements list.
     */
    public function test_authenticated_user_can_view_announcements_list(): void
    {
        $user = User::factory()->create();
        Announcement::create([
            'author_id' => $user->id,
            'title' => 'Pengumuman Penting',
            'slug' => 'pengumuman-penting',
            'content' => 'Isi pengumuman penting...',
            'status' => 'published',
            'published_at' => now(),
        ]);

        $response = $this->actingAs($user)->get('/admin/announcements');

        $response->assertStatus(200);
        $response->assertInertia(fn (Assert $page) => $page
            ->component('Admin/Announcements/Index')
            ->has('announcements.data', 1)
        );
    }

    /**
     * Authenticated user can create announcement.
     */
    public function test_authenticated_user_can_create_announcement(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->post('/admin/announcements', [
            'title' => 'Pengumuman Jadwal Ujian',
            'content' => 'Jadwal ujian semester ganjil...',
            'status' => 'published',
            'published_at' => now()->toDateTimeString(),
            'expires_at' => now()->addDays(7)->toDateTimeString(),
        ]);

        $response->assertRedirect('/admin/announcements');
        $response->assertSessionHas('success');

        $this->assertDatabaseHas('announcements', [
            'title' => 'Pengumuman Jadwal Ujian',
            'slug' => 'pengumuman-jadwal-ujian',
            'author_id' => $user->id,
        ]);
    }

    /**
     * Validation enforces title, content, and valid status.
     */
    public function test_announcement_validation_enforces_rules(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->post('/admin/announcements', [
            'title' => '',
            'content' => '',
            'status' => 'invalid_status',
            'published_at' => now()->toDateTimeString(),
            'expires_at' => now()->subDay()->toDateTimeString(), // expires before published
        ]);

        $response->assertSessionHasErrors(['title', 'content', 'status', 'expires_at']);
    }

    /**
     * Authenticated user can update announcement.
     */
    public function test_authenticated_user_can_update_announcement(): void
    {
        $user = User::factory()->create();
        $announcement = Announcement::create([
            'author_id' => $user->id,
            'title' => 'Judul Awal',
            'slug' => 'judul-awal',
            'content' => 'Konten awal...',
            'status' => 'draft',
        ]);

        $response = $this->actingAs($user)->put("/admin/announcements/{$announcement->id}", [
            'title' => 'Judul Diperbarui',
            'content' => 'Konten baru...',
            'status' => 'published',
        ]);

        $response->assertRedirect('/admin/announcements');
        $response->assertSessionHas('success');

        $this->assertDatabaseHas('announcements', [
            'id' => $announcement->id,
            'title' => 'Judul Diperbarui',
            'slug' => 'judul-diperbarui',
            'status' => 'published',
        ]);
    }

    /**
     * Authenticated user can delete announcement.
     */
    public function test_authenticated_user_can_delete_announcement(): void
    {
        $user = User::factory()->create();
        $announcement = Announcement::create([
            'author_id' => $user->id,
            'title' => 'Pengumuman Dihapus',
            'slug' => 'pengumuman-dihapus',
            'content' => 'Konten...',
            'status' => 'draft',
        ]);

        $response = $this->actingAs($user)->delete("/admin/announcements/{$announcement->id}");

        $response->assertRedirect('/admin/announcements');
        $this->assertDatabaseMissing('announcements', ['id' => $announcement->id]);
    }
}
