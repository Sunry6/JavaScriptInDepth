// @ts-nocheck

// 箭头函数不绑定this
// 箭头函数没有自己的this, 它的this是继承自外层代码块的this
// 箭头函数的this是在定义它的时候绑定的, 而不是在执行它的时候绑定的
// 箭头函数的this是静态的, 它不会因为函数的调用方式的不同而改变
var obj = {
  data: [],
  getData: function () {
    // 调接口, 把返回值存到data里
    // 在箭头函数之前的解决方案
    // var _this = this
    // setTimeout(function () {
    //   var result = ['abc', 'cba', 'nba']
    //   _this.data = result
    //   console.log(_this)
    //   console.log(_this.data)
    // }, 2000)

    // 箭头函数之后的解决方案
    setTimeout(() => {
      var result = ['abc', 'cba', 'nba']
      this.data = result
      console.log(this)
      console.log(this.data)
    }, 2000)
  },
}

obj.getData()
