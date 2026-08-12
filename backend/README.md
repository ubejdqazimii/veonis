# Veonis Administration

Laravel 13 and Filament 5 power the Veonis content administration and mini CRM.

## What the dashboard manages

- German and English website pages, SEO, hero content and reorderable sections
- Cards, checklists, process steps, calls to action and profile images
- Localized blog articles and navigation
- Top-bar email, phone and additional contact links
- LinkedIn, Instagram, Facebook and additional social profiles
- Draft and published states
- Contact requests with status, priority, owner, notes and source/privacy metadata
- User accounts, account activation, password changes and role-based privileges

Super admins have access to the complete dashboard and user management. Blog
editors can only create, edit and publish blog articles; destructive blog
actions and every other dashboard resource remain restricted to super admins.

The admin is available at `/admin`. Public JSON endpoints live under `/api/v1`.

The production target is `https://adcms.veonissuisse.ch`. See
[`deploy/HOSTPOINT.md`](deploy/HOSTPOINT.md) for the Hostpoint-specific setup.

## Local setup

Requirements: PHP 8.2 or newer, Composer, Node.js for the separate Next.js frontend.

```bash
cp .env.example .env
composer install
php artisan key:generate
php artisan migrate --seed
php artisan storage:link
php artisan make:filament-user
php artisan serve
```

The seed imports all existing localized website content from
`database/data/website-content.json`. It is safe to run repeatedly because pages,
articles and navigation are upserted by their stable keys.

## Production environment

Set at minimum:

```dotenv
APP_ENV=production
APP_DEBUG=false
APP_URL=https://admin.example.com
FRONTEND_URLS=https://www.example.com
DB_CONNECTION=mysql
DB_HOST=...
DB_DATABASE=...
DB_USERNAME=...
DB_PASSWORD=...
FILESYSTEM_DISK=public
ADMIN_NAME="Veonis Administrator"
ADMIN_EMAIL=...
ADMIN_PASSWORD=...
```

Run deployment commands:

```bash
composer install --no-dev --optimize-autoloader
php artisan migrate --force
php artisan db:seed --class=WebsiteContentSeeder --force
php artisan storage:link
php artisan optimize
```

Use persistent object storage such as S3 instead of the `public` disk when the
hosting platform has an ephemeral filesystem.

## API

- `GET /api/v1/pages/{locale}/{key}`
- `GET /api/v1/blog-posts/{locale}`
- `GET /api/v1/blog-posts/{locale}/{slug}`
- `GET /api/v1/navigation/{locale}`
- `GET /api/v1/site-settings`
- `POST /api/v1/contact-requests`

Contact submissions are validated, rate-limited and protected with a honeypot.
IP addresses are not stored directly; only an application-keyed hash is retained.

## Quality checks

```bash
php artisan test
vendor/bin/pint --test
```
