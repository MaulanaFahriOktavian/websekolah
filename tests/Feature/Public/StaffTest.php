<?php

namespace Tests\Feature\Public;

use App\Models\Staff;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class StaffTest extends TestCase
{
    /**
     * Public staff directory only shows active staff members.
     */
    public function test_public_staff_directory_only_shows_active(): void
    {
        // Active staff
        Staff::create([
            'name' => 'Staf Aktif',
            'position' => 'Tata Usaha',
            'is_active' => true,
        ]);

        // Inactive staff (should NOT be visible)
        Staff::create([
            'name' => 'Staf Nonaktif',
            'position' => 'Mantan Staf',
            'is_active' => false,
        ]);

        $response = $this->get('/staf');

        $response->assertStatus(200);
        $response->assertInertia(fn (Assert $page) => $page
            ->component('Public/Staff/Index')
            ->has('staff.data', 1)
            ->where('staff.data.0.name', 'Staf Aktif')
        );
    }

    /**
     * Public staff search filter works by name or position.
     */
    public function test_public_staff_search_filter_works(): void
    {
        Staff::create([
            'name' => 'Siti Pustakawan',
            'position' => 'Kepala Perpustakaan',
            'is_active' => true,
        ]);

        Staff::create([
            'name' => 'Bambang Laboran',
            'position' => 'Laboran Komputer',
            'is_active' => true,
        ]);

        $response = $this->get('/staf?cari=Perpustakaan');

        $response->assertStatus(200);
        $response->assertInertia(fn (Assert $page) => $page
            ->component('Public/Staff/Index')
            ->has('staff.data', 1)
            ->where('staff.data.0.name', 'Siti Pustakawan')
        );
    }
}
