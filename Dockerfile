ARG NODE_VERSION=10

FROM node:$NODE_VERSION as npmrc

ARG NPM_TOKEN

RUN echo "//registry.npmjs.org/:_authToken=${NPM_TOKEN}" > .npmrc

RUN echo $NPM_TOKEN

FROM node:$NODE_VERSION as app

RUN echo "Building app on ${NODE_VERSION}"

WORKDIR /source/app

COPY ./app/package.json /source/app/package.json
COPY ./app/yarn.lock /source/app/yarn.lock
COPY --from=npmrc .npmrc /source/app/.npmrc

RUN yarn

COPY ./app /source/app

RUN yarn run production

FROM node:$NODE_VERSION as api

RUN echo "Building api on ${NODE_VERSION}"

WORKDIR /source/api

COPY ./api/package.json /source/api/package.json
COPY ./api/yarn.lock /source/api/yarn.lock
COPY --from=npmrc .npmrc /source/api/.npmrc

RUN yarn add newrelic

COPY ./api /source/api

RUN yarn run production

FROM node:$NODE_VERSION-alpine

RUN yarn global add pm2

RUN apk add nmap

COPY --from=app /build /build
COPY --from=api /build /build
COPY --from=api /source/api/node_modules /build/node_modules
COPY ./app-runner.sh /build/app-runner.sh
COPY ./process.json /build/process.json
COPY ./app/src/index.live.html /build/index.html
COPY ./api/src/assets /build/assets

WORKDIR /build

RUN sed -i "2s/^/require('newrelic');\n/" index.js

RUN chmod +x app-runner.sh

RUN echo "Running app on ${NODE_VERSION}-alpine"

CMD ["/build/app-runner.sh"]
