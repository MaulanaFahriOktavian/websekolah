<?php

namespace Tests\Feature\Admin;

use App\Models\Teacher;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class TeacherTest extends TestCase
{
    /**
     * Guest cannot access admin teachers.
     */
    public function test_guest_cannot_access_admin_teachers(): void
    {
        $response = $this->get('/admin/teachers');

        $response->assertRedirect('/login');
    }

    /**
     * Authenticated user can view teachers list.
     */
    public function test_authenticated_user_can_view_teachers_list(): void
    {
        $user = User::factory()->create();
        Teacher::create([
            'name' => 'Guru Pengajar',
            'position' => 'Guru Matematika',
            'subject' => 'Matematika',
            'is_active' => true,
        ]);

        $response = $this->actingAs($user)->get('/admin/teachers');

        $response->assertStatus(200);
        $response->assertInertia(fn (Assert $page) => $page
            ->component('Admin/Teachers/Index')
            ->has('teachers.data', 1)
        );
    }

    /**
     * Authenticated user can create teacher with photo.
     */
    public function test_authenticated_user_can_create_teacher_with_photo(): void
    {
        Storage::fake('public');
        $user = User::factory()->create();
        $file = UploadedFile::fake()->image('guru.jpg', 300, 400);

        $response = $this->actingAs($user)->post('/admin/teachers', [
            'name' => 'Dr. Hendra Saputra, M.Pd.',
            'nip' => '198001012005011001',
            'position' => 'Guru Biologi',
            'subject' => 'Biologi',
            'education' => 'S2 Biologi',
            'photo' => $file,
            'sort_order' => 1,
            'is_active' => true,
        ]);

        $response->assertRedirect('/admin/teachers');
        $response->assertSessionHas('success');

        $teacher = Teacher::where('name', 'Dr. Hendra Saputra, M.Pd.')->first();
        $this->assertNotNull($teacher);
        $this->assertNotNull($teacher->photo);
        Storage::disk('public')->assertExists($teacher->photo);
    }

    /**
     * Teacher creation rejects invalid photo type.
     */
    public function test_teacher_creation_rejects_invalid_photo(): void
    {
        Storage::fake('public');
        $user = User::factory()->create();
        $file = UploadedFile::fake()->create('document.pdf', 100);

        $response = $this->actingAs($user)->post('/admin/teachers', [
            'name' => 'Guru Salah File',
            'photo' => $file,
        ]);

        $response->assertSessionHasErrors(['photo']);
    }

    /**
     * Teacher creation rejects oversized photo.
     */
    public function test_teacher_creation_rejects_oversized_photo(): void
    {
        Storage::fake('public');
        $user = User::factory()->create();
        $file = UploadedFile::fake()->image('huge.jpg')->size(3000);

        $response = $this->actingAs($user)->post('/admin/teachers', [
            'name' => 'Guru Foto Besar',
            'photo' => $file,
        ]);

        $response->assertSessionHasErrors(['photo']);
    }

    /**
     * Teacher creation requires name.
     */
    public function test_teacher_creation_requires_name(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->post('/admin/teachers', [
            'name' => '',
        ]);

        $response->assertSessionHasErrors(['name']);
    }

    /**
     * Updating teacher and replacing photo deletes the old file.
     */
    public function test_updating_teacher_replaces_photo_and_deletes_old_file(): void
    {
        Storage::fake('public');
        $user = User::factory()->create();

        $oldFile = UploadedFile::fake()->image('old_guru.jpg');
        $oldPath = $oldFile->store('teachers', 'public');

        $teacher = Teacher::create([
            'name' => 'Guru Lama',
            'photo' => $oldPath,
            'is_active' => true,
        ]);

        Storage::disk('public')->assertExists($oldPath);

        $newFile = UploadedFile::fake()->image('new_guru.jpg');

        $response = $this->actingAs($user)->put("/admin/teachers/{$teacher->id}", [
            'name' => 'Guru Baru',
            'photo' => $newFile,
            'is_active' => true,
        ]);

        $response->assertRedirect('/admin/teachers');
        $response->assertSessionHas('success');

        $teacher->refresh();
        $this->assertNotEquals($oldPath, $teacher->photo);
        Storage::disk('public')->assertMissing($oldPath);
        Storage::disk('public')->assertExists($teacher->photo);
    }

    /**
     * Deleting teacher removes associated photo.
     */
    public function test_deleting_teacher_cleans_up_photo(): void
    {
        Storage::fake('public');
        $user = User::factory()->create();

        $file = UploadedFile::fake()->image('to_delete.jpg');
        $path = $file->store('teachers', 'public');

        $teacher = Teacher::create([
            'name' => 'Guru Dihapus',
            'photo' => $path,
            'is_active' => true,
        ]);

        Storage::disk('public')->assertExists($path);

        $response = $this->actingAs($user)->delete("/admin/teachers/{$teacher->id}");

        $response->assertRedirect('/admin/teachers');
        $this->assertSoftDeleted('teachers', ['id' => $teacher->id]);
        $this->assertNotNull(Teacher::withTrashed()->find($teacher->id)->deleted_at);
        $this->assertNull(Teacher::find($teacher->id));
        Storage::disk('public')->assertMissing($path);
    }

    /**
     * Soft deleted teacher is not visible in regular admin listing.
     */
    public function test_soft_deleted_teacher_is_not_visible_in_admin_listing(): void
    {
        $user = User::factory()->create();

        $teacher = Teacher::create([
            'name' => 'Guru Terhapus',
            'is_active' => true,
        ]);

        $teacher->delete();
        $this->assertSoftDeleted($teacher);

        $response = $this->actingAs($user)->get('/admin/teachers');
        $response->assertStatus(200);
        $response->assertInertia(fn (Assert $page) => $page
            ->component('Admin/Teachers/Index')
            ->has('teachers.data', 0)
        );
    }
}
