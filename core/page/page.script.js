modules.require(
    ['block'],
    function (Block) {
        Block.initDomTree(document.body).done(function (){
            // Инициализация всех блоков на странице
        })
    });
