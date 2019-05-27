document.addEventListener('DOMContentLoaded', function () {
  const $ = selector => document.querySelector(selector);

  class MyPromise {
    constructor (executor) {
      this.value = null;
      this.stage = 'pending';
      this.resolvedCallbacks = [];
      this.executor = executor;
      executor(this.resolve.bind(this));
    }

    resolve(value) {
      if (this.stage === 'pending') {
        this.stage = 'resolved';
        this.resolvedCallbacks.forEach(cb => {
          console.log('cb in resolve', cb);
          console.log('cb value', value);
          const retOfCb = cb(this.value);
          this.value = retOfCb;
          console.log('this.value', this.value);
        });
      }
    }

    reject() {
      /** to be done */
    }

    then(cb) {
      cb = typeof cb === 'function' ? cb : function () { return arguments[0] };
      console.log(cb);
      const retOfCb = cb(this.value);
      console.log('retOfCb', retOfCb);
      console.log('this.resolvedCallbacks', this.resolvedCallbacks);
      if (this.stage === 'pending') {
        console.log('pending');
        this.resolvedCallbacks.push(cb);
        console.log('this.resolvedCallbacks', this.resolvedCallbacks);
        return this;
      }

      if (this.stage === 'resolved') {
        console.log('resolved');
      }
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
