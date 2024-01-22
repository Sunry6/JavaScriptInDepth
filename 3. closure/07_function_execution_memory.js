function foo() {
  var name = 'f00'
  var age = 18

  function bar() {
    console.log(name)
    console.log(age)
  }

  return bar
}

var fn = foo()
fn()
