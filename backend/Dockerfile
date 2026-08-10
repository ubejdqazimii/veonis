FROM dunglas/frankenphp:php8.4-bookworm

RUN install-php-extensions pdo_mysql pdo_sqlite intl zip opcache

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /app
COPY . .

RUN composer install --no-dev --optimize-autoloader --no-interaction \
    && mkdir -p storage/framework/cache storage/framework/sessions storage/framework/views storage/logs \
    && chown -R www-data:www-data storage bootstrap/cache

ENV APP_ENV=production
ENV APP_DEBUG=false
ENV SERVER_NAME=:8080

CMD ["sh", "-c", "php artisan migrate --force && php artisan storage:link --force && frankenphp run --config /app/Caddyfile"]
