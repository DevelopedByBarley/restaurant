<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class UserFileController extends Controller
{
    public function index()
    {
        return Inertia::render('pages/user/file/Index');
    }

    public function store(Request $request)
    {
        // Handle file upload
        $request->validate([
            'file' => 'required|file|max:10240', // Max 10MB
        ]);


        $file = $request->file('file');
        $path = $file->store('user_files', 'public');

        // Optionally, you can save the file information to the database


        // For example, if you have a User model and want to associate the file with the authenticated user:
        $auth = Auth::guard('web')->user();
        $user = User::findOrFail($auth->id);

        if ($user->file && Storage::disk('public')->exists($user->file)) {
            Storage::disk('public')->delete($user->file);
        }


        $user->file = $path;
        $user->save();

        // Save file information to the database or perform other actions
        return back()->with('success', 'File uploaded successfully!')->with('path', $path);
    }

    public function destroy($id)
    {
        // Handle file deletion
    }
}
