// @ts-nocheck

var name = 'window'
var person = {
  name: 'person',
  sayName: function () {
    console.log(this.name)
  },
}

function sayName() {
  var ass = person.sayName
  ass() // window
  person.sayName(); // person
  (person.sayName)(); // person
  (b = person.sayName)(); // window 
}

sayName()
