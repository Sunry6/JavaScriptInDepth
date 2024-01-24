function Person(name, age) {
  this.name = name
  this.age = age
}

var p = new Person('666', 18)
console.log(p.name)
console.log(p.age)

var obj = {
  foo: function () {
    console.log(this)
  },
}
new obj.foo()
