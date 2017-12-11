# Mayer

[![Build Status](https://travis-ci.org/Grafikart/PSR15-CsrfMiddleware.svg?branch=master)](https://travis-ci.org/Grafikart/PSR15-CsrfMiddleware) [![Coverage Status](https://coveralls.io/repos/github/Grafikart/PSR15-CsrfMiddleware/badge.svg?branch=master)](https://coveralls.io/github/Grafikart/PSR15-CsrfMiddleware?branch=master)

This middleware check every POST, PUT or DELETE request for a CSRF token.
Token are persisted using an ArrayAccess compatible Session and are generated on demand.

## Installation

```bash
composer require kankeu/mayer
```

## How to use it

```php
make run
// Start a server
```


