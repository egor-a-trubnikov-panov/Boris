modules.define(
    'snake',
    ['inherit', 'block'],
    function (provide, inherit, YBlock) {
        var snake = inherit(YBlock, {
            __constructor: function () {
                this.__base.apply(this, arguments);
            }
            // инстанс-методы
        }, {
            getBlockName: function () {
                return 'snake';
            }

            // статические методы
        });

        provide(snake);
});

