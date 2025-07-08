<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Stripe\Stripe;
use Stripe\Checkout\Session;

class PaymentController extends Controller
{
    public function checkout(Request $request)
    {
        $user = $request->user();

        $validated = $request->validate([
            'products' => 'required|array|min:1',
            'products.*.price_id' => 'required|string',
            'products.*.quantity' => 'required|integer|min:1',
        ]);

        Stripe::setApiKey(env('STRIPE_SECRET'));

        $lineItems = [];

        foreach ($request->products as $product) {
            $lineItems[] = [
                'price' => $product['price_id'],
                'quantity' => $product['quantity'],
            ];
        }

        $session = Session::create([
            'payment_method_types' => ['card'],
            'line_items' => $lineItems,
            'mode' => 'payment',
            'customer_email' => $user->email,
            'success_url' => route('checkout-success'),
            'cancel_url' => route('checkout-cancel'),
        ]);

        return Inertia::location($session->url);
    }
}
