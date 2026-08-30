<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\SchoolProfile;
use Inertia\Inertia;
use Inertia\Response;

class ContactController extends Controller
{
    /**
     * Display the public Contact page.
     */
    public function index(): Response
    {
        $profile = SchoolProfile::first();

        return Inertia::render('Public/Contact/Index', [
            'profile' => $profile ? [
                'name' => $profile->name,
                'address' => $profile->address,
                'phone' => $profile->phone,
                'email' => $profile->email,
                'website' => $profile->website,
                'latitude' => $profile->latitude,
                'longitude' => $profile->longitude,
                'maps_url' => $profile->maps_url,
                'facebook_url' => $profile->facebook_url,
                'instagram_url' => $profile->instagram_url,
                'youtube_url' => $profile->youtube_url,
                'tiktok_url' => $profile->tiktok_url,
            ] : null,
        ]);
    }
}
