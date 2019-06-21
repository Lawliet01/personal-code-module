var pxtoviewport = require('postcss-px-to-viewport')


function compileSass() {
   var processors = [
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
   return src('src/*.css')
      .pipe(postcss(processors))
}
