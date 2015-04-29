#Документация к блоку: input

##Входные данные:

размеры: [small, normal, large, extraLarge]

* String value текст
* String name атрибут имя
* String view {размер} по умолчанию размер normal 
* String placeholder 
* String readonly 
* String long ширина 100%


пример:
```js
{
            block: 'input',
            view: 'large',
            value: 'Привет, Мир!',
            name: 'loginField',
            placeholder: 'введите текст',
            readonly: 'readonly'
}
```
