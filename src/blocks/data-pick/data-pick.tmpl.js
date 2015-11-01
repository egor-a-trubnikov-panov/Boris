btr.match('data-pick', function (ctx) {

    ctx.enableAutoInit();

    var data = ctx.getParam('date'),
        date = new Date();
    console.log(data);
    if (data) {
        var d = data.split(",");
        if (d.length != 3) {
            throw new Error("Неверный входящий параметр: date")
        }
        date.setDate(d[0]);
        date.setMonth(d[1] - 1);
        date.setFullYear(d[2]);
    }
    console.log(date);
    var months = [
        {
            name: 'Январь',
            daysCount: 31
        },
        {
            name: 'Февраль',
            /**
             * Определяет високосный год или нет и возвращает количество дней в феврале
             * */
            daysCount: (function () {
                var year = date.getFullYear();
                if (year % 4 == 0) {
                    if (year % 100 == 0) {
                        if (year % 400 == 0) {
                            return 29;
                        }
                        return 28
                    }
                    return 29
                }
                return 28
            })()
        },
        {
            name: 'Март',
            daysCount: 31
        },
        {
            name: 'Апрель',
            daysCount: 30
        },
        {
            name: 'Май',
            daysCount: 31
        },
        {
            name: 'Июнь',
            daysCount: 30
        },
        {
            name: 'Июль',
            daysCount: 31
        },
        {
            name: 'Август',
            daysCount: 31
        },
        {
            name: 'Сентябрь',
            daysCount: 30
        },
        {
            name: 'Октябрь',
            daysCount: 31
        },
        {
            name: 'Ноябрь',
            daysCount: 30
        },
        {
            name: 'Декабрь',
            daysCount: 31
        }
    ];

    ctx.setContent([
        {
            elem: "input",
            date: data
        },
        {
            elem: "date-picker",
            date: date,
            months: months
        }
    ]);
});

btr.match('data-pick__input', function (ctx) {
    var date = ctx.getParam('date') || "";

    ctx.setContent([
        {
            block: "input",
            value: date,
            placeholder: 'день,месяц,год',
            readonly: 'readonly',
            long: true
        }
    ]);
});

btr.match('data-pick__date-picker', function (ctx) {
    var date = ctx.getParam('date'),
        months = ctx.getParam('months');

    ctx.setContent([
        {
            elem: "view",
            date: date,
            months: months
        },
        {
            elem: "settings",
            date: date,
            months: months
        }
    ]);
});


btr.match('data-pick__view', function (ctx) {
    ctx.setContent([
        {
            elem: "calendar",
            date: ctx.getParam("date"),
            months: ctx.getParam("months")
        }
    ]);
});

btr.match('data-pick__settings', function (ctx) {
    ctx.setContent([
        {
            elem: "months-list",
            months: ctx.getParam("months")
        },
        {
            elem: "years-list",
            date: ctx.getParam("date")
        },
        {elem: "change"}
    ]);
});

btr.match('data-pick__months-list', function (ctx) {
    var
        months = ctx.getParam("months"),
        i = 0,
        l = months.length,
        elems = [
            {elem: "selector"}
        ];
    for (; i < l; i++) {
        elems.push({
            elem: "title-month",
            value: months[i].name
        })
    }
    ctx.setContent(elems);
});

btr.match('data-pick__years-list', function (ctx) {

    ctx.setContent([{
        elem: "years",
        date: ctx.getParam("date")
    }]);
});

btr.match('data-pick__years', function (ctx) {
    var
        respYear = ctx.getParam("date").getFullYear(),
        thisYear = (new Date()).getFullYear(),
        yearsCount = 300, // сколько лет отображать
        i = 0,
        years = [],
        yearsCounter = thisYear - yearsCount / 2;

    for (; i < yearsCount; i++, yearsCounter++) {
        years.push({
            elem: "year",
            value: yearsCounter,
            active: (yearsCounter == respYear) ? "on" : "off"
        });
    }
    ctx.setContent(years);
});

btr.match('data-pick__change', function (ctx) {
    ctx.setTag("button");
    ctx.setContent('Готово');
});

btr.match('data-pick__calendar', function (ctx) {
    var
        date = ctx.getParam("date"),
        selectedMonth = date.getMonth(),
        months = ctx.getParam("months");
    for (var elems = [], i = 0, l = months.length; i < l; i++) {
        elems.push({
            elem: "month",
            name: months[i].name,
            daysCount: months[i].daysCount,
            date: new Date(date.setMonth(i)),
            id: i,
            selected: selectedMonth == i

        });
    }
    ctx.setContent(elems);
});

btr.match('data-pick__month', function (ctx) {


    ctx.setContent([
        {
            elem: "month-title",
            name: ctx.getParam("name")
        },
        {
            elem: "week"
        },
        {
            elem: "days",
            id: ctx.getParam("id"),
            count: ctx.getParam("daysCount"),
            date: ctx.getParam("date"),
            selected: ctx.getParam("selected")
        }
    ])

});

btr.match('data-pick__month-title', function (ctx) {
    ctx.setTag("h3");
    ctx.setContent(ctx.getParam("name"))
});

btr.match('data-pick__week', function (ctx) {
    var week = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];

    for (var elems = [], i = 0, l = week.length; i < l; i++) {
        if (i >= 5) {
            elems.push({elem: "week-day-free", value: week[i]});
        } else {
            elems.push({elem: "week-day", value: week[i]});
        }
    }
    ctx.setContent(elems)
});

btr.match(['data-pick__week-day', 'data-pick__week-day-free', 'data-pick__title-month'], function (ctx) {
    ctx.setContent(ctx.getParam("value"));
});

btr.match('data-pick__days', function (ctx) {

    var date = ctx.getParam("date"),
        count = ctx.getParam("count"),
        selected = ctx.getParam("selected"),
        selectedDate = date.getDate(),
        indent = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
        id = ctx.getParam("id"),
        push_date = new Date(date);
    push_date.setDate(1);
    for (var i = 1, elems = []; i <= count; i++) {
        if (i == 1) {
            elems.push({
                elem: "day",
                push: indent[push_date.getDay() - 1],
                value: i,
                selected: selectedDate == i ? selected : false,
                id: id
            })
        } else {
            elems.push({
                elem: "day",
                value: i,
                selected: selectedDate == i ? selected : false,
                id: id
            });
        }
    }

    ctx.setContent(elems)
});

btr.match('data-pick__day', function (ctx) {
    ctx.setState("push", ctx.getParam("push"));
    ctx.setAttr("data-id", ctx.getParam("id"));

    if (ctx.getParam("selected")) {
        ctx.setState("on");
    }

    ctx.setContent(ctx.getParam("value"))
});

btr.match('data-pick__year', function (ctx) {
    var state = ctx.getParam("active");

    if (state) {
        ctx.setState("active", state);
    }
    ctx.setContent(ctx.getParam("value"))
});

