document.addEventListener('DOMContentLoaded', function () {
  const $ = selector => document.querySelector(selector);

  /**
   * - constructor accept a fn as parameter
   * - fn has two pre-defined parameter, the first one for resolve, while the second for reject,
   * `resolve` or `reject` can change the internal state of promise instance
   * - instance has `then`, `catch`, `finally` method
   *   - `then` has two parameter, `resolvedFn` and `rejectedFn`; `resolvedFn` has the value returned by internal __resolveFn, so does rejectedFn.
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
      const __resolve = function(resolvedValue) {
        console.log('instance', instance);
        if (instance.__state === PENDING || instance.__state === FULLFILLED) {
          instance.__state = FULLFILLED;
          instance.__value = resolvedValue;
          while (instance.__successHandlers.length) {
            console.log('instance in while', instance);
            const param = instance.__value;
            const handler = instance.__successHandlers.shift();
            instance.__value = handler(param);
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
      return 2;
    })
    .then(d2 => {
      console.log('d2 in then: ', d2);
      return 3;
    })
    .then(d3 => {
      console.log('d3 in then', d3);
    });
  });
});
