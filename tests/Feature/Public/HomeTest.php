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
            'founded_year' => 1985,
            'facebook_url' => 'https://facebook.com/sekolah',
            'instagram_url' => 'https://instagram.com/sekolah',
            'youtube_url' => 'https://youtube.com/sekolah',
            'tiktok_url' => 'https://tiktok.com/@sekolah',
        ]);

        $response = $this->get('/');

        $response->assertStatus(200);
        $response->assertInertia(fn (Assert $page) => $page
            ->component('Public/Home')
            ->where('school.name', 'Sekolah Uji Coba')
            ->where('school.address', 'Jl. Uji Coba No. 1')
            ->where('school.email', 'test@sekolah.sch.id')
            ->where('school.contact.address', 'Jl. Uji Coba No. 1')
            ->where('school.contact.email', 'test@sekolah.sch.id')
            ->where('school.established_year', 1985)
            ->where('school.founded_year', 1985)
            ->where('school.social.facebook', 'https://facebook.com/sekolah')
            ->where('school.social.instagram', 'https://instagram.com/sekolah')
            ->where('school.social.youtube', 'https://youtube.com/sekolah')
            ->where('school.social.tiktok', 'https://tiktok.com/@sekolah')
            ->where('school.seo.meta_description', 'Website resmi sekolah.')
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
