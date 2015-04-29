var gulp = require('gulp'),
    bem = require('gulp-bem'),
    btr = require('gulp-btr'),
    concat = require('gulp-concat'),
    del = require('del'),
    connect = require('gulp-connect'),
    stylus = require('gulp-stylus'),
    autoprefixer = require('gulp-autoprefixer'),
    csso = require('gulp-csso'),
    uglyfly = require('gulp-uglyfly'),
    mocha = require('gulp-mocha'),
    sourcemaps = require('gulp-sourcemaps'),
    runSequence = require('run-sequence'),
    deps;

var levels = [
    'core',
    'blocks',
    'pages'
];

/**
 * Сборка зависимостей
 * */
gulp.task('deps', function (done) {
    var tree = bem.objects(levels)
        .pipe(bem.deps())
        .pipe(bem.tree());
    deps = tree.deps('pages/index');
    done();
});

/**
 * Сборка Stylus
 * */
gulp.task('styl', function () {
    return deps.src('{bem}.styl')
        .pipe(concat('index.styl'))
        .pipe(stylus())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(csso())
        .pipe(gulp.dest('./dist'))
        .pipe(connect.reload());
});

/**
 * Сборка js
 * */
gulp.task('js', function () {
    return deps.src(['{bem}.script.js','{bem}.tmpl.js'])
        .pipe(concat('index.js'))
        //.pipe(uglyfly())
        .pipe(gulp.dest('./dist'))
        .pipe(connect.reload());
});

/**
 * Сборка html
 * */
gulp.task('html', function () {
    delete require.cache[require.resolve('./pages/index/index.json.js')];
    return deps.src('{bem}.tmpl.js')
        .pipe(concat('tmpl.js'))
        .pipe(btr(require('./pages/index/index.json.js'), 'index.html'))
        .pipe(gulp.dest('./dist'))
        .pipe(connect.reload());
});

/**
 * Собираем картинки
 * */
gulp.task('img', function () {
    return deps.src(['*.svg', '*.png'])
        .pipe(gulp.dest('./dist/img'))
});


/**
 * Удаляет картинки
 */
gulp.task('clean_img', function (cb) {
    del(['./dist/img'], cb);
});

/**
 * Удаляет все файлы сборки
 */
gulp.task('clean_all', function (cb) {
    del(['./dist/'], cb);
});


/**
 * Следит за изменениями в шаблонах
 * */
gulp.task('watch_tmpl', function () {
    return gulp.watch([
        '{blocks,pages}/**/*.tmpl.js',
        '{blocks,pages}/**/*.json.js'
    ], function () {
        runSequence('deps', 'html')
    });
});

/**
 * Следит за изменениями в зависимостей
 * */
gulp.task('watch_deps', function () {
    return gulp.watch('{blocks,pages}/**/*.deps.js', function () {
        runSequence('clean_all', 'deps', 'build')
    });
});

/**
 * Следит за изменениями javaScript
 * */
gulp.task('watch_js', function () {
    return gulp.watch('{blocks,pages}/**/*.script.js', function () {
        runSequence('deps', 'js')
    });
});

/**
 * Следит за изменениями стилей
 * */
gulp.task('watch_css', function () {
    return gulp.watch('{blocks,pages}/**/*.styl', function () {
        runSequence('deps', 'styl');
        runSequence('clean_img','deps', 'img')
    });
});

/**
 * Следит за изменениями картинок
 * */
gulp.task('watch_img', function () {
    return gulp.watch(['{blocks,pages}/**/*.png', '{blocks,pages}/**/*.svg'],
        function () {
            runSequence('clean_img','deps', 'img')
        });
});

/**
 * сервер livereload
 * */
gulp.task('connect', function () {
    return connect.server({
        port: 8080,
        livereload: true,
        root: './dist'
    });
});

/**
 * Сборка всего
 * */
gulp.task('build', ['html', 'styl', 'js', 'img']);

gulp.task('default', ['clean_all', 'deps', 'build', 'connect', 'watch_js', 'watch_css', 'watch_deps', 'watch_tmpl', 'watch_img']);
