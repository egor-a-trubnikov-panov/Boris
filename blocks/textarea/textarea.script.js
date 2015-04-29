modules.define(
    'textarea',
    ['inherit', 'block'],
    function (provide, inherit, YBlock) {
        var textarea = inherit(YBlock, {
            __constructor: function () {
                this.__base.apply(this, arguments);

                this._control = this._findElement('control');
            },
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

            getBlockName: function () {
                return 'textarea';
            },

            _liveInit: function () {
                this._liveBindToElement('control', 'focusin', function () {
                    this._setState('focused');
                    this.emit('focus');
                });
                this._liveBindToElement('control', 'focusout', function () {
                    this._removeState('focused');
                    this.emit('blur');
                });
            }
        });

        provide(textarea);
    });

