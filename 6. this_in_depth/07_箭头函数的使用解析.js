var foo = num => {}

// 高阶函数在使用时, 也可以传入箭头函数
var nums = [10, 20, 45, 78]
nums.forEach((item, index, arr) => {
  console.log(item, index, arr)
})

// 常见简写
// 1. 省略小括号 (当只有一个参数时), 如果只有一行代码, {}也可以省略, 会默认将这行代码的执行结果返回
var foo2 = num => num * num

