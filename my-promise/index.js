document.addEventListener('DOMContentLoaded', function () {
  const $ = selector => document.querySelector(selector);

  /**
   * - constructor accept a fn as parameter
   * - fn has two pre-defined parameter, the first one for resolve, while the second for reject,
   * `resolve` or `reject` can change the internal state of promise instance
   * - instance has `then`, `catch`, `finally` method
   *  - `then` has two parameter, `resolvedFn` and `rejectedFn`; `resolvedFn` has the value returned by internal __resolveFn, so does rejectedFn.
   *  - `resolvedFn`'s param value actually comes from the return value of its previous `resolvedFn`
   *  - when any `then` function registered a async resolve function, its next then callback should wait for the previous registered fn to resolve.
   *    and use its return value as the param for the next callback.
   *    So, the internal __resolve fn should detect the return value of the previous callback, do different handle for the this.__value:
   *      - sync return value
   *      - wait for the Promise to resolve and use the resolved value.
   * - constructor(Promise) has static method `race`, `all`
   */

  const PENDING = 'pending';
  const FULLFILLED = 'fullfilled';
  const REJECTED = 'rejected';
  class MyPromise {
    constructor(register) {
      this.__state = PENDING; /** default state */
      this.__successHandlers = []; /** resolved handlers */
      this.__failureHandlers = []; /** rejected handlers */
      this.__value = undefined;
      const instance = this;
      const __resolve = async function (resolvedValue) {
        if (instance.__state === PENDING || instance.__state === FULLFILLED) {
          instance.__state = FULLFILLED;
          instance.__value = resolvedValue;
          while (instance.__successHandlers.length) {
            const param = instance.__value;
            const handler = instance.__successHandlers.shift();
            const prevResovledValue = handler(param);
            if (prevResovledValue instanceof MyPromise) {
              const asyncResolvedValue = await prevResovledValue;
              instance.__value = asyncResolvedValue;
            } else {
              instance.__value = prevResovledValue;
            }
          }
        }
      }

      const __reject = function(rejectedReason) {
        if (this.__state === PENDING || this.__state === REJECTED) {
          this.__state = REJECTED;
          while (this.__failureHandlers.length) {
            const handler = this.__failureHandlers.shift();
            handler(rejectedReason);
          }
        }
      }

      register(__resolve, __reject);
    }

    then(resolvedHandler, rejectedHandler) {
      if (typeof resolvedHandler === 'function') {
        this.__successHandlers.push(resolvedHandler);
      }

      if (typeof rejectedHandler === 'function') {
        this.__failureHandlers.push(rejectedHandler);
      }

      return this;
    }

    catch() {

    }

    finally() {

    }
  };

  $('.click').addEventListener('click', function () {
    const p = new MyPromise((resolve) => {
      setTimeout(() => {
        resolve(1);
      }, 1000);
    });

    p
    .then(d1 => {
      console.log('d1 in then: ', d1);
      return new MyPromise(resolve => {
        setTimeout(() => resolve('thenPromiseValue 1'), 1000);
      });
    })
    .then(d2 => {
      console.log('d2 in then: ', d2);
      return 3;
    })
    .then(d3 => {
      console.log('d3 in then', d3);
      return new MyPromise(resolve => {
        setTimeout(() => resolve('thenPromiseValue 2'), 2000);
      })
    })
    .then(d4 => {
      console.log('d4 in then', d4);

    })
  });
});
