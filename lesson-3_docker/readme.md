# Homework 2: Docker
### Завдання

У цьому завданні ви повністю контейнеризуєте міні-стек із двох сервісів — примітивного redis-like key/value-сховища та kv-server, що ним користується.

1. Напишете обидва сервіси на Node.js;
2. Зберете для них образи (або на власному базовому образі);
3. Об’єднаєте їх у docker-compose.yml, приховавши сховище всередині приватної мережі;
4. Бонус: реалізуєте “наївний” mini-Compose на JavaScript, щоб наочно побачити, яку роботу зазвичай робить справжній docker-compose.


### Мета:

* Зрозуміти анатомію контейнера: базовий Linux-образ, шари, користувач, CMD;
* Навчитися збирати власні Node-образи й публікувати їх на Docker Hub;
* Попрактикуватися з багатосервісною конфігурацією: build, volumes, depends_on, networks;
* Налаштувати Dev-workflow через bind-mount і hot-reload у контейнері;
* Усвідомити, що робить docker-compose під капотом, створивши спрощений аналог.

### Опис:
Кроки

1. Redis-like service

1.1 Напишіть мінімальний HTTP-сервер redis-like (Core Node або Express):

* GET /get?key=foo → {"value":"bar" \| null}
* POST /set body { "key":"foo", "value":"bar" } → {"ok":true}

1.2 Сховище тримайте у простому Map.

2. KV-server

2.1 Створіть другий сервіс kv-server (Express/Fastify):

* GET /kv/:key та POST /kv (аналогічні редіс-ендпоїнти).

2.2 Адресу redis-like беріть з process.env.REDIS_URL, підключайтесь HTTP-клієнтом (fetch вбудований у node.js).

📌 Примітка: сервіс повинен мати працюючий linter як devDependencies, щоб у 4 кроці був сенс у розділенні докеру на “стадії”.

3. Власний базовий образ (optional)

3.1 Створіть Dockerfile на базі будь-якого дистрибутиву (alpine, ubuntu …), встановіть Node LTS;

3.2 Запуште у публічний репозиторій Docker Hub і додайте тег latest;

3.3 URL образу внесіть у README.

📌 Примітка: якщо не будете виконувати п.3 — використовуйте офіційний node lts образ.

4. Dockerfileʼи сервісів (на вашому / офіційному образі)

4.1 .Dockerfile.redis — збирає redis-like;

4.2 .Dockerfile.kv   — збирає kv-server:

* дві стадії (builder → runtime) або кеш node_modules;
* EXPOSE 3000.

4.3 .Dockerfile.kv.dev   — збирає kv-server з hot-reload;

5. Docker-compose.yml
* 2 сервіси redis та kv.dev;
* окремий bridge network-alias internal;
* redis — не публікує порт назовні;
* kv — мапить localhost:8080 → 3000;
* kv отримує REDIS_URL=http://redis:4000.
6. MiniCompose.js(Optional)(***)



### Example of usage:

```bash
  docker build -t kv-server -f docker/kv.Dockerfile . 
  
  docker build -t kv-hot-reload -f docker/kv-dev.Dockerfile .  
  
  docker build -t kv-redis -f docker/redis.Dockerfile .
  
  docker-compose build
  docker-compose up
```
