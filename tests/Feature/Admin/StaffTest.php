<?php

namespace Tests\Feature\Admin;

use App\Models\Staff;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class StaffTest extends TestCase
{
    /**
     * Guest cannot access admin staff.
     */
    public function test_guest_cannot_access_admin_staff(): void
    {
        $response = $this->get('/admin/staff');

        $response->assertRedirect('/login');
    }

    /**
     * Authenticated user can view staff list.
     */
    public function test_authenticated_user_can_view_staff_list(): void
    {
        $user = User::factory()->create();
        Staff::create([
            'name' => 'Staf Tata Usaha',
            'position' => 'Administrasi',
            'is_active' => true,
        ]);

        $response = $this->actingAs($user)->get('/admin/staff');

        $response->assertStatus(200);
        $response->assertInertia(fn (Assert $page) => $page
            ->component('Admin/Staff/Index')
            ->has('staff.data', 1)
        );
    }

    /**
     * Authenticated user can create staff with photo.
     */
    public function test_authenticated_user_can_create_staff_with_photo(): void
    {
        Storage::fake('public');
        $user = User::factory()->create();
        $file = UploadedFile::fake()->image('staff.png', 300, 400);

        $response = $this->actingAs($user)->post('/admin/staff', [
            'name' => 'Budi Santoso, S.AP.',
            'nip' => '198501012010011002',
            'position' => 'Kepala Tata Usaha',
            'education' => 'S1 Administrasi Publik',
            'photo' => $file,
            'sort_order' => 1,
            'is_active' => true,
        ]);

        $response->assertRedirect('/admin/staff');
        $response->assertSessionHas('success');

        $staff = Staff::where('name', 'Budi Santoso, S.AP.')->first();
        $this->assertNotNull($staff);
        $this->assertNotNull($staff->photo);
        Storage::disk('public')->assertExists($staff->photo);
    }

    /**
     * Staff creation rejects invalid photo type.
     */
    public function test_staff_creation_rejects_invalid_photo(): void
    {
        Storage::fake('public');
        $user = User::factory()->create();
        $file = UploadedFile::fake()->create('document.pdf', 100);

        $response = $this->actingAs($user)->post('/admin/staff', [
            'name' => 'Staf Salah File',
            'photo' => $file,
        ]);

        $response->assertSessionHasErrors(['photo']);
    }

    /**
     * Staff creation rejects oversized photo.
     */
    public function test_staff_creation_rejects_oversized_photo(): void
    {
        Storage::fake('public');
        $user = User::factory()->create();
        $file = UploadedFile::fake()->image('huge.jpg')->size(3000);

        $response = $this->actingAs($user)->post('/admin/staff', [
            'name' => 'Staf Foto Besar',
            'photo' => $file,
        ]);

        $response->assertSessionHasErrors(['photo']);
    }

    /**
     * Staff creation requires name.
     */
    public function test_staff_creation_requires_name(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->post('/admin/staff', [
            'name' => '',
        ]);

        $response->assertSessionHasErrors(['name']);
    }

    /**
     * Updating staff and replacing photo deletes the old file.
     */
    public function test_updating_staff_replaces_photo_and_deletes_old_file(): void
    {
        Storage::fake('public');
        $user = User::factory()->create();

        $oldFile = UploadedFile::fake()->image('old_staff.jpg');
        $oldPath = $oldFile->store('staff', 'public');

        $staff = Staff::create([
            'name' => 'Staf Lama',
            'photo' => $oldPath,
            'is_active' => true,
        ]);

        Storage::disk('public')->assertExists($oldPath);

        $newFile = UploadedFile::fake()->image('new_staff.jpg');

        $response = $this->actingAs($user)->put("/admin/staff/{$staff->id}", [
            'name' => 'Staf Baru',
            'photo' => $newFile,
            'is_active' => true,
        ]);

        $response->assertRedirect('/admin/staff');
        $response->assertSessionHas('success');

        $staff->refresh();
        $this->assertNotEquals($oldPath, $staff->photo);
        Storage::disk('public')->assertMissing($oldPath);
        Storage::disk('public')->assertExists($staff->photo);
    }

    /**
     * Deleting staff removes associated photo.
     */
    public function test_deleting_staff_cleans_up_photo(): void
    {
        Storage::fake('public');
        $user = User::factory()->create();

        $file = UploadedFile::fake()->image('to_delete.jpg');
        $path = $file->store('staff', 'public');

        $staff = Staff::create([
            'name' => 'Staf Dihapus',
            'photo' => $path,
            'is_active' => true,
        ]);

        Storage::disk('public')->assertExists($path);

        $response = $this->actingAs($user)->delete("/admin/staff/{$staff->id}");

        $response->assertRedirect('/admin/staff');
        $this->assertDatabaseMissing('staff', ['id' => $staff->id]);
        Storage::disk('public')->assertMissing($path);
    }
}
