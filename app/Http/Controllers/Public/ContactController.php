<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreContactMessageRequest;
use App\Mail\ContactNotificationMail;
use App\Models\ContactMessage;
use App\Models\SchoolProfile;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;
use Inertia\Response;

class ContactController extends Controller
{
    /**
     * Display the public Contact page.
     */
    public function index(): Response
    {
        $profile = SchoolProfile::first();

        return Inertia::render('Public/Contact/Index', [
            'profile' => $profile ? [
                'name' => $profile->name,
                'address' => $profile->address,
                'phone' => $profile->phone,
                'email' => $profile->email,
                'website' => $profile->website,
                'latitude' => $profile->latitude,
                'longitude' => $profile->longitude,
                'maps_url' => $profile->maps_url,
                'facebook_url' => $profile->facebook_url,
                'instagram_url' => $profile->instagram_url,
                'youtube_url' => $profile->youtube_url,
                'tiktok_url' => $profile->tiktok_url,
            ] : null,
        ]);
    }

    /**
     * Store a new contact message.
     * Message is saved to database for admin review.
     */
    public function store(StoreContactMessageRequest $request)
    {
        $validated = $request->validated();

        // 1. Create contact message in database first
        $contactMessage = ContactMessage::create($validated);

        // 2. Dispatch email notification to configured recipient
        $recipient = config('contact.notification_email', env('CONTACT_NOTIFICATION_EMAIL'));

        if (! empty($recipient)) {
            try {
                Mail::to($recipient)->send(new ContactNotificationMail($contactMessage));
            } catch (\Throwable $e) {
                // Log failure safely without disrupting visitor response
                Log::error('Gagal mengirim email notifikasi pesan kontak: '.$e->getMessage(), [
                    'contact_message_id' => $contactMessage->id,
                    'recipient' => $recipient,
                ]);
            }
        }

        // 3. Redirect back to contact page with success message
        return redirect()->route('contact.index')->with('message', [
            'type' => 'success',
            'title' => 'Pesan Terkirim',
            'text' => 'Terima kasih! Pesan Anda telah kami terima. Kami akan merespon secepatnya.',
        ]);
    }
}
