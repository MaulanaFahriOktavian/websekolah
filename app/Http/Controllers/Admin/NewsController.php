<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreNewsRequest;
use App\Http\Requests\Admin\UpdateNewsRequest;
use App\Models\Category;
use App\Models\News;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class NewsController extends Controller
{
    /**
     * Display a listing of the news.
     */
    public function index(Request $request): Response
    {
        $search = $request->query('search');
        $categoryId = $request->query('category_id');
        $status = $request->query('status');

        $news = News::query()
            ->with(['category', 'author'])
            ->when($search, function ($query, $search) {
                $query->where('title', 'like', "%{$search}%");
            })
            ->when($categoryId, function ($query, $categoryId) {
                $query->where('category_id', $categoryId);
            })
            ->when($status, function ($query, $status) {
                $query->where('status', $status);
            })
            ->latest('id')
            ->paginate(10)
            ->withQueryString();

        $categories = Category::active()->get(['id', 'name']);

        return Inertia::render('Admin/News/Index', [
            'news' => $news,
            'categories' => $categories,
            'filters' => [
                'search' => $search,
                'category_id' => $categoryId,
                'status' => $status,
            ],
        ]);
    }

    /**
     * Show the form for creating a new news article.
     */
    public function create(): Response
    {
        $categories = Category::active()->get(['id', 'name']);

        return Inertia::render('Admin/News/Create', [
            'categories' => $categories,
        ]);
    }

    /**
     * Store a newly created news article in storage.
     */
    public function store(StoreNewsRequest $request): RedirectResponse
    {
        $validated = $request->validated();
        $validated['author_id'] = $request->user()->id;
        $validated['slug'] = News::generateUniqueSlug($validated['title']);

        if ($request->hasFile('featured_image')) {
            $path = $request->file('featured_image')->store('news', 'public');
            $validated['featured_image'] = $path;
        }

        if ($validated['status'] === 'published' && empty($validated['published_at'])) {
            $validated['published_at'] = now();
        }

        News::create($validated);

        return redirect()->route('admin.news.index')
            ->with('success', 'Berita berhasil ditambahkan.');
    }

    /**
     * Show the form for editing the specified news article.
     */
    public function edit(News $news): Response
    {
        $categories = Category::active()->get(['id', 'name']);

        return Inertia::render('Admin/News/Edit', [
            'news' => $news,
            'categories' => $categories,
        ]);
    }

    /**
     * Update the specified news article in storage.
     */
    public function update(UpdateNewsRequest $request, News $news): RedirectResponse
    {
        $validated = $request->validated();

        if ($validated['title'] !== $news->title) {
            $validated['slug'] = News::generateUniqueSlug($validated['title'], $news->id);
        }

        if ($request->hasFile('featured_image')) {
            $newPath = $request->file('featured_image')->store('news', 'public');
            if ($news->featured_image && Storage::disk('public')->exists($news->featured_image)) {
                Storage::disk('public')->delete($news->featured_image);
            }
            $validated['featured_image'] = $newPath;
        }

        if ($validated['status'] === 'published' && empty($validated['published_at'])) {
            $validated['published_at'] = $news->published_at ?? now();
        }

        $news->update($validated);

        return redirect()->route('admin.news.index')
            ->with('success', 'Berita berhasil diperbarui.');
    }

    /**
     * Remove the specified news article from storage.
     */
    public function destroy(News $news): RedirectResponse
    {
        if ($news->featured_image && Storage::disk('public')->exists($news->featured_image)) {
            Storage::disk('public')->delete($news->featured_image);
        }

        $news->delete();

        return redirect()->route('admin.news.index')
            ->with('success', 'Berita berhasil dihapus.');
    }
}
