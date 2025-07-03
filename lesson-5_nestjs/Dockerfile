FROM node:20-alpine AS builder

WORKDIR /app

COPY ./tea-tracker/package.json ./
COPY ./tea-tracker/yarn.lock ./

RUN  yarn install

COPY ./tea-tracker/src ./src
COPY ./tea-tracker/nest-cli.json ./
COPY ./tea-tracker/tsconfig.json ./
COPY ./tea-tracker/tsconfig.build.json ./

RUN yarn run build


FROM alpine:3.19

RUN apk add --no-cache nodejs tini \
    && adduser -D -h /home/node node

WORKDIR /home/node
USER node

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./dist

EXPOSE 3000

ENTRYPOINT ["/sbin/tini","--"]

CMD ["node","dist/main.js"]
