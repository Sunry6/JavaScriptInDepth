var coder = 'coder'

foo(123)
function foo(num) {
  var m = 10
  var n = 20
  console.log(m)

  function bar() {
    console.log(coder)
  }

  bar()
}

var num1 = 20
var num2 = 30
var result = num1 + num2

var GlobalObject = {
  String: '类',
  window: GlobalObject,
  coder: undefined,
  foo: '0Xa00',
}
