<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    /**
     * Display the public-facing homepage.
     *
     * School data is provided globally via HandleInertiaRequests shared props.
     */
    public function index(): Response
    {
        return Inertia::render('Public/Home');
    }
}
