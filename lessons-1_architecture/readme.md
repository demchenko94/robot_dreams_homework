# Homework 1: Архітектура
### Завдання

Написати невеликий консольний застосунок-трекер звичок без жодних сторонніх бібліотек, лише на вбудованих модулях Node.js. Реалізувати лінтинг коду за допомогою ESLint(Oxlint*).


### Мета:

* Опанувати проєктну архітектуру
* Навчитися зберігати стан
* Навчитися створювати і підтримувати code convention
* Навчитися параметризувати додаток через env
* Навчитися документувати виконану роботу
* Навчитися розробляти cli, зрозуміти що спосіб I/O ніяк не впливає на шари та архітектуру додатку

### Опис:
1. Команди, які має підтримувати програма (запускаються через node index.js ...):
   * add   --name "<текст звички>" --freq <daily|weekly|monthly> — додає звичку;
   * list — показує всі звички у вигляді таблиці;
   * done  --id <ідентифікатор> — відмічає, що звичку виконано сьогодні;
   * stats — друкує для кожної звички відсоток виконання за останні 7(30) днів;
   * delete --id <ідентифікатор> — видаляє звичку;
   * update --id <ідентифікатор> --name "<текст звички>" --freq <daily|weekly|monthly> — вносить зміни у назву, або регулярність;
2. Зберігання даних: файл database.json(через fs); після кожної операції файл має лишатися валідним JSON.
3. Архітектура: розділити код мінімум на router, controllers, services, models; робота з файлом — тільки в шарі models.
4. Використайте Змінні середовища для задання зміщення часу у днях(none/0 => сьогодні, 1 => завтра, 2=> післязавтра, etc), для перевірки роботи додатку. 

### Критерії перевірки:
* команди працюють коректно,
* структура каталогів дотримана,
* залежностей у package.json немає,
* код проходить ESLint без помилок.


## CLI application
```
> Чистий Node.js (без Express) + `database.json` у ролі бази даних  
> Стек поділено на **Model → Service → Controller** для демонстрації шарової архітектури.

```

## 🚀 Запуск


Create .env file with the following content or rename .env.example to .env:
```
DATABASE_PATH=./data/database.json
DAY_OFFSET=0
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
```
   yarn run dev add --name "Read a book" --freq daily              # Add a habit
   yarn run dev list                                               # List all habits
   yarn run dev done --id 1                                        # Mark habit as done
   yarn run dev stats                                              # Show stats for habits
   yarn run dev delete --id 1                                      # Delete a habit
   yarn run dev update --id 1 --name "Read a novel" --freq weekly  # Update a habit
```

```bash
  node dist/index.js add --name "Read a book" --freq daily              # Add a habit
  node dist/index.js list                                               # List all habits
  node dist/index.js done --id 1                                        # Mark habit as done 
  node dist/index.js stats                                              # Show stats for habits  
  node dist/index.js delete --id 1                                      # Delete a habit
  node dist/index.js update --id 1 --name "Read a novel" --freq weekly  # Update a habit
```
