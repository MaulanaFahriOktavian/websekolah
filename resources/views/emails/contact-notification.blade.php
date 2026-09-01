<html>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <div style="max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden; background-color: #f9fafb;">
        <!-- Header -->
        <div style="background-color: #4f46e5; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">📬 Pesan Kontak Baru</h1>
            <p style="margin: 10px 0 0 0; font-size: 14px; opacity: 0.9;">Dari Pengunjung Website Sekolah</p>
        </div>

        <!-- Content -->
        <div style="padding: 30px;">
            <p style="margin-bottom: 20px;">Anda menerima pesan kontak baru dari pengunjung website:</p>

            <!-- Message Details -->
            <div style="background-color: #f3f4f6; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #1f2937; width: 120px;">Nama:</td>
                        <td style="padding: 8px 0 8px 15px; border-bottom: 1px solid #e5e7eb;">{{ $name }}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #1f2937;">Email:</td>
                        <td style="padding: 8px 0 8px 15px; border-bottom: 1px solid #e5e7eb;">
                            <a href="mailto:{{ $email }}" style="color: #4f46e5; text-decoration: none;">{{ $email }}</a>
                        </td>
                    </tr>
                    @if ($phone)
                    <tr>
                        <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #1f2937;">Telepon:</td>
                        <td style="padding: 8px 0 8px 15px; border-bottom: 1px solid #e5e7eb;">{{ $phone }}</td>
                    </tr>
                    @endif
                    <tr>
                        <td style="padding: 8px 0; font-weight: bold; color: #1f2937;">Subjek:</td>
                        <td style="padding: 8px 0 8px 15px;"><strong>{{ $subject }}</strong></td>
                    </tr>
                </table>
            </div>

            <!-- Message Body -->
            <div style="margin-bottom: 20px;">
                <h3 style="margin: 0 0 10px 0; color: #1f2937; font-size: 16px;">Pesan:</h3>
                <div style="background-color: #f9fafb; padding: 15px; border-left: 4px solid #4f46e5; border-radius: 4px; white-space: pre-wrap; word-wrap: break-word;">{{ $message }}</div>
            </div>

            <!-- Call to Action -->
            <p style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
                <strong>Untuk membalas pesan ini:</strong> Silakan email pengunjung di <a href="mailto:{{ $email }}" style="color: #4f46e5; text-decoration: none;">{{ $email }}</a> atau hubungi melalui nomor telepon yang diberikan.
            </p>
        </div>

        <!-- Footer -->
        <div style="background-color: #f3f4f6; padding: 15px; text-align: center; font-size: 12px; color: #6b7280; border-top: 1px solid #e5e7eb;">
            <p style="margin: 0;">Email ini dikirim secara otomatis oleh sistem website sekolah.</p>
        </div>
    </div>
</body>
</html>
