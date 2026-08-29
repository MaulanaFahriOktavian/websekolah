<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\News;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class NewsController extends Controller
{
    /**
     * Display a listing of published news.
     */
    public function index(Request $request): Response
    {
        $categorySlug = $request->query('kategori');
        $search = $request->query('cari');

        $news = News::published()
            ->with(['category', 'author'])
            ->when($categorySlug, function ($query, $categorySlug) {
                $query->whereHas('category', function ($q) use ($categorySlug) {
                    $q->where('slug', $categorySlug);
                });
            })
            ->when($search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('title', 'like', "%{$search}%")
                        ->orWhere('excerpt', 'like', "%{$search}%");
                });
            })
            ->latest('published_at')
            ->paginate(9)
            ->withQueryString();

        $categories = Category::active()
            ->withCount(['news' => function ($query) {
                $query->published();
            }])
            ->get(['id', 'name', 'slug', 'news_count']);

        return Inertia::render('Public/News/Index', [
            'news' => $news,
            'categories' => $categories,
            'filters' => [
                'kategori' => $categorySlug,
                'cari' => $search,
            ],
        ]);
    }

    /**
     * Display the specified news article.
     */
    public function show(News $news): Response
    {
        if ($news->status !== 'published' || ! $news->published_at || $news->published_at->isFuture()) {
            abort(404);
        }

        $news->load(['category', 'author']);

        $latestNews = News::published()
            ->where('id', '!=', $news->id)
            ->with('category')
            ->latest('published_at')
            ->take(4)
            ->get(['id', 'title', 'slug', 'featured_image', 'published_at', 'category_id']);

        return Inertia::render('Public/News/Show', [
            'article' => $news,
            'latestNews' => $latestNews,
        ]);
    }
}
