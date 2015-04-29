
    btr.match('spiner*', function (ctx) {
        ctx.setTag('div');
        ctx.setContent([
            {
                elem: "container"
            }
        ]);
    });


btr.match('spiner*__container', function (ctx) {
    ctx.setTag('div');
    ctx.setContent([{elem: "line"}]);
});
