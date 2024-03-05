function foo() {
  console.log(this)
}

foo.apply('abc')
foo.apply({})

// 传入null或undefined时，会被忽略，仍然使用默认绑定规则
foo.apply(null)
foo.apply(undefined)

var bar = foo.bind(null)
bar()
