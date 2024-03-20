Function.prototype.ryanApply = function (thisArg, argArray) {
  var fn = this
  thisArg = thisArg !== null && thisArg !== undefined ? Object(thisArg) : globalThis

  thisArg.fn = fn
  var result

  argArray = argArray || []
  result = thisArg.fn(...argArray)

  delete thisArg.fn
  return result
}

function sum(num1, num2) {
  console.log('sum被调用: ', this, num1, num2)
  return num1 + num2
}

function foo(num) {
  return num
}

function bar() {
  console.log('bar函数被执行: ', this)
}

bar.ryanApply(0)
