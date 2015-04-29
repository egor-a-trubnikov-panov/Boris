modules.define(
    'data-pick',
    ['inherit', 'block', 'jquery'],
    function (provide, inherit, Block, $) {

        var inheritable = {
            __constructor: function () {

                this.__base.apply(this, arguments); // забираем методы родителя


                this.block = this.getDomNode();
                this.elem_calendar = this._findElement("calendar");
                this.elem_selector = this._findElement("selector");
                this.elem_view = this._findElement("view");

                this.year = null;
                this.month = null;
                this.date = null;
                this.scrollable = true;


                this.MONTH_SELECT_HEIGHT = 16;
                this.MONTH_LIST_HEIGHT = 197;
                this.MONTH_SCROLL_MAX_HEIGHT = this.MONTH_LIST_HEIGHT - this.MONTH_SELECT_HEIGHT;
                this.CALENDAR_SCROLL_HEIGHT = this.elem_calendar.prop('scrollHeight');
                this.HEIGHT = 247;
                this.CALENDAR_BOTTOM_PADDING = 20;
                this.MONTH_LIST_TOP_AND_BOTTOM = 14;


                this._bindTo(this.elem_calendar, 'scroll', function () {

                    if (this.scrollable) {
                        var scrollTop = (this.elem_calendar.scrollTop() / ((this.CALENDAR_SCROLL_HEIGHT - this.CALENDAR_BOTTOM_PADDING - this.HEIGHT) / 100)) * (this.MONTH_SCROLL_MAX_HEIGHT / 100);
                        if (scrollTop > this.MONTH_SCROLL_MAX_HEIGHT) {
                            scrollTop = this.MONTH_SCROLL_MAX_HEIGHT;
                        }
                        this.elem_selector.css("top", scrollTop + "px")
                    }
                });
            },
            MonthSelectDrag: function () {
                this.scrollable = false;
                var
                    top = window.event.pageY - this.block.offset().top - this.MONTH_LIST_TOP_AND_BOTTOM;

                if (top < 0) top = 0;

                this.elem_calendar
                    .prop("scrollTop", ((this.CALENDAR_SCROLL_HEIGHT - this.CALENDAR_BOTTOM_PADDING) / 100) * (top / (this.MONTH_LIST_HEIGHT / 100)));

                if (top > (this.MONTH_LIST_HEIGHT - this.MONTH_SELECT_HEIGHT)) {
                    top = this.MONTH_LIST_HEIGHT - this.MONTH_SELECT_HEIGHT;
                }

                this.elem_selector.css("top", top + "px");
            },
            onMouseMove: function () {
                this.MonthSelectDrag();
                this._bindTo(this.elem_view, 'mousemove', this.MonthSelectDrag);
            },
            offMouseMove: function () {
                this.scrollable = true;
                this._unbindFrom(this.elem_view, 'mousemove', this.MonthSelectDrag);
            }
        };

        var own = {

            getBlockName: function () {
                return 'data-pick';
            },
            _liveInit: function () {

                this._liveBindToElement("year", 'click', function (e) {
                    this.year = $(e.target).text();
                    this._update({
                        block: 'data-pick',
                        date: this.date + "," + this.month + "," + this.year
                    })
                });

                this._liveBindToElement("day", 'click', function (e) {
                    this.date = $(e.target).text();
                    this.month = $(e.target).data("id");
                    this._update({
                        block: 'data-pick',
                        date: this.date + "," + this.month + "," + this.year
                    });
                    console.log(this.date,this.month,this.year);
                });

                this._liveBind('mousedown', function () {
                    var clickX = window.event.pageX - this.block.offset().left;
                    // если нажатие на полоске с месяцами
                    if (clickX > 59 && clickX < 153) {
                        this.onMouseMove()
                    }
                });

                this._liveBind('mouseup mouseleave', function () {
                    this.offMouseMove();
                });

                return false;
            }

        };

        provide(inherit(Block, inheritable, own));
    })
;

