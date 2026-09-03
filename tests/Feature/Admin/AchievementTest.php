<?php

namespace Tests\Feature\Admin;

use App\Models\Achievement;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class AchievementTest extends TestCase
{
    /**
     * Guest cannot access admin achievements.
     */
    public function test_guest_cannot_access_admin_achievements(): void
    {
        $response = $this->get('/admin/achievements');

        $response->assertRedirect('/login');
    }

    /**
     * Authenticated user can view achievements list.
     */
    public function test_authenticated_user_can_view_achievements_list(): void
    {
        $user = User::factory()->create();
        Achievement::create([
            'title' => 'Juara 1 Lomba Sains',
            'slug' => 'juara-1-lomba-sains',
            'category' => 'Sains',
            'is_active' => true,
        ]);

        $response = $this->actingAs($user)->get('/admin/achievements');

        $response->assertStatus(200);
        $response->assertInertia(fn (Assert $page) => $page
            ->component('Admin/Achievements/Index')
            ->has('achievements.data', 1)
        );
    }

    /**
     * Authenticated user can create achievement with photo.
     */
    public function test_authenticated_user_can_create_achievement_with_photo(): void
    {
        Storage::fake('public');
        $user = User::factory()->create();
        $file = UploadedFile::fake()->image('piala.jpg', 800, 600);

        $response = $this->actingAs($user)->post('/admin/achievements', [
            'title' => 'Juara 1 Olimpiade Matematika',
            'category' => 'Akademik',
            'level' => 'Tingkat Nasional',
            'year' => 2025,
            'achievement_date' => '2025-08-10',
            'recipient' => 'Budi Santoso',
            'description' => 'Meraih medali emas dengan skor tertinggi.',
            'photo' => $file,
            'sort_order' => 1,
            'is_active' => true,
        ]);

        $response->assertRedirect('/admin/achievements');
        $response->assertSessionHas('success');

        $achievement = Achievement::where('title', 'Juara 1 Olimpiade Matematika')->first();
        $this->assertNotNull($achievement);
        $this->assertEquals('juara-1-olimpiade-matematika', $achievement->slug);
        $this->assertNotNull($achievement->photo);
        Storage::disk('public')->assertExists($achievement->photo);
    }

    /**
     * Achievement creation rejects invalid photo type.
     */
    public function test_achievement_creation_rejects_invalid_photo(): void
    {
        Storage::fake('public');
        $user = User::factory()->create();
        $file = UploadedFile::fake()->create('document.pdf', 100);

        $response = $this->actingAs($user)->post('/admin/achievements', [
            'title' => 'Prestasi Salah File',
            'photo' => $file,
        ]);

        $response->assertSessionHasErrors(['photo']);
    }

    /**
     * Achievement creation rejects oversized photo.
     */
    public function test_achievement_creation_rejects_oversized_photo(): void
    {
        Storage::fake('public');
        $user = User::factory()->create();
        $file = UploadedFile::fake()->image('huge.png')->size(3000);

        $response = $this->actingAs($user)->post('/admin/achievements', [
            'title' => 'Prestasi Foto Besar',
            'photo' => $file,
        ]);

        $response->assertSessionHasErrors(['photo']);
    }

    /**
     * Achievement creation requires title.
     */
    public function test_achievement_creation_requires_title(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->post('/admin/achievements', [
            'title' => '',
        ]);

        $response->assertSessionHasErrors(['title']);
    }

    /**
     * Updating achievement replaces photo and deletes old file.
     */
    public function test_updating_achievement_replaces_photo_and_deletes_old_file(): void
    {
        Storage::fake('public');
        $user = User::factory()->create();

        $oldFile = UploadedFile::fake()->image('old_piala.jpg');
        $oldPath = $oldFile->store('achievements', 'public');

        $achievement = Achievement::create([
            'title' => 'Prestasi Lama',
            'slug' => 'prestasi-lama',
            'photo' => $oldPath,
            'is_active' => true,
        ]);

        Storage::disk('public')->assertExists($oldPath);

        $newFile = UploadedFile::fake()->image('new_piala.jpg');

        $response = $this->actingAs($user)->put("/admin/achievements/{$achievement->id}", [
            'title' => 'Prestasi Baru',
            'photo' => $newFile,
            'is_active' => true,
        ]);

        $response->assertRedirect('/admin/achievements');
        $response->assertSessionHas('success');

        $achievement->refresh();
        $this->assertEquals('prestasi-baru', $achievement->slug);
        $this->assertNotEquals($oldPath, $achievement->photo);
        Storage::disk('public')->assertMissing($oldPath);
        Storage::disk('public')->assertExists($achievement->photo);
    }

    /**
     * Deleting achievement cleans up associated photo.
     */
    public function test_deleting_achievement_cleans_up_photo(): void
    {
        Storage::fake('public');
        $user = User::factory()->create();

        $file = UploadedFile::fake()->image('to_delete.jpg');
        $path = $file->store('achievements', 'public');

        $achievement = Achievement::create([
            'title' => 'Prestasi Dihapus',
            'slug' => 'prestasi-dihapus',
            'photo' => $path,
            'is_active' => true,
        ]);

        Storage::disk('public')->assertExists($path);

        $response = $this->actingAs($user)->delete("/admin/achievements/{$achievement->id}");

        $response->assertRedirect('/admin/achievements');
        $this->assertSoftDeleted('achievements', ['id' => $achievement->id]);
        $this->assertNotNull(Achievement::withTrashed()->find($achievement->id)->deleted_at);
        $this->assertNull(Achievement::find($achievement->id));
        Storage::disk('public')->assertMissing($path);
    }

    /**
     * Soft deleted achievement is not visible in regular admin listing.
     */
    public function test_soft_deleted_achievement_is_not_visible_in_admin_listing(): void
    {
        $user = User::factory()->create();

        $achievement = Achievement::create([
            'title' => 'Prestasi Terhapus',
            'slug' => 'prestasi-terhapus',
            'category' => 'Akademik',
            'level' => 'Tingkat Kota',
            'year' => 2025,
            'is_active' => true,
        ]);

        $achievement->delete();
        $this->assertSoftDeleted($achievement);

        $response = $this->actingAs($user)->get('/admin/achievements');
        $response->assertStatus(200);
        $response->assertInertia(fn (Assert $page) => $page
            ->component('Admin/Achievements/Index')
            ->has('achievements.data', 0)
        );
    }

    /**
     * Search and category/level/year filters work in admin.
     */
    public function test_admin_filters_work(): void
    {
        $user = User::factory()->create();

        Achievement::create([
            'title' => 'Juara Basket Pelajar',
            'slug' => 'juara-basket-pelajar',
            'category' => 'Olahraga',
            'level' => 'Tingkat Provinsi',
            'year' => 2024,
            'is_active' => true,
        ]);

        Achievement::create([
            'title' => 'Juara Catur Nasional',
            'slug' => 'juara-catur-nasional',
            'category' => 'Olahraga',
            'level' => 'Tingkat Nasional',
            'year' => 2025,
            'is_active' => true,
        ]);

        $response = $this->actingAs($user)->get('/admin/achievements?level=Tingkat Nasional&year=2025');

        $response->assertStatus(200);
        $response->assertInertia(fn (Assert $page) => $page
            ->component('Admin/Achievements/Index')
            ->has('achievements.data', 1)
            ->where('achievements.data.0.title', 'Juara Catur Nasional')
        );
    }
}
