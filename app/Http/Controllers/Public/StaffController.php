<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Staff;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class StaffController extends Controller
{
    /**
     * Display a listing of active staff members for the public directory.
     */
    public function index(Request $request): Response
    {
        $search = $request->query('cari');

        $staff = Staff::active()
            ->when($search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                        ->orWhere('position', 'like', "%{$search}%");
                });
            })
            ->paginate(12)
            ->through(fn ($member) => [
                'id' => $member->id,
                'name' => $member->name,
                'position' => $member->position,
                'education' => $member->education,
                'photo' => $member->photo,
                'bio' => $member->bio,
            ])
            ->withQueryString();

        return Inertia::render('Public/Staff/Index', [
            'staff' => $staff,
            'filters' => [
                'cari' => $search,
            ],
        ]);
    }
}
