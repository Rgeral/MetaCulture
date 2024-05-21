FROM debian:bookworm

# Define environment variables
ENV DEBIAN_FRONTEND=noninteractive
ARG DB_NAME=;
ARG DB_USER=;
ARG DB_PASSWORD=;
ARG DB_ROOT_PASSWORD=;

RUN apt-get -yqq update

# Install mariadb
RUN apt-get -yqq install -y mariadb-server;

# Create directory for mariadb
RUN mkdir -p /var/run/mysql;
RUN chown mysql:mysql /var/run/mysql;

# Copy init sql script
COPY init.sql /init.sql

# Create database
RUN service mariadb start && \
    mysql -uroot -e "CREATE DATABASE ${DB_NAME};" && \
    mysql -uroot -e "CREATE USER '${DB_USER}'@'%' IDENTIFIED BY '${DB_PASSWORD}';" && \
    mysql -uroot -e "GRANT ALL PRIVILEGES ON ${DB_NAME}.* TO '${DB_USER}'@'%';" && \
    mysql -uroot "${DB_NAME}" < /init.sql  && \
    mysql -u root -e "ALTER USER 'root'@'localhost' IDENTIFIED BY '${DB_ROOT_PASSWORD}';"
RUN service mariadb stop

CMD ["su", "mysql", "-s", "/bin/sh", "-c", "mysqld --bind-address=0.0.0.0"]