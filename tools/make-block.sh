#!/bin/sh

echo ""
printf "Введите имя блока: "
read BlockName


if [ -d blocks/$BlockName ]; then
    echo "Ошибка: блок '$BlockName' уже существует."
    printf "Введите другое имя для блока: "
    read BlockName
fi

if [ -d blocks/$BlockName ]; then
    echo "Операция прервана: вы два раза ввели имя уже существуещего блока '$BlockName'."
    exit
fi


printf "Блок будет иметь DOM представление? (y/n): "
read DOM


mkdir -p blocks/$BlockName

echo "modules.define(
    '$BlockName',
    [],
    function (provide) {

        var $BlockName = null;

        provide($BlockName);
});
" > blocks/$BlockName/$BlockName.script.js

echo "#Документация к блоку: $BlockName

##Входные данные:" > blocks/$BlockName/$BlockName.md

if [ "$DOM" = "y" ]; then


printf "Блок будет иметь зависимости от других DOM блоков? (y/n): "
read DOMdependesy


echo ".$BlockName {
    /* здесь стили блока */
}" > blocks/$BlockName/$BlockName.styl

echo "btr.match('$BlockName', function (ctx) {
    ctx.setContent('$BlockName');
});" > blocks/$BlockName/$BlockName.tmpl.js

echo "modules.define(
    '$BlockName',
    ['inherit', 'block'],
    function (provide, inherit, YBlock) {

        // перенаследуемые-методы
        var inheritable = {
            __constructor: function () {
                // конструктор обьекта
                this.__base.apply(this, arguments); // забираем методы родителя
                // здесь описываем то, что происходит сразу после создания инстанса класса
            }
        };

        // статические методы
        var own = {
            // здесь описываем собственные методы объекта:
            getBlockName: function () {
                return '$BlockName';
            }
        };

        provide(inherit(YBlock, inheritable, own));
});
" > blocks/$BlockName/$BlockName.script.js


if [ "$DOMdependesy" = "y" ]; then

echo "//Зависимости блока: $BlockName
module.exports.expect = [
    //тут пиши зависимости
];
" > blocks/$BlockName/$BlockName.deps.js

fi

fi


ls -la blocks/$BlockName

git add .

git commit -m "Создан блок $BlockName"

echo "-------------------------------------------------"
echo "Создан блок $BlockName"
echo "-------------------------------------------------"

