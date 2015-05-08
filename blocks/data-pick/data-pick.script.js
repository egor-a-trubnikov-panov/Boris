modules.define(
    'data-pick',
    ['inherit', 'block', 'jquery'],
    function (provide, inherit, Block, $) {

        var inheritable = {
            __constructor: function () {
                var self = this;
                self.__base.apply(self, arguments); // забираем методы родителя


                self.block = self.getDomNode();
                self.elem_calendar = self._findElement("calendar");
                self.elem_selector = self._findElement("selector");
                self.elem_view = self._findElement("view");

                self.year = null;
                self.month = null;
                self.date = null;
                self.scrollable = true;


                self.MONTH_SELECT_HEIGHT = 16;
                self.MONTH_LIST_HEIGHT = 197;
                self.MONTH_SCROLL_MAX_HEIGHT = self.MONTH_LIST_HEIGHT - self.MONTH_SELECT_HEIGHT;
                self.CALENDAR_SCROLL_HEIGHT = self.elem_calendar.prop('scrollHeight');
                self.HEIGHT = 247;
                self.CALENDAR_BOTTOM_PADDING = 20;
                self.MONTH_LIST_TOP_AND_BOTTOM = 14;


                self._bindTo(self.elem_calendar, 'scroll', function () {

                    if (self.scrollable) {
                        var scrollTop = (self.elem_calendar.scrollTop() / ((self.CALENDAR_SCROLL_HEIGHT - self.CALENDAR_BOTTOM_PADDING - self.HEIGHT) / 100)) * (self.MONTH_SCROLL_MAX_HEIGHT / 100);
                        if (scrollTop > self.MONTH_SCROLL_MAX_HEIGHT) {
                            scrollTop = self.MONTH_SCROLL_MAX_HEIGHT;
                        }
                        self.elem_selector.css("top", scrollTop + "px")
                    }
                });
            },
            MonthSelectDrag: function () {
                var self = this,
                    top = window.event.pageY - self.block.offset().top - self.MONTH_LIST_TOP_AND_BOTTOM;

                self.scrollable = false;

                if (top < 0) top = 0;

                self.elem_calendar
                    .prop("scrollTop", ((self.CALENDAR_SCROLL_HEIGHT - self.CALENDAR_BOTTOM_PADDING) / 100) * (top / (self.MONTH_LIST_HEIGHT / 100)));

                if (top > (self.MONTH_LIST_HEIGHT - self.MONTH_SELECT_HEIGHT)) {
                    top = self.MONTH_LIST_HEIGHT - self.MONTH_SELECT_HEIGHT;
                }

                self.elem_selector.css("top", top + "px");
            },
            onMouseMove: function () {
                var self = this;
                self.MonthSelectDrag();
                self._bindTo(self.elem_view, 'mousemove', self.MonthSelectDrag);
            },
            offMouseMove: function () {
                var self = this;
                self.scrollable = true;
                self._unbindFrom(self.elem_view, 'mousemove', self.MonthSelectDrag);
            }
        };

        var own = {

            getBlockName: function () {
                return 'data-pick';
            },
            _liveInit: function () {
                var self = this;

                self._liveBindToElement("year", 'click', function (e) {
                    self.date = self.date || new Date().getDate();
                    self.month = self.month || new Date().getMonth() + 1;
                    self.year = $(e.target).text();
                    self._update({
                        block: 'data-pick',
                        date: self.date + "," + self.month + "," + self.year
                    })
                });

                self._liveBindToElement("day", 'click', function (e) {
                    self.date = $(e.target).text();
                    self.month = $(e.target).data("id") + 1;
                    self.year = self.year || new Date().getFullYear();
                    self._update({
                        block: 'data-pick',
                        date: self.date + "," + self.month + "," + self.year
                    });
                    console.log(self.date, self.month, self.year);
                });

                self._liveBind('mousedown', function () {
                    var clickX = window.event.pageX - self.block.offset().left;
                    // если нажатие на полоске с месяцами
                    if (clickX > 59 && clickX < 153) {
                        self.onMouseMove()
                    }
                });

                self._liveBind('mouseup mouseleave', function () {
                    self.offMouseMove();
                });

                return false;
            }

        };

        provide(inherit(Block, inheritable, own));
    })
;

