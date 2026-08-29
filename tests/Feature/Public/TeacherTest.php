<?php

namespace Tests\Feature\Public;

use App\Models\Teacher;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class TeacherTest extends TestCase
{
    /**
     * Public teachers directory only shows active teachers.
     */
    public function test_public_teachers_directory_only_shows_active(): void
    {
        // Active teacher
        Teacher::create([
            'name' => 'Guru Aktif',
            'position' => 'Guru Matematika',
            'subject' => 'Matematika',
            'is_active' => true,
        ]);

        // Inactive teacher (should NOT be visible)
        Teacher::create([
            'name' => 'Guru Nonaktif',
            'position' => 'Mantan Guru',
            'subject' => 'Fisika',
            'is_active' => false,
        ]);

        $response = $this->get('/guru');

        $response->assertStatus(200);
        $response->assertInertia(fn (Assert $page) => $page
            ->component('Public/Teachers/Index')
            ->has('teachers.data', 1)
            ->where('teachers.data.0.name', 'Guru Aktif')
        );
    }

    /**
     * Public teachers search filter works by name, position, or subject.
     */
    public function test_public_teachers_search_filter_works(): void
    {
        Teacher::create([
            'name' => 'Ahmad Pendidik',
            'position' => 'Guru Kimia',
            'subject' => 'Kimia',
            'is_active' => true,
        ]);

        Teacher::create([
            'name' => 'Budi Pengajar',
            'position' => 'Guru Bahasa',
            'subject' => 'Bahasa Inggris',
            'is_active' => true,
        ]);

        $response = $this->get('/guru?cari=Kimia');

        $response->assertStatus(200);
        $response->assertInertia(fn (Assert $page) => $page
            ->component('Public/Teachers/Index')
            ->has('teachers.data', 1)
            ->where('teachers.data.0.name', 'Ahmad Pendidik')
        );
    }
}
