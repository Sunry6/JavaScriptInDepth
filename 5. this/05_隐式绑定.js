function foo() {
  console.log(this)
}

// var obj = {
//   name: 'why',
//   foo: foo,
// }

// obj.foo()

// var obj = {
//   name: 'why',
//   eating: function () {
//     console.log(obj.name, 'eat')
//   },
//   running: function () {
//     console.log(this.name, 'run')
//   },
// }
// obj.eating()
// obj.running()

// const fn = obj.eating
// fn()

var obj1 = {
  foo: function () {
    console.log(this)
  },
}

var obj2 = {
  name: 'obj2',
  bar: obj1.foo,
}

obj2.bar()
