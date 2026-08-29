<?php

namespace Tests\Feature\Public;

use App\Models\SchoolProfile;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class HomeTest extends TestCase
{
    /**
     * The public homepage returns 200 OK and renders the Public/Home Inertia component.
     */
    public function test_public_homepage_renders_successfully(): void
    {
        $response = $this->get('/');

        $response->assertStatus(200);
        $response->assertInertia(fn (Assert $page) => $page
            ->component('Public/Home')
        );
    }

    /**
     * The public homepage receives school data from shared Inertia props
     * when a school profile record exists.
     */
    public function test_homepage_receives_school_profile_data_when_profile_exists(): void
    {
        SchoolProfile::create([
            'name' => 'Sekolah Uji Coba',
            'address' => 'Jl. Uji Coba No. 1',
            'email' => 'test@sekolah.sch.id',
        ]);

        $response = $this->get('/');

        $response->assertStatus(200);
        $response->assertInertia(fn (Assert $page) => $page
            ->component('Public/Home')
            ->where('school.name', 'Sekolah Uji Coba')
            ->where('school.address', 'Jl. Uji Coba No. 1')
            ->where('school.email', 'test@sekolah.sch.id')
        );
    }

    /**
     * The public homepage is accessible even when no school profile exists.
     */
    public function test_homepage_is_accessible_without_school_profile(): void
    {
        SchoolProfile::truncate();

        $response = $this->get('/');

        $response->assertStatus(200);
        $response->assertInertia(fn (Assert $page) => $page
            ->component('Public/Home')
            ->where('school', null)
        );
    }
}
