var obj = {
  name: 'obj',
  foo: function () {
    console.log(this)
  },
}

// call / apply 的显示绑定高于隐式绑定
// obj.foo.call('abc')

// bind的显示绑定高于隐式绑定
function func() {
  console.log(this)
}
var object = {
  name: 'object',
  func: func.bind('abc'),
}
object.func()
