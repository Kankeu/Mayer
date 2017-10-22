.PHONY: run install nodejs watch dev queue vue

install: vendor composer.json 
	composer install

composer.lock: composer.json
	composer update

vue: package.json
	npm install

redis: 
	redis-server&

queue: artisan
	php artisan queue:work --tries=3&

nodejs: laravel-echo-server.json install 
	laravel-echo-server start&

watch: install
	npm run watch&

dev: install nodejs watch redis queue vue
	php artisan serve

run: install nodejs watch
	php artisan serve

comp: 
	npm run dev
