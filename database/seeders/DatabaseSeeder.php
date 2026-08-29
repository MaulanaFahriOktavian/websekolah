<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            SchoolProfileSeeder::class,
            AdminUserSeeder::class,
            CategorySeeder::class,
            NewsSeeder::class,
            AnnouncementSeeder::class,
            TeacherSeeder::class,
            StaffSeeder::class,
            FacilitySeeder::class,
            AchievementSeeder::class,
            GallerySeeder::class,
        ]);
    }
}
