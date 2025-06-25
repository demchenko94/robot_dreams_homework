FROM demchenko94/custom-node-lts:latest

WORKDIR /app/kv-server

# Copy package.json and yarn.lock to install dependencies
COPY ../kv-server/package.json  ./
COPY ../kv-server/yarn.lock  ./

RUN yarn install

EXPOSE 3000

CMD ["yarn", "run", "dev"]
