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
        'name',
        'short_name',
        'npsn',
        'level',
        'status',
        'address',
        'phone',
        'email',
        'website',
        'logo_path',
        'favicon_path',
        'founded_year',
        'accreditation',
        'principal_name',
        'principal_photo_path',
        'vision',
        'mission',
        'history',
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
        ];
    }
}
