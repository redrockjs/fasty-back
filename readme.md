Базовая структура Fastify

```pgsql
src/
 ├── app.ts                # создание fastify instance
 ├── server.ts             # запуск сервера
 │
 ├── config/               # конфигурация приложения
 │    ├── env.ts
 │    ├── index.ts
 │    └── swagger.ts
 │
 ├── plugins/              # fastify plugins
 │    ├── db.ts
 │    ├── auth.ts
 │    ├── redis.ts
 │    └── swagger.ts
 │
 ├── modules/              # бизнес-модули (feature-based)
 │    ├── user/
 │    │    ├── user.routes.ts
 │    │    ├── user.controller.ts
 │    │    ├── user.service.ts
 │    │    ├── user.repository.ts
 │    │    ├── user.schema.ts
 │    │    └── user.types.ts
 │    │
 │    └── auth/
 │         ├── auth.routes.ts
 │         ├── auth.controller.ts
 │         ├── auth.service.ts
 │         └── auth.schema.ts
 │
 ├── shared/               # переиспользуемые вещи
 │    ├── errors/
 │    ├── logger/
 │    ├── utils/
 │    └── constants/
 │
 ├── types/                # глобальные типы
 │    └── fastify.d.ts
 │
 └── index.ts              # точка входа

```