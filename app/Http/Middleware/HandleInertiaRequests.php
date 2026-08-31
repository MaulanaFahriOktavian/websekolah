<?php

namespace App\Http\Middleware;

use App\Models\SchoolProfile;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                // Only expose non-sensitive fields to the frontend
                'user' => $request->user() ? [
                    'id' => $request->user()->id,
                    'name' => $request->user()->name,
                ] : null,
            ],
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
                'error' => fn () => $request->session()->get('error'),
                'info' => fn () => $request->session()->get('info'),
            ],
            'school' => fn () => $this->resolveSchoolProfile(),
        ];
    }

    /**
     * Resolve the single school profile for shared Inertia state.
     *
     * Uses once() to avoid duplicate queries within the same request lifecycle.
     * Falls back gracefully if the table does not yet exist (e.g., pre-migration).
     */
    private function resolveSchoolProfile(): ?array
    {
        try {
            $profile = once(fn () => SchoolProfile::first());

            if (! $profile) {
                return null;
            }

            // Keep the legacy flat fields for backward compatibility with existing code,
            // while also exposing the nested structure expected by the public layout and UI.
            $contact = [
                'address' => $profile->address,
                'phone' => $profile->phone,
                'email' => $profile->email,
                'website' => $profile->website,
                'office_hours' => null,
            ];

            $social = [
                'facebook' => $profile->facebook_url,
                'instagram' => $profile->instagram_url,
                'youtube' => $profile->youtube_url,
                'tiktok' => $profile->tiktok_url,
                'twitter' => null,
            ];

            $seo = [
                'meta_description' => $profile->tagline ?: ($profile->description ?: 'Website resmi sekolah.'),
                'meta_keywords' => null,
            ];

            return [
                'name' => $profile->name,
                'short_name' => $profile->short_name,
                'npsn' => $profile->npsn,
                'level' => $profile->level,
                'status' => $profile->status,
                'tagline' => $profile->tagline,
                'address' => $profile->address,
                'phone' => $profile->phone,
                'email' => $profile->email,
                'website' => $profile->website,
                'logo_path' => $profile->logo_path,
                'favicon_path' => $profile->favicon_path,
                'hero_image_path' => $profile->hero_image_path,
                'founded_year' => $profile->founded_year,
                'established_year' => $profile->founded_year,
                'accreditation' => $profile->accreditation,
                'principal_name' => $profile->principal_name,
                'vision' => $profile->vision,
                'mission' => $profile->mission,
                'maps_url' => $profile->maps_url,
                'facebook_url' => $profile->facebook_url,
                'instagram_url' => $profile->instagram_url,
                'youtube_url' => $profile->youtube_url,
                'tiktok_url' => $profile->tiktok_url,
                'contact' => $contact,
                'social' => $social,
                'seo' => $seo,
            ];
        } catch (QueryException) {
            // Table does not exist yet — return null gracefully
            return null;
        }
    }
}
