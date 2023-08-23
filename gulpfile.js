//打包工具的引用
const {
    src,
    dest,
    series,
    parallel,
    watch
} = require('gulp');



function defaultTask(cb) {
    console.log('hello gulp4');
    cb();
}
exports.do = defaultTask;



function taskA(cb) {
    console.log('任務A');
    cb();
}
function taskB(cb) {
    console.log('任務B');
    cb();
}
exports.sync = parallel(taskA, taskB); //同時執行任務A/B
exports.async = series(taskA, taskB); //執行任務A後再執行任務B



//檔案搬家 搬移複製
function move() {
    return src('src/index.html').pipe(dest('dist'))
}
exports.m = move;



//引入套件
//在html檔案內要套入其他資料的位置放 @@include('layout/header.html') //''內為路徑和檔案
const fileinclude = require('gulp-file-include');
function includeHTML() {
    return src('src/*.html')
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(dest('./dist'));
}
exports.template = includeHTML



// sass
//將scss檔案放置dist，檔案要套dist內的css
const sass = require('gulp-sass')(require('sass'));

function styleSass() {
    return src('./src/sass/*.scss')
        .pipe(sass.sync().on('error', sass.logError))   //將scss打包成css時會分行
        // .pipe(sass.sync({outputStyle: 'compressed'}).on('error', sass.logError)) //將scss打包成css時會變成一行
        .pipe(dest('./dist/css'));
}
exports.style = styleSass





//監看所有變動
//一旦src內資料變動儲存，會自動進行
function watchTask() {
    watch(['./src/*.html', './src/layout/*.html'], includeHTML)
    watch(['./src/sass/*.scss', './src/sass/**/*.scss'], styleSass)
}
exports.w = watchTask