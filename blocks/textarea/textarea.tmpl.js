
    btr.match('textarea', function (ctx) {
        ctx.enableAutoInit();
        ctx.setContent([
            {
                elem: "control",
                value: ctx.getParam('value'),
                placeholder: ctx.getParam('placeholder')
            }
        ]);
    });


    btr.match('textarea*__control', function (ctx) {
        ctx.setTag('textarea');
        ctx.setAttr('placeholder', ctx.getParam('placeholder') || 'Введите текст');
        ctx.setContent(ctx.getParam('value') || "");
    });
