import EventEmitter from 'event-emitter';
/**
 * Эмиттер, используемый для делегирования событий блока.
 *
 * Делегирование событий блока происходит следующим образом:
 * - Когда блок инициирует событие `eventName`, он также инциирует событие `block/blockName/eventName`
 *   на DOM ноде блока. Это событие распространяется вверх по DOM дереву.
 *
 * - При добавлении нового события в `BlockEventEmitter`, для переданной DOM ноды добавляется обработчик события
 *   `block/blockName/eventName`, который инициирует в эмиттере событие `eventName`.
 *
 * - При удалении события из `BlockEventEmitter`, соответствующий обработчик удаляется из DOM ноды. Тем самым
 *   прекращается делегирование.
 */
class BlockEventEmitter extends EventEmitter {
    /**
     * Создает эмиттер событий, который позволяет слушать события экземпляров блока `blockClass`
     * на DOM ноде `domNode`.
     *
     * @param {Function} blockClass
     * @param {jQuery} domNode
     */
    constructor(blockClass, domNode) {
        super(blockClass, domNode);
        this._blockClass = blockClass;
        this._domNode = domNode;
        this._listeners = {};
    }

    _onAddEvent(eventName) {
        var _this = this;

        function listener(jqEvent, blockEvent) {
            _this.emit(eventName, blockEvent);
            if (blockEvent.isPropagationStopped()) {
                jqEvent.stopPropagation();
            }
        }

        var propagationEventName = this._blockClass._getPropagationEventName(eventName);
        this._domNode.on(propagationEventName, listener);
        this._listeners[eventName] = listener;
    }

    _onRemoveEvent (eventName) {
        var propagationEventName = this._blockClass._getPropagationEventName(eventName);
        this._domNode.off(propagationEventName, this._listeners[eventName]);
        delete this._listeners[eventName];
    }
}
export default BlockEventEmitter;
