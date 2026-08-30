<?php

use App\Http\Controllers\Admin\AchievementController as AdminAchievementController;
use App\Http\Controllers\Admin\AnnouncementController as AdminAnnouncementController;
use App\Http\Controllers\Admin\CategoryController as AdminCategoryController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\FacilityController as AdminFacilityController;
use App\Http\Controllers\Admin\GalleryController as AdminGalleryController;
use App\Http\Controllers\Admin\NewsController as AdminNewsController;
use App\Http\Controllers\Admin\SchoolProfileController;
use App\Http\Controllers\Admin\StaffController as AdminStaffController;
use App\Http\Controllers\Admin\TeacherController as AdminTeacherController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Public\AboutController;
use App\Http\Controllers\Public\AchievementController as PublicAchievementController;
use App\Http\Controllers\Public\AnnouncementController as PublicAnnouncementController;
use App\Http\Controllers\Public\ContactController;
use App\Http\Controllers\Public\FacilityController as PublicFacilityController;
use App\Http\Controllers\Public\GalleryController as PublicGalleryController;
use App\Http\Controllers\Public\HomeController;
use App\Http\Controllers\Public\NewsController as PublicNewsController;
use App\Http\Controllers\Public\StaffController as PublicStaffController;
use App\Http\Controllers\Public\TeacherController as PublicTeacherController;
use App\Http\Controllers\Public\VisionMissionController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
|
| Public-facing routes for visitors, students, and parents.
|
*/
Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/tentang', [AboutController::class, 'index'])->name('about.index');
Route::get('/visi-misi', [VisionMissionController::class, 'index'])->name('vision-mission.index');
Route::get('/kontak', [ContactController::class, 'index'])->name('contact.index');
Route::get('/berita', [PublicNewsController::class, 'index'])->name('news.index');
Route::get('/berita/{news:slug}', [PublicNewsController::class, 'show'])->name('news.show');
Route::get('/pengumuman', [PublicAnnouncementController::class, 'index'])->name('announcements.index');
Route::get('/pengumuman/{announcement:slug}', [PublicAnnouncementController::class, 'show'])->name('announcements.show');
Route::get('/guru', [PublicTeacherController::class, 'index'])->name('teachers.index');
Route::get('/staf', [PublicStaffController::class, 'index'])->name('staff.index');
Route::get('/fasilitas', [PublicFacilityController::class, 'index'])->name('facilities.index');
Route::get('/fasilitas/{facility:slug}', [PublicFacilityController::class, 'show'])->name('facilities.show');
Route::get('/prestasi', [PublicAchievementController::class, 'index'])->name('achievements.index');
Route::get('/prestasi/{achievement:slug}', [PublicAchievementController::class, 'show'])->name('achievements.show');
Route::get('/galeri', [PublicGalleryController::class, 'index'])->name('galleries.index');
Route::get('/galeri/{gallery:slug}', [PublicGalleryController::class, 'show'])->name('galleries.show');

/*
|--------------------------------------------------------------------------
| Authentication Routes
|--------------------------------------------------------------------------
|
| Login and logout routes. Login is guest-only (redirects if authed).
|
*/
Route::middleware('guest')->group(function () {
    Route::get('/login', [LoginController::class, 'showLogin'])->name('login');
    Route::post('/login', [LoginController::class, 'login']);
});

Route::post('/logout', [LoginController::class, 'logout'])
    ->middleware('auth')
    ->name('logout');

/*
|--------------------------------------------------------------------------
| Admin CMS Routes
|--------------------------------------------------------------------------
|
| Back-office administrative routes. All require authentication.
| Unauthenticated users are redirected to /login.
|
*/
Route::prefix('admin')->name('admin.')->middleware('auth')->group(function () {
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/dashboard', [DashboardController::class, 'index']);

    // School Profile — keep PUT for compatibility with feature tests; support multipart upload via POST + _method=PUT.
    Route::get('/school-profile', [SchoolProfileController::class, 'edit'])->name('school-profile');
    Route::put('/school-profile', [SchoolProfileController::class, 'update'])->name('school-profile.update');
    Route::post('/school-profile', [SchoolProfileController::class, 'update'])->name('school-profile.update.post');
    Route::delete('/school-profile/image/{field}', [SchoolProfileController::class, 'destroyImage'])
        ->name('school-profile.image.destroy');

    Route::resource('categories', AdminCategoryController::class)->except(['show']);
    Route::resource('news', AdminNewsController::class)->except(['show']);
    Route::resource('announcements', AdminAnnouncementController::class)->except(['show']);
    Route::resource('teachers', AdminTeacherController::class)->except(['show']);
    Route::resource('staff', AdminStaffController::class)->except(['show']);
    Route::resource('facilities', AdminFacilityController::class)->except(['show']);
    Route::resource('achievements', AdminAchievementController::class)->except(['show']);

    Route::resource('galleries', AdminGalleryController::class)->except(['show']);
    Route::delete('galleries/photos/{photo}', [AdminGalleryController::class, 'destroyPhoto'])->name('galleries.photos.destroy');
});
