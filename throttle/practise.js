document.addEventListener("DOMContentLoaded", function() {
  const $ = selector => document.querySelector(selector);

  const throttle = function(fn, threshold) {
    let self = null;
    let args = [];
    let func = null;
    let result = null;
    let timer = null;
    let time_previous = +new Date();
    let time_current = 0;

    const later = function() {
      timer = null;
      time_previous = +new Date();
      result = fn.apply(self, args);
    };

    return function() {
      time_current = +new Date();
      self = this;
      args = arguments;
      const duration = time_current - time_previous;
      if (duration > threshold) {
        if (timer) {
          clearTimeout(timer);
          timer = null;
        }
        time_previous = time_current;
        result = fn.apply(self, args);
      } else if (!timer) {
        timer = setTimeout(later, threshold);
      }

      return result;
    };
  };

  const testFunc = param => console.log('clicked param: ', param);
  const throttled = throttle(testFunc, 1000);

  $('.btn-primary').addEventListener('click', throttled);
});
