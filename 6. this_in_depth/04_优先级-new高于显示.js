// new关键字不能和apply/call一起来使用

// new的优先级高于bind
function foo() {
  console.log(this)
}

var bar = foo.bind('abc')
var obj = new bar()
