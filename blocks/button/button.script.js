modules.define(
    'button',
    ['inherit', 'block'],
    function (provide, inherit, YBlock) {
        var button = inherit(YBlock, {
            __constructor: function () {
                this.__base.apply(this, arguments);


            }
        }, {
            getBlockName: function () {
                return 'button';
            },
            _liveInit: function () {
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
        });

        provide(button);
});

