# Final Deployment Preparation

## 1. Stack Requirements (Evidence-Based)

| Component | Requirement | Reason | Evidence |
|-----------|-------------|--------|----------|
| **PHP** | 8.3+ (tested: 8.4.24) | Core runtime | composer.json: `php: ^8.3` |
| **Node.js** | 18 LTS minimum (20+ recommended) | Vite build & npm | package.json uses Vite 8, Tailwind 4, React 19 |
| **npm** | 9+ or pnpm equivalent | Package manager | package.json dependency management |
| **Database** | SQLite / MySQL 8.0+ / PostgreSQL 14+ | Data persistence | config/database.php supports sqlite, mysql, mariadb, pgsql, sqlsrv |
| **Web Server** | Apache 2.4+ OR Nginx + PHP-FPM | HTTP server | Laravel framework requirement |
| **Linux/OS** | Ubuntu 20.04+ / Debian 11+ / CentOS 7+ / Windows Server | Hosting platform | Standard Laravel compatibility |
| **Storage** | Minimum 5 GB for app + uploads | File system | storage/ directories must be writable |
| **Memory** | 512 MB minimum (1-2 GB recommended) | Runtime resources | PHP + Laravel + Node build process |
| **Disk I/O** | SSD recommended for database | Performance | SQLite/MySQL optimal on SSD |

### PHP Extensions Required
- **PDO** (PDO_SQLITE, PDO_MYSQL, PDO_PGSQL, or PDO_SQLSRV depending on DB choice)
- **JSON** (for Laravel/Inertia)
- **ctype, bcmath, xml** (Laravel core)
- **fileinfo, gd** (for media upload/processing)
- **openssl** (encryption)

### Node.js Build Environment
- Run on **build server** (not production server)
- Produces static assets → deployed to `public/build/`
- Not required on production if assets are pre-built

---

## 2. Production Environment Configuration

### Recommended Settings (from .env.example)

| Setting | Local Value | Production Value | Reason |
|---------|------------|-----------------|--------|
| **APP_ENV** | `local` | `production` | Controls error reporting, logging |
| **APP_DEBUG** | `true` | `false` | Prevents secret leakage in errors |
| **APP_URL** | `http://localhost:8000` | `https://yourdomain.com` | SEO, CORS, links generation |
| **APP_KEY** | (generated) | (same generated key) | Encryption - MUST be same across servers |
| **LOG_CHANNEL** | `stack` | `stack` | Logs to single file + optional other channels |
| **LOG_LEVEL** | `debug` | `warning` or `error` | Reduce noise in production |
| **DB_CONNECTION** | `sqlite` | `mysql` / `pgsql` | SQLite fine for small school, MySQL recommended for scale |
| **DB_HOST** | - | `localhost` / `db.internal.ip` | Database server location |
| **SESSION_DRIVER** | `database` | `database` | Database table for sessions (creates sessions table via migration) |
| **SESSION_LIFETIME** | `120` | `120` (2 hours) | Admin session timeout |
| **CACHE_STORE** | `database` | `database` / `redis` | Database table for cache (creates cache table via migration) |
| **QUEUE_CONNECTION** | `database` | `database` / `redis` | Database for queue jobs (creates jobs table via migration) |
| **FILESYSTEM_DISK** | `local` | `local` / `s3` | Local filesystem or S3 for uploads |
| **MAIL_MAILER** | `log` | `smtp` / `sendmail` | Choose actual mail provider for production |
| **MAIL_FROM_ADDRESS** | `hello@example.com` | `noreply@yourdomain.com` | Email sender address |
| **BCRYPT_ROUNDS** | `12` | `12` | Password hashing cost (increase for security if needed) |
| **BROADCAST_CONNECTION** | `log` | `log` / `pusher` | Not used currently |

### Notes on .env.example Configuration
- **Admin credentials**: `ADMIN_NAME`, `ADMIN_EMAIL`, `ADMIN_PASSWORD` must be set before first `php artisan migrate --seed`
- **ADMIN_PASSWORD**: No default - required for seeding
- All empty values in `.env.example` must be populated for production
- Secret values (DB_PASSWORD, MAIL_PASSWORD, AWS keys): Set securely during deployment

---

## 3. Database Configuration

### Option A: SQLite (Small School / Low Traffic)
**Best for**: ≤500 active users, ≤1000 uploads
```
DB_CONNECTION=sqlite
DB_DATABASE=/path/to/database/database.sqlite
```
**Setup**: Database file auto-created, must be writable
**Backup**: Single file backup, simple restore
**Scaling**: Limited to single server, no clustering

### Option B: MySQL 8.0+ (Recommended)
**Best for**: Medium to large school, growth potential
```
DB_CONNECTION=mysql
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=sekolah_prod
DB_USERNAME=sekolah_user
DB_PASSWORD=[SECURE_PASSWORD]
DB_CHARSET=utf8mb4
DB_COLLATION=utf8mb4_unicode_ci
```
**Setup**: Create database & user before migration
**Backup**: Binary backup or mysqldump
**Scaling**: Supports replication, clustering

### Option C: PostgreSQL 14+ (High Reliability)
**Best for**: Mission-critical, large dataset
```
DB_CONNECTION=pgsql
DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=sekolah_prod
DB_USERNAME=sekolah_user
DB_PASSWORD=[SECURE_PASSWORD]
DB_SSLMODE=prefer
```
**Setup**: Create database & role before migration
**Backup**: pg_dump, point-in-time recovery
**Scaling**: Full ACID compliance, advanced features

### Database Tables Created by Migrations
```
- users              (admin users)
- cache              (cache store - REQUIRED for CACHE_STORE=database)
- sessions           (session store - REQUIRED for SESSION_DRIVER=database)
- jobs               (queue jobs - REQUIRED for QUEUE_CONNECTION=database)
- school_profiles    (core app)
- categories         (news categories)
- news               (news posts)
- announcements      (school announcements)
- teachers           (teacher list)
- staff              (staff list)
- facilities         (school facilities)
- achievements       (school achievements)
- galleries          (photo galleries)
- gallery_photos     (gallery images)
- migrations         (migration tracking)
```

---

## 4. File Storage & Media Upload

### Directory Structure
```
storage/
├── app/
│   ├── private/          (default FILESYSTEM_DISK=local)
│   └── public/           (publicly accessible uploads)
├── framework/
│   ├── cache/            (internal cache)
│   ├── sessions/         (alternative session store)
│   └── views/            (compiled blade views)
└── logs/
    └── laravel.log       (application logs)

public/
├── storage → ../storage/app/public   (symlink)
├── build/                (Vite compiled assets)
├── index.php             (entry point)
└── robots.txt
```

### Writable Directories (for web server user)
```
storage/
storage/app
storage/app/public
storage/framework
storage/framework/cache
storage/framework/views
storage/logs
bootstrap/cache
```

### File Upload Configuration
- **Location**: `storage/app/public/` via symlink `public/storage`
- **Max Sizes**: 
  - Logo, Principal Photo: 2 MB
  - Favicon: 512 KB
  - Hero Image: 4 MB
  - Gallery Photos: 2 MB
  - News Featured Image: 2 MB
  - Achievement Photo: 2 MB
- **Types**: Images (jpeg, png, jpg, webp)
- **Access**: Public via HTTP after `php artisan storage:link`

---

## 5. Caching & Sessions

### Cache System
- **Store**: Database (migrations creates `cache` table)
- **TTL**: Configurable, default 24h
- **Use**: ORM queries, computed data, temporary objects

### Session Management
- **Store**: Database (migrations creates `sessions` table)
- **Lifetime**: 120 minutes (2 hours)
- **Encryption**: False (database-stored, no extra encryption needed)
- **Domain**: Null (current domain)

### Cache & Session Tables
Auto-created via migrations, but verify they exist post-migration:
```bash
php artisan migrate --force
# Creates: cache, sessions tables
```

---

## 6. Queue System

### Queue Driver
- **Connection**: database
- **Table**: `jobs` (created by migration)
- **Default queue**: 'default'

### Queue Job Execution
Currently **not used** in application code (no custom jobs defined).

If queue processing added later:
```bash
# Start queue worker (runs in background)
php artisan queue:work --queue=default --timeout=60

# Or as supervisor service (production)
# (See supervisor config example below)
```

---

## 7. Task Scheduling (Cron)

### Laravel Scheduler
Currently **not configured** (no scheduled tasks in `routes/console.php`).

If scheduling added later, add cron entry:
```bash
* * * * * cd /path/to/project && php artisan schedule:run >> /dev/null 2>&1
```

---

## 8. Logging

### Configuration
- **Channel**: `stack`
- **Stack**: `single` (write to `storage/logs/laravel.log`)
- **Level**: `debug` (local) → change to `warning` or `error` (production)
- **Path**: `storage/logs/laravel.log`

### Log Rotation
- Daily rotation (14-day retention default)
- Manual pruning if needed: `php artisan logs:prune`

---

## 9. Web Server Configuration

### Apache 2.4+
**Required Modules**: `mod_rewrite`, `mod_headers`

```apache
<VirtualHost *:80>
    ServerName yourdomain.com
    ServerAlias www.yourdomain.com
    DocumentRoot /var/www/sekolah/public

    <Directory /var/www/sekolah/public>
        AllowOverride All
        Require all granted

        <IfModule mod_rewrite.c>
            RewriteEngine On
            RewriteRule ^(.*)$ index.php/$1 [L]
        </IfModule>
    </Directory>

    <Directory /var/www/sekolah>
        Deny from all
    </Directory>

    ErrorLog ${APACHE_LOG_DIR}/sekolah-error.log
    CustomLog ${APACHE_LOG_DIR}/sekolah-access.log combined
</VirtualHost>

# Enable HTTPS (via LetsEncrypt or other CA)
<VirtualHost *:443>
    ServerName yourdomain.com
    ServerAlias www.yourdomain.com
    DocumentRoot /var/www/sekolah/public

    SSLEngine on
    SSLCertificateFile /etc/ssl/certs/yourdomain.com.crt
    SSLCertificateKeyFile /etc/ssl/private/yourdomain.com.key
    SSLCertificateChainFile /etc/ssl/certs/chain.crt

    # ... same <Directory> config as above ...
</VirtualHost>
```

### Nginx + PHP-FPM
```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    root /var/www/sekolah/public;

    index index.php;

    # Static assets caching
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 7d;
        add_header Cache-Control "public, immutable";
    }

    # Public storage symlink
    location /storage {
        expires 7d;
        add_header Cache-Control "public";
    }

    # PHP routing
    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ \.php$ {
        fastcgi_pass unix:/run/php/php-8.4-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
    }

    error_log /var/log/nginx/sekolah-error.log;
    access_log /var/log/nginx/sekolah-access.log;
}

# HTTPS (via LetsEncrypt)
server {
    listen 443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;
    root /var/www/sekolah/public;

    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;

    # ... same location config as above ...
}

# Redirect HTTP to HTTPS
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    return 301 https://$server_name$request_uri;
}
```

### PHP-FPM Configuration (php-fpm.conf / pool.d/www.conf)
```ini
[www]
user = www-data
group = www-data
listen = /run/php/php-8.4-fpm.sock
listen.owner = www-data
listen.group = www-data
pm = dynamic
pm.max_children = 50
pm.start_servers = 10
pm.min_spare_servers = 5
pm.max_spare_servers = 20
```

---

## 10. HTTPS / SSL Configuration

### LetsEncrypt (Free, Auto-Renewal)
```bash
# Install Certbot
apt-get install certbot python3-certbot-nginx
# or for Apache:
apt-get install certbot python3-certbot-apache

# Generate certificate
certbot certonly --webroot -w /var/www/sekolah/public -d yourdomain.com -d www.yourdomain.com

# Auto-renewal (verify cron)
certbot renew --dry-run
```

### Self-Signed (Development/Testing Only)
```bash
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout /etc/ssl/private/selfsigned.key \
  -out /etc/ssl/certs/selfsigned.crt
```

### HTTPS Enforcement
In `.env`: `APP_URL=https://yourdomain.com`

Add to Laravel middleware or web server redirect HTTP → HTTPS

---

## 11. File Permissions & Ownership

```bash
# Set owner (web server user, usually www-data or nginx)
sudo chown -R www-data:www-data /var/www/sekolah

# Make storage writable
sudo chmod -R 775 /var/www/sekolah/storage
sudo chmod -R 775 /var/www/sekolah/bootstrap/cache

# Public directory
sudo chmod -R 755 /var/www/sekolah/public

# Set umask for new files
sudo setfacl -dR -m u:www-data:rwx /var/www/sekolah/storage
sudo setfacl -dR -m u:www-data:rwx /var/www/sekolah/bootstrap/cache
```

---

## 12. Backup Strategy

### What to Backup
1. **Database** - Primary data
2. **storage/app/public** - User uploads
3. **.env** - Configuration (encrypted/secured)
4. Application code - Optional (in version control)

### Database Backup

**SQLite**:
```bash
# Backup
cp database/database.sqlite database/database.sqlite.backup

# Schedule daily backup
0 2 * * * cp /var/www/sekolah/database/database.sqlite /backups/db-$(date +\%Y\%m\%d).sqlite
```

**MySQL**:
```bash
# Backup
mysqldump -u sekolah_user -p sekolah_prod > sekolah_$(date +%Y%m%d).sql

# Schedule daily backup
0 2 * * * mysqldump -u sekolah_user -p'PASSWORD' sekolah_prod > /backups/sekolah_$(date +\%Y\%m\%d).sql

# Restore
mysql -u sekolah_user -p sekolah_prod < sekolah_20260901.sql
```

**PostgreSQL**:
```bash
# Backup
pg_dump -U sekolah_user sekolah_prod > sekolah_$(date +%Y%m%d).sql

# Schedule
0 2 * * * pg_dump -U sekolah_user sekolah_prod > /backups/sekolah_$(date +\%Y\%m\%d).sql

# Restore
psql -U sekolah_user sekolah_prod < sekolah_20260901.sql
```

### File Backup
```bash
# Backup storage directory
0 3 * * * tar -czf /backups/storage_$(date +\%Y\%m\%d).tar.gz /var/www/sekolah/storage/app/public/

# Backup .env
0 4 * * * cp /var/www/sekolah/.env /backups/.env_backup_$(date +\%Y\%m\%d)
```

---

## 13. Monitoring & Logging

### Application Logging
- **File**: `storage/logs/laravel.log`
- **Rotation**: Daily (14-day retention)
- **Level**: `warning` (production)

### System Monitoring
```bash
# Monitor disk usage
df -h

# Monitor running processes
ps aux | grep php-fpm
ps aux | grep nginx

# Check error logs
tail -f /var/log/nginx/sekolah-error.log
tail -f /var/log/php-fpm.log

# Monitor database
# MySQL: SHOW PROCESSLIST;
# PostgreSQL: SELECT * FROM pg_stat_activity;
```

### Health Check Endpoint (Optional - Not Currently Implemented)
To add a health check endpoint for monitoring, add to `routes/web.php`:
```php
Route::get('/health', function () {
    return response()->json(['status' => 'ok'], 200);
});
```
**Note**: This endpoint is not currently implemented in the application. Add it only if you need uptime monitoring.

---

## 14. Production Deployment Checklist

### Pre-Deployment (One-Time Setup)

#### A. Server Preparation
- [ ] Provision Linux server (Ubuntu 20.04+ / Debian 11+)
- [ ] Install PHP 8.3+, Composer, Node.js 18+, npm/pnpm
- [ ] Install database (MySQL 8.0+ OR PostgreSQL 14+ OR SQLite)
- [ ] Install web server (Apache 2.4+ OR Nginx)
- [ ] Install SSL certificate (LetsEncrypt recommended)
- [ ] Configure firewall (UFW/firewalld): open ports 22 (SSH), 80 (HTTP), 443 (HTTPS)
- [ ] Create application directory: `/var/www/sekolah`
- [ ] Create web server user: `www-data` (Linux default)

#### B. Database Preparation (if MySQL/PostgreSQL)
```bash
# MySQL
mysql -u root -p
> CREATE DATABASE sekolah_prod CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
> CREATE USER 'sekolah_user'@'localhost' IDENTIFIED BY 'SECURE_PASSWORD';
> GRANT ALL PRIVILEGES ON sekolah_prod.* TO 'sekolah_user'@'localhost';
> FLUSH PRIVILEGES;
> EXIT;

# PostgreSQL
sudo -u postgres psql
> CREATE DATABASE sekolah_prod;
> CREATE USER sekolah_user WITH PASSWORD 'SECURE_PASSWORD';
> GRANT ALL PRIVILEGES ON DATABASE sekolah_prod TO sekolah_user;
> \q
```

#### C. Repository Deployment (First Time)
```bash
# Clone or upload code to /var/www/sekolah
cd /var/www/sekolah
git clone https://github.com/yourorg/sekolah.git .
# OR upload via SCP/rsync

# Set ownership
sudo chown -R www-data:www-data /var/www/sekolah
sudo chmod -R 755 /var/www/sekolah
sudo chmod -R 775 /var/www/sekolah/storage
sudo chmod -R 775 /var/www/sekolah/bootstrap/cache
```

#### D. PHP/Composer Setup (First Time)
```bash
cd /var/www/sekolah

# Install PHP dependencies
composer install --optimize-autoloader --no-dev

# Copy .env from template
cp .env.example .env

# Generate application key
php artisan key:generate

# Configure .env with production values
nano .env
# SET:
# APP_ENV=production
# APP_DEBUG=false
# APP_URL=https://yourdomain.com
# DB_CONNECTION=mysql (or pgsql, sqlite)
# DB_HOST=localhost
# DB_DATABASE=sekolah_prod
# DB_USERNAME=sekolah_user
# DB_PASSWORD=[SECURE_PASSWORD]
# ADMIN_EMAIL=admin@yourdomain.com
# ADMIN_PASSWORD=[SECURE_PASSWORD]
# MAIL_MAILER=smtp
# MAIL_HOST=[your-mail-server]
# ... other secrets ...
```

#### E. Node/Vite Setup (First Time)
```bash
cd /var/www/sekolah

# Install npm dependencies
npm install

# Build production assets
npm run build

# Verify public/build created
ls -la public/build/
```

#### F. Database Migration (First Time)
```bash
cd /var/www/sekolah

# Run migrations (creates all tables)
php artisan migrate --force

# Seed admin user and base data
php artisan db:seed --force

# Verify database
php artisan tinker
> DB::table('users')->count();
> DB::table('school_profiles')->count();
```

#### G. Storage Symlink (First Time)
```bash
cd /var/www/sekolah

# Create public/storage → storage/app/public symlink
php artisan storage:link

# Verify symlink
ls -la public/ | grep storage
```

#### H. Web Server Configuration
**Apache**:
```bash
# Enable rewrite module
sudo a2enmod rewrite
sudo a2enmod headers

# Create site config (from section 9 above)
sudo nano /etc/apache2/sites-available/sekolah.conf
sudo a2ensite sekolah

# Verify config
sudo apache2ctl configtest

# Restart
sudo systemctl restart apache2
```

**Nginx**:
```bash
# Create site config (from section 9 above)
sudo nano /etc/nginx/sites-available/sekolah
sudo ln -s /etc/nginx/sites-available/sekolah /etc/nginx/sites-enabled/

# Verify config
sudo nginx -t

# Restart
sudo systemctl restart nginx
```

#### I. HTTPS Configuration
```bash
# LetsEncrypt with Certbot
sudo certbot certonly --webroot -w /var/www/sekolah/public \
  -d yourdomain.com -d www.yourdomain.com

# Update web server config with SSL cert paths
# Then test HTTPS access

# Setup auto-renewal
sudo systemctl enable certbot.timer
sudo systemctl start certbot.timer
```

#### J. Cache Clearing (First Time)
```bash
cd /var/www/sekolah

php artisan cache:clear
php artisan config:cache
php artisan view:cache
php artisan route:cache
```

#### K. Monitoring & Logging Setup
```bash
# Create log rotation config
sudo nano /etc/logrotate.d/sekolah
# Content:
# /var/www/sekolah/storage/logs/*.log {
#     daily
#     rotate 14
#     compress
#     delaycompress
#     missingok
#     notifempty
#     create 0644 www-data www-data
# }

# Setup cron for schedule/queue (if used later)
sudo nano /etc/cron.d/sekolah
# * * * * * www-data cd /var/www/sekolah && php artisan schedule:run >> /dev/null 2>&1
```

#### L. Backup Setup
```bash
# Create backup directory
sudo mkdir -p /backups/sekolah
sudo chown www-data:www-data /backups/sekolah

# Add backup cron (from section 12)
sudo nano /etc/cron.d/sekolah-backup
```

---

### Per-Deployment (Every Release)

1. **Pull/Upload Code**
```bash
cd /var/www/sekolah
git pull origin main
# OR upload new code via SCP/rsync
```

2. **Install PHP Dependencies** (if composer.lock changed)
```bash
composer install --optimize-autoloader --no-dev
```

3. **Build Frontend Assets** (always)
```bash
npm install
npm run build
```

4. **Clear Caches**
```bash
php artisan cache:clear
php artisan config:cache
php artisan view:cache
php artisan route:cache
```

5. **Test Deployment**
```bash
php artisan tinker
> config('app.debug');   # Should be false
> config('app.env');      # Should be 'production'
```

6. **Verify**
   - [ ] HTTPS working (curl https://yourdomain.com)
   - [ ] Public pages render
   - [ ] Admin login accessible
   - [ ] Database connected
   - [ ] Logs updating in real-time

---

### Database Migration-Only (When Schema Changes)

Only run if migrations are added:

```bash
# First: Review new migrations
ls -la database/migrations/

# Backup database first
mysqldump -u sekolah_user -p sekolah_prod > backup_pre_migration.sql

# Run migrations
php artisan migrate --force

# Verify
php artisan migrate:status

# Seed new data (if seeders added)
php artisan db:seed --force
```

---

## 15. Command Reference by Phase

### First-Time Server Setup (One-Time)
```bash
# Server OS setup
apt-get update && apt-get upgrade -y
apt-get install -y php8.4 php8.4-fpm php8.4-cli php8.4-pdo-mysql php8.4-json php8.4-xml php8.4-gd php8.4-fileinfo
apt-get install -y nginx mysql-server
apt-get install -y nodejs npm
apt-get install -y git curl wget
apt-get install -y certbot python3-certbot-nginx

# Create database (MySQL example)
mysql -u root -p << EOF
CREATE DATABASE sekolah_prod CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'sekolah_user'@'localhost' IDENTIFIED BY '[SECURE_PASSWORD]';
GRANT ALL PRIVILEGES ON sekolah_prod.* TO 'sekolah_user'@'localhost';
FLUSH PRIVILEGES;
EOF

# Deploy application
sudo mkdir -p /var/www/sekolah
cd /var/www/sekolah
git clone https://github.com/yourorg/sekolah.git .

# First-time app setup
sudo chown -R www-data:www-data /var/www/sekolah
sudo chmod -R 775 /var/www/sekolah/storage
sudo chmod -R 775 /var/www/sekolah/bootstrap/cache
cp .env.example .env
# EDIT .env with production values
composer install --optimize-autoloader --no-dev
npm install && npm run build
php artisan key:generate
php artisan migrate --force
php artisan db:seed --force
php artisan storage:link
php artisan cache:clear && php artisan config:cache

# Setup SSL
certbot certonly --webroot -w /var/www/sekolah/public -d yourdomain.com -d www.yourdomain.com

# Start services
sudo systemctl restart nginx
sudo systemctl restart php8.4-fpm
```

### Every Deployment (Pull Latest Code)
```bash
cd /var/www/sekolah
git pull origin main
composer install --optimize-autoloader --no-dev
npm install && npm run build
php artisan cache:clear && php artisan config:cache
# Verify: curl https://yourdomain.com
```

### Database Schema Migration (When New Migrations Exist)
```bash
cd /var/www/sekolah
# BACKUP FIRST
mysqldump -u sekolah_user -p sekolah_prod > backup_$(date +%Y%m%d).sql
# Then migrate
php artisan migrate --force
# Verify
php artisan tinker
```

---

## 16. Troubleshooting Quick Reference

| Issue | Diagnosis | Solution |
|-------|-----------|----------|
| **500 Internal Server Error** | Check `storage/logs/laravel.log` | Run `php artisan cache:clear` |
| **Assets not loading (404 on /build)** | Missing build files | Run `npm run build` again |
| **Database connection error** | `.env` DB credentials wrong | Verify DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DATABASE |
| **Permission denied on storage** | Wrong ownership/permissions | `sudo chown -R www-data:www-data /var/www/sekolah/storage` |
| **Admin login fails** | No admin user or wrong password | Run `php artisan db:seed --force` |
| **Uploaded files not accessible** | Storage symlink missing | Run `php artisan storage:link` |
| **Session/Cache not working** | Sessions/cache tables not created | Run `php artisan migrate --force` |
| **PHP module missing** | `php -m` shows missing module | Install: `apt-get install php8.4-{modulename}` |

---

## 17. Security Checklist

- [ ] `.env` file NOT in version control (in `.gitignore`)
- [ ] `.env` file permissions 600 (only owner readable)
- [ ] `APP_DEBUG=false` in production
- [ ] `APP_KEY` unique and secure
- [ ] Database password complex (16+ chars, mixed case/numbers/symbols)
- [ ] HTTPS enforced (HTTP → HTTPS redirect)
- [ ] Database daily backups enabled
- [ ] SSH key-based auth only (no password login)
- [ ] Firewall configured (only 22, 80, 443 open)
- [ ] Regular security updates applied
- [ ] Logs reviewed for errors/warnings
- [ ] Storage directory NOT publicly writable (except uploads subdirectory)

---

## 18. Post-Deployment Verification

```bash
# Test endpoint access
curl -I https://yourdomain.com                    # Should return 200/301
curl -I https://yourdomain.com/admin              # Should redirect to login
curl -I https://yourdomain.com/health            # Custom health check if added

# Verify application state
cd /var/www/sekolah
php artisan tinker

# Check configuration
> config('app.env');          # 'production'
> config('app.debug');         # false
> config('app.url');           # 'https://yourdomain.com'
> config('database.default');  # 'mysql'
> DB::connection()->getDatabaseName();  # 'sekolah_prod'
> DB::table('users')->count(); # Should be > 0
> exit()

# Check filesystem
ls -la /var/www/sekolah/public/storage/
ls -la /var/www/sekolah/storage/logs/

# Check logs
tail -50 /var/www/sekolah/storage/logs/laravel.log
```

---

## Summary

- **Development stack**: PHP 8.3+, Node 18+, Vite, React 19, Laravel 13
- **Production-ready** with MySQL/PostgreSQL/SQLite database options
- **Database-backed** caching, sessions, and queue system
- **File storage** via local filesystem with public symlink
- **Security**: HTTPS mandatory, APP_DEBUG=false, secure credentials
- **Deployment**: One-time server setup, then per-release code pull + asset build
- **Backup**: Daily database + storage backups recommended
- **Monitoring**: Log file (`laravel.log`), error tracking, uptime monitoring

No deployment has been executed. This is a planning document only.
