# Base image
FROM node:lts as base

ENV DEBIAN_FRONTEND=noninteractive
ARG JWT_SECRET=;
ARG DB_NAME=;
ARG DB_USER=;
ARG DB_PASSWORD=;
ARG DB_ROOT_PASSWORD=;
ARG XRP_WALLET_SEED=;
ARG XAMAN_API_KEY=;
ARG XAMAN_SECRET_KEY=;
ARG SMTP_HOST=;
ARG SMTP_PORT=;
ARG SMTP_USER=;
ARG SMTP_PASSWORD=;

WORKDIR /app

RUN apt-get update -y
RUN apt-get upgrade -y
RUN npm i -g nodemon

ENTRYPOINT ["sh", "-c", "\
    npm i && \
    npm start"]
