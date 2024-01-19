var a = 100

function foo() {
  // @ts-ignore
  console.log(a)
  return
  var a = 100
}

foo()
