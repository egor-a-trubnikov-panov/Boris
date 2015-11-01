/**
 * Класс, представляющий событие блока.
 */
class BlockEvent {
    /**
     * @param {String} type Тип события.
     * @param {Boolean} [isPropagationStopped=false] Запрещает распространение события.
     * @param {Boolean} [isDefaultPrevented=false] Запрещает действие по умолчанию.
     */
    constructor(type, isPropagationStopped, isDefaultPrevented) {
        this.type = type;
        this._isPropagationStopped = Boolean(isPropagationStopped);
        this._isDefaultPrevented = Boolean(isDefaultPrevented);
    }

    /**
     * Определяет, прекращено ли распространение события.
     *
     * @returns {Boolean}
     */
    isPropagationStopped() {
        return this._isPropagationStopped;
    }

    /**
     * Проверяет, отменена ли реакция по умолчанию на событие.
     *
     * @returns {Boolean}
     */
    isDefaultPrevented() {
        return this._isDefaultPrevented;
    }

    /**
     * Прекращает распространение события.
     */
    stopPropagation() {
        this._isPropagationStopped = true;
    }

    /**
     * Отменяет реакцию по умолчанию на событие.
     */
    preventDefault() {
        this._isDefaultPrevented = true;
    }
}

export default BlockEvent;
