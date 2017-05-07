var gulp = require('gulp'),
    clean = require('gulp-clean'),
    uglify = require('gulp-uglify'),
    cssmin = require('gulp-minify-css'),
    autoprefixer = require('gulp-autoprefixer'),
    babel = require('gulp-babel'),
    imagemin = require('gulp-imagemin');


gulp.task('clean', function() {
    return gulp.src('dist')
        .pipe(clean());
})
gulp.task('cssmin', function() {
    gulp.src('src/css/*.css')
        .pipe(autoprefixer({
            cascade: false, //是否美化属性值 默认：true 像这样：
            //-webkit-transform: rotate(45deg);
            //        transform: rotate(45deg);
            remove: true //是否去掉不必要的前缀 默认：true 
        }))
        .pipe(cssmin({
            keepSpecialComments: '*'
        }))
        .pipe(gulp.dest('dist/css'));
})

gulp.task('js', function() {
    gulp.src('src/js/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
})

gulp.task('default', ['clean', 'cssmin', 'js']);


 
gulp.task('imgMini', function () {
    gulp.src('src/img/*.{png,jpg,gif,ico}')
        .pipe(imagemin({
            optimizationLevel: 0, //类型：Number  默认：3  取值范围：0-7（优化等级）
            // progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
            // interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
            // multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
        }))
        .pipe(gulp.dest('dist/img'));
});