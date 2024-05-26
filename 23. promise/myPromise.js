const STATE = Symbol('state')
const VALUE = Symbol('value')
const HANDLERS = Symbol('handlers')
const CATCHERS = Symbol('catchers')

// 封装微任务调度
const scheduleMicrotask = fn => {
  if (typeof queueMicrotask === 'function') {
    queueMicrotask(fn)
  } else if (typeof MutationObserver !== 'undefined') {
    const div = document.createElement('div')
    const observer = new MutationObserver(fn)
    observer.observe(div, { attributes: true })
    div.setAttribute('data', '1')
  } else {
    setTimeout(fn, 0)
  }
}

class MyPromise {
  static PENDING = 'pending'
  static FULFILLED = 'fulfilled'
  static REJECTED = 'rejected'

  constructor(executor) {
    this[STATE] = MyPromise.PENDING
    this[VALUE] = null
    this[HANDLERS] = []
    this[CATCHERS] = []

    const resolve = value => {
      this.updateResult(value, MyPromise.FULFILLED)
    }

    const reject = error => {
      this.updateResult(error, MyPromise.REJECTED)
    }

    try {
      executor(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }

  updateResult(value, state) {
    if (this[STATE] !== MyPromise.PENDING) return

    const doResolve = () => {
      if (this[STATE] !== MyPromise.PENDING) return

      if (value === this) {
        return this.updateResult(
          new TypeError('Chaining cycle detected for promise'),
          MyPromise.REJECTED
        )
      }

      if (value && (typeof value === 'object' || typeof value === 'function')) {
        let then
        let called = false
        try {
          then = value.then
        } catch (error) {
          return this.updateResult(error, MyPromise.REJECTED)
        }

        if (typeof then === 'function') {
          try {
            then.call(
              value,
              y => {
                if (called) return
                called = true
                this.updateResult(y, MyPromise.FULFILLED)
              },
              r => {
                if (called) return
                called = true
                this.updateResult(r, MyPromise.REJECTED)
              }
            )
            return
          } catch (error) {
            if (!called) {
              return this.updateResult(error, MyPromise.REJECTED)
            }
          }
        }
      }

      this[STATE] = state
      this[VALUE] = value
      const handlers = state === MyPromise.FULFILLED ? this[HANDLERS] : this[CATCHERS]
      handlers.forEach(handler => handler(value))
      this[HANDLERS] = []
      this[CATCHERS] = []
    }

    scheduleMicrotask(doResolve)
  }

  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      const handleFulfilled = value => {
        if (typeof onFulfilled !== 'function') {
          resolve(value)
        } else {
          try {
            resolve(onFulfilled(value))
          } catch (error) {
            reject(error)
          }
        }
      }

      const handleRejected = error => {
        if (typeof onRejected !== 'function') {
          reject(error)
        } else {
          try {
            resolve(onRejected(error))
          } catch (error) {
            reject(error)
          }
        }
      }

      const handleCallback = () => {
        if (this[STATE] === MyPromise.FULFILLED) {
          scheduleMicrotask(() => handleFulfilled(this[VALUE]))
        } else if (this[STATE] === MyPromise.REJECTED) {
          scheduleMicrotask(() => handleRejected(this[VALUE]))
        } else {
          this[HANDLERS].push(handleFulfilled)
          this[CATCHERS].push(handleRejected)
        }
      }

      handleCallback()
    })
  }

  catch(onRejected) {
    return this.then(null, onRejected)
  }

  finally(onFinally) {
    return this.then(
      value => MyPromise.resolve(onFinally()).then(() => value),
      reason =>
        MyPromise.resolve(onFinally()).then(() => {
          throw reason
        })
    )
  }

  static resolve(value) {
    if (value instanceof MyPromise) {
      return value
    }
    return new MyPromise(resolve => {
      resolve(value)
    })
  }

  static reject(reason) {
    return new MyPromise((_, reject) => {
      reject(reason)
    })
  }

  static all(promises) {
    return new MyPromise((resolve, reject) => {
      let resolvedCount = 0
      const values = new Array(promises.length)

      promises.forEach((promise, index) => {
        MyPromise.resolve(promise).then(
          value => {
            values[index] = value
            resolvedCount++
            if (resolvedCount === promises.length) {
              resolve(values)
            }
          },
          reason => {
            reject(reason)
          }
        )
      })
    })
  }

  static race(promises) {
    return new MyPromise((resolve, reject) => {
      promises.forEach(promise => {
        MyPromise.resolve(promise).then(resolve, reject)
      })
    })
  }

  static allSettled(promises) {
    return new MyPromise(resolve => {
      let settledCount = 0
      const results = new Array(promises.length)

      promises.forEach((promise, index) => {
        MyPromise.resolve(promise).then(
          value => {
            results[index] = { status: 'fulfilled', value }
            settledCount++
            if (settledCount === promises.length) {
              resolve(results)
            }
          },
          reason => {
            results[index] = { status: 'rejected', reason }
            settledCount++
            if (settledCount === promises.length) {
              resolve(results)
            }
          }
        )
      })
    })
  }

  static any(promises) {
    return new MyPromise((resolve, reject) => {
      let rejectedCount = 0
      const errors = new Array(promises.length)

      promises.forEach((promise, index) => {
        MyPromise.resolve(promise).then(resolve, reason => {
          errors[index] = reason
          rejectedCount++
          if (rejectedCount === promises.length) {
            reject(new AggregateError(errors, 'All promises were rejected'))
          }
        })
      })
    })
  }
}

// Testing the implementation

// Test case: Basic usage
const myPromise = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('Success!')
  }, 1000)
})

myPromise
  .then(value => {
    console.log(value) // Output: Success!
    return value + '!'
  })
  .then(value => {
    console.log(value) // Output: Success!!
  })
  .catch(error => {
    console.error(error)
  })
  .finally(() => {
    console.log('Completed') // Output: Completed
  })

// Test case: Chaining
const chainPromise = new MyPromise((resolve, reject) => {
  resolve(1)
})

chainPromise
  .then(value => {
    console.log(value) // Output: 1
    return value + 1
  })
  .then(value => {
    console.log(value) // Output: 2
    return value + 1
  })
  .then(value => {
    console.log(value) // Output: 3
  })
  .catch(error => {
    console.error(error)
  })

// Test case: Handling rejection
const rejectionPromise = new MyPromise((resolve, reject) => {
  reject('Error occurred!')
})

rejectionPromise
  .then(value => {
    console.log(value)
  })
  .catch(error => {
    console.error(error) // Output: Error occurred!
  })
  .finally(() => {
    console.log('Completed') // Output: Completed
  })

// Test case: Static methods
MyPromise.resolve('Resolved value').then(value => {
  console.log(value) // Output: Resolved value
})

MyPromise.reject('Rejected reason').catch(reason => {
  console.error(reason) // Output: Rejected reason
})

MyPromise.all([MyPromise.resolve(1), MyPromise.resolve(2), MyPromise.resolve(3)]).then(values => {
  console.log(values) // Output: [1, 2, 3]
})

MyPromise.race([
  new MyPromise(resolve => setTimeout(resolve, 100, 'one')),
  new MyPromise(resolve => setTimeout(resolve, 50, 'two')),
]).then(value => {
  console.log(value) // Output: two
})

MyPromise.allSettled([MyPromise.resolve(1), MyPromise.reject('error'), MyPromise.resolve(3)]).then(
  results => {
    console.log(results) // Output: [{status: "fulfilled", value: 1}, {status: "rejected", reason: "error"}, {status: "fulfilled", value: 3}]
  }
)

MyPromise.any([
  MyPromise.reject('error1'),
  MyPromise.reject('error2'),
  MyPromise.resolve('success'),
])
  .then(value => {
    console.log(value) // Output: success
  })
  .catch(error => {
    console.error(error)
  })
