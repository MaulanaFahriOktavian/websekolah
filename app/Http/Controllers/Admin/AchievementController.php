<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreAchievementRequest;
use App\Http\Requests\Admin\UpdateAchievementRequest;
use App\Models\Achievement;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class AchievementController extends Controller
{
    /**
     * Display a listing of achievements.
     */
    public function index(Request $request): Response
    {
        $search = $request->query('search');
        $category = $request->query('category');
        $level = $request->query('level');
        $year = $request->query('year');
        $status = $request->query('status');

        $achievements = Achievement::query()
            ->when($search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('title', 'like', "%{$search}%")
                        ->orWhere('recipient', 'like', "%{$search}%")
                        ->orWhere('description', 'like', "%{$search}%");
                });
            })
            ->when($category, fn ($query, $category) => $query->where('category', $category))
            ->when($level, fn ($query, $level) => $query->where('level', $level))
            ->when($year, fn ($query, $year) => $query->where('year', $year))
            ->when($status !== null && $status !== '', function ($query) use ($status) {
                $query->where('is_active', $status === '1' || $status === 'active');
            })
            ->orderBy('sort_order', 'asc')
            ->orderBy('achievement_date', 'desc')
            ->orderBy('title', 'asc')
            ->paginate(10)
            ->withQueryString();

        $categories = Achievement::whereNotNull('category')->distinct()->pluck('category');
        $levels = Achievement::whereNotNull('level')->distinct()->pluck('level');
        $years = Achievement::whereNotNull('year')->distinct()->orderBy('year', 'desc')->pluck('year');

        return Inertia::render('Admin/Achievements/Index', [
            'achievements' => $achievements,
            'categories' => $categories,
            'levels' => $levels,
            'years' => $years,
            'filters' => [
                'search' => $search,
                'category' => $category,
                'level' => $level,
                'year' => $year,
                'status' => $status,
            ],
        ]);
    }

    /**
     * Show the form for creating a new achievement.
     */
    public function create(): Response
    {
        return Inertia::render('Admin/Achievements/Create');
    }

    /**
     * Store a newly created achievement in storage.
     */
    public function store(StoreAchievementRequest $request): RedirectResponse
    {
        $validated = $request->validated();
        $validated['slug'] = Achievement::generateUniqueSlug($validated['title']);
        $validated['is_active'] = $request->boolean('is_active', true);
        $validated['sort_order'] = $validated['sort_order'] ?? 0;

        if ($request->hasFile('photo')) {
            $validated['photo'] = $request->file('photo')->store('achievements', 'public');
        }

        Achievement::create($validated);

        return redirect()->route('admin.achievements.index')
            ->with('success', 'Prestasi berhasil ditambahkan.');
    }

    /**
     * Show the form for editing the specified achievement.
     */
    public function edit(Achievement $achievement): Response
    {
        return Inertia::render('Admin/Achievements/Edit', [
            'achievement' => $achievement,
        ]);
    }

    /**
     * Update the specified achievement in storage.
     */
    public function update(UpdateAchievementRequest $request, Achievement $achievement): RedirectResponse
    {
        $validated = $request->validated();

        if ($validated['title'] !== $achievement->title) {
            $validated['slug'] = Achievement::generateUniqueSlug($validated['title'], $achievement->id);
        }

        $validated['is_active'] = $request->boolean('is_active', true);
        $validated['sort_order'] = $validated['sort_order'] ?? 0;

        if ($request->hasFile('photo')) {
            $newPhoto = $request->file('photo')->store('achievements', 'public');
            if ($achievement->photo && Storage::disk('public')->exists($achievement->photo)) {
                Storage::disk('public')->delete($achievement->photo);
            }
            $validated['photo'] = $newPhoto;
        }

        $achievement->update($validated);

        return redirect()->route('admin.achievements.index')
            ->with('success', 'Prestasi berhasil diperbarui.');
    }

    /**
     * Remove the specified achievement from storage.
     */
    public function destroy(Achievement $achievement): RedirectResponse
    {
        if ($achievement->photo && Storage::disk('public')->exists($achievement->photo)) {
            Storage::disk('public')->delete($achievement->photo);
        }

        $achievement->delete();

        return redirect()->route('admin.achievements.index')
            ->with('success', 'Prestasi berhasil dihapus.');
    }
}
