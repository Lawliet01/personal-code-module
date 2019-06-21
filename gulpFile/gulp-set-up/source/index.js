/***
*	测试使用文件
*	**/


class Happy {
   constructor() {
      this.a = a;
   }

   good() {
      return () => {
         console.log(this.a)
      }
   }
}

new Promise(resolve=>{
   resolve(true)
})

let a = [1, 2, 3];

for (let each of a) {
   console.log('good')
}