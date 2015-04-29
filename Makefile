NPM_BIN = node_modules/.bin

all: npm build

# установка модулей npm
.PHONY: npm
npm::
	@npm install

# проверка js на кодстайл
.PHONY: lint
lint::
	gulp lint

# Собираем и запускаем тесты
.PHONY: test
test:
	gulp test

# Сборка проекта
.PHONY: build
build:
	gulp

# Создание новой страницы
.PHONY: page
page:
	./tools/make-page.sh

# Создание нового блока
.PHONY: block
block:
	./tools/make-block.sh
