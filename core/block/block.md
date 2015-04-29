# block: базовый блок

Класс `Block` — это базовый визуальный блок. Все прочие визуальные блоки должны наследоваться от этого блока с
помощью модуля `inherit`.

<!--JS_API-->


#Перенаследуемые методы

##destruct

Уничтожает блок. При уничтожении блок автоматически отвязывает все обработчики событий,
которые были привязаны к инстанции блока или привязаны внутри блока, используя метод `_bindTo()`.
Этот метод следует перекрывать, если необходимы дополнительные действия при уничтожении блока.
При этом необходимо вызывать базовую реализацию деструктора с помощью `this.__base()`.

```js
@example
destruct: function () {
    this._cache.drop();
    this.__base();
}
```

##getDomNode

Возвращает DOM-элемент данного блока.

```js
@returns {jQuery}
```

##_bindTo

Добавляет обработчик события `event` объекта `emitter`. Контекстом обработчика
является экземпляр данного блока. Обработчик события автоматически удалится при вызове
`Block.prototype.destruct()`.

```js
@protected
@param {jQuery|Block} emitter
@param {String} event
@param {Function} callback
@returns {Block}
@example
var View = inherit(Block, {
    __constructor: function (model) {
        this.__base();
        var hide = this._findElement('hide');
        this._bindTo(hide, 'click', this._onHideClick);
        this._bindTo(model, 'change-attr', this._onAttrChange);
    }
});
```

##_unbindFrom

Удаляет обработчик события `event` объекта `emitter`, добавленный с помощью
`Block.prototype._bindTo()`.

```js
@protected
@param {jQuery|Block} emitter
@param {String} event
@param {Function} callback
@returns {Block}
```

##emit

Исполняет обработчики события `blockEvent` блока. Первым аргументом в обработчики события будет
передан экземпляр класса `BlockEvent`.

```js
@param {String|BlockEvent} blockEvent Имя события или экземпляр класса `BlockEvent`.
@param {Object} [data] Дополнительные данные, которые можно получить через `e.data` в обработчике.
@returns {Block}
@example
var block = new Block();
block.on('click', function (e) {
    console.log(e.type);
});
block.emit('click'); // => 'click'
var event = new BlockEvent('click');
block.emit(event); // => 'click'
```

##getView

Возвращает имя отображения данного блока.

```js
@returns {String|undefined}
```

##_setState

Устанавливает CSS-класс по имени и значению состояния.
Например, для блока `button` вызов `this._setState('pressed', 'yes')`
добавляет CSS-класс с именем `pressed_yes`.
С точки зрения `BEM` похож на метод `setMod`, но не вызывает каких-либо событий.

```js
@protected
@param {String} stateName Имя состояния.
@param {String|Boolean} [stateVal=true] Значение.
                                        Если указан `false` или пустая строка, то CSS-класс удаляется.
@returns {Block}
```

##_removeState

Удаляет CSS-класс состояния с заданным именем.
Например, для блока `button` вызов `this._removeState('side')`
удалит CSS-классы с именами `side_left`, `side_right` и т.п.
С точки зрения `BEM` похож на метод `delMod`, но не вызывает каких-либо событий.

```js
@protected
@param {String} stateName
@returns {Block}
```

##_getState

Возвращает значение состояния на основе CSS-классов блока.
Например, для блока `button`, у которого на DOM-элементе висит класс `pressed_yes`,
вызов `this._getState('pressed')` возвратит значение `yes`.
С точки зрения `BEM` похож на метод `getMod`.

```js
@protected
@param {String} stateName
@returns {String|Boolean}
```

##_toggleState

Переключает значение состояния блока (полученное на основе CSS-классов) между двумя значениями.
Например, для блока `button`, у которого на DOM-элементе висит класс `pressed_yes`,
вызов `this._toggleState('pressed', 'yes', '')` удалит класс `pressed_yes`,
а повторный вызов — вернет на место.
С точки зрения `BEM` похож на метод `toggleMod`, но не вызывает каких-либо событий.

```js
@protected
@param {String} stateName
@param {String|Boolean} stateVal1
@param {String|Boolean} stateVal2
@returns {Block}
```

##_setElementState

Устанавливает CSS-класс для элемента по имени и значению состояния.
Например, для элемента `text` блока `button` вызов
`this._setElementState(this._findElement('text'), 'pressed', 'yes')`
добавляет CSS-класс с именем `pressed_yes`.
С точки зрения `BEM` похож на метод `setElemMod`.

```js
@protected
@param {HTMLElement|jQuery} domNode
@param {String} stateName Имя состояния.
@param {String|Boolean} [stateVal=true] Значение.
                                        Если указан `false` или пустая строка, то CSS-класс удаляется.
@returns {Block}
```

##_removeElementState

Удаляет CSS-класс состояния с заданным именем для элемента.
Например, для элемента `text` блока `button` вызов
`this._removeElementState(this._findElement('text'), 'side')`
удалит CSS-классы с именами `side_left`, `side_right` и т.п.
С точки зрения `BEM` похож на метод `delElemMod`.

```js
@protected
@param {HTMLElement|jQuery} domNode
@param {String} stateName
@returns {Block}
```

##_getElementState

Возвращает значение состояния на основе CSS-классов элемента.
Например, для элемента `text` блока `button`,
у которого на DOM-элементе висит класс `pressed_yes`, вызов
`this._getElementState(this._findElement('text'), 'pressed')` возвратит значение `yes`.
С точки зрения `BEM` похож на метод `getElemMod`.

```js
@protected
@param {HTMLElement|jQuery} domNode
@param {String} stateName
@returns {String}
```

##_toggleElementState

Переключает значение состояния элемента блока (полученное на основе CSS-классов) между двумя значениями.
Например, для элемента `text` блока `button`,
у которого на DOM-элементе висит класс `pressed_yes`, вызов
`this._toggleElementState(this._findElement('text'), 'pressed', 'yes', '')`
удалит класс `pressed_yes`, а повторный вызов — вернет на место.
С точки зрения `BEM` похож на метод `toggleElemMod`.

```js
@protected
@param {HTMLElement|jQuery} domNode
@param {String} stateName
@param {String} stateVal1
@param {String} stateVal2
@returns {Block}
```

##_findElement

Возвращает первый элемент с указанным именем.

```js
@protected
@param {String} elementName Имя элемента.
@param {HTMLElement|jQuery} [parentElement] Элемент в котором необходимо произвести поиск. Если не указан,
                                            то используется результат `this.getDomNode()`.
@returns {jQuery|undefined}
@example
var title = this._findElement('title');
title.text('Hello World');
```

##_findAllElements

Возвращает все элементы по указанному имени.

```js
@protected
@param {String} elementName Имя элемента.
@param {HTMLElement|jQuery} [parentElement] Элемент в котором необходимо произвести поиск. Если не указан,
                                            то используется результат `this.getDomNode()`.
@returns {jQuery[]}
@example
this._findAllElements('item').forEach(function (item) {
    item.text('Item');
});
```

##_getOptions

Возвращает параметры, которые были переданы блоку при инициализации.

```js
@protected
@returns {Object}
@example
var control = Control.fromDomNode(
    $('<div class="control _init" onclick="return {\'control\':{level:5}}"></div>')
);
// control:
inherit(Block, {
    myMethod: function() {
        console.log(this._getOptions().level);
    }
}, {
    getBlockName: function() {
        return 'control';
    }
});
```

##_getElementOptions

Возвращает параметры, которые были переданы элементу блока при инициализации.

```js
@protected
@param {HTMLElement|jQuery} domNode
@returns {Object}
@example
// HTML:
// <div class="control _init">
//     <div class="control__text" data-options="{options:{level:5}}"></div>
// </div>
provide(inherit(Block, {
    __constructor: function() {
        this.__base.apply(this, arguments);
        this._textParams = this._getElementOptions(this._findElement('text'));
    }
}, { getBlockName: function() { return 'control'; } }));
```

##_createDomElement

Создает и возвращает DOM-элемент на основе BH-опций.
Создание нового элемента осуществляется с помощью применения BH-шаблонов.

```js
@protected
@param {Object} params
@returns {jQuery}
```

##_parseStateCssClasses

Разбирает состояния DOM-элемента, возвращает объект вида `{stateName: stateVal, ...}`.

```js
@private
@param {jQuery} domNode
@returns {Object}
```
##_getElementName

Возвращает имя элемента блока на основе DOM-элемента.

```js
@private
@param {jQuery} domNode
@returns {String|null}
```
---
#Собственные методы


##getBlockName

Возвращает имя блока.
Этот метод следует перекрывать при создании новых блоков.

```js
@static
@returns {String|null}
@example
provide(inherit(Block, {}, {
    getBlockName: function() {
        return 'my-button';
    }
});
```

##fromDomNode

Возвращает инстанцию блока для переданного DOM-элемента.

```js
@static
@param {HTMLElement|jQuery} domNode
@param {Object} [params]
@returns {Block}
@example
var page = Page.fromDomNode(document.body);
```

##initOnDomNode

Инициализирует блок, если это необходимо.
Возвращает `null` для блоков с отложенной (`live`)
инициализацией и инстанцию блока для прочих.

```js
@static
@param {HTMLElement|jQuery} domNode
@param {Object} params
@returns {Block|null}
```

##_liveInitIfRequired

Запускает `live`-инициализацию, если она определена для блока и не была выполнена ранее.

```js
@static
@protected
```

##_liveInit

Если для блока требуется отложенная (`live`) инициализация,
следует перекрыть это свойство статическим методом.
Этот выполняется лишь однажды, при инициализации первого блока на странице.
В рамках `_liveInit` можно пользоваться методами `_liveBind` и `_liveBindToElement` для того,
чтобы глобально слушать события на блоке и элементе соответственно.

```js
@static
@protected
@type {Function|null}
@example
var MyBlock = inherit(Block, {}, {
    _liveInit: function () {
        this._liveBind('click', function(e) {
            this._setState('clicked', 'yes');
        });
        this._liveBindToElement('title', 'click', function(e) {
            this._setElementState($(e.currentTarget), 'clicked', 'yes');
        });
    }
});
```

##_instantInitIf

Отменяет отложенную инициализацию блока по определенному условию.
Условием служит функция, которая принимает параметры и DOM-элемент блока. Если функция возвращает true,
то блок инициализируется сразу.
Рекомендуется для таких случаев передавать нужные параметры, которые сигнализируют о том,
что блок необходимо инициализировать блок сразу.

```js
@static
@protected
@param {Function<Object,jQuery>} condition
```

##_liveBind

Глобально слушает событие на блоке. Используется при отложенной инициализации.
Обработчик события выполнится в контексте инстанции блока.

```js
@static
@protected
@param {String} eventName
@param {Function} handler
```

##_liveBindToElement

Глобально слушает событие на элементе блока. Используется при отложенной инициализации.
Обработчик события выполнится в контексте инстанции блока.

```js
@static
@protected
@param {String} elementName
@param {String} eventName
@param {Function} handler
```

##_getLiveEventsScopeElement

Возвращает элемент, на котором будут слушаться глобальные (`live`) события.

```js
@static
@protected
@returns {jQuery}
```

##destructOnDomNode

Уничтожает инстанцию блока на переданном DOM-элементе.

```js
@static
@param {HTMLElement|jQuery} domNode
```

##find

Возвращает первую инстанцию блока внутри переданного фрагмента DOM-дерева.

```js
@static
@param {jQuery|HTMLElement|Block} parentElement
@returns {Block|undefined}
@example
var input = Input.find(document.body);
if (input) {
    input.setValue('Hello World');
} else {
    throw new Error('Input wasn\'t found in "control".');
}
```

##findAll

Возвращает все инстанции блока внутри переданного фрагмента DOM-дерева.

```js
@static
@param {jQuery|HTMLElement|Block} parentElement
@returns {Block[]}
@example
var inputs = Input.findAll(document.body);
inputs.forEach(function (input) {
    input.setValue("Input here");
});
```

##initDomTree

Инициализирует все блоки на переданном фрагменте DOM-дерева.

```js
@static
@param {HTMLElement|jQuery|Block} domNode
@returns {Promise}
@example
Block.initDomTree(document.body).done(function () {
    Button.getEmitter(document.body).on('click', function () {
        alert("Button is clicked");
    });
});
```

##destructDomTree

Уничтожает все инстанции блоков на переданном фрагменте DOM-дерева.

```js
@static
@param {HTMLElement|jQuery|Block} domNode
```
##getEmitter

Возвращает эмиттер событий блока для переданного DOM-элемента.
На полученном эмиттере можно слушать блочные события, которые будут всплывать до этого DOM-элемента.

```js
@static
@param {HTMLElement|jQuery|Block} domNode
@returns {EventEmitter}
@example
Button.getEmitter(document.body).on('click', function () {
    alert('Button is clicked');
});
```

##_getDomNodeFrom

Возвращает jQuery DOM-элемент используя HTMLElement, инстанцию блока или другой jQuery-элемент.

```js
@static
@protected
@param {jQuery|HTMLElement|Block} domNode
@returns {Block}
```

##_getDomNodeOptions

Возвращает опции блока или элемента на указанном DOM-элементе.

```js
@static
@private
@param {jQuery} domNode
```

##_getDomNodeDataStorage

Возвращает хранилище данных для DOM-элемента.

```js
@static
@private
@param {jQuery} domNode
@param {Boolean} [skipCreating]
@returns {Object}
```

##_getPropagationEventName

Возвращает специальное имя события, которое используется для распространения события блока по DOM дереву.

```js
@static
@private
@param {String} eventName Имя события блока.
@returns {String}
```

##_autoInitCssClass

CSS-класс для автоматической инициализации.

```js
@static
@private
@type {String}
```

##_delegateEventsCssClass

CSS-класс для делегирования событий.

```js
@static
@private
@type {String}
```