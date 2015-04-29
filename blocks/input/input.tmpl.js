btr.setDefaultView('input', 'small');


btr.match('input*', function (ctx) {
    ctx.enableAutoInit();

    if (ctx.getParam('long')) {
        ctx.setState('long');
    }

    ctx.setContent([
        {
            elem: 'control',
            inputValue: ctx.getParam('value'),
            inputName: ctx.getParam('name'),
            placeholder: ctx.getParam('placeholder'),
            type: ctx.getParam('type'),
            readonly: ctx.getParam('readonly')
        },
        {
            elem: 'clear'
        }
    ]);
});

btr.match('input*__control', function (ctx) {
    ctx.setTag('input');
    ctx.setAttr('value', ctx.getParam('inputValue'));
    ctx.setAttr('readonly', ctx.getParam('readonly'));
    ctx.setAttr('name', ctx.getParam('inputName'));
    ctx.setAttr('placeholder', ctx.getParam('placeholder'));
    ctx.setAttr('type', ctx.getParam('type'));
});

btr.match('input*__clear', function (ctx) {
    ctx.setAttr('title', "очистить");
});
