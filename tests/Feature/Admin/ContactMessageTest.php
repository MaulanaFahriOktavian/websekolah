<?php

namespace Tests\Feature\Admin;

use App\Models\ContactMessage;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class ContactMessageTest extends TestCase
{
    /**
     * Guest cannot access contact messages.
     */
    public function test_guest_cannot_access_contact_messages(): void
    {
        $response = $this->get('/admin/contact-messages');

        $response->assertRedirect('/login');
    }

    /**
     * Authenticated admin can view contact messages list.
     */
    public function test_authenticated_admin_can_view_contact_messages_list(): void
    {
        $user = User::factory()->create();

        ContactMessage::create([
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'subject' => 'Pertanyaan Pendaftaran',
            'message' => 'Bagaimana prosedur pendaftaran siswa baru?',
            'status' => 'unread',
        ]);

        $response = $this->actingAs($user)->get('/admin/contact-messages');

        $response->assertStatus(200);
        $response->assertInertia(fn (Assert $page) => $page
            ->component('Admin/ContactMessages/Index')
            ->has('messages.data', 1)
            ->where('messages.data.0.name', 'John Doe')
            ->where('stats.total', 1)
            ->where('stats.unread', 1)
        );
    }

    /**
     * Authenticated admin can filter contact messages by status.
     */
    public function test_authenticated_admin_can_filter_contact_messages_by_status(): void
    {
        $user = User::factory()->create();

        ContactMessage::create([
            'name' => 'Alice',
            'email' => 'alice@example.com',
            'subject' => 'Pesan Belum Dibaca',
            'message' => 'Isi pesan unread...',
            'status' => 'unread',
        ]);

        ContactMessage::create([
            'name' => 'Bob',
            'email' => 'bob@example.com',
            'subject' => 'Pesan Sudah Dibaca',
            'message' => 'Isi pesan read...',
            'status' => 'read',
        ]);

        $response = $this->actingAs($user)->get('/admin/contact-messages?status=unread');

        $response->assertStatus(200);
        $response->assertInertia(fn (Assert $page) => $page
            ->component('Admin/ContactMessages/Index')
            ->has('messages.data', 1)
            ->where('messages.data.0.name', 'Alice')
        );
    }

    /**
     * Authenticated admin can view single contact message and it marks message as read.
     */
    public function test_authenticated_admin_can_view_single_contact_message_and_marks_as_read(): void
    {
        $user = User::factory()->create();

        $message = ContactMessage::create([
            'name' => 'Jane Doe',
            'email' => 'jane@example.com',
            'phone' => '081234567890',
            'subject' => 'Konfirmasi Kerjasama',
            'message' => 'Halo, kami ingin menawarkan kerjasama program pelatihan.',
            'status' => 'unread',
        ]);

        $response = $this->actingAs($user)->get("/admin/contact-messages/{$message->id}");

        $response->assertStatus(200);
        $response->assertInertia(fn (Assert $page) => $page
            ->component('Admin/ContactMessages/Show')
            ->where('message.id', $message->id)
            ->where('message.name', 'Jane Doe')
            ->where('message.subject', 'Konfirmasi Kerjasama')
        );

        $this->assertDatabaseHas('contact_messages', [
            'id' => $message->id,
            'status' => 'read',
        ]);
    }

    /**
     * Authenticated admin can delete contact message.
     */
    public function test_authenticated_admin_can_delete_contact_message(): void
    {
        $user = User::factory()->create();

        $message = ContactMessage::create([
            'name' => 'Spam Sender',
            'email' => 'spam@example.com',
            'subject' => 'Penawaran Spam',
            'message' => 'Isi pesan spam...',
            'status' => 'unread',
        ]);

        $response = $this->actingAs($user)->delete("/admin/contact-messages/{$message->id}");

        $response->assertRedirect('/admin/contact-messages');
        $this->assertDatabaseMissing('contact_messages', [
            'id' => $message->id,
        ]);
    }
}
