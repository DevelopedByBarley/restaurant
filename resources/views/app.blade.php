<!DOCTYPE html>
<html lang="hu">

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />

    <link rel="icon" href="{{ asset('favicon.ico') }}?v={{ filemtime(public_path('favicon.ico')) }}"
        type="image/x-icon">
    @if (app()->environment('production'))
        <!-- Éles környezetben közvetlenül a build fájlokat linkeljük be -->
        <link rel="stylesheet" href="{{ asset('build/assets/app-CQ0OMZ7E.css') }}">
        <script type="module" src="{{ asset('build/assets/app-DCM6pgp1.js') }}"></script>
    @else
        <!-- Fejlesztési környezetben használjuk a Vite hot reload-ot -->
        @viteReactRefresh
        @vite('resources/js/app.jsx')
    @endif
</head>

<body>
    @inertia
</body>

</html>
