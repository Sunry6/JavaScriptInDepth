function foo() {
  // @ts-ignore
  console.log(n)
  var n = 200
  console.log(n)
}

var n = 100
foo()