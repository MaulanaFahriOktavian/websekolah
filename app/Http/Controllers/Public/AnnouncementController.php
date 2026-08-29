<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Announcement;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AnnouncementController extends Controller
{
    /**
     * Display a listing of active announcements.
     */
    public function index(Request $request): Response
    {
        $search = $request->query('cari');

        $announcements = Announcement::active()
            ->with('author')
            ->when($search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('title', 'like', "%{$search}%")
                        ->orWhere('content', 'like', "%{$search}%");
                });
            })
            ->latest('published_at')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Public/Announcements/Index', [
            'announcements' => $announcements,
            'filters' => [
                'cari' => $search,
            ],
        ]);
    }

    /**
     * Display the specified active announcement.
     */
    public function show(Announcement $announcement): Response
    {
        if ($announcement->status !== 'published' || ! $announcement->published_at || $announcement->published_at->isFuture()) {
            abort(404);
        }

        if ($announcement->expires_at && $announcement->expires_at->isPast()) {
            abort(404);
        }

        $announcement->load('author');

        $latestAnnouncements = Announcement::active()
            ->where('id', '!=', $announcement->id)
            ->latest('published_at')
            ->take(4)
            ->get(['id', 'title', 'slug', 'published_at', 'expires_at']);

        return Inertia::render('Public/Announcements/Show', [
            'announcement' => $announcement,
            'latestAnnouncements' => $latestAnnouncements,
        ]);
    }
}
