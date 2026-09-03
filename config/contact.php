<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Contact Notification Email
    |--------------------------------------------------------------------------
    |
    | The email address where notifications for new contact form submissions
    | are delivered. Falls back to ADMIN_EMAIL or a sensible default.
    |
    */
    'notification_email' => env('CONTACT_NOTIFICATION_EMAIL', env('ADMIN_EMAIL', 'admin@example.com')),
];
