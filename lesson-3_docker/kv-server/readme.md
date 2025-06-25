## 🚀 Запуск


Create .env file with the following content or rename .env.example to .env:
```
PORT=3000
```

```bash
  yarn               # install devDependencies
  yarn run dev       # run the app in development mode without building ts files
  yarn run build     # build the app
  yarn run start     # run the app in production mode
  yarn run lint      # run ESLint
  yarn run lint:fix  # fix ESLint issues
  yarn run format    # format code with Prettier
````

### Example of usage:

```bash
  node dist/index.js 
```

### Example of usage with Docker:
cd 

```bash  
  docker run -p 3000:3000 kv-server
   
   
   # hot-reload-server
  docker run -it --rm -v "$(pwd)/src:/app/kv-server/src" -p 8080:3000 --name kv-hot kv-hot-reload 
```
