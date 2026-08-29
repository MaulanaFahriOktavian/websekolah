<?php

namespace Tests\Feature\Admin;

use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class DashboardTest extends TestCase
{
    // -------------------------------------------------------------------------
    // Guest access — must redirect to /login
    // -------------------------------------------------------------------------

    /**
     * Unauthenticated users cannot access GET /admin.
     */
    public function test_guest_cannot_access_admin(): void
    {
        $response = $this->get('/admin');

        $response->assertRedirect('/login');
    }

    /**
     * Unauthenticated users cannot access GET /admin/dashboard.
     */
    public function test_guest_cannot_access_admin_dashboard(): void
    {
        $response = $this->get('/admin/dashboard');

        $response->assertRedirect('/login');
    }

    // -------------------------------------------------------------------------
    // Authenticated access — must succeed
    // -------------------------------------------------------------------------

    /**
     * Authenticated users can access the admin dashboard.
     */
    public function test_authenticated_user_can_access_admin_dashboard(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->get('/admin');

        $response->assertStatus(200);
        $response->assertInertia(fn (Assert $page) => $page
            ->component('Admin/Dashboard')
            ->has('systemInfo')
        );
    }

    /**
     * Authenticated users can access the /admin/dashboard alias route.
     */
    public function test_authenticated_user_can_access_admin_dashboard_alias(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->get('/admin/dashboard');

        $response->assertStatus(200);
    }
}
