FROM alpine:3.19

RUN apk add --no-cache nodejs npm tini && \
    npm install yarn -g && \
    adduser -D -h /home/node node && \
    mkdir /app && chown node /app

USER node
WORKDIR /app
CMD ["node","--version"]
