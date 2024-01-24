function foo() {
  var name = 'why'
  var age = 18

  function bar() {
    console.log(name)
    console.log(age)
  }

  return bar
}

var fn = foo()
fn()
