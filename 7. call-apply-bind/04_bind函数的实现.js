Function.prototype.ryanBind = function (thisArg, ...argArray) {
  var fn = this
  thisArg = thisArg !== null && thisArg !== undefined ? Object(thisArg) : globalThis

  function proxyFn(...args) {
    thisArg.fn = fn
    var finalArgs = [...argArray, ...args]
    var result = thisArg.fn(...finalArgs)
    delete thisArg.fn

    return result
  }

  return proxyFn
}
function foo() {
  console.log('foo被执行', this)
  return 20
}

function sum(num1, num2, num3, num4) {
  console.log(num1, num2, num3, num4)
}

// 系统的bind使用
var bar = foo.bind('abc')
bar()

// var newSum = sum.bind("aaa", 10, 20, 30, 40)
// newSum()

// var newSum = sum.bind("aaa")
// newSum(10, 20, 30, 40)

// var newSum = sum.bind("aaa", 10)
// newSum(20, 30, 40)

// 使用自己定义的bind
// var bar = foo.hybind("abc")
// var result = bar()
// console.log(result)

var newSum = sum.ryanBind('abc', 10, 20)
var result = newSum(30, 40)
