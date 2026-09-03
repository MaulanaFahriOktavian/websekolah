<?php

namespace Tests\Feature\Public;

use App\Mail\ContactNotificationMail;
use App\Models\ContactMessage;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Mail;
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

    public function test_contact_form_rate_limiting_allows_three_requests_and_blocks_fourth(): void
    {
        $payload = [
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'subject' => 'Pendaftaran Siswa',
            'message' => 'Saya ingin mendapatkan informasi tentang pendaftaran.',
        ];

        // Request 1: succeeds
        $response1 = $this->post('/kontak', $payload);
        $response1->assertRedirect('/kontak');

        // Request 2: succeeds
        $response2 = $this->post('/kontak', $payload);
        $response2->assertRedirect('/kontak');

        // Request 3: succeeds
        $response3 = $this->post('/kontak', $payload);
        $response3->assertRedirect('/kontak');

        // Request 4: throttled with 429
        $response4 = $this->post('/kontak', $payload);
        $response4->assertStatus(429);
    }

    public function test_get_contact_page_is_not_throttled(): void
    {
        for ($i = 0; $i < 5; $i++) {
            $response = $this->get('/kontak');
            $response->assertStatus(200);
        }
    }

    public function test_email_notification_is_sent_when_contact_message_is_submitted(): void
    {
        Mail::fake();
        Config::set('contact.notification_email', 'admin-sekolah@example.com');

        $response = $this->post('/kontak', [
            'name' => 'Budi Santoso',
            'email' => 'budi@example.com',
            'phone' => '08123456789',
            'subject' => 'Informasi Ekskul',
            'message' => 'Apakah ada ekstrakurikuler robotik di sekolah ini?',
        ]);

        $response->assertRedirect('/kontak');

        Mail::assertSent(ContactNotificationMail::class, function ($mail) {
            return $mail->hasTo('admin-sekolah@example.com') &&
                   $mail->contactMessage->name === 'Budi Santoso' &&
                   $mail->contactMessage->email === 'budi@example.com' &&
                   $mail->contactMessage->phone === '08123456789' &&
                   $mail->contactMessage->subject === 'Informasi Ekskul' &&
                   $mail->contactMessage->message === 'Apakah ada ekstrakurikuler robotik di sekolah ini?';
        });
    }

    public function test_email_notification_uses_configured_recipient(): void
    {
        Mail::fake();
        Config::set('contact.notification_email', 'kepsek@sekolah.sch.id');

        $this->post('/kontak', [
            'name' => 'Siti Nurhaliza',
            'email' => 'siti@example.com',
            'subject' => 'Tanya Jadwal',
            'message' => 'Kapan jadwal pendaftaran PPDB dimulai?',
        ]);

        Mail::assertSent(ContactNotificationMail::class, function ($mail) {
            return $mail->hasTo('kepsek@sekolah.sch.id');
        });
    }

    public function test_email_notification_content_renders_correctly(): void
    {
        $contactMessage = ContactMessage::create([
            'name' => 'Ahmad Dahlan',
            'email' => 'ahmad@example.com',
            'phone' => '08987654321',
            'subject' => 'Konfirmasi Sumbangan',
            'message' => 'Kami ingin memberikan buku untuk perpustakaan.',
            'status' => 'unread',
        ]);

        $mailable = new ContactNotificationMail($contactMessage);

        $mailable->assertSeeInHtml('Ahmad Dahlan');
        $mailable->assertSeeInHtml('ahmad@example.com');
        $mailable->assertSeeInHtml('08987654321');
        $mailable->assertSeeInHtml('Konfirmasi Sumbangan');
        $mailable->assertSeeInHtml('Kami ingin memberikan buku untuk perpustakaan.');
        $mailable->assertHasSubject('Pesan Kontak Baru: Konfirmasi Sumbangan');
        $mailable->assertHasReplyTo('ahmad@example.com', 'Ahmad Dahlan');
    }

    public function test_contact_message_is_saved_even_if_mail_sending_fails(): void
    {
        Mail::shouldReceive('to')
            ->once()
            ->andThrow(new \Exception('SMTP Connection Failed'));

        $response = $this->post('/kontak', [
            'name' => 'Pengirim Tetap Tersimpan',
            'email' => 'pengirim@example.com',
            'subject' => 'Pesan Tetap Masuk DB',
            'message' => 'Meskipun mailer error, pesan ini harus tetap tersimpan di database.',
        ]);

        $response->assertRedirect('/kontak');
        $response->assertSessionHas('message');

        $this->assertDatabaseHas('contact_messages', [
            'name' => 'Pengirim Tetap Tersimpan',
            'email' => 'pengirim@example.com',
            'subject' => 'Pesan Tetap Masuk DB',
        ]);
    }
}
