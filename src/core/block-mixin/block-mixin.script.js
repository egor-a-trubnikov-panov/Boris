import EventEmitter from 'event-emitter';
import EventManager from 'event-manager';


class BlockMixin extends EventEmitter {
    constructor(blockInstance, options) {
        this._block = blockInstance;
        this._options = options;
        this._eventManager = new EventManager(this);
    }

    _getBlock() {
        return this._block;
    }

    _bindTo(emitter, event, callback) {
        this._eventManager.bindTo(emitter, event, callback);
        return this;
    }

    /**
     * Возвращает имя миксина.
     * Этот метод следует перекрывать при создании новых миксинов.
     *
     * @static
     * @returns {String|null}
     *
     * @example
     * provide(inherit(BlockMixin, {}, {
         *     getMixinName: function() {
         *         return 'auto-focus';
         *     }
         * });
     */
    static getMixinName() {
        return 'block-mixin';
    }

    static fromBlock(blockInstance, options) {
        var mixinName = this.getMixinName();
        var mixins = this._getMixinsFromDomNode(blockInstance.getDomNode());
        if (!mixins[mixinName]) {
            var Mixin = this;
            mixins[mixinName] = new Mixin(blockInstance, options);
        }
        return mixins[mixinName];
    }

    /**
     * Возвращает инстанции миксинов для данного DOM-элемента.
     *
     * @private
     * @param {jQuery} domNode
     * @param {Boolean} [skipCreating]
     */
    static _getMixinsFromDomNode(domNode, skipCreating) {
        var data = domNode.data(this._mixinsStorageKey);
        if (!data && !skipCreating) {
            data = {};
            domNode.data(this._mixinsStorageKey, data);
        }
        return data;

    }

    static get _mixinsStorageKey() {
        return 'block-mixin'
    }
}
export default BlockMixin;
