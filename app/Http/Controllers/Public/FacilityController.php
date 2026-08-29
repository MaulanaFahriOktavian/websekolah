<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Facility;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class FacilityController extends Controller
{
    /**
     * Display a listing of active facilities.
     */
    public function index(Request $request): Response
    {
        $search = $request->query('cari');

        $facilities = Facility::active()
            ->when($search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                        ->orWhere('description', 'like', "%{$search}%");
                });
            })
            ->paginate(12)
            ->withQueryString();

        return Inertia::render('Public/Facilities/Index', [
            'facilities' => $facilities,
            'filters' => [
                'cari' => $search,
            ],
        ]);
    }

    /**
     * Display the specified active facility detail.
     */
    public function show(Facility $facility): Response
    {
        if (! $facility->is_active) {
            abort(404);
        }

        $otherFacilities = Facility::active()
            ->where('id', '!=', $facility->id)
            ->take(4)
            ->get(['id', 'name', 'slug', 'capacity', 'photo']);

        return Inertia::render('Public/Facilities/Show', [
            'facility' => $facility,
            'otherFacilities' => $otherFacilities,
        ]);
    }
}
