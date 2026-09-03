<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use RuntimeException;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * Creates the initial CMS administrator account.
     *
     * Credentials are read from environment variables:
     *   ADMIN_NAME     — display name (default: Administrator)
     *   ADMIN_EMAIL    — login email (default: admin@sekol qah.test)
     *   ADMIN_PASSWORD — login password (REQUIRED — no hardcoded default)
     *
     * WARNING: Change ALL credentials before deploying to production.
     * This seeder is for local development only.
     *
     * Safe to run multiple times — uses updateOrCreate on email.
     */
    public function run(): void
    {
        $password = env('ADMIN_PASSWORD');

        if (empty($password)) {
            throw new RuntimeException(
                'ADMIN_PASSWORD must be set in .env before running AdminUserSeeder. '.
                'Do not deploy with a blank or default password.'
            );
        }

        User::updateOrCreate(
            ['email' => env('ADMIN_EMAIL', 'admin@sekolah.test')],
            [
                'name' => env('ADMIN_NAME', 'Administrator'),
                'password' => $password,
            ]
        );
    }
}
