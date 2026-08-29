<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Facility extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'slug',
        'description',
        'capacity',
        'photo',
        'sort_order',
        'is_active',
    ];

    /**
     * The attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'capacity' => 'integer',
            'sort_order' => 'integer',
            'is_active' => 'boolean',
        ];
    }

    /**
     * Scope to filter active facilities ordered by sort_order and name.
     */
    public function scopeActive(Builder $query): Builder
    {
        return $query->where('is_active', true)
            ->orderBy('sort_order', 'asc')
            ->orderBy('name', 'asc');
    }

    /**
     * Generate a deterministic unique slug.
     */
    public static function generateUniqueSlug(string $name, ?int $ignoreId = null): string
    {
        $baseSlug = Str::slug($name);
        $slug = $baseSlug ?: 'fasilitas';
        $counter = 1;

        while (static::where('slug', $slug)->when($ignoreId, fn ($q) => $q->where('id', '!=', $ignoreId))->exists()) {
            $slug = "{$baseSlug}-{$counter}";
            $counter++;
        }

        return $slug;
    }
}
