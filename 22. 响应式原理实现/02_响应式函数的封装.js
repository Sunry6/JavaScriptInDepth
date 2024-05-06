// 封装一个响应式的函数
let reactiveFns = []
function watchFn(fn) {
  reactiveFns.push(fn)
}

// 对象的响应式
const obj = {
  name: 'why',
  age: 18,
}

watchFn(() => {
  console.log('into watch')
  console.log(obj.name)
})

watchFn(() => {
  console.log('demo function-------')
})

function bar() {
  console.log('bar')
}

obj.name = 'coder'
reactiveFns.forEach(fn => fn())
