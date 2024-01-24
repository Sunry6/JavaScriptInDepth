// function foo() {
//   console.log(this)
// }

// foo()

// function foo1() {
//   console.log(this)
// }

// function foo2() {
//   console.log(this)
//   foo1()
// }

// function foo3() {
//   console.log(this)
//   foo2()
// }
// foo3()

// var obj = {
//   name: 'why',
//   foo: function () {
//     console.log(this)
//   },
// }
// var bar = obj.foo
// bar()

function foo() {
  function bar() {
    console.log(this)
  }
  return bar
}

var fn = foo()
fn()

var obj = {
  name: 'why',
  eating: fn,
}

obj.eating() // 隐式绑定
