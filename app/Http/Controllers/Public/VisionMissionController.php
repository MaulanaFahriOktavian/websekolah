<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\SchoolProfile;
use Inertia\Inertia;
use Inertia\Response;

class VisionMissionController extends Controller
{
    /**
     * Display the public Vision & Mission page.
     */
    public function index(): Response
    {
        $profile = SchoolProfile::first();

        return Inertia::render('Public/VisionMission/Index', [
            'profile' => $profile ? [
                'name' => $profile->name,
                'tagline' => $profile->tagline,
                'vision' => $profile->vision,
                'mission' => $profile->mission,
            ] : null,
        ]);
    }
}
