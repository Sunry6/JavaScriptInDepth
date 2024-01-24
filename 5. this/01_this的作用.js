var obj = {
  name: 'why',
  eating: function () {
    console.log(this.name + ' eating')
  },
  running: function () {
    console.log(this.name + ' running')
  },
  studying: function () {
    console.log(this.name + ' studying')
  },
}

obj.eating()
obj.running()
obj.studying()
