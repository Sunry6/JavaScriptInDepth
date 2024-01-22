var nums = [10, 5, 11, 100, 55]

// 独立的function, 称之为一个函数
function foo() {}

// 方法method: 当我们的一个函数属于某一个对象时, 我们称之为这个函数是某一个对象的方法
var obj = {
  foo: function () {},
}

var newNums = nums.filter(item => {
  return item % 2 === 0
})
// console.log(newNums)

var newNums2 = nums.map(item => {
  return item * 10
})
// console.log(newNums2)

// nums.forEach(item => console.log(item))

var item = nums.find(item => {
  return item === 11
})
// console.log(item)

var friends = [
  { name: 'why', age: 18 },
  { name: 'curry', age: 35 },
]

var findFriend = friends.find(item => {
  return item.name === 'why'
})
// console.log(findFriend)

var findFriendIndex = friends.findIndex(item => {
  return item.name === 'why'
})
// console.log(findFriendIndex)

var total = nums.reduce((preValue, item) => {
  return preValue + item
}, 0)
console.log(total)
