# Base image
FROM node:lts as base

ENV DEBIAN_FRONTEND=noninteractive

WORKDIR /app

RUN apt-get update -y
RUN apt-get upgrade -y

ENTRYPOINT ["sh", "-c", "\
    npm i && \
    npm run dev"]
