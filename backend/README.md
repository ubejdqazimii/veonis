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
- First-party analytics with weekly and monthly statistics for pages, sessions, acquisition, geography, technology and engagement
- Hidden, mobile-first digital business cards with direct URLs and downloadable phone contacts
- Live visitor presence with current page, country, city, device and browser
- Country and device charts with page-view and unique-session breakdowns

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
- `POST /api/v1/analytics`

Contact submissions are validated, rate-limited and protected with a honeypot.
IP addresses are not stored directly; only an application-keyed hash is retained.
Analytics follows the same privacy approach: it stores an application-keyed
visitor hash and aggregated browser/location attributes, never a raw IP address.

## Quality checks

```bash
php artisan test
vendor/bin/pint --test
```

## Lead campaigns

Super admins manage **Lead campaigns** and **Campaign leads** in the admin menu.
Create a campaign with a title, unique URL slug, main description, one or more
named giveaways with descriptions and individual pictures (JPEG, PNG or WebP, up to 5 MB), and participation terms. Campaigns start as
drafts. Publish when ready, then copy the campaign link from the list. Public
pages use `/campaign/{slug}`; slugs are fixed after creation to preserve links.
Unpublishing disables both the public page and new submissions immediately.

The shared form collects first name, surname, Swiss postcode, city, email,
mobile number and birth year. The required checkbox records acceptance of the
terms/privacy notice and permission for email or telephone contact. Each lead
stores its campaign relationship, campaign title and URL snapshot, accepted terms,
consent wording and timestamp. Changing campaign details requires visitors with
an older page to reload before submitting. Duplicate email submissions within
one campaign return confirmation without creating another lead. Campaign leads
can be filtered by campaign and marked new/contacted/closed.

Deployment: deploy the backend and run `php artisan migrate --force` followed by
`php artisan optimize` before deploying the frontend. No campaign is seeded or
published automatically. Configure `CMS_API_URL` for the frontend as usual.
Campaign forms do not change the existing homepage or `/home-neu` preview.

Validation: `php artisan test --filter=CampaignTest`.

Use **Duplicate** on a campaign to choose a new title and URL and copy its content, pictures and terms into an unpublished draft. Leads are never copied. Individual giveaway entries can also be cloned in the editor. The **VORLAGE – Ihre Giveaway-Kampagne** draft is a reusable starting point; replace its sample text, supply real pictures, and complete the terms before publishing.
