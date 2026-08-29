<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreAnnouncementRequest;
use App\Http\Requests\Admin\UpdateAnnouncementRequest;
use App\Models\Announcement;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AnnouncementController extends Controller
{
    /**
     * Display a listing of the announcements.
     */
    public function index(Request $request): Response
    {
        $search = $request->query('search');
        $status = $request->query('status');

        $announcements = Announcement::query()
            ->with('author')
            ->when($search, function ($query, $search) {
                $query->where('title', 'like', "%{$search}%");
            })
            ->when($status, function ($query, $status) {
                $query->where('status', $status);
            })
            ->latest('id')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Admin/Announcements/Index', [
            'announcements' => $announcements,
            'filters' => [
                'search' => $search,
                'status' => $status,
            ],
        ]);
    }

    /**
     * Show the form for creating a new announcement.
     */
    public function create(): Response
    {
        return Inertia::render('Admin/Announcements/Create');
    }

    /**
     * Store a newly created announcement in storage.
     */
    public function store(StoreAnnouncementRequest $request): RedirectResponse
    {
        $validated = $request->validated();
        $validated['author_id'] = $request->user()->id;
        $validated['slug'] = Announcement::generateUniqueSlug($validated['title']);

        if ($validated['status'] === 'published' && empty($validated['published_at'])) {
            $validated['published_at'] = now();
        }

        Announcement::create($validated);

        return redirect()->route('admin.announcements.index')
            ->with('success', 'Pengumuman berhasil ditambahkan.');
    }

    /**
     * Show the form for editing the specified announcement.
     */
    public function edit(Announcement $announcement): Response
    {
        return Inertia::render('Admin/Announcements/Edit', [
            'announcement' => $announcement,
        ]);
    }

    /**
     * Update the specified announcement in storage.
     */
    public function update(UpdateAnnouncementRequest $request, Announcement $announcement): RedirectResponse
    {
        $validated = $request->validated();

        if ($validated['title'] !== $announcement->title) {
            $validated['slug'] = Announcement::generateUniqueSlug($validated['title'], $announcement->id);
        }

        if ($validated['status'] === 'published' && empty($validated['published_at'])) {
            $validated['published_at'] = $announcement->published_at ?? now();
        }

        $announcement->update($validated);

        return redirect()->route('admin.announcements.index')
            ->with('success', 'Pengumuman berhasil diperbarui.');
    }

    /**
     * Remove the specified announcement from storage.
     */
    public function destroy(Announcement $announcement): RedirectResponse
    {
        $announcement->delete();

        return redirect()->route('admin.announcements.index')
            ->with('success', 'Pengumuman berhasil dihapus.');
    }
}
