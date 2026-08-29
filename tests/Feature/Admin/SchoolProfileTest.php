<?php

namespace Tests\Feature\Admin;

use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class SchoolProfileTest extends TestCase
{
    // -------------------------------------------------------------------------
    // Guest access — must redirect to /login
    // -------------------------------------------------------------------------

    /**
     * Unauthenticated users cannot access the school profile page.
     */
    public function test_guest_cannot_access_school_profile(): void
    {
        $response = $this->get('/admin/school-profile');

        $response->assertRedirect('/login');
    }

    /**
     * Unauthenticated users cannot submit updates to the school profile.
     */
    public function test_guest_cannot_update_school_profile(): void
    {
        $response = $this->put('/admin/school-profile', ['name' => 'Hacked']);

        $response->assertRedirect('/login');
    }

    // -------------------------------------------------------------------------
    // Authenticated access — must succeed
    // -------------------------------------------------------------------------

    /**
     * Authenticated users can access the school profile edit page.
     */
    public function test_authenticated_user_can_access_school_profile(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->get('/admin/school-profile');

        $response->assertStatus(200);
        $response->assertInertia(fn (Assert $page) => $page
            ->component('Admin/SchoolProfile')
            ->has('profile')
        );
    }

    /**
     * Authenticated users can update the school profile.
     */
    public function test_authenticated_user_can_update_school_profile(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->put('/admin/school-profile', [
            'name' => 'Sekolah Menengah Atas Negeri Harapan',
            'short_name' => 'SMAN Harapan',
            'email' => 'info@sman-harapan.sch.id',
            'website' => 'https://www.sman-harapan.sch.id',
        ]);

        $response->assertRedirect('/admin/school-profile');
        $response->assertSessionHas('success');

        $this->assertDatabaseHas('school_profiles', [
            'name' => 'Sekolah Menengah Atas Negeri Harapan',
            'short_name' => 'SMAN Harapan',
        ]);
    }

    /**
     * Updating the school profile does not create a duplicate record.
     */
    public function test_update_does_not_create_duplicate_profile(): void
    {
        $user = User::factory()->create();

        // First update
        $this->actingAs($user)->put('/admin/school-profile', [
            'name' => 'Nama Sekolah Pertama',
        ]);

        // Second update
        $this->actingAs($user)->put('/admin/school-profile', [
            'name' => 'Nama Sekolah Diubah',
        ]);

        $this->assertDatabaseCount('school_profiles', 1);
        $this->assertDatabaseHas('school_profiles', ['name' => 'Nama Sekolah Diubah']);
    }

    // -------------------------------------------------------------------------
    // Validation
    // -------------------------------------------------------------------------

    /**
     * Validation rejects missing name.
     */
    public function test_validation_requires_name(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->put('/admin/school-profile', [
            'name' => '',
        ]);

        $response->assertSessionHasErrors(['name']);
    }

    /**
     * Validation rejects invalid email format.
     */
    public function test_validation_rejects_invalid_email(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->put('/admin/school-profile', [
            'name' => 'Nama Sekolah',
            'email' => 'bukan-email',
        ]);

        $response->assertSessionHasErrors(['email']);
    }

    /**
     * Validation rejects invalid URL.
     */
    public function test_validation_rejects_invalid_website_url(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->put('/admin/school-profile', [
            'name' => 'Nama Sekolah',
            'website' => 'bukan-url',
        ]);

        $response->assertSessionHasErrors(['website']);
    }

    /**
     * Validation rejects an invalid founding year.
     */
    public function test_validation_rejects_invalid_founded_year(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->put('/admin/school-profile', [
            'name' => 'Nama Sekolah',
            'founded_year' => 1800,
        ]);

        $response->assertSessionHasErrors(['founded_year']);
    }

    /**
     * Validation accepts all nullable fields as empty.
     */
    public function test_nullable_fields_are_accepted_as_empty(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->put('/admin/school-profile', [
            'name' => 'Nama Sekolah',
            'short_name' => '',
            'vision' => '',
            'mission' => '',
            'history' => '',
        ]);

        $response->assertRedirect('/admin/school-profile');
        $response->assertSessionHasNoErrors();
    }
}
