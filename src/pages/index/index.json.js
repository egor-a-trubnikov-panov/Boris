module.exports = {
    block: 'page',
    title: 'index page',
    styles: [
        {url: 'index.css'}
    ],
    scripts: [
        {url: 'index.js'}
    ],
    body: [
        {
            block: 're-position',
            content:[
                {
                    block: 'data-pick'
                }
            ]
        }

    ]
};

