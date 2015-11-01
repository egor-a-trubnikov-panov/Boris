#Документация к блоку: button

##Входные данные:

размеры: [small, normal, large, extraLarge]
цвета: [blue, green, red, orange, white]

* String value текст на кнопке
* String type  {'button' || 'submit'}
* String view {размер || размер-цвет} по умолчанию размер normal цвет серый 

###пример:
```
{
            block: 'button',
            type: 'submit',
            view: 'small-red',
            value: 'Привет мир'
}
```
