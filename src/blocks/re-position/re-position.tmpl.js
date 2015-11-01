btr.match('re-position', function (ctx) {
    ctx.setContent([
        {
            elem: 'align',
            content: ctx.getParam("content")
        }
    ]);
});
btr.match('re-position__align', function (ctx) {
    ctx.setContent(ctx.getParam("content"));
});
