function foo() {
  function bar() {
    console.log('bar')
  }

  return bar
}

const baz = foo()
// baz() // bar

function makeAdder(count) {
  return function add(num) {
    return count + num
  }
}

var add5 = makeAdder(5)
// console.log(add5(6))

var add10 = makeAdder(10)
var add100 = makeAdder(100)

// 高阶函数: 一个函数如果接收另外一个函数作为参数，或者返回值是一个函数，那么这个函数就是高阶函数
