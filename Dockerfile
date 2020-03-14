FROM wordpress

RUN sed -i 's/80/8080/' /etc/apache2/ports.conf /etc/apache2/sites-enabled/000-default.conf
RUN mv "$PHP_INI_DIR"/php.ini-development "$PHP_INI_DIR"/php.ini

# COPY THE FILES
COPY ./wordpress /var/www/html
COPY ./docker/install_wordpress.sh /usr/local/bin/install_wordpress
COPY ./docker/migratedb_import.sh /usr/local/bin/migratedb_import
COPY ./docker/airwaitress.wordpress.xml /var/www/airwaitress.wordpress.xml
COPY ./docker/plugins /var/www/plugins

COPY php.ini "$PHP_INI_DIR"/php.ini

# install_wordpress.sh & misc. dependencies
RUN apt-get update; \
	apt-get install -yq mariadb-client netcat sudo less git unzip

# wp-cli
RUN curl -sL https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar -o wp; \
	chmod +x wp; \
	mv wp /usr/local/bin/; \
	mkdir /var/www/.wp-cli; \
	chown www-data:www-data /var/www/.wp-cli

# composer
RUN curl -sL https://raw.githubusercontent.com/composer/getcomposer.org/master/web/installer | php; \
	mv composer.phar /usr/local/bin/composer; \
	mkdir /var/www/.composer; \
	chown www-data:www-data /var/www/.composer


# phpunit, phpcs, wpcs
RUN sudo -u www-data composer global require \
	phpunit/phpunit \
	dealerdirect/phpcodesniffer-composer-installer \
	phpcompatibility/phpcompatibility-wp \
	automattic/vipwpcs

#nsure wordpress has permissions
RUN chown -R www-data:www-data /var/www/html
# include composer-installed executables in $PATH
#copy ini file
ENV PATH="/var/www/.composer/vendor/bin:${PATH}"

