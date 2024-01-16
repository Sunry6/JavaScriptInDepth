const why = 'why'

function foo() {
  console.log(why)
}

foo()

function outer() {
  function inner() {}

  inner()
}

outer()
