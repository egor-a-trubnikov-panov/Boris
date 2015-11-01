/**
 * @param {BtJson} body Содержимое страницы. Следует использовать вместо `content`.
 * @param {String} doctype Доктайп. По умолчанию используется HTML5 doctype.
 * @param {Object[]} styles Набор CSS-файлов для подключения.
 *                          Каждый элемент массива должен содержать ключ `url`, содержащий путь к файлу.
 * @param {Object[]} scripts Набор JS-файлов для подключения.
 *                           Каждый элемент массива должен содержать ключ `url`, содержащий путь к файлу.
 * @param {BtJson} head Дополнительные элементы для заголовочной части страницы.
 * @param {String} favicon Путь к фавиконке.
 */

btr.match('page*', function (ctx) {
    ctx.enableAutoInit();
    var styleElements;
    var styles = ctx.getParam('styles');
    if (styles) {
        styleElements = styles.map(function (style) {
            return {
                elem: 'css',
                url: style.url,
                ie: style.ie
            };
        });
    }

    return [
        {raw: ctx.getParam('doctype') || '<!DOCTYPE html>'},
        {
            elem: 'html',
            content: [
                {
                    elem: 'head',
                    content: [
                        [
                            {
                                elem: 'meta',
                                charset: 'utf-8'
                            },
                            {
                                elem: 'title',
                                content: ctx.getParam('title')
                            },
                            ctx.getParam('favicon') ?
                            {
                                elem: 'favicon',
                                url: ctx.getParam('favicon')
                            } :
                                ''
                        ],
                        styleElements,
                        ctx.getParam('head')
                    ]
                },
                ctx.getJson()
            ]
        }
    ];
});

btr.match('page*', function (ctx) {
    ctx.setTag('body');
    ctx.enableAutoInit();
    var scriptElements;
    var scripts = ctx.getParam('scripts');
    var lang = ctx.getParam('lang') || 'ru';
    if (scripts) {
        scriptElements = scripts.map(function (script) {
            return {
                elem: 'js',
                url: script.url ? script.url.replace('{lang}', lang) : undefined,
                source: script.source
            };
        });
    }
    ctx.setContent([ctx.getParam('body'), scriptElements]);
});

btr.match('page*__title', function (ctx) {
    ctx.disableCssClassGeneration();
    ctx.setTag('title');
    ctx.setContent(ctx.getParam('content'));
});

btr.match('page*__html', function (ctx) {
    ctx.setTag('html');
    ctx.disableCssClassGeneration();
    ctx.setContent(ctx.getParam('content'));
});

btr.match('page*__head', function (ctx) {
    ctx.setTag('head');
    ctx.disableCssClassGeneration();
    ctx.setContent(ctx.getParam('content'));
});

btr.match('page*__meta', function (ctx) {
    ctx.setTag('meta');
    ctx.disableCssClassGeneration();
    ctx.setAttr('content', ctx.getParam('content'));
    ctx.setAttr('http-equiv', ctx.getParam('http-equiv'));
    ctx.setAttr('charset', ctx.getParam('charset'));
});

btr.match('page*__favicon', function (ctx) {
    ctx.disableCssClassGeneration();
    ctx.setTag('link');
    ctx.setAttr('rel', 'shortcut icon');
    ctx.setAttr('href', ctx.getParam('url'));
});

btr.match('page*__js', function (ctx) {
    ctx.disableCssClassGeneration();
    ctx.setTag('script');
    var url = ctx.getParam('url');
    if (url) {
        ctx.setAttr('src', url);
    }
    var source = ctx.getParam('source');
    if (source) {
        ctx.setContent(source);
    }
    ctx.setAttr('type', 'text/javascript');
});

btr.match('page*__css', function (ctx) {
    ctx.disableCssClassGeneration();
    var url = ctx.getParam('url');

    if (url) {
        ctx.setTag('link');
        ctx.setAttr('rel', 'stylesheet');
        ctx.setAttr('href', url);
    } else {
        ctx.setTag('style');
    }

    var ie = ctx.getParam('ie');
    if (ie !== undefined) {
        if (ie === true) {
            return ['<!--[if IE]>', ctx.getJson(), '<![endif]-->'];
        } else if (ie === false) {
            return ['<!--[if !IE]> -->', ctx.getJson(), '<!-- <![endif]-->'];
        } else {
            return ['<!--[if ' + ie + ']>', ctx.getJson(), '<![endif]-->'];
        }
    }
});

