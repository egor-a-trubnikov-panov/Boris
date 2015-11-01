import Block from 'block';

class Textarea extends Block {
    constructor() {
        super();

        this._control = this._findElement('control');
    }

    /**
     * получение значения
     *
     * @return {String}
     */
    getValue() {
        return this._control.val();
    }

    /**
     * установка значения
     *
     * @param value
     */
    setValue(value) {
        this._control.val(value);
    }

    /**
     * очистка значения
     */
    clean() {
        this._control.val("");
    }

    /**
     * Возвращает `true`, если инпут имеет фокус,
     * `false`, если инпут не в фокусе.
     *
     * @return {Boolean}
     */
    isFocused() {
        return dom.focus.hasFocus(this._control);
    }

    /**
     * Устанавливает фокус на инпут.
     *
     * @return {Input}
     */
    focus() {
        if (this.isEnabled() && !this.isFocused()) {
            this._control.focus();
        }
        return this;
    }


    static getBlockName() {
        return 'textarea';
    }

    static _liveInit() {
        this._liveBindToElement('control', 'focusin', function () {
            this._setState('focused');
            this.emit('focus');
        });
        this._liveBindToElement('control', 'focusout', function () {
            this._removeState('focused');
            this.emit('blur');
        });
    }
}
export default Textarea;
