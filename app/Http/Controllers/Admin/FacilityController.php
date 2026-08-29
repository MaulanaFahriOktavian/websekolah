<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreFacilityRequest;
use App\Http\Requests\Admin\UpdateFacilityRequest;
use App\Models\Facility;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class FacilityController extends Controller
{
    /**
     * Display a listing of the facilities.
     */
    public function index(Request $request): Response
    {
        $search = $request->query('search');
        $status = $request->query('status');

        $facilities = Facility::query()
            ->when($search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                        ->orWhere('description', 'like', "%{$search}%");
                });
            })
            ->when($status !== null && $status !== '', function ($query) use ($status) {
                $query->where('is_active', $status === '1' || $status === 'active');
            })
            ->orderBy('sort_order', 'asc')
            ->orderBy('name', 'asc')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Admin/Facilities/Index', [
            'facilities' => $facilities,
            'filters' => [
                'search' => $search,
                'status' => $status,
            ],
        ]);
    }

    /**
     * Show the form for creating a new facility.
     */
    public function create(): Response
    {
        return Inertia::render('Admin/Facilities/Create');
    }

    /**
     * Store a newly created facility in storage.
     */
    public function store(StoreFacilityRequest $request): RedirectResponse
    {
        $validated = $request->validated();
        $validated['slug'] = Facility::generateUniqueSlug($validated['name']);
        $validated['is_active'] = $request->boolean('is_active', true);
        $validated['sort_order'] = $validated['sort_order'] ?? 0;

        if ($request->hasFile('photo')) {
            $validated['photo'] = $request->file('photo')->store('facilities', 'public');
        }

        Facility::create($validated);

        return redirect()->route('admin.facilities.index')
            ->with('success', 'Fasilitas berhasil ditambahkan.');
    }

    /**
     * Show the form for editing the specified facility.
     */
    public function edit(Facility $facility): Response
    {
        return Inertia::render('Admin/Facilities/Edit', [
            'facility' => $facility,
        ]);
    }

    /**
     * Update the specified facility in storage.
     */
    public function update(UpdateFacilityRequest $request, Facility $facility): RedirectResponse
    {
        $validated = $request->validated();

        if ($validated['name'] !== $facility->name) {
            $validated['slug'] = Facility::generateUniqueSlug($validated['name'], $facility->id);
        }

        $validated['is_active'] = $request->boolean('is_active', true);
        $validated['sort_order'] = $validated['sort_order'] ?? 0;

        if ($request->hasFile('photo')) {
            $newPhoto = $request->file('photo')->store('facilities', 'public');
            if ($facility->photo && Storage::disk('public')->exists($facility->photo)) {
                Storage::disk('public')->delete($facility->photo);
            }
            $validated['photo'] = $newPhoto;
        }

        $facility->update($validated);

        return redirect()->route('admin.facilities.index')
            ->with('success', 'Fasilitas berhasil diperbarui.');
    }

    /**
     * Remove the specified facility from storage.
     */
    public function destroy(Facility $facility): RedirectResponse
    {
        if ($facility->photo && Storage::disk('public')->exists($facility->photo)) {
            Storage::disk('public')->delete($facility->photo);
        }

        $facility->delete();

        return redirect()->route('admin.facilities.index')
            ->with('success', 'Fasilitas berhasil dihapus.');
    }
}
