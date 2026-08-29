<?php

namespace Tests\Feature\Admin;

use App\Models\Gallery;
use App\Models\GalleryPhoto;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class GalleryTest extends TestCase
{
    /**
     * Guest cannot access admin galleries.
     */
    public function test_guest_cannot_access_admin_galleries(): void
    {
        $response = $this->get('/admin/galleries');

        $response->assertRedirect('/login');
    }

    /**
     * Authenticated user can view galleries list.
     */
    public function test_authenticated_user_can_view_galleries_list(): void
    {
        $user = User::factory()->create();
        Gallery::create([
            'title' => 'Upacara Bendera',
            'slug' => 'upacara-bendera',
            'is_active' => true,
        ]);

        $response = $this->actingAs($user)->get('/admin/galleries');

        $response->assertStatus(200);
        $response->assertInertia(fn (Assert $page) => $page
            ->component('Admin/Galleries/Index')
            ->has('galleries.data', 1)
        );
    }

    /**
     * Authenticated user can create gallery with cover and multiple photos.
     */
    public function test_authenticated_user_can_create_gallery_with_photos(): void
    {
        Storage::fake('public');
        $user = User::factory()->create();

        $coverFile = UploadedFile::fake()->image('cover.jpg', 800, 600);
        $photo1 = UploadedFile::fake()->image('photo1.jpg', 800, 600);
        $photo2 = UploadedFile::fake()->image('photo2.jpg', 800, 600);

        $response = $this->actingAs($user)->post('/admin/galleries', [
            'title' => 'Pentas Seni 2025',
            'description' => 'Dokumentasi pentas seni tahunan.',
            'event_date' => '2025-06-15',
            'cover_photo' => $coverFile,
            'photos' => [$photo1, $photo2],
            'photo_captions' => ['Tarian Daerah', 'Drama Musikal'],
            'sort_order' => 1,
            'is_active' => true,
        ]);

        $response->assertRedirect('/admin/galleries');
        $response->assertSessionHas('success');

        $gallery = Gallery::where('title', 'Pentas Seni 2025')->first();
        $this->assertNotNull($gallery);
        $this->assertEquals('pentas-seni-2025', $gallery->slug);
        $this->assertNotNull($gallery->cover_photo);
        Storage::disk('public')->assertExists($gallery->cover_photo);

        $this->assertCount(2, $gallery->photos);
        foreach ($gallery->photos as $photo) {
            Storage::disk('public')->assertExists($photo->photo_path);
        }
    }

    /**
     * Gallery creation rejects invalid photo type.
     */
    public function test_gallery_creation_rejects_invalid_photo(): void
    {
        Storage::fake('public');
        $user = User::factory()->create();
        $file = UploadedFile::fake()->create('document.pdf', 100);

        $response = $this->actingAs($user)->post('/admin/galleries', [
            'title' => 'Galeri Salah File',
            'cover_photo' => $file,
        ]);

        $response->assertSessionHasErrors(['cover_photo']);
    }

    /**
     * Gallery creation requires title.
     */
    public function test_gallery_creation_requires_title(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->post('/admin/galleries', [
            'title' => '',
        ]);

        $response->assertSessionHasErrors(['title']);
    }

    /**
     * Updating gallery replaces cover photo and deletes old file.
     */
    public function test_updating_gallery_replaces_cover_and_deletes_old_file(): void
    {
        Storage::fake('public');
        $user = User::factory()->create();

        $oldCover = UploadedFile::fake()->image('old_cover.jpg');
        $oldPath = $oldCover->store('galleries', 'public');

        $gallery = Gallery::create([
            'title' => 'Galeri Lama',
            'slug' => 'galeri-lama',
            'cover_photo' => $oldPath,
            'is_active' => true,
        ]);

        Storage::disk('public')->assertExists($oldPath);

        $newCover = UploadedFile::fake()->image('new_cover.jpg');

        $response = $this->actingAs($user)->put("/admin/galleries/{$gallery->id}", [
            'title' => 'Galeri Baru',
            'cover_photo' => $newCover,
            'is_active' => true,
        ]);

        $response->assertRedirect('/admin/galleries');
        $response->assertSessionHas('success');

        $gallery->refresh();
        $this->assertEquals('galeri-baru', $gallery->slug);
        $this->assertNotEquals($oldPath, $gallery->cover_photo);
        Storage::disk('public')->assertMissing($oldPath);
        Storage::disk('public')->assertExists($gallery->cover_photo);
    }

    /**
     * Authenticated user can delete individual photo and clean disk.
     */
    public function test_deleting_individual_photo_cleans_file(): void
    {
        Storage::fake('public');
        $user = User::factory()->create();

        $gallery = Gallery::create([
            'title' => 'Album Uji',
            'slug' => 'album-uji',
            'is_active' => true,
        ]);

        $file = UploadedFile::fake()->image('foto_uji.jpg');
        $path = $file->store('galleries', 'public');

        $photo = GalleryPhoto::create([
            'gallery_id' => $gallery->id,
            'photo_path' => $path,
            'caption' => 'Foto Uji',
        ]);

        Storage::disk('public')->assertExists($path);

        $response = $this->actingAs($user)->delete("/admin/galleries/photos/{$photo->id}");

        $response->assertStatus(302);
        $this->assertDatabaseMissing('gallery_photos', ['id' => $photo->id]);
        Storage::disk('public')->assertMissing($path);
    }

    /**
     * Deleting gallery removes all photo files and cover image.
     */
    public function test_deleting_gallery_cleans_up_all_photos(): void
    {
        Storage::fake('public');
        $user = User::factory()->create();

        $coverFile = UploadedFile::fake()->image('cover_del.jpg');
        $coverPath = $coverFile->store('galleries', 'public');

        $gallery = Gallery::create([
            'title' => 'Galeri Dihapus',
            'slug' => 'galeri-dihapus',
            'cover_photo' => $coverPath,
            'is_active' => true,
        ]);

        $photoFile = UploadedFile::fake()->image('photo_del.jpg');
        $photoPath = $photoFile->store('galleries', 'public');

        GalleryPhoto::create([
            'gallery_id' => $gallery->id,
            'photo_path' => $photoPath,
        ]);

        Storage::disk('public')->assertExists($coverPath);
        Storage::disk('public')->assertExists($photoPath);

        $response = $this->actingAs($user)->delete("/admin/galleries/{$gallery->id}");

        $response->assertRedirect('/admin/galleries');
        $this->assertDatabaseMissing('galleries', ['id' => $gallery->id]);
        Storage::disk('public')->assertMissing($coverPath);
        Storage::disk('public')->assertMissing($photoPath);
    }
}
