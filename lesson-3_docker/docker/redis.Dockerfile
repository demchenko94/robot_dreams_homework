FROM demchenko94/custom-node-lts:latest AS builder

WORKDIR /app/redis

# Copy package.json and yarn.lock to install dependencies
COPY ../redis-like/package.json  ./
COPY ../redis-like/yarn.lock  ./

RUN yarn install


# Copy the rest of the application code and build the project
COPY ../redis-like/src ./src
COPY ../redis-like/tsconfig.json  ./
COPY ../redis-like/eslint.config.mjs ./
COPY ../redis-like/.env ./

RUN yarn build
RUN yarn lint


FROM demchenko94/custom-node-lts:latest

WORKDIR /app/redis

# Copy the built application and dependencies from the builder stage
COPY --from=builder /app/redis/node_modules    ./node_modules
COPY --from=builder /app/redis/build           ./build
COPY --from=builder /app/redis/package.json    ./
COPY --from=builder /app/redis/.env            ./

EXPOSE 4000

CMD ["node", "build/index.js"]
