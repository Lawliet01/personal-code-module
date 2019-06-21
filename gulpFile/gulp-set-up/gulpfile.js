/***
*	包含sass转换
*  css自动添加前缀
*  px转换成vw（公司专用）
*  babel转换
*  压缩JS、CSS
*	**/

var { src, dest,watch } = require('gulp');
var sass = require('gulp-sass');  //sass
var postcss = require('gulp-postcss'); // 使用postCSS
var autoprefixer = require('autoprefixer'); //自动添加前缀
var pxtoviewport = require('postcss-px-to-viewport') //把px转换成vw
var sourcemaps = require('gulp-sourcemaps');// sourcemap服务
var babel = require('gulp-babel') //使用babel
var uglify = require('gulp-uglify') // 压缩js
var cleanCSS = require('gulp-clean-css') //压缩css

sass.compiler = require('node-sass')

/***
*	编译sass文件
*	**/

function compileSass() {
   var processors = [
      //公司专用
      pxtoviewport({
         viewportWidth: 750,
         viewportHeight: 1334,
         unitPrecision: 3,
         viewportUnit: 'vw',
         selectorBlackList: [".ignore", ".hairlines"],
         minPixelValue: 1,
         mediaQuery: false
      })
   ]
   return src('source/*.scss')
      .pipe(sass().on('error',sass.logError))
      .pipe(sourcemaps.init())
      .pipe(postcss([autoprefixer()]))
      .pipe(postcss(processors))
      .pipe(cleanCSS({compatibility:'ie8'}))
      .pipe(sourcemaps.write('.'))
      .pipe(dest('dist/'))
}

/***
*	编译JS文件
*	**/

function compileJS(){
   return src('source/*.js')
      .pipe(sourcemaps.init())
      .pipe(babel({
         presets:['@babel/env']
      }))
      .pipe(uglify())
      .pipe(sourcemaps.write('.'))
      .pipe(dest('dist/'))
}

/***
*  watch文件
*	**/
exports.default = function(){
   watch('source/*.scss', { ignoreInitial: false }, compileSass);
   watch('source/*.js',{ignoreInitial:false},compileJS)
}
