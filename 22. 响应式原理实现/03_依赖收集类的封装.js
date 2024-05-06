class Depend {
  constructor() {
    this.reactiveFns = []
  }

  addDepend(reactiveFn) {
    this.reactiveFns.push(reactiveFn)
  }

  notify() {
    this.reactiveFns.forEach(fn => fn())
  }
}

// 封装一个响应式的函数
const depend = new Depend()
function watchFn(fn) {
  depend.addDepend(fn)
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
  console.log('demo function')
})

obj.name = 'coder'
depend.notify()

export {}