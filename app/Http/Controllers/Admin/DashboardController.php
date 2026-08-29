<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Display the admin dashboard.
     *
     * School data is provided globally via HandleInertiaRequests shared props.
     */
    public function index(): Response
    {
        return Inertia::render('Admin/Dashboard', [
            'systemInfo' => [
                'laravel_version' => app()->version(),
                'php_version' => PHP_VERSION,
                'environment' => app()->environment(),
            ],
        ]);
    }
}
