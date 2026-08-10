#!/usr/bin/env bash

set -euo pipefail

PHP_BIN="${PHP_BIN:-/usr/local/php84/bin/php}"
COMPOSER_BIN="${COMPOSER_BIN:-/usr/local/php84/bin/composer}"
APP_DIR="${APP_DIR:-$HOME/www/adcms.veonissuisse.ch}"

cd "$APP_DIR"

if [[ ! -f .env ]]; then
    echo "Missing $APP_DIR/.env. Copy deploy/hostpoint.env.example to .env and configure it first." >&2
    exit 1
fi

if grep -Eq '(CHANGE_ME|HOSTPOINT_)' .env; then
    echo "The production .env still contains placeholder values." >&2
    exit 1
fi

if ! grep -Eq '^APP_KEY=base64:.+' .env; then
    echo "APP_KEY is missing. Run: /usr/local/php84/bin/php artisan key:generate" >&2
    exit 1
fi

"$COMPOSER_BIN" install --no-dev --optimize-autoloader --no-interaction
"$PHP_BIN" artisan migrate --force
"$PHP_BIN" artisan db:seed --force
"$PHP_BIN" artisan storage:link --force
"$PHP_BIN" artisan optimize

chmod -R u+rwX storage bootstrap/cache

echo "Veonis Administration deployed: https://adcms.veonissuisse.ch/admin"
