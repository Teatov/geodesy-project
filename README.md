# Установка проекта

Для запуска проекта требуется Node.js.

## Клонировать проект к себе

Откройте консоль в нужной папке и выполните команду:

```bash
git clone https://github.com/Teatov/geodesy-project.git
```

## Установка зависимостей

Откройте консоль в папке проекта и выполните команду:

```bash
npm install
```

## Тестовый запуск

Чтобы запустить сервер в режиме разработчика, выполните команду:

```bash
npm run dev -- --open
```

Чтобы остановить его, в консоли нажмите `Ctrl+C`.

## Сборка

Чтобы собрать финальную сборку для публикации, выполните:

```bash
npm run build
```

Результат появится в папке build.

Можно предпросматривать эту сборку с помощью `npm run preview`.

# Разработка

## Используемые технологии

### TypeScript

Язык программирования, являющийся расширением JavaScript, добавляющий явные статические типы.
Внутри компонентов Svelte используйте `<script lang="ts">`.

### Svelte

JavaScript фронтенд-фреймворк для создания сайтов.

### Prisma

Слой абстракции над базами данных.

Во время разработки, при изменении схемы базы данных, запускайте `npx prisma db push`, чтобы обновить структуру.

Чтобы просматривать базу данных, можно использовать `npx prisma studio`.

### ESLint

Линтер, анализирующий код и помогающий выявить синтаксические ошибки заранее.

### Prettier

Форматтер, форматирущий код.

> В VSCode можно отформатировать код, нажав `Shift+Alt+F`.

## Расширения

Если вы используете VSCode, установите следующие расширения, чтобы упростить работу:

- Svelte for VS Code
- ESLint
- Prettier - Code formatter
- Prisma
