
    btr.match('snake', function (ctx) {
        ctx.enableAutoInit();
        var ready = ctx.getParam("ready") || false;

        ctx.setState("ready", ready);

        ctx.setContent([
            {
                elem: "wrapper"
            },
            {
                elem: "message",
                message: ctx.getParam("message")
            }
        ])

    });


    btr.match('snake__wrapper', function (ctx) {
        ctx.setContent((function () {
            var arr = [];
            for (var i = 0; i < 4; i++) {
                arr.push({elem: 'box' + i})
            }
            return arr
        })());

    });
    btr.match('snake__message', function (ctx) {
        ctx.setContent(ctx.getParam("message") || "");
    });
