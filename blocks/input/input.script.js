modules.define(
    'input',
    ['inherit', 'block'],
    function (provide, inherit, YBlock)
    {
        var input = inherit(YBlock, {
            __constructor: function ()
            {
                this.__base.apply(this, arguments);

                //console.log("привет мир");

                this._control = this._findElement('control');
                this._clear = this._findElement('clear');
                // здесь описываем то, что происходит сразу после создания инстанса класса
            },

            // инстанс-методы
            /**
             * получение значения
             *
             * @return {String}
             */
            getValue: function () {
                return this._control.val();
            },

            /**
             * установка значения
             *
             * @param value
             */
            setValue: function (value) {
                this._control.val(value);
            },

            /**
             * очистка значения
             */
            clean: function () {
                this._control.val("");
                $(this._control[0]).trigger("keyup")
            },

            /**
             * Возвращает `true`, если инпут имеет фокус,
             * `false`, если инпут не в фокусе.
             *
             * @return {Boolean}
             */
            isFocused: function () {
                return dom.focus.hasFocus(this._control);
            },

            /**
             * Устанавливает фокус на инпут.
             *
             * @return {Input}
             */
            focus: function () {
                if (this.isEnabled() && !this.isFocused()) {
                    this._control.focus();
                }
                return this;
            }

        }, {
            getBlockName: function ()
            {
                return 'input';
            },
            // статические методы
            /**
             * Отложенная инициализация.
             */
            _liveInit: function () {
                this._liveBindToElement('clear', 'click', function () {
                    this.clean();
                });
                this._liveBindToElement('control', 'focusin', function () {
                    this._setState('focused');
                    this.emit('focus');
                });
                this._liveBindToElement('control', 'keyup', function () {
                    if(this.getValue()!=""){
                        this._setElementState(this._clear, "visible")
                    } else {
                        this._removeElementState(this._clear, "visible")
                    }
                    this.emit('keyup');
                });
                this._liveBindToElement('control', 'focusout', function () {
                    this._removeState('focused');
                    this.emit('blur');
                });
            }
        });

        provide(input);
    });

