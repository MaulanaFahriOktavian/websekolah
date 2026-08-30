<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\SchoolProfile;
use Inertia\Inertia;
use Inertia\Response;

class AboutController extends Controller
{
    /**
     * Display the public About / School Profile page.
     *
     * Full profile is loaded here for page-specific fields
     * (history, description, principal_greeting, principal_photo_path)
     * that are not included in the shared Inertia props.
     */
    public function index(): Response
    {
        $profile = SchoolProfile::first();

        return Inertia::render('Public/About/Index', [
            'profile' => $profile ? [
                'name' => $profile->name,
                'short_name' => $profile->short_name,
                'npsn' => $profile->npsn,
                'level' => $profile->level,
                'status' => $profile->status,
                'tagline' => $profile->tagline,
                'description' => $profile->description,
                'logo_path' => $profile->logo_path,
                'hero_image_path' => $profile->hero_image_path,
                'founded_year' => $profile->founded_year,
                'accreditation' => $profile->accreditation,
                'principal_name' => $profile->principal_name,
                'principal_photo_path' => $profile->principal_photo_path,
                'principal_greeting' => $profile->principal_greeting,
                'history' => $profile->history,
                'vision' => $profile->vision,
                'mission' => $profile->mission,
            ] : null,
        ]);
    }
}
