#!/bin/bash
set -e

service mysql start

sleep 5

MYSQL_PWD="${DB_ROOT_PASSWORD}" mysql -u root -p"${DB_ROOT_PASSWORD}" -D "${DB_NAME}" < /docker-entrypoint/init.sql

exec mysqld --bind-address=0.0.0.0
