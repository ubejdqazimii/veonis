# Veonis website and administration

This repository contains two applications:

- `/` — Next.js 16 public website
- `/backend` — Laravel 13 + Filament 5 content administration and mini CRM

The public website reads published page, blog and navigation content from Laravel
when `CMS_API_URL` is configured. It falls back to the checked-in TypeScript content
if the CMS cannot be reached, keeping the website resilient during backend maintenance.

Contact forms post to the same-origin Next.js route `/api/contact-requests`, which
proxies validated submissions to Laravel and stores them in the CRM.

## Public website

Copy `.env.example` to `.env.local`, set the Laravel URL, then run:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). See
[`backend/README.md`](backend/README.md) for administration setup and deployment.

## Verification

```bash
npm run build -- --webpack
cd backend
php artisan test
vendor/bin/pint --test
```

## Deployment

Deploy the Laravel application first, run its migrations and seed, and set its
public URL as `CMS_API_URL` in the Next.js hosting environment. The website
revalidates managed content every 60 seconds.

The included `backend/Dockerfile` is suitable for a container host. Configure a
persistent MySQL database and object storage before production use.
