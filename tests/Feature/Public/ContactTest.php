<?php

namespace Tests\Feature\Public;

use App\Models\ContactMessage;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ContactTest extends TestCase
{
    use RefreshDatabase;

    public function test_guest_can_view_contact_page(): void
    {
        $response = $this->get('/kontak');

        $response->assertStatus(200);
    }

    public function test_guest_can_submit_valid_contact_message(): void
    {
        $response = $this->post('/kontak', [
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'phone' => '+62812345678',
            'subject' => 'Pendaftaran Siswa',
            'message' => 'Saya ingin mendapatkan informasi tentang pendaftaran siswa baru.',
        ]);

        $response->assertRedirect('/kontak');
        $this->assertDatabaseHas('contact_messages', [
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'phone' => '+62812345678',
            'subject' => 'Pendaftaran Siswa',
            'status' => 'unread',
        ]);
    }

    public function test_contact_message_validation_requires_name(): void
    {
        $response = $this->post('/kontak', [
            'name' => '',
            'email' => 'john@example.com',
            'phone' => '+62812345678',
            'subject' => 'Pendaftaran',
            'message' => 'Saya ingin mendapatkan informasi.',
        ]);

        $response->assertSessionHasErrors('name');
    }

    public function test_contact_message_validation_requires_email(): void
    {
        $response = $this->post('/kontak', [
            'name' => 'John Doe',
            'email' => '',
            'subject' => 'Pendaftaran',
            'message' => 'Saya ingin mendapatkan informasi.',
        ]);

        $response->assertSessionHasErrors('email');
    }

    public function test_contact_message_validation_requires_valid_email(): void
    {
        $response = $this->post('/kontak', [
            'name' => 'John Doe',
            'email' => 'invalid-email',
            'subject' => 'Pendaftaran',
            'message' => 'Saya ingin mendapatkan informasi.',
        ]);

        $response->assertSessionHasErrors('email');
    }

    public function test_contact_message_validation_requires_subject(): void
    {
        $response = $this->post('/kontak', [
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'subject' => '',
            'message' => 'Saya ingin mendapatkan informasi.',
        ]);

        $response->assertSessionHasErrors('subject');
    }

    public function test_contact_message_validation_requires_message(): void
    {
        $response = $this->post('/kontak', [
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'subject' => 'Pendaftaran',
            'message' => '',
        ]);

        $response->assertSessionHasErrors('message');
    }

    public function test_contact_message_validation_message_minimum_length(): void
    {
        $response = $this->post('/kontak', [
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'subject' => 'Pendaftaran',
            'message' => 'too short',
        ]);

        $response->assertSessionHasErrors('message');
    }

    public function test_contact_message_phone_is_optional(): void
    {
        $response = $this->post('/kontak', [
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'phone' => '',
            'subject' => 'Pendaftaran Siswa',
            'message' => 'Saya ingin mendapatkan informasi tentang pendaftaran siswa baru.',
        ]);

        $response->assertRedirect('/kontak');
        $this->assertDatabaseHas('contact_messages', [
            'email' => 'john@example.com',
            'phone' => null,
        ]);
    }

    public function test_contact_message_is_stored_with_unread_status(): void
    {
        $this->post('/kontak', [
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'subject' => 'Pendaftaran',
            'message' => 'Saya ingin informasi lebih lanjut.',
        ]);

        $message = ContactMessage::first();
        $this->assertEquals('unread', $message->status);
    }
}
