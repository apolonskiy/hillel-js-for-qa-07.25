FROM node:24.5.0-slim

COPY . ./e2e

RUN npx -y playwright@1.54.0 install --with-deps


WORKDIR e2e
