<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdateSchoolProfileRequest;
use App\Models\SchoolProfile;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class SchoolProfileController extends Controller
{
    /**
     * Show the school profile edit form.
     */
    public function edit(): Response
    {
        $profile = SchoolProfile::firstOrNew(['id' => 1]);

        return Inertia::render('Admin/SchoolProfile', [
            'profile' => $profile,
        ]);
    }

    /**
     * Update the school profile.
     */
    public function update(UpdateSchoolProfileRequest $request): RedirectResponse
    {
        SchoolProfile::updateOrCreate(
            ['id' => 1],
            $request->validated()
        );

        return redirect()
            ->route('admin.school-profile')
            ->with('success', 'Profil sekolah berhasil diperbarui.');
    }
}
