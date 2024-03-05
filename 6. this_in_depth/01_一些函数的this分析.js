function hySetTimeout(callback, time) {
  const startTime = Date.now()
  while (Date.now() - startTime < time) {}
  callback()
}

// setTimeout(function () {
//   console.log(this) // window
// }, 1000)

var names = ['abc', 'cba', 'nba']
names.forEach(function (name) {
  console.log(this) // window
  console.log(name)
}, 'abc')
names.map(function (item) {
  console.log(item, this)
}, 'cba')

// 绑定规则优先级
// 1. new 绑定 > 显示绑定 > 隐式绑定 > 默认绑定
