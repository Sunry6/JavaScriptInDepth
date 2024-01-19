function foo() {
  // @ts-ignore
  m = 100
}

foo()

// @ts-ignore
console.log(m)
