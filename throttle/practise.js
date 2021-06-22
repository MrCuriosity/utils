document.addEventListener("DOMContentLoaded", function() {
  const $ = selector => document.querySelector(selector);

  function throttle(func, threshold) {
    let context = null;
    let timer = undefined;
    let previous = 0;

    const callback = function(...args) {
      previous = +new Date();
      timer = null;
      func.call(context, ...args);
    }

    function closure(...args) {
      context = this;
      if (+new Date() - previous < threshold) {
        if (timer) return;
        const delay = threshold - (+new Date() - previous);
        timer = setTimeout(callback, delay);
      } else {
        previous = +new Date();
        func.call(context, ...args);
      }
    }

    return closure;
  }

  const testFunc = param => console.log('clicked param: ', param);
  const throttled = throttle(testFunc, 1000);

  $('.btn-primary').addEventListener('click', throttled);
});
