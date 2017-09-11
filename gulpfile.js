var gulp = require("gulp");
var scss = require("gulp-sass");
var browserSync = require("browser-sync");
var plumber = require("gulp-plumber"); //scssとpugの変換でエラーが出た場合の強制終了を防止
var notify = require("gulp-notify"); //デスクトップ通知を行う
var pug = require("gulp-pug");
var path = require("path")

gulp.task('default', ['scss', 'browser-sync', 'pug', 'watch']); //コマンドプロンプトからgulpと実行された場合に行うタスクの一覧

//scssとpugの監視をして変換処理させる
gulp.task('watch', () => {
    gulp.watch([path.resolve('./public/src/scss/**.scss')], () => {
        gulp.start(['scss']);
    });
    gulp.watch([path.resolve('./public/src/pug/**.pug')], () => {
        gulp.start(['pug']);
    });
});

//scssをcssに変換
gulp.task("scss", () => {
    gulp.src(path.resolve('./public/src/scss/**.scss'))
        .pipe(plumber({
            errorHandler: notify.onError("Error: <%= error.message %>")
        }))
        .pipe(scss())
        .pipe(gulp.dest("./dist/css"))
});

//pugをhtmlに変換
gulp.task("pug", () => {
    gulp.src(path.resolve('./public/src/pug/**.pug'))
        .pipe(plumber({
            errorHandler: notify.onError("Error: <%= error.message %>")
        }))
        .pipe(pug())
        .pipe(gulp.dest("./dist/html"))
});


//ブラウザ表示
gulp.task('browser-sync', () => {
    browserSync({
        server: {
            baseDir: "./dist/html"   //ブラウザに表示するディレクトリ
        }
    });
    //ファイルの監視
    //以下のファイルが変わったらリロードする
    gulp.watch(path.resolve("./dist/js/*.js"),     ['reload']);
    gulp.watch(path.resolve("./dist/html/*.html"),     ['reload']);
    gulp.watch(path.resolve("./dist/css/*.css"),     ['reload']);
});

//ブラウザリロード処理
gulp.task('reload', () => {
    browserSync.reload();
});