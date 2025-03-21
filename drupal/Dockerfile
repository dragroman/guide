FROM drupal:11-apache

# Установка дополнительных PHP расширений
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg-dev \
    libpq-dev \
    libzip-dev \
    libwebp-dev \
    && rm -rf /var/lib/apt/lists/* \
    && docker-php-ext-configure gd --with-jpeg --with-webp  \
    && docker-php-ext-install -j$(nproc) gd pdo_mysql zip

# Настройка PHP для Drupal
RUN { \
    echo 'memory_limit=256M'; \
    echo 'upload_max_filesize=64M'; \
    echo 'post_max_size=64M'; \
    echo 'max_execution_time=180'; \
    echo 'max_input_vars=1500'; \
    echo 'output_buffering=on'; \
} > /usr/local/etc/php/conf.d/drupal-recommended.ini

# Включаем нужные модули Apache
RUN a2enmod rewrite ssl

# Очистка существующей директории Drupal
RUN rm -rf /var/www/html
RUN mkdir -p /var/www/html/drupal
RUN mkdir -p /var/www/html/drupal/private
RUN mkdir -p /var/www/html/drupal/tmp
COPY . /var/www/html/drupal

# Изменение корневой директории Apache
RUN sed -i 's|/var/www/html|/var/www/html/drupal/web|g' /etc/apache2/sites-available/000-default.conf
RUN sed -i 's|/var/www/html|/var/www/html/drupal/web|g' /etc/apache2/sites-available/default-ssl.conf

# Обновление DocumentRoot в apache2.conf
RUN sed -i 's|/var/www/html|/var/www/html/|g' /etc/apache2/apache2.conf

RUN a2enmod rewrite && service apache2 restart

WORKDIR /var/www/html/drupal
RUN composer install

# Установка прав на директории
RUN chown -R www-data:www-data /var/www/