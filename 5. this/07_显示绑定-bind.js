function foo() {
  console.log(this)
}

var newFoo = foo.bind('666')
newFoo()
newFoo()
