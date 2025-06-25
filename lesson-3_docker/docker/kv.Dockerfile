FROM demchenko94/custom-node-lts:latest AS builder

WORKDIR /app/kv-server

# Copy package.json and yarn.lock to install dependencies
COPY ../kv-server/package.json  ./
COPY ../kv-server/yarn.lock  ./

RUN yarn install


# Copy the rest of the application code and build the project
COPY ../kv-server/src ./src
COPY ../kv-server/tsconfig.json  ./
COPY ../kv-server/eslint.config.mjs ./
COPY ../kv-server/.env ./

RUN yarn build
RUN yarn lint


FROM demchenko94/custom-node-lts:latest

WORKDIR /app/kv-server

# Copy the built application and dependencies from the builder stage
COPY --from=builder /app/kv-server/node_modules    ./node_modules
COPY --from=builder /app/kv-server/build           ./build
COPY --from=builder /app/kv-server/package.json    ./
COPY --from=builder /app/kv-server/.env            ./

EXPOSE 3000

CMD ["node", "build/index.js"]
