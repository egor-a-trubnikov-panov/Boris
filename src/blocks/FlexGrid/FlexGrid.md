#Документация к блоку: FlexGrid

###FlexGrig - это набор stylus mixin для удобной расстановки блоком по сетке.

##Возможности
* адаптивность
* любой размер экрана
* 12 колонок
* отступы по ширине колонок
* flex-позиционирование

##Описание mixin

###основные размеры экранов

* 320
* 640
* 800
* 1024
* 1280
* 1440
* 1600
* 1920
* 2048

###row() строка
```css
@example

.foo {
	row();
	background: red;
}

```

###col(num,size) колонка

```css
@param {Number} num число от 1 до 12
@param {Number px} size размер экрана в пикселях
@example

.bar {
	col(5,600px);
	col(3,700px);
	col(2,800px);
	background: red;
}

```

###col-push(num,size) отступ

```css
@param {Number} num число от 1 до 11
@param {Number px} size размер экрана в пикселях
@example

.bar {
	col(5,600px);
    col(3,700px);
    col(2,800px);
	col-push(2,600px);
	col-push(1,700px);
	col-push(1,800px);
	background: red;
}

```

###align-start(size) двигаем блоки налево

```css
@param {Number px} size размер экрана в пикселях
@example

.foo {
	row();
	align-start(600px);
	background: red;
}

```

todo: дописать документацию
