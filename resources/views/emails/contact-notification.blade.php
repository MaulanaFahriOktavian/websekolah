<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Pesan Kontak Baru</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; background-color: #f3f4f6;">
    <div style="max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; background-color: #ffffff;">
        <!-- Header -->
        <div style="background-color: #4f46e5; color: white; padding: 24px 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 22px; font-weight: bold;">📬 Pesan Kontak Baru</h1>
            <p style="margin: 6px 0 0 0; font-size: 14px; opacity: 0.9;">Notifikasi Pengunjung Website Sekolah</p>
        </div>

        <!-- Content -->
        <div style="padding: 24px 20px;">
            <p style="margin: 0 0 16px 0; font-size: 15px; color: #374151;">
                Halo Admin, Anda menerima pesan kontak baru dari formulir kontak website:
            </p>

            <!-- Message Details Table -->
            <div style="background-color: #f9fafb; padding: 16px; border: 1px solid #e5e7eb; border-radius: 6px; margin-bottom: 20px;">
                <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                    <tr>
                        <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #4b5563; width: 130px;">Nama Pengirim:</td>
                        <td style="padding: 8px 0 8px 12px; border-bottom: 1px solid #e5e7eb; color: #111827;">{{ $contactMessage->name ?? $name }}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #4b5563;">Email:</td>
                        <td style="padding: 8px 0 8px 12px; border-bottom: 1px solid #e5e7eb;">
                            <a href="mailto:{{ $contactMessage->email ?? $email }}" style="color: #4f46e5; text-decoration: none;">{{ $contactMessage->email ?? $email }}</a>
                        </td>
                    </tr>
                    @if (!empty($contactMessage->phone ?? $phone))
                    <tr>
                        <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #4b5563;">Telepon / WA:</td>
                        <td style="padding: 8px 0 8px 12px; border-bottom: 1px solid #e5e7eb; color: #111827;">{{ $contactMessage->phone ?? $phone }}</td>
                    </tr>
                    @endif
                    <tr>
                        <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #4b5563;">Subjek:</td>
                        <td style="padding: 8px 0 8px 12px; border-bottom: 1px solid #e5e7eb; color: #111827; font-weight: 600;">{{ $contactMessage->subject ?? $subject }}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0; font-weight: bold; color: #4b5563;">Waktu Diterima:</td>
                        <td style="padding: 8px 0 8px 12px; color: #111827;">
                            {{ isset($contactMessage->created_at) ? $contactMessage->created_at->format('d/m/Y H:i') . ' WIB' : now()->format('d/m/Y H:i') . ' WIB' }}
                        </td>
                    </tr>
                </table>
            </div>

            <!-- Message Body -->
            <div style="margin-bottom: 24px;">
                <h3 style="margin: 0 0 8px 0; color: #1f2937; font-size: 15px; font-weight: bold;">Isi Pesan:</h3>
                <div style="background-color: #f9fafb; padding: 16px; border-left: 4px solid #4f46e5; border-radius: 4px; font-size: 14px; color: #1f2937; white-space: pre-wrap; word-wrap: break-word;">{{ $contactMessage->message ?? $messageBody ?? $messageContent }}</div>
            </div>

            <!-- Action Button -->
            @if (!empty($adminUrl))
            <div style="text-align: center; margin: 24px 0;">
                <a href="{{ $adminUrl }}" style="background-color: #4f46e5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 14px; display: inline-block;">
                    Buka di Panel Admin
                </a>
            </div>
            @endif

            <!-- Reply Note -->
            <p style="margin: 20px 0 0 0; padding-top: 16px; border-top: 1px solid #e5e7eb; font-size: 13px; color: #6b7280;">
                <strong>Membalas pesan:</strong> Anda dapat langsung membalas ke <a href="mailto:{{ $contactMessage->email ?? $email }}" style="color: #4f46e5; text-decoration: none;">{{ $contactMessage->email ?? $email }}</a>@if (!empty($contactMessage->phone ?? $phone)) atau menghubungi via telepon di {{ $contactMessage->phone ?? $phone }}@endif.
            </p>
        </div>

        <!-- Footer -->
        <div style="background-color: #f9fafb; padding: 14px 20px; text-align: center; font-size: 12px; color: #9ca3af; border-top: 1px solid #e5e7eb;">
            <p style="margin: 0;">Email ini dikirim secara otomatis oleh sistem notifikasi website sekolah.</p>
        </div>
    </div>
</body>
</html>
