function foo() {
  var name = 'foo'
  return function bar() {
    console.log('bar', name)
  }
}

var fn = foo()
fn()
