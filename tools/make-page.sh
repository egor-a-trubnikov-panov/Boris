#!/bin/sh

echo ""
printf "Введите имя страницы: "
read PageName


if [ -d pages/$PageName  ]; then
    echo "Операция прервана: Директория с таким именем существует по адресу pages/$PageName"
    exit
fi

mkdir -p pages/$PageName
echo "//Зависимости страницы: $PageName
module.exports.expect = [
    //тут пиши зависимости
];
" > blocks/$PageName/$PageName.deps.js
echo "module.exports = {
            block: 'page',
            title: '${PageName}',
            styles: [
                {url: '${PageName}.css'}
            ],
            scripts: [
                {url: '${PageName}.js'}
            ],
            body: [
                // здесь ваши блоки
            ]
        };" > pages/$PageName/$PageName.json.js


ls -la pages/$PageName

git add .

git commit -m "Создана страница $PageName"

echo "-------------------------------------------------"
echo "Создана страница pages/$PageName"
echo "-------------------------------------------------"

