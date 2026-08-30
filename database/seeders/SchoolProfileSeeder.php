<?php

namespace Database\Seeders;

use App\Models\SchoolProfile;
use Illuminate\Database\Seeder;

class SchoolProfileSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * Creates exactly one school profile record.
     * Safe to run multiple times — will not create duplicates.
     */
    public function run(): void
    {
        SchoolProfile::firstOrCreate(
            ['id' => 1],
            [
                // Identity
                'name' => 'Nama Sekolah',
                'short_name' => 'NS',
                'npsn' => null,
                'level' => null,
                'status' => 'Negeri',
                'tagline' => null,
                'description' => null,

                // Contact
                'address' => null,
                'phone' => null,
                'email' => null,
                'website' => null,

                // Branding
                'logo_path' => null,
                'favicon_path' => null,
                'hero_image_path' => null,

                // Academic info
                'founded_year' => null,
                'accreditation' => null,

                // Principal
                'principal_name' => null,
                'principal_photo_path' => null,
                'principal_greeting' => null,

                // Content
                'vision' => null,
                'mission' => null,
                'history' => null,

                // Geolocation
                'latitude' => null,
                'longitude' => null,
                'maps_url' => null,

                // Social media
                'facebook_url' => null,
                'instagram_url' => null,
                'youtube_url' => null,
                'tiktok_url' => null,
            ]
        );
    }
}
