function foo() {
  // var a = b = 10
  // -> 上面的代码等价于下面的代码
  // @ts-ignore
  var a = 10
  // @ts-ignore
  b = 10
}

foo()

// @ts-ignore
console.log(a)
// @ts-ignore
console.log(b)