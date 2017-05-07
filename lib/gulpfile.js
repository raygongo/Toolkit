var gulp = require('gulp'),
    clean = require('gulp-clean'),
    imagemin = require('gulp-imagemin'),
    concat = require('gulp-concat'),
    cssmin = require('gulp-clean-css'),
    jshint = require('gulp-jshint'),
    header = require('gulp-header'),
    footer = require('gulp-footer'),
    uglify = require('gulp-uglify'),
    autoprefixer = require('gulp-autoprefixer'),
    spriter = require('gulp-css-spriter'),
    cdn = require('gulp-cdn');

var Config = {
    name: "52daohang",
    itemName: "52daohang v2",
    version: "2.0",
    author: "haovei@qq.com",
    cdn: "./"
};


gulp.task('clean', function () {
    return gulp.src("build")
        .pipe(clean());
});

gulp.task('js', ['clean'], function () {
    gulp.src(['./src/ui/**/*.js'])
        .pipe(jshint())
        .pipe(uglify({
            mangle: {
                except: ['require']
            }
        }))
        .pipe(gulp.dest('./build/ui'));
});

gulp.task('image', ['clean'], function () {
    gulp.src(['./src/ui/**/*.{png,jpg,gif,ico}'])
        .pipe(imagemin({
            progressive: true,
            interlaced: true,
            multipass: true
        }))
        .pipe(gulp.dest('./build/ui'));
});

gulp.task('css', ['clean'], function () {
    gulp.src(['./src/ui/css/*.css'])
        .pipe(spriter({
            spriteSheet: './build/ui/img/sprite.png',
            pathToSpriteSheetFromCSS: '../img/sprite.png'
        }))
        .pipe(autoprefixer())
        .pipe(cssmin({
            advanced: false,
            compatibility: "ie7",
            keepBreaks: true
        }))
        .pipe(header('/**\n * ${itemName} v<%= version %> | <%= author %>\n */\n', Config))
        .pipe(gulp.dest('./build/ui/css'));
});

gulp.task('copy', ['clean'], function () {
    gulp.src(['./src/ui/img/**/*.*', '!./src/ui/img/**/*.{png,jpg,gif,ico}'])
        .pipe(gulp.dest('./build/ui/img'));
    //复制其他文件
    gulp.src(['./src/data/**/*.*']).pipe(gulp.dest('./build/data'));
    gulp.src(['./src/*.html', '!./src/demo/tpl/**/*.*'])
        .pipe(cdn({
            domain: "../ui",
            cdn: Config.cdn
        }))
        .pipe(gulp.dest('./build'));
});

// 生成发布
gulp.task('default', ['css', 'image', 'js', 'copy']);