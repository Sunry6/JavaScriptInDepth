class Depend {
  constructor() {
    this.reactiveFns = []
  }

  addDepend(reactiveFn) {
    this.reactiveFns.push(reactiveFn)
  }

  notify() {
    this.reactiveFns.forEach(fn => {
      fn()
    })
  }
}

// 封装一个响应式的函数
const depend = new Depend()
function watchFn(fn) {
  depend.addDepend(fn)
}

// 对象的响应式
const obj = {
  name: 'why', // depend对象
  age: 18, // depend对象
}

// 监听对象的属性变量: Proxy(vue3)/Object.defineProperty(vue2)
const objProxy = new Proxy(obj, {
  get: function (target, key, receiver) {
    return Reflect.get(target, key, receiver)
  },

  set: function (target, key, newValue, receiver) {
    // 通知更新
    depend.notify()
    return Reflect.set(target, key, newValue, receiver)
  },
})

watchFn(() => {
  console.log('into func 1')
})
watchFn(() => {
  console.log('into func 2')
})
watchFn(() => {
  console.log('into func 3', objProxy.name)
})
watchFn(() => {
  console.log(objProxy.age)
})

objProxy.name = 'coder'
objProxy.age = 100
export {}