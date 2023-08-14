# Member-manage API

Member-manage API built with Laravel and React. It includes:

-   An auth API, using [tymon/jwt-auth](https://github.com/tymondesigns/jwt-auth) to manage the JSON Web Tokens.
-   Routing with react-router (private, public and split routes).
-   [Feature tests](https://github.com/devinsays/laravel-react-bootstrap/blob/master/docs/automated-testing.md).
-   [Database seeding](https://github.com/devinsays/laravel-react-bootstrap/blob/master/docs/database-seeds.md).
-   A base ApiController to help return [standardized responses](https://github.com/devinsays/laravel-react-bootstrap/blob/master/docs/api-format.md).
-   Bootstrap for styling.



- pdf convert


#### Update these settings in the .env file:

-   DB_DATABASE (your local database, i.e. "todo")
-   DB_USERNAME (your local db username, i.e. "root")
-   DB_PASSWORD (your local db password, i.e. "")
-   HASHIDS_SALT (use the app key or match the variable used in production)

#### Install PHP dependencies:

```bash
composer install
```

_If you don't have Composer installed, [instructions here](https://getcomposer.org/)._

#### Generate an app key:

```bash
php artisan key:generate
```

#### Generate JWT keys for the .env file:

```bash
php artisan jwt:secret
```

#### Run the database migrations:

```bash
php artisan migrate
```

#### Database Seeding

If you need sample data to work with, you can seed the database:

```
php artisan migrate:refresh --seed --force
```

After seeding the database, you can log in with these credentials:

Email: `admin@test.com`
Password: `admin123!@#`
