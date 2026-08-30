<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SchoolProfile extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        // Identity
        'name',
        'short_name',
        'npsn',
        'level',
        'status',
        'tagline',
        'description',

        // Contact
        'address',
        'phone',
        'email',
        'website',

        // Branding (file paths managed by controller upload lifecycle)
        'logo_path',
        'favicon_path',
        'hero_image_path',

        // Academic info
        'founded_year',
        'accreditation',

        // Principal
        'principal_name',
        'principal_photo_path',
        'principal_greeting',

        // Content
        'vision',
        'mission',
        'history',

        // Geolocation
        'latitude',
        'longitude',
        'maps_url',

        // Social media
        'facebook_url',
        'instagram_url',
        'youtube_url',
        'tiktok_url',
    ];

    /**
     * The attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'founded_year' => 'integer',
            'latitude' => 'decimal:8',
            'longitude' => 'decimal:8',
        ];
    }

    /**
     * Return only the non-null social media links as an associative array.
     *
     * @return array<string, string>
     */
    public function getSocialLinksAttribute(): array
    {
        return array_filter([
            'facebook' => $this->facebook_url,
            'instagram' => $this->instagram_url,
            'youtube' => $this->youtube_url,
            'tiktok' => $this->tiktok_url,
        ]);
    }
}
