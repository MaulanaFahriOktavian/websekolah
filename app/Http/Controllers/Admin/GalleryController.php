<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreGalleryRequest;
use App\Http\Requests\Admin\UpdateGalleryRequest;
use App\Models\Gallery;
use App\Models\GalleryPhoto;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class GalleryController extends Controller
{
    /**
     * Display a listing of gallery albums.
     */
    public function index(Request $request): Response
    {
        $search = $request->query('search');
        $status = $request->query('status');

        $galleries = Gallery::query()
            ->withCount('photos')
            ->with(['photos' => fn ($q) => $q->take(1)])
            ->when($search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('title', 'like', "%{$search}%")
                        ->orWhere('description', 'like', "%{$search}%");
                });
            })
            ->when($status !== null && $status !== '', function ($query) use ($status) {
                $query->where('is_active', $status === '1' || $status === 'active');
            })
            ->orderBy('sort_order', 'asc')
            ->orderBy('event_date', 'desc')
            ->orderBy('title', 'asc')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Admin/Galleries/Index', [
            'galleries' => $galleries,
            'filters' => [
                'search' => $search,
                'status' => $status,
            ],
        ]);
    }

    /**
     * Show the form for creating a new gallery album.
     */
    public function create(): Response
    {
        return Inertia::render('Admin/Galleries/Create');
    }

    /**
     * Store a newly created gallery album in storage.
     */
    public function store(StoreGalleryRequest $request): RedirectResponse
    {
        $validated = $request->validated();
        $validated['slug'] = Gallery::generateUniqueSlug($validated['title']);
        $validated['is_active'] = $request->boolean('is_active', true);
        $validated['sort_order'] = $validated['sort_order'] ?? 0;

        if ($request->hasFile('cover_photo')) {
            $validated['cover_photo'] = $request->file('cover_photo')->store('galleries', 'public');
        }

        $gallery = Gallery::create($validated);

        // Upload multiple gallery photos if attached
        if ($request->hasFile('photos')) {
            $captions = $request->input('photo_captions', []);
            foreach ($request->file('photos') as $index => $file) {
                $path = $file->store('galleries', 'public');
                GalleryPhoto::create([
                    'gallery_id' => $gallery->id,
                    'photo_path' => $path,
                    'caption' => $captions[$index] ?? null,
                    'sort_order' => $index + 1,
                ]);
            }
        }

        return redirect()->route('admin.galleries.index')
            ->with('success', 'Album galeri berhasil dibuat.');
    }

    /**
     * Show the form for editing the specified gallery album.
     */
    public function edit(Gallery $gallery): Response
    {
        $gallery->load('photos');

        return Inertia::render('Admin/Galleries/Edit', [
            'gallery' => $gallery,
        ]);
    }

    /**
     * Update the specified gallery album in storage.
     */
    public function update(UpdateGalleryRequest $request, Gallery $gallery): RedirectResponse
    {
        $validated = $request->validated();

        if ($validated['title'] !== $gallery->title) {
            $validated['slug'] = Gallery::generateUniqueSlug($validated['title'], $gallery->id);
        }

        $validated['is_active'] = $request->boolean('is_active', true);
        $validated['sort_order'] = $validated['sort_order'] ?? 0;

        if ($request->hasFile('cover_photo')) {
            $newCover = $request->file('cover_photo')->store('galleries', 'public');
            if ($gallery->cover_photo && Storage::disk('public')->exists($gallery->cover_photo)) {
                Storage::disk('public')->delete($gallery->cover_photo);
            }
            $validated['cover_photo'] = $newCover;
        }

        $gallery->update($validated);

        // Update existing photo captions
        if ($request->has('existing_captions')) {
            foreach ($request->input('existing_captions') as $photoId => $caption) {
                GalleryPhoto::where('id', $photoId)
                    ->where('gallery_id', $gallery->id)
                    ->update(['caption' => $caption]);
            }
        }

        // Upload additional photos if provided
        if ($request->hasFile('photos')) {
            $captions = $request->input('photo_captions', []);
            $currentMaxOrder = $gallery->photos()->max('sort_order') ?? 0;
            foreach ($request->file('photos') as $index => $file) {
                $path = $file->store('galleries', 'public');
                GalleryPhoto::create([
                    'gallery_id' => $gallery->id,
                    'photo_path' => $path,
                    'caption' => $captions[$index] ?? null,
                    'sort_order' => $currentMaxOrder + $index + 1,
                ]);
            }
        }

        return redirect()->route('admin.galleries.index')
            ->with('success', 'Album galeri berhasil diperbarui.');
    }

    /**
     * Remove the specified gallery album from storage.
     */
    public function destroy(Gallery $gallery): RedirectResponse
    {
        // Delete cover photo
        if ($gallery->cover_photo && Storage::disk('public')->exists($gallery->cover_photo)) {
            Storage::disk('public')->delete($gallery->cover_photo);
        }

        // Delete all gallery photo files
        foreach ($gallery->photos as $photo) {
            if ($photo->photo_path && Storage::disk('public')->exists($photo->photo_path)) {
                Storage::disk('public')->delete($photo->photo_path);
            }
        }

        $gallery->delete();

        return redirect()->route('admin.galleries.index')
            ->with('success', 'Album galeri beserta seluruh fotonya berhasil dihapus.');
    }

    /**
     * Remove an individual photo from a gallery.
     */
    public function destroyPhoto(GalleryPhoto $photo): RedirectResponse
    {
        if ($photo->photo_path && Storage::disk('public')->exists($photo->photo_path)) {
            Storage::disk('public')->delete($photo->photo_path);
        }

        $photo->delete();

        return back()->with('success', 'Foto berhasil dihapus dari album.');
    }
}
