import Block from 'block';

class Button extends Block {
    constructor() {
        super();
    }

    static getBlockName() {
        return 'button';
    }

    static _liveInit() {
        this._liveBindToElement('control', 'click', function () {

        });
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
export default Button;
