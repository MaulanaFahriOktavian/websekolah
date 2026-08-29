<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreTeacherRequest;
use App\Http\Requests\Admin\UpdateTeacherRequest;
use App\Models\Teacher;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class TeacherController extends Controller
{
    /**
     * Display a listing of teachers.
     */
    public function index(Request $request): Response
    {
        $search = $request->query('search');
        $status = $request->query('status');

        $teachers = Teacher::query()
            ->when($search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                        ->orWhere('nip', 'like', "%{$search}%")
                        ->orWhere('position', 'like', "%{$search}%")
                        ->orWhere('subject', 'like', "%{$search}%");
                });
            })
            ->when($status !== null && $status !== '', function ($query) use ($status) {
                $query->where('is_active', $status === '1' || $status === 'active');
            })
            ->orderBy('sort_order', 'asc')
            ->orderBy('name', 'asc')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Admin/Teachers/Index', [
            'teachers' => $teachers,
            'filters' => [
                'search' => $search,
                'status' => $status,
            ],
        ]);
    }

    /**
     * Show the form for creating a new teacher.
     */
    public function create(): Response
    {
        return Inertia::render('Admin/Teachers/Create');
    }

    /**
     * Store a newly created teacher in storage.
     */
    public function store(StoreTeacherRequest $request): RedirectResponse
    {
        $validated = $request->validated();
        $validated['is_active'] = $request->boolean('is_active', true);
        $validated['sort_order'] = $validated['sort_order'] ?? 0;

        if ($request->hasFile('photo')) {
            $validated['photo'] = $request->file('photo')->store('teachers', 'public');
        }

        Teacher::create($validated);

        return redirect()->route('admin.teachers.index')
            ->with('success', 'Data guru berhasil ditambahkan.');
    }

    /**
     * Show the form for editing the specified teacher.
     */
    public function edit(Teacher $teacher): Response
    {
        return Inertia::render('Admin/Teachers/Edit', [
            'teacher' => $teacher,
        ]);
    }

    /**
     * Update the specified teacher in storage.
     */
    public function update(UpdateTeacherRequest $request, Teacher $teacher): RedirectResponse
    {
        $validated = $request->validated();
        $validated['is_active'] = $request->boolean('is_active', true);
        $validated['sort_order'] = $validated['sort_order'] ?? 0;

        if ($request->hasFile('photo')) {
            $newPhoto = $request->file('photo')->store('teachers', 'public');
            if ($teacher->photo && Storage::disk('public')->exists($teacher->photo)) {
                Storage::disk('public')->delete($teacher->photo);
            }
            $validated['photo'] = $newPhoto;
        }

        $teacher->update($validated);

        return redirect()->route('admin.teachers.index')
            ->with('success', 'Data guru berhasil diperbarui.');
    }

    /**
     * Remove the specified teacher from storage.
     */
    public function destroy(Teacher $teacher): RedirectResponse
    {
        if ($teacher->photo && Storage::disk('public')->exists($teacher->photo)) {
            Storage::disk('public')->delete($teacher->photo);
        }

        $teacher->delete();

        return redirect()->route('admin.teachers.index')
            ->with('success', 'Data guru berhasil dihapus.');
    }
}
