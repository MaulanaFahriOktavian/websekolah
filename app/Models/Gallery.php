<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class Gallery extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'title',
        'slug',
        'description',
        'cover_photo',
        'event_date',
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
            'event_date' => 'date:Y-m-d',
            'sort_order' => 'integer',
            'is_active' => 'boolean',
        ];
    }

    /**
     * Photos belonging to this gallery album.
     */
    public function photos(): HasMany
    {
        return $this->hasMany(GalleryPhoto::class)->orderBy('sort_order', 'asc');
    }

    /**
     * Scope to filter active galleries ordered deterministically.
     */
    public function scopeActive(Builder $query): Builder
    {
        return $query->where('is_active', true)
            ->orderBy('sort_order', 'asc')
            ->orderBy('event_date', 'desc')
            ->orderBy('title', 'asc');
    }

    /**
     * Helper to get effective cover photo (explicit cover or first photo in gallery).
     */
    public function getEffectiveCoverAttribute(): ?string
    {
        if ($this->cover_photo) {
            return $this->cover_photo;
        }

        return $this->photos->first()?->photo_path;
    }

    /**
     * Generate a deterministic unique slug.
     */
    public static function generateUniqueSlug(string $title, ?int $ignoreId = null): string
    {
        $baseSlug = Str::slug($title);
        $slug = $baseSlug ?: 'galeri';
        $counter = 1;

        while (static::where('slug', $slug)->when($ignoreId, fn ($q) => $q->where('id', '!=', $ignoreId))->exists()) {
            $slug = "{$baseSlug}-{$counter}";
            $counter++;
        }

        return $slug;
    }
}
