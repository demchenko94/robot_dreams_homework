# Homework 2: Networking
### Завдання

Побудувати власний folder-based router à la Next .js App Router для простого REST-API (CRUD над ресурсом users) із «БД» database.json. Примітка: users лише приклад, можна реалізовувати todo, або будь-що інше
Примітка: users лише приклад, можна реалізовувати todo, або будь-що інше.

### Мета:

* Закріпити роботу з core-модулями Node.js та глибше зрозуміти механіку http.createServer;
* Розібратися в маршрутизації: як зіставляти URL-шлях до файла, обробляти динамічні сегменти [id] і повертати 404/405;
* Побудувати шарову структуру (route → controller → service → model) та відчути, як ізоляція спрощує підтримку коду.
* Побачити обмеження «raw» Node і підготувати ґрунт для розуміння, що саме спрощують фреймворки Express/Nest у наступних темах.

### Опис:
Архітектурні вимоги:
1. Детерміністичне зіставлення «шлях → файл». Кожна піддиректорія додає сегмент URL; файл route.js (або route.ts) у цій директорії є кінцевою точкою.
2. Динамічні сегменти. Каталог [id] (з дужками) означає параметр id. Напр. /users/[id]/route.js[.ts] → GET /users/42. Примітка: всю іншу “динаміку” реалізовувати не треба.
3. Мультиметод-API. Файл route.js експортує функції GET, POST, PUT, DELETE (будь-які комбінації). Неекспортований метод → status 405.
4. Ізоляція логіки. У файлі-маршруті лише HTTP-шар: парсинг запиту, виклик сервісу, формування відповіді. Уся робота з даними — у /services/*.js[.ts].
5. Zero-dep / built-in. Дозволені тільки core-модулі Node (http, fs/promises, path). Ніяких Express, Fastify, ajv…
6. Hot reload (необовʼязково)(Для завзятих). Після зміни будь-якого route.js новий код має підхоплюватись без перезапуску процесу (через import() з query-string та fs.watch).
7. JSON-база. Усі CRUD-операції читають/пишуть database.json. Формат вільний, але вміст має залишатися валідним JSON після кожної операції.
8. Error → HTTP. Очікувані помилки перетворюйте на: 400 (валідацію), 404 (ресурс не знайдено), 405, 500.
9. Тести (необовʼязково). Один-два node:test або uvu тести на GET /users та POST /users.

```
Структура репо:

├─ routes/          (обов’язково)

│   └─ users/

│       ├─ route.js      (GET /users, POST /users)

│       └─ [id]/

│           └─ route.js  (GET, PUT, DELETE /users/:id)

├─ services/

│   └─ users.service.js

├─ lib/

│   └─ router.js        (сканер + диспетчер)

├─ database.json

└─ index.js            (entry, http.createServer)
```

## 🚀 Запуск


Create .env file with the following content or rename .env.example to .env:
```
DATABASE_PATH=./database.json
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
