<?php

namespace Tests\Feature\Public;

use App\Models\Facility;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class FacilityTest extends TestCase
{
    /**
     * Public facilities directory only shows active facilities.
     */
    public function test_public_facilities_directory_only_shows_active(): void
    {
        // Active facility
        Facility::create([
            'name' => 'Fasilitas Aktif',
            'slug' => 'fasilitas-aktif',
            'capacity' => 50,
            'is_active' => true,
        ]);

        // Inactive facility (should NOT be visible)
        Facility::create([
            'name' => 'Fasilitas Nonaktif',
            'slug' => 'fasilitas-nonaktif',
            'capacity' => 20,
            'is_active' => false,
        ]);

        $response = $this->get('/fasilitas');

        $response->assertStatus(200);
        $response->assertInertia(fn (Assert $page) => $page
            ->component('Public/Facilities/Index')
            ->has('facilities.data', 1)
            ->where('facilities.data.0.name', 'Fasilitas Aktif')
        );
    }

    /**
     * Public facility detail resolves by slug for active facility.
     */
    public function test_public_facility_detail_resolves_by_slug(): void
    {
        $facility = Facility::create([
            'name' => 'Laboratorium Komputer Modern',
            'slug' => 'laboratorium-komputer-modern',
            'description' => "Lab komputer dengan koneksi internet cepat.\n\nDilengkapi AC dan proyektor interaktif.",
            'capacity' => 45,
            'is_active' => true,
        ]);

        $response = $this->get("/fasilitas/{$facility->slug}");

        $response->assertStatus(200);
        $response->assertInertia(fn (Assert $page) => $page
            ->component('Public/Facilities/Show')
            ->where('facility.name', 'Laboratorium Komputer Modern')
            ->has('otherFacilities')
        );
    }

    /**
     * Public facility detail returns 404 for inactive facility.
     */
    public function test_public_facility_detail_returns_404_for_inactive(): void
    {
        $inactive = Facility::create([
            'name' => 'Fasilitas Ditutup',
            'slug' => 'fasilitas-ditutup',
            'is_active' => false,
        ]);

        $response = $this->get("/fasilitas/{$inactive->slug}");

        $response->assertStatus(404);
    }

    /**
     * Public facility search filter works by name or description.
     */
    public function test_public_facility_search_filter_works(): void
    {
        Facility::create([
            'name' => 'Perpustakaan Digital',
            'slug' => 'perpustakaan-digital',
            'description' => 'Koleksi ribuan buku',
            'is_active' => true,
        ]);

        Facility::create([
            'name' => 'Lapangan Basket',
            'slug' => 'lapangan-basket',
            'description' => 'Area olahraga',
            'is_active' => true,
        ]);

        $response = $this->get('/fasilitas?cari=Perpustakaan');

        $response->assertStatus(200);
        $response->assertInertia(fn (Assert $page) => $page
            ->component('Public/Facilities/Index')
            ->has('facilities.data', 1)
            ->where('facilities.data.0.name', 'Perpustakaan Digital')
        );
    }
}
