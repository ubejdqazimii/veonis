# Hostpoint deployment: adcms.veonissuisse.ch

## 1. Create the website and subdomain

In the Hostpoint Control Panel:

1. Open **Services > Websites**.
2. Choose **Create a website**.
3. Enter `adcms` and select `veonissuisse.ch`.
4. Choose **Apache with PHP**.
5. Set the application directory to `www/adcms.veonissuisse.ch` and the
   website document root to `www/adcms.veonissuisse.ch/public`.
6. Select PHP 8.4 in **Web settings**.

Only the Laravel `public` directory may be exposed as the document root.

## 2. Create the MySQL database

Create a database and database user in **Databases**. For this Hostpoint
account, use the internal database hostname shown in the control panel:

```text
epipuxan.mysql.db.internal
```

Do not enable external database access; Laravel connects from the same Hostpoint
account.

## 3. Enable SSH

Enable SSH under **Advanced > SSH Access** and add an SSH key. Connect with the
main hosting account:

```bash
ssh HOSTPOINT_USERNAME@HOSTPOINT_USERNAME.ssh.cloud.hostpoint.ch
```

Hostpoint provides PHP 8.4 and Composer at:

```text
/usr/local/php84/bin/php
/usr/local/php84/bin/composer
```

## 4. Upload the Laravel application

From the repository root on the development machine:

```bash
rsync -az \
  --exclude='.env' \
  --exclude='vendor/' \
  --exclude='node_modules/' \
  --exclude='storage/logs/*' \
  backend/ HOSTPOINT_USERNAME@HOSTPOINT_USERNAME.ssh.cloud.hostpoint.ch:www/adcms.veonissuisse.ch/
```

## 5. Configure and deploy

On Hostpoint:

```bash
cd ~/www/adcms.veonissuisse.ch
cp deploy/hostpoint.env.example .env
/usr/local/php84/bin/php artisan key:generate
```

Edit `.env` and replace every placeholder with the database and administrator
credentials. For the first deployment only, run:

```bash
chmod +x deploy/hostpoint-deploy.sh
INITIAL_DEPLOY=1 ./deploy/hostpoint-deploy.sh
```

For every later code update, run the script without `INITIAL_DEPLOY=1`:

```bash
./deploy/hostpoint-deploy.sh
```

This is important: the initial seed creates the administrator and imports the
website content. Later deployments must not seed again, because doing so could
replace content edited through the dashboard.

Open:

```text
https://adcms.veonissuisse.ch/admin
```

## 6. Connect the public website

Set this environment variable in the Next.js/Vercel project and redeploy:

```dotenv
CMS_API_URL=https://adcms.veonissuisse.ch
```

After deployment, test:

```text
https://adcms.veonissuisse.ch/up
https://adcms.veonissuisse.ch/api/v1/pages/de/about-veonis
https://veonissuisse.ch/de/contact
```

The content API is cached for 60 seconds. The contact page submits through the
Next.js proxy and stores requests in the Hostpoint CRM database.
