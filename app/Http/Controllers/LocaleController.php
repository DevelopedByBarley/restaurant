<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Session;

class LocaleController extends Controller
{
    /**
     * Set the application locale.
     *
     * @param  string  $lang
     * @return \Illuminate\Http\RedirectResponse
     */
    public function setLocale($lang)
    {
        if (in_array($lang, config('app.supported_locales'))) {
            App::setLocale($lang);
            Session::put('locale', $lang);
            session(['locale' => $lang]);
        }

        return redirect()->back();
    }
}
