FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev && npm i


COPY src ./src
COPY build.mjs ./

RUN node build.mjs


FROM alpine:3.19

RUN apk add --no-cache nodejs tini \
    && adduser -D -h /home/node node

WORKDIR /home/node
USER node

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/build ./build
COPY --from=builder /app/package.json ./build


EXPOSE 3000

ENTRYPOINT ["/sbin/tini","--"]

CMD ["node","build/server.mjs"]
