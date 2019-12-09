FROM wordpress

RUN sed -i 's/80/8080/' /etc/apache2/ports.conf /etc/apache2/sites-enabled/000-default.conf
RUN mv "$PHP_INI_DIR"/php.ini-development "$PHP_INI_DIR"/php.ini
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

EXPOSE 8080

FROM node

USER node
RUN mkdir -p /home/node/app
RUN sudo chmod -R 777 /home/node
WORKDIR /home/node/app

COPY --chown=node:node package.json .
COPY --chown=node:node yarn.lock .

RUN yarn --pure-lockfile

COPY --chown=node:node . .

EXPOSE 4040
