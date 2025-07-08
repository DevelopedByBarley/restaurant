<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Lang;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $admin = auth('admin')->user() ?? null;
        $user = auth('web')->user() ?? null;
        $locale =  App::getLocale();

        return [
            ...parent::share($request),
            'auth' => [
                'admin' => $admin ? [
                    'id' => $admin->id,
                    'name' => $admin->name,
                    'email' => $admin->email,
                    'level' => $admin->level,
                ] : null,
                'user' => $user ? $user : null,
            ],
            'flash' => [
                'success' => $request->session()->get('success'),
                'warning' => $request->session()->get('warning'),
                'danger' => $request->session()->get('danger'),
                'info' => $request->session()->get('info'),
                'violet'  => $request->session()->get('violet'),
            ],
            'env' => [
                'authEnabled' => env('AUTH_ENABLED', false),
            ],
            'locale' => $locale,
            't' => [
                'navbar' => trans('navbar')
            ]
        ];
    }
}
