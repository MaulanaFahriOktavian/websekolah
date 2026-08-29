<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Teacher;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TeacherController extends Controller
{
    /**
     * Display a listing of active teachers for the public directory.
     */
    public function index(Request $request): Response
    {
        $search = $request->query('cari');

        $teachers = Teacher::active()
            ->when($search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                        ->orWhere('position', 'like', "%{$search}%")
                        ->orWhere('subject', 'like', "%{$search}%");
                });
            })
            ->paginate(12)
            ->through(fn ($teacher) => [
                'id' => $teacher->id,
                'name' => $teacher->name,
                'position' => $teacher->position,
                'subject' => $teacher->subject,
                'education' => $teacher->education,
                'photo' => $teacher->photo,
                'bio' => $teacher->bio,
            ])
            ->withQueryString();

        return Inertia::render('Public/Teachers/Index', [
            'teachers' => $teachers,
            'filters' => [
                'cari' => $search,
            ],
        ]);
    }
}
