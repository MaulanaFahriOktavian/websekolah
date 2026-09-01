<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ContactMessageController extends Controller
{
    /**
     * Display a listing of contact messages with filters and search.
     */
    public function index(Request $request): Response
    {
        $status = $request->query('status', 'all');
        $search = $request->query('cari');

        // Get statistics
        $stats = [
            'total' => ContactMessage::count(),
            'unread' => ContactMessage::unread()->count(),
            'read' => ContactMessage::where('status', 'read')->count(),
        ];

        // Build query
        $query = ContactMessage::query();

        // Filter by status
        if ($status === 'unread') {
            $query->unread();
        } elseif ($status === 'read') {
            $query->where('status', 'read');
        }

        // Search
        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%")
                    ->orWhere('subject', 'like', "%{$search}%");
            });
        }

        // Paginate and order
        $messages = $query->latest('created_at')->paginate(15)->withQueryString();

        return Inertia::render('Admin/ContactMessages/Index', [
            'messages' => $messages,
            'stats' => $stats,
            'filters' => [
                'status' => $status,
                'cari' => $search,
            ],
        ]);
    }

    /**
     * Display a specific contact message and mark as read.
     */
    public function show(ContactMessage $contactMessage): Response
    {
        // Mark message as read
        if ($contactMessage->status === 'unread') {
            $contactMessage->markAsRead();
        }

        return Inertia::render('Admin/ContactMessages/Show', [
            'message' => $contactMessage,
        ]);
    }

    /**
     * Delete a contact message.
     */
    public function destroy(ContactMessage $contactMessage)
    {
        $contactMessage->delete();

        return redirect()->route('admin.contact-messages.index')
            ->with('message', [
                'type' => 'success',
                'text' => 'Pesan berhasil dihapus.',
            ]);
    }
}
