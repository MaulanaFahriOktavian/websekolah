<?php

namespace Tests\Feature\Admin;

use App\Models\Facility;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class FacilityTest extends TestCase
{
    /**
     * Guest cannot access admin facilities.
     */
    public function test_guest_cannot_access_admin_facilities(): void
    {
        $response = $this->get('/admin/facilities');

        $response->assertRedirect('/login');
    }

    /**
     * Authenticated user can view facilities list.
     */
    public function test_authenticated_user_can_view_facilities_list(): void
    {
        $user = User::factory()->create();
        Facility::create([
            'name' => 'Laboratorium Komputer',
            'slug' => 'laboratorium-komputer',
            'capacity' => 40,
            'is_active' => true,
        ]);

        $response = $this->actingAs($user)->get('/admin/facilities');

        $response->assertStatus(200);
        $response->assertInertia(fn (Assert $page) => $page
            ->component('Admin/Facilities/Index')
            ->has('facilities.data', 1)
        );
    }

    /**
     * Authenticated user can create facility with photo.
     */
    public function test_authenticated_user_can_create_facility_with_photo(): void
    {
        Storage::fake('public');
        $user = User::factory()->create();
        $file = UploadedFile::fake()->image('lab.jpg', 800, 600);

        $response = $this->actingAs($user)->post('/admin/facilities', [
            'name' => 'Perpustakaan Pusat',
            'description' => 'Perpustakaan dengan ribuan koleksi buku.',
            'capacity' => 100,
            'photo' => $file,
            'sort_order' => 1,
            'is_active' => true,
        ]);

        $response->assertRedirect('/admin/facilities');
        $response->assertSessionHas('success');

        $facility = Facility::where('name', 'Perpustakaan Pusat')->first();
        $this->assertNotNull($facility);
        $this->assertEquals('perpustakaan-pusat', $facility->slug);
        $this->assertNotNull($facility->photo);
        Storage::disk('public')->assertExists($facility->photo);
    }

    /**
     * Facility creation rejects invalid photo type.
     */
    public function test_facility_creation_rejects_invalid_photo(): void
    {
        Storage::fake('public');
        $user = User::factory()->create();
        $file = UploadedFile::fake()->create('manual.pdf', 100);

        $response = $this->actingAs($user)->post('/admin/facilities', [
            'name' => 'Fasilitas Salah File',
            'photo' => $file,
        ]);

        $response->assertSessionHasErrors(['photo']);
    }

    /**
     * Facility creation rejects oversized photo.
     */
    public function test_facility_creation_rejects_oversized_photo(): void
    {
        Storage::fake('public');
        $user = User::factory()->create();
        $file = UploadedFile::fake()->image('huge.png')->size(3000);

        $response = $this->actingAs($user)->post('/admin/facilities', [
            'name' => 'Fasilitas Foto Besar',
            'photo' => $file,
        ]);

        $response->assertSessionHasErrors(['photo']);
    }

    /**
     * Facility creation requires name.
     */
    public function test_facility_creation_requires_name(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->post('/admin/facilities', [
            'name' => '',
        ]);

        $response->assertSessionHasErrors(['name']);
    }

    /**
     * Updating facility replaces photo and deletes the old file.
     */
    public function test_updating_facility_replaces_photo_and_deletes_old_file(): void
    {
        Storage::fake('public');
        $user = User::factory()->create();

        $oldFile = UploadedFile::fake()->image('old_lab.jpg');
        $oldPath = $oldFile->store('facilities', 'public');

        $facility = Facility::create([
            'name' => 'Lab Lama',
            'slug' => 'lab-lama',
            'photo' => $oldPath,
            'is_active' => true,
        ]);

        Storage::disk('public')->assertExists($oldPath);

        $newFile = UploadedFile::fake()->image('new_lab.jpg');

        $response = $this->actingAs($user)->put("/admin/facilities/{$facility->id}", [
            'name' => 'Lab Baru',
            'photo' => $newFile,
            'is_active' => true,
        ]);

        $response->assertRedirect('/admin/facilities');
        $response->assertSessionHas('success');

        $facility->refresh();
        $this->assertEquals('lab-baru', $facility->slug);
        $this->assertNotEquals($oldPath, $facility->photo);
        Storage::disk('public')->assertMissing($oldPath);
        Storage::disk('public')->assertExists($facility->photo);
    }

    /**
     * Deleting facility removes associated photo.
     */
    public function test_deleting_facility_cleans_up_photo(): void
    {
        Storage::fake('public');
        $user = User::factory()->create();

        $file = UploadedFile::fake()->image('to_delete.jpg');
        $path = $file->store('facilities', 'public');

        $facility = Facility::create([
            'name' => 'Fasilitas Dihapus',
            'slug' => 'fasilitas-dihapus',
            'photo' => $path,
            'is_active' => true,
        ]);

        Storage::disk('public')->assertExists($path);

        $response = $this->actingAs($user)->delete("/admin/facilities/{$facility->id}");

        $response->assertRedirect('/admin/facilities');
        $this->assertSoftDeleted('facilities', ['id' => $facility->id]);
        $this->assertNotNull(Facility::withTrashed()->find($facility->id)->deleted_at);
        $this->assertNull(Facility::find($facility->id));
        Storage::disk('public')->assertMissing($path);
    }

    /**
     * Soft deleted facility is not visible in regular admin listing.
     */
    public function test_soft_deleted_facility_is_not_visible_in_admin_listing(): void
    {
        $user = User::factory()->create();

        $facility = Facility::create([
            'name' => 'Fasilitas Terhapus',
            'slug' => 'fasilitas-terhapus',
            'is_active' => true,
        ]);

        $facility->delete();
        $this->assertSoftDeleted($facility);

        $response = $this->actingAs($user)->get('/admin/facilities');
        $response->assertStatus(200);
        $response->assertInertia(fn (Assert $page) => $page
            ->component('Admin/Facilities/Index')
            ->has('facilities.data', 0)
        );
    }
}
