<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdateSchoolProfileRequest;
use App\Models\SchoolProfile;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class SchoolProfileController extends Controller
{
    /**
     * Allowed image fields that can be cleared via destroyImage().
     */
    private const CLEARABLE_IMAGE_FIELDS = [
        'logo_path',
        'favicon_path',
        'hero_image_path',
        'principal_photo_path',
    ];

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
     * Update the school profile, handling file uploads with disk lifecycle.
     */
    public function update(UpdateSchoolProfileRequest $request): RedirectResponse
    {
        $profile = SchoolProfile::firstOrNew(['id' => 1]);

        $data = $request->safe()->except(['logo', 'favicon', 'hero_image', 'principal_photo']);

        // Handle logo upload
        if ($request->hasFile('logo')) {
            $data['logo_path'] = $this->replaceFile(
                $request->file('logo'),
                $profile->logo_path,
                'school'
            );
        }

        // Handle favicon upload
        if ($request->hasFile('favicon')) {
            $data['favicon_path'] = $this->replaceFile(
                $request->file('favicon'),
                $profile->favicon_path,
                'school'
            );
        }

        // Handle hero image upload
        if ($request->hasFile('hero_image')) {
            $data['hero_image_path'] = $this->replaceFile(
                $request->file('hero_image'),
                $profile->hero_image_path,
                'school'
            );
        }

        // Handle principal photo upload
        if ($request->hasFile('principal_photo')) {
            $data['principal_photo_path'] = $this->replaceFile(
                $request->file('principal_photo'),
                $profile->principal_photo_path,
                'school'
            );
        }

        $profile->fill($data);
        $profile->save();

        return redirect()
            ->route('admin.school-profile')
            ->with('success', 'Profil sekolah berhasil diperbarui.');
    }

    /**
     * Clear a specific image field — deletes file from disk and nulls the DB column.
     */
    public function destroyImage(Request $request, string $field): RedirectResponse
    {
        if (! in_array($field, self::CLEARABLE_IMAGE_FIELDS)) {
            abort(422, 'Field gambar tidak dikenal.');
        }

        $profile = SchoolProfile::firstOrNew(['id' => 1]);

        if ($profile->$field && Storage::disk('public')->exists($profile->$field)) {
            Storage::disk('public')->delete($profile->$field);
        }

        $profile->$field = null;
        $profile->save();

        return back()->with('success', 'Gambar berhasil dihapus.');
    }

    /**
     * Store a new file and delete the old one from the public disk.
     */
    private function replaceFile(
        UploadedFile $newFile,
        ?string $oldPath,
        string $directory
    ): string {
        if ($oldPath && Storage::disk('public')->exists($oldPath)) {
            Storage::disk('public')->delete($oldPath);
        }

        return $newFile->store($directory, 'public');
    }
}
