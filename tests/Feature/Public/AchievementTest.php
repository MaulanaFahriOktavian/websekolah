<?php

namespace Tests\Feature\Public;

use App\Models\Achievement;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class AchievementTest extends TestCase
{
    /**
     * Public achievements directory only shows active achievements.
     */
    public function test_public_achievements_directory_only_shows_active(): void
    {
        // Active achievement
        Achievement::create([
            'title' => 'Prestasi Aktif',
            'slug' => 'prestasi-aktif',
            'year' => 2025,
            'is_active' => true,
        ]);

        // Inactive achievement (should NOT be visible)
        Achievement::create([
            'title' => 'Prestasi Nonaktif',
            'slug' => 'prestasi-nonaktif',
            'year' => 2024,
            'is_active' => false,
        ]);

        $response = $this->get('/prestasi');

        $response->assertStatus(200);
        $response->assertInertia(fn (Assert $page) => $page
            ->component('Public/Achievements/Index')
            ->has('achievements.data', 1)
            ->where('achievements.data.0.title', 'Prestasi Aktif')
        );
    }

    /**
     * Public achievement detail resolves by slug.
     */
    public function test_public_achievement_detail_resolves_by_slug(): void
    {
        $achievement = Achievement::create([
            'title' => 'Juara 1 Lomba Robotika Nasional',
            'slug' => 'juara-1-lomba-robotika-nasional',
            'category' => 'Teknologi',
            'level' => 'Tingkat Nasional',
            'year' => 2025,
            'recipient' => 'Tim Robotika',
            'description' => "Juara pertama kompetisi perancangan robot maze solver.\n\nMemperoleh medali emas.",
            'is_active' => true,
        ]);

        $response = $this->get("/prestasi/{$achievement->slug}");

        $response->assertStatus(200);
        $response->assertInertia(fn (Assert $page) => $page
            ->component('Public/Achievements/Show')
            ->where('achievement.title', 'Juara 1 Lomba Robotika Nasional')
            ->has('relatedAchievements')
        );
    }

    /**
     * Public achievement detail returns 404 for inactive item.
     */
    public function test_public_achievement_detail_returns_404_for_inactive(): void
    {
        $inactive = Achievement::create([
            'title' => 'Prestasi Ditutup',
            'slug' => 'prestasi-ditutup',
            'is_active' => false,
        ]);

        $response = $this->get("/prestasi/{$inactive->slug}");

        $response->assertStatus(404);
    }

    /**
     * Public achievement search and category/year filters work.
     */
    public function test_public_achievement_search_and_filters_work(): void
    {
        Achievement::create([
            'title' => 'Juara Silat Provinsi',
            'slug' => 'juara-silat-provinsi',
            'category' => 'Olahraga',
            'year' => 2024,
            'is_active' => true,
        ]);

        Achievement::create([
            'title' => 'Juara Cerdas Cermat',
            'slug' => 'juara-cerdas-cermat',
            'category' => 'Akademik',
            'year' => 2025,
            'is_active' => true,
        ]);

        $response = $this->get('/prestasi?kategori=Akademik&tahun=2025');

        $response->assertStatus(200);
        $response->assertInertia(fn (Assert $page) => $page
            ->component('Public/Achievements/Index')
            ->has('achievements.data', 1)
            ->where('achievements.data.0.title', 'Juara Cerdas Cermat')
        );
    }
}
