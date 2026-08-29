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
                'name' => 'Nama Sekolah',
                'short_name' => 'NS',
                'npsn' => null,
                'level' => null,
                'status' => 'Negeri',
                'address' => null,
                'phone' => null,
                'email' => null,
                'website' => null,
                'logo_path' => null,
                'favicon_path' => null,
                'founded_year' => null,
                'accreditation' => null,
                'principal_name' => null,
                'vision' => null,
                'mission' => null,
                'history' => null,
            ]
        );
    }
}
