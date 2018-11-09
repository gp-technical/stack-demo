FROM node as build

ARG NPM_TOKEN

RUN mkdir -p /build/bundle

COPY ./app /source/app

WORKDIR /source/app

RUN mv src/index.live.html /build/index.html && \
    echo //registry.npmjs.org/:_authToken=${NPM_TOKEN} > .npmrc && \
    yarn install && \
    yarn run production

COPY ./api /source/api

WORKDIR /source/api

RUN echo //registry.npmjs.org/:_authToken=${NPM_TOKEN} > .npmrc && \
    yarn install && \
    yarn run production && \
    mv node_modules /build && \
    mv /source/api/package.json /build

FROM node

COPY --from=build /build /build
COPY ./app-runner.sh /build/app-runner.sh
COPY ./process.json /build/process.json

WORKDIR /build

RUN yarn global add pm2 && \
    chmod +x app-runner.sh

WORKDIR /build

CMD ["/build/app-runner.sh"]
