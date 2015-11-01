btr.setDefaultView("button", "normal");
btr.match('button*', function (ctx) {
    ctx.enableAutoInit();
    ctx.setContent([
        {
            elem: "control",
            value: ctx.getParam('value'),
            type: ctx.getParam('type')
        }
    ]);
});
btr.match('button*__control', function (ctx) {
    ctx.setTag('button');
    ctx.setAttr('type', ctx.getParam('type') || 'button');
    ctx.setContent(ctx.getParam('value') || "Кнопка");
});
