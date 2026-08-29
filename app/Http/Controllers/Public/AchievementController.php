<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Achievement;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AchievementController extends Controller
{
    /**
     * Display a listing of active achievements.
     */
    public function index(Request $request): Response
    {
        $search = $request->query('cari');
        $category = $request->query('kategori');
        $year = $request->query('tahun');

        $achievements = Achievement::active()
            ->when($search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('title', 'like', "%{$search}%")
                        ->orWhere('recipient', 'like', "%{$search}%")
                        ->orWhere('description', 'like', "%{$search}%");
                });
            })
            ->when($category, fn ($query, $category) => $query->where('category', $category))
            ->when($year, fn ($query, $year) => $query->where('year', $year))
            ->paginate(12)
            ->withQueryString();

        $categories = Achievement::where('is_active', true)
            ->whereNotNull('category')
            ->distinct()
            ->pluck('category');

        $years = Achievement::where('is_active', true)
            ->whereNotNull('year')
            ->distinct()
            ->orderBy('year', 'desc')
            ->pluck('year');

        return Inertia::render('Public/Achievements/Index', [
            'achievements' => $achievements,
            'categories' => $categories,
            'years' => $years,
            'filters' => [
                'cari' => $search,
                'kategori' => $category,
                'tahun' => $year,
            ],
        ]);
    }

    /**
     * Display the specified active achievement.
     */
    public function show(Achievement $achievement): Response
    {
        if (! $achievement->is_active) {
            abort(404);
        }

        $relatedAchievements = Achievement::active()
            ->where('id', '!=', $achievement->id)
            ->when($achievement->category, fn ($q) => $q->where('category', $achievement->category))
            ->take(4)
            ->get();

        return Inertia::render('Public/Achievements/Show', [
            'achievement' => $achievement,
            'relatedAchievements' => $relatedAchievements,
        ]);
    }
}
