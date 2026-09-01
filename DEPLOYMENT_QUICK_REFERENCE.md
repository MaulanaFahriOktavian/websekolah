# Quick Deployment Reference

## Stack Summary
- **PHP**: 8.3+ (tested 8.4.24) | **Database**: MySQL 8+ / PostgreSQL 14+ / SQLite
- **Node**: 18+ LTS | **npm**: 9+ | **Web Server**: Apache 2.4+ OR Nginx + PHP-FPM
- **Laravel**: 13.17 | **Inertia**: Latest | **React**: 19

## Environment Variables Required

```bash
# .env (production)
APP_ENV=production
APP_DEBUG=false
APP_URL=https://yourdomain.com
APP_KEY=[GENERATED_BY_key:generate]

# Database (MySQL example)
DB_CONNECTION=mysql
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=sekolah_prod
DB_USERNAME=sekolah_user
DB_PASSWORD=[SECURE_PASSWORD]

# Admin (MUST set before db:seed)
ADMIN_EMAIL=admin@yourdomain.com
ADMIN_PASSWORD=[SECURE_PASSWORD]

# Mail
MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=[your-email@gmail.com]
MAIL_PASSWORD=[app-password]
MAIL_FROM_ADDRESS=noreply@yourdomain.com
MAIL_FROM_NAME="Sekolah"

# Cache & Session
CACHE_STORE=database
SESSION_DRIVER=database

# Logging
LOG_CHANNEL=stack
LOG_LEVEL=warning

# Storage
FILESYSTEM_DISK=local
```

---

## Installation & First-Time Setup (Server)

### 1. System Preparation (Ubuntu/Debian)
```bash
# Update system
apt-get update && apt-get upgrade -y

# Install PHP & extensions
apt-get install -y php8.4 php8.4-fpm php8.4-cli
apt-get install -y php8.4-pdo php8.4-pdo-mysql php8.4-json php8.4-xml php8.4-gd php8.4-fileinfo php8.4-openssl

# Install database
apt-get install -y mysql-server     # OR postgresql

# Install web server
apt-get install -y nginx            # OR apache2

# Install Node & npm
apt-get install -y nodejs npm

# Install Git & utilities
apt-get install -y git curl wget certbot
```

### 2. Application Directory & Permissions
```bash
# Create directory
sudo mkdir -p /var/www/sekolah
cd /var/www/sekolah

# Clone/Upload code
git clone https://github.com/yourorg/sekolah.git .

# Set ownership
sudo chown -R www-data:www-data /var/www/sekolah
sudo chmod -R 755 /var/www/sekolah

# Writable directories
sudo chmod -R 775 /var/www/sekolah/storage
sudo chmod -R 775 /var/www/sekolah/bootstrap/cache
```

### 3. Database Setup (MySQL)
```bash
# Login to MySQL
mysql -u root -p

# Create database & user
CREATE DATABASE sekolah_prod CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'sekolah_user'@'localhost' IDENTIFIED BY 'your_secure_password_here';
GRANT ALL PRIVILEGES ON sekolah_prod.* TO 'sekolah_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

### 4. PHP & Composer Setup
```bash
cd /var/www/sekolah

# Copy environment file
cp .env.example .env

# Edit .env with production values (see Environment Variables above)
nano .env

# Generate application key
php artisan key:generate

# Install PHP dependencies (no dev packages)
composer install --optimize-autoloader --no-dev
```

### 5. Frontend Build
```bash
cd /var/www/sekolah

# Install & build
npm install
npm run build

# Verify build created
ls -la public/build/   # Should show manifest.json
```

### 6. Database Migration & Seeding
```bash
cd /var/www/sekolah

# Create all tables (cache, sessions, jobs, app tables)
php artisan migrate --force

# Seed admin user & initial data (uses ADMIN_* env vars)
php artisan db:seed --force

# Verify
php artisan tinker
> DB::table('users')->count();      # Should show 1
> DB::table('school_profiles')->count();  # Should show 1
> exit()
```

### 7. Storage Symlink (For Public Uploads)
```bash
cd /var/www/sekolah
php artisan storage:link

# Verify
ls -la public/ | grep storage   # Should show symlink
```

### 8. Cache Configuration
```bash
cd /var/www/sekolah
php artisan config:cache
php artisan route:cache
```

### 9. Web Server Configuration

**Nginx** (recommended):
```bash
# Create site config
sudo tee /etc/nginx/sites-available/sekolah > /dev/null <<EOF
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    root /var/www/sekolah/public;
    index index.php;

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        expires 7d;
        add_header Cache-Control "public, immutable";
    }

    # Routes to index.php
    location / {
        try_files \$uri \$uri/ /index.php?\$query_string;
    }

    # PHP handler
    location ~ \.php\$ {
        fastcgi_pass unix:/run/php/php-8.4-fpm.sock;
        fastcgi_param SCRIPT_FILENAME \$realpath_root\$fastcgi_script_name;
        include fastcgi_params;
    }

    error_log /var/log/nginx/sekolah-error.log;
    access_log /var/log/nginx/sekolah-access.log;
}
EOF

# Enable site
sudo ln -s /etc/nginx/sites-available/sekolah /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

**Apache**:
```bash
# Enable modules
sudo a2enmod rewrite
sudo a2enmod headers

# Create site config in /etc/apache2/sites-available/sekolah.conf
# (See DEPLOYMENT_GUIDE.md section 9 for full config)

sudo a2ensite sekolah
sudo apache2ctl configtest
sudo systemctl restart apache2
```

### 10. SSL/HTTPS (LetsEncrypt)
```bash
# Get certificate
sudo certbot certonly --webroot -w /var/www/sekolah/public \
  -d yourdomain.com -d www.yourdomain.com

# Update nginx config: Add SSL directives to server block
# Update .env: APP_URL=https://yourdomain.com

# Auto-renewal
sudo systemctl enable certbot.timer
```

### 11. Verify Installation
```bash
# Test HTTP access
curl -I http://yourdomain.com      # Should redirect to HTTPS or show 200

# Test HTTPS
curl -I https://yourdomain.com     # Should show 200

# Test app state
php artisan tinker
> config('app.env');      # Should be 'production'
> config('app.debug');     # Should be false
> DB::table('users')->count();  # Should be >= 1
> exit()

# Check logs
tail -20 /var/www/sekolah/storage/logs/laravel.log
```

---

## Per-Deployment (Every Release)

```bash
cd /var/www/sekolah

# 1. Pull latest code
git pull origin main

# 2. Update dependencies (if composer.lock changed)
composer install --optimize-autoloader --no-dev

# 3. Rebuild frontend
npm install
npm run build

# 4. Clear caches
php artisan cache:clear
php artisan config:cache
php artisan route:cache

# 5. Database migrations (only if new migrations exist)
php artisan migrate --force

# 6. Quick verification
curl https://yourdomain.com
# Verify: Admin login works, pages load, no errors in logs
tail -20 /var/www/sekolah/storage/logs/laravel.log
```

---

## Database Migrations (Schema Changes Only)

Only run if NEW migrations are added:

```bash
cd /var/www/sekolah

# BACKUP FIRST
mysqldump -u sekolah_user -p sekolah_prod > backup_$(date +%Y%m%d).sql

# Check pending migrations
php artisan migrate:status

# Run migrations
php artisan migrate --force

# Verify
php artisan tinker
```

---

## Troubleshooting

| Problem | Command to Diagnose | Fix |
|---------|---------------------|-----|
| 500 Error | `tail -50 storage/logs/laravel.log` | `php artisan cache:clear` |
| Assets 404 | `ls public/build/manifest.json` | `npm run build` |
| DB Connection Fail | Check `.env` DB vars | Verify MySQL running: `systemctl status mysql` |
| Login Fails | `php artisan tinker > DB::table('users')->count()` | Re-seed: `php artisan db:seed` |
| File Upload Fails | `ls -la storage/app/public/` | Fix perms: `chmod -R 775 storage/` |
| Log to storage/logs | `php artisan logs:prune` | Prune old logs |

---

## Cron Jobs (If Used)

For scheduler and queue workers (optional, if added to app later):

```bash
# Add to crontab
sudo crontab -e -u www-data

# Laravel scheduler (runs every minute)
* * * * * cd /var/www/sekolah && php artisan schedule:run >> /dev/null 2>&1

# Queue worker (runs in background, restart if stopped)
* * * * * cd /var/www/sekolah && php artisan queue:work --queue=default >> /dev/null 2>&1 || (cd /var/www/sekolah && php artisan queue:work --queue=default &)
```

---

## Pre-Production Checklist

- [ ] PHP 8.3+ installed
- [ ] Database (MySQL/PostgreSQL) created & verified
- [ ] `.env` file configured with production values
- [ ] `APP_DEBUG=false`
- [ ] `APP_ENV=production`
- [ ] `APP_URL=https://yourdomain.com`
- [ ] Database migrations run: `php artisan migrate --force`
- [ ] Admin user seeded: `php artisan db:seed --force`
- [ ] Frontend built: `npm run build`
- [ ] Storage linked: `php artisan storage:link`
- [ ] Web server configured (Nginx/Apache)
- [ ] SSL certificate installed (LetsEncrypt)
- [ ] HTTPS working & HTTP redirects
- [ ] Logs accessible & monitored
- [ ] Backup strategy in place
- [ ] Firewall configured (ports 22, 80, 443)
- [ ] File permissions correct (storage/ writable)
- [ ] Test login admin page
- [ ] Test public pages load
- [ ] Test file upload works

---

## Backup Commands (Run Regularly)

```bash
# Database backup (MySQL)
mysqldump -u sekolah_user -p sekolah_prod > /backups/sekolah_$(date +%Y%m%d_%H%M%S).sql

# Database backup (PostgreSQL)
pg_dump -U sekolah_user sekolah_prod > /backups/sekolah_$(date +%Y%m%d_%H%M%S).sql

# Upload storage backup
tar -czf /backups/storage_$(date +%Y%m%d).tar.gz /var/www/sekolah/storage/app/public/

# .env backup (keep secure)
sudo cp /var/www/sekolah/.env /backups/.env_backup_$(date +%Y%m%d)
sudo chmod 600 /backups/.env_backup_*
```

---

## Production URL Test

Once deployed:

```bash
# Public homepage
https://yourdomain.com/

# Admin login
https://yourdomain.com/admin

# Health check (if you add the endpoint)
# https://yourdomain.com/health

# View logs live
tail -f /var/www/sekolah/storage/logs/laravel.log
```

---

**No deployment executed. This is a reference guide only.**
