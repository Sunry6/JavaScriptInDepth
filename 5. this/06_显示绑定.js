function foo() {
  console.log('calling', this)
}

var obj = {
  name: 'obj',
}
foo.call('666')
foo.apply(obj)

function sum(num1, num2) {
  console.log(num1 + num2, this)
}

sum.call(obj, 10, 20)
sum.apply('apply', [10, 20])
