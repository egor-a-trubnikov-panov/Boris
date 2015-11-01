var gulp = require('gulp'),
    btr = require('gulp-btr'),
    concat = require('gulp-concat'),
    del = require('del'),
    connect = require('gulp-connect'),
    stylus = require('gulp-stylus'),
    autoprefixer = require('gulp-autoprefixer'),
    csso = require('gulp-csso'),
    runSequence = require('run-sequence');

/**
 * Сборка Stylus
 * */
gulp.task('styl', function () {
    return gulp.src('./src/**/*.styl')
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
    return deps.src(['./src/**.*.script.js','./src/**/*.tmpl.js'])
        .pipe(concat('index.js'))
        .pipe(gulp.dest('./dist'))
        .pipe(connect.reload());
});

/**
 * Сборка html
 * */
gulp.task('html', function () {
    delete require.cache[require.resolve('./src/pages/index/index.json.js')];
    return gulp.src('./src/**/*.tmpl.js')
        .pipe(concat('tmpl.js'))
        .pipe(btr(require('./src/pages/index/index.json.js'), 'index.html'))
        .pipe(gulp.dest('./dist'))
        .pipe(connect.reload());
});

/**
 * Собираем картинки
 * */
gulp.task('img', function () {
    return gulp.src(['./src/**/*.svg', './src/**/*.png'])
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
        './src/**/*.tmpl.js',
        './src/**/*.json.js'
    ], function () {
        runSequence('html')
    });
});

/**
 * Следит за изменениями javaScript
 * */
gulp.task('watch_js', function () {
    return gulp.watch('./src/**/*.script.js', function () {
        runSequence('js')
    });
});

/**
 * Следит за изменениями стилей
 * */
gulp.task('watch_css', function () {
    return gulp.watch('./src/**/*.styl', function () {
        runSequence('styl','clean_img','img');
    });
});

/**
 * Следит за изменениями картинок
 * */
gulp.task('watch_img', function () {
    return gulp.watch(['./src/**/*.png', './src/**/*.svg'],
        function () {
            runSequence('clean_img', 'img')
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

gulp.task('dev', ['clean_all', 'build', 'connect', 'watch_js', 'watch_css', 'watch_deps', 'watch_tmpl', 'watch_img']);
