<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Gallery;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class GalleryController extends Controller
{
    /**
     * Display a listing of active gallery albums.
     */
    public function index(Request $request): Response
    {
        $search = $request->query('cari');

        $galleries = Gallery::active()
            ->withCount('photos')
            ->with(['photos' => fn ($q) => $q->take(1)])
            ->when($search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('title', 'like', "%{$search}%")
                        ->orWhere('description', 'like', "%{$search}%");
                });
            })
            ->paginate(12)
            ->withQueryString();

        return Inertia::render('Public/Galleries/Index', [
            'galleries' => $galleries,
            'filters' => [
                'cari' => $search,
            ],
        ]);
    }

    /**
     * Display the specified active gallery album with lightbox photo data.
     */
    public function show(Gallery $gallery): Response
    {
        if (! $gallery->is_active) {
            abort(404);
        }

        $gallery->load('photos');

        $otherGalleries = Gallery::active()
            ->where('id', '!=', $gallery->id)
            ->withCount('photos')
            ->with(['photos' => fn ($q) => $q->take(1)])
            ->take(4)
            ->get();

        return Inertia::render('Public/Galleries/Show', [
            'gallery' => $gallery,
            'otherGalleries' => $otherGalleries,
        ]);
    }
}
