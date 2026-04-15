# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## 1.0.0 (2026-04-15)


### Features

* add Docker support with Dockerfile and .dockerignore, update Fastify server host configuration ([e10f12f](https://github.com/angeldiazmendiburu/notify-hub/commit/e10f12f8694ff865b5830f87fcf7cf1ef2281659))
* add event bus implementation and MongoDB connection ([db600e3](https://github.com/angeldiazmendiburu/notify-hub/commit/db600e334909c6cb10e2b256da3b119970ff6e1a))
* add LoggerSubscriber for event logging and create EventLog model ([1cc6b93](https://github.com/angeldiazmendiburu/notify-hub/commit/1cc6b93bac962e14d96c70ce560541b143ed64ce))
* add Swagger documentation and update routes with schemas ([f6d7465](https://github.com/angeldiazmendiburu/notify-hub/commit/f6d74656d3963a6effb0c29da151aa1bb945400b))
* docker-compose MongoDB, app boots successfully ([a5db222](https://github.com/angeldiazmendiburu/notify-hub/commit/a5db222203fb16c3455ec12cc4fbb13bc74f74f8))
* enhance database models with additional indexing for improved query performance ([69e1cac](https://github.com/angeldiazmendiburu/notify-hub/commit/69e1caca9035f771c8235188693b0626d22279c4))
* enhance user repository with findAllByChannel method, update nodemailer email sender configuration, and improve alert route validation ([caba5d3](https://github.com/angeldiazmendiburu/notify-hub/commit/caba5d3af0628b93f563a0c2c0d5bd17f7ef3007))
* env validation plugin ([0809113](https://github.com/angeldiazmendiburu/notify-hub/commit/0809113484f0a843d337307e153050e2125bfa9f))
* implement alert management functionality with CRUD operations and event publishing ([c8cb260](https://github.com/angeldiazmendiburu/notify-hub/commit/c8cb260916869942267b6d9e2ac067e5b587541d))
* implement authentication use cases and JWT integration ([0682512](https://github.com/angeldiazmendiburu/notify-hub/commit/0682512aeb61b7d84463ed8a2f6b90bb1625e134))
* implement DTO validation and error handling for alert routes, add pagination support ([8943678](https://github.com/angeldiazmendiburu/notify-hub/commit/89436782536b2a6b4cca38006324898802975982))
* implement email and WebSocket notification subscribers with subscription management ([8d8c4dd](https://github.com/angeldiazmendiburu/notify-hub/commit/8d8c4dd3e8cbfc3753f5798c1c74b34f167a75e8))
* refactor authentication and subscription management with new use cases and repositories ([e0156a4](https://github.com/angeldiazmendiburu/notify-hub/commit/e0156a4f266b264857554ada243dd42166752cd9))
* refactor authentication and subscription use cases to utilize custom error classes, enhance notification handling, and improve channel type definitions ([caf812e](https://github.com/angeldiazmendiburu/notify-hub/commit/caf812e336d2044c6766b920b004ced3a94b7fd6))
* reorganize DTOs for alerts and authentication, add validation, and improve structure ([ceba2d1](https://github.com/angeldiazmendiburu/notify-hub/commit/ceba2d14faccfdd45366ad3991da6e05f625cd35))
* update alert use case to require pagination parameters, enhance bcrypt password hasher with configurable salt rounds, and add SALT_ROUNDS to environment schema ([044400e](https://github.com/angeldiazmendiburu/notify-hub/commit/044400e8a07bbaedb6235116b6b831fce7d52ecd))
* update package.json to include author information ([29254ee](https://github.com/angeldiazmendiburu/notify-hub/commit/29254ee5dd8e9531406893f3383a0f354622b471))
