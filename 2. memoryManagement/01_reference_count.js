var obj = { name: 'why' }
var info = { name: 'coder', friend: obj }
var p = { name: 'p', friend: obj }

// 引用计数存在一个很大的弊端: 循环引用
var obj1 = { friend: obj2 }
var obj2 = { friend: obj1 }
