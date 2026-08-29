<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreStaffRequest;
use App\Http\Requests\Admin\UpdateStaffRequest;
use App\Models\Staff;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class StaffController extends Controller
{
    /**
     * Display a listing of staff members.
     */
    public function index(Request $request): Response
    {
        $search = $request->query('search');
        $status = $request->query('status');

        $staff = Staff::query()
            ->when($search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                        ->orWhere('nip', 'like', "%{$search}%")
                        ->orWhere('position', 'like', "%{$search}%");
                });
            })
            ->when($status !== null && $status !== '', function ($query) use ($status) {
                $query->where('is_active', $status === '1' || $status === 'active');
            })
            ->orderBy('sort_order', 'asc')
            ->orderBy('name', 'asc')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Admin/Staff/Index', [
            'staff' => $staff,
            'filters' => [
                'search' => $search,
                'status' => $status,
            ],
        ]);
    }

    /**
     * Show the form for creating a new staff member.
     */
    public function create(): Response
    {
        return Inertia::render('Admin/Staff/Create');
    }

    /**
     * Store a newly created staff member in storage.
     */
    public function store(StoreStaffRequest $request): RedirectResponse
    {
        $validated = $request->validated();
        $validated['is_active'] = $request->boolean('is_active', true);
        $validated['sort_order'] = $validated['sort_order'] ?? 0;

        if ($request->hasFile('photo')) {
            $validated['photo'] = $request->file('photo')->store('staff', 'public');
        }

        Staff::create($validated);

        return redirect()->route('admin.staff.index')
            ->with('success', 'Data tenaga kependidikan berhasil ditambahkan.');
    }

    /**
     * Show the form for editing the specified staff member.
     */
    public function edit(Staff $staff): Response
    {
        return Inertia::render('Admin/Staff/Edit', [
            'staff' => $staff,
        ]);
    }

    /**
     * Update the specified staff member in storage.
     */
    public function update(UpdateStaffRequest $request, Staff $staff): RedirectResponse
    {
        $validated = $request->validated();
        $validated['is_active'] = $request->boolean('is_active', true);
        $validated['sort_order'] = $validated['sort_order'] ?? 0;

        if ($request->hasFile('photo')) {
            $newPhoto = $request->file('photo')->store('staff', 'public');
            if ($staff->photo && Storage::disk('public')->exists($staff->photo)) {
                Storage::disk('public')->delete($staff->photo);
            }
            $validated['photo'] = $newPhoto;
        }

        $staff->update($validated);

        return redirect()->route('admin.staff.index')
            ->with('success', 'Data tenaga kependidikan berhasil diperbarui.');
    }

    /**
     * Remove the specified staff member from storage.
     */
    public function destroy(Staff $staff): RedirectResponse
    {
        if ($staff->photo && Storage::disk('public')->exists($staff->photo)) {
            Storage::disk('public')->delete($staff->photo);
        }

        $staff->delete();

        return redirect()->route('admin.staff.index')
            ->with('success', 'Data tenaga kependidikan berhasil dihapus.');
    }
}
