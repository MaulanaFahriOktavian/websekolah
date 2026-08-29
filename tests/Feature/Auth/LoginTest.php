<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class LoginTest extends TestCase
{
    /**
     * Guest can see the login page.
     */
    public function test_guest_can_see_login_page(): void
    {
        $response = $this->get('/login');

        $response->assertStatus(200);
        $response->assertInertia(fn (Assert $page) => $page->component('Auth/Login'));
    }

    /**
     * Authenticated user visiting /login is redirected away by the guest middleware.
     * Laravel's guest middleware redirects to the configured authenticated home route.
     */
    public function test_authenticated_user_is_redirected_from_login_page(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->get('/login');

        // The guest middleware redirects authenticated users away from guest-only routes.
        // Laravel's default redirect target is '/' unless redirectUsersTo is configured.
        $response->assertRedirect();
        $this->assertAuthenticated();
    }

    /**
     * Valid credentials authenticate the user and redirect to admin.
     */
    public function test_valid_credentials_log_in_and_redirect_to_admin(): void
    {
        $user = User::factory()->create([
            'password' => bcrypt('password123'),
        ]);

        $response = $this->post('/login', [
            'email' => $user->email,
            'password' => 'password123',
        ]);

        $response->assertRedirect('/admin');
        $this->assertAuthenticatedAs($user);
    }

    /**
     * Invalid credentials return a validation error on the email field.
     */
    public function test_invalid_credentials_return_validation_error(): void
    {
        User::factory()->create([
            'email' => 'test@example.com',
            'password' => bcrypt('correct-password'),
        ]);

        $response = $this->post('/login', [
            'email' => 'test@example.com',
            'password' => 'wrong-password',
        ]);

        $response->assertSessionHasErrors(['email']);
        $this->assertGuest();
    }

    /**
     * Login requires email and password.
     */
    public function test_login_requires_email_and_password(): void
    {
        $response = $this->post('/login', []);

        $response->assertSessionHasErrors(['email', 'password']);
    }

    /**
     * Authenticated user can log out and is redirected to homepage.
     */
    public function test_authenticated_user_can_logout(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->post('/logout');

        $response->assertRedirect('/');
        $this->assertGuest();
    }
}
