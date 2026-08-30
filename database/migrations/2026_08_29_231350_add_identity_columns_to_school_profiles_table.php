<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * This migration is purely ADDITIVE. It only adds new nullable columns
     * to the existing school_profiles table. Existing data and columns are
     * completely untouched.
     */
    public function up(): void
    {
        Schema::table('school_profiles', function (Blueprint $table) {
            // Extended identity
            $table->string('tagline', 255)->nullable()->after('status');
            $table->text('description')->nullable()->after('tagline');

            // Hero branding
            $table->string('hero_image_path', 500)->nullable()->after('favicon_path');

            // Principal message
            $table->text('principal_greeting')->nullable()->after('principal_photo_path');

            // Geolocation
            $table->decimal('latitude', 10, 8)->nullable()->after('history');
            $table->decimal('longitude', 11, 8)->nullable()->after('latitude');
            $table->string('maps_url', 500)->nullable()->after('longitude');

            // Social media
            $table->string('facebook_url', 500)->nullable()->after('maps_url');
            $table->string('instagram_url', 500)->nullable()->after('facebook_url');
            $table->string('youtube_url', 500)->nullable()->after('instagram_url');
            $table->string('tiktok_url', 500)->nullable()->after('youtube_url');
        });
    }

    /**
     * Reverse the migrations.
     *
     * Only drops the columns added by this migration.
     */
    public function down(): void
    {
        Schema::table('school_profiles', function (Blueprint $table) {
            $table->dropColumn([
                'tagline',
                'description',
                'hero_image_path',
                'principal_greeting',
                'latitude',
                'longitude',
                'maps_url',
                'facebook_url',
                'instagram_url',
                'youtube_url',
                'tiktok_url',
            ]);
        });
    }
};
