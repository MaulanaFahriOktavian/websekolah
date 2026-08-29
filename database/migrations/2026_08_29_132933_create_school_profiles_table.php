<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('school_profiles', function (Blueprint $table) {
            $table->id();

            // Identity
            $table->string('name');
            $table->string('short_name', 50)->nullable();
            $table->string('npsn', 10)->nullable();
            $table->string('level', 100)->nullable();
            $table->string('status', 100)->nullable();

            // Contact
            $table->text('address')->nullable();
            $table->string('phone', 30)->nullable();
            $table->string('email', 255)->nullable();
            $table->string('website', 255)->nullable();

            // Branding
            $table->string('logo_path', 500)->nullable();
            $table->string('favicon_path', 500)->nullable();

            // Academic info
            $table->unsignedSmallInteger('founded_year')->nullable();
            $table->string('accreditation', 10)->nullable();

            // Principal
            $table->string('principal_name', 255)->nullable();
            $table->string('principal_photo_path', 500)->nullable();

            // Content
            $table->text('vision')->nullable();
            $table->text('mission')->nullable();
            $table->text('history')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('school_profiles');
    }
};
