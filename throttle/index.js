document.addEventListener("DOMContentLoaded", function() {
  const $ = selector => document.querySelector(selector);

  const _throttle = function (func, wait) {
    let timer = null;
    let context = null;
    let time_start = +new Date();
    let result = null;
    let args = [];
    const later = function () {
      timer = null;
      time_start = +new Date();
      result = func.apply(context, args);
    };

    return function () {
      const time_current = +new Date();
      context = this;
      args = arguments;
      const during = time_current - time_start;
      if (during > wait) {
        if (timer) {
          clearTimeout(timer);
          timer = null;
        }
        time_start = time_current;
        result = func.apply(context, args);
      } else if (!timer) {
        console.log('case 2');
        timer = setTimeout(later, wait);
      }
      return result;
    }
  };

  const throttle = function (func, wait) {
    let context = null,
        args = null,
        result = null,
        time_previous = +new Date(),
        time_current = 0,
        timer = null;

    return function () {
      context = this;
      args = arguments;
      time_current = +new Date();

      if (time_current - time_previous > wait) {
        if (timer) {
          clearTimeout(timer);
          timer = null;
        }
        time_previous = time_current;
        result = func.call(context, args);
      } else {
        if (!timer) {
          timer = setTimeout(() => {
            clearTimeout(timer);
            timer = null;
            time_previous = +new Date();
            result = func.call(context, args);
          }, wait);
        }
      }

      return result;
    };
  };

  const testFunc = param => {
    if (param) {
      console.log(`type: ${typeof param} / `, param);
    } else {
      console.log('no param specified');
    }
  }
  const throttled = throttle(testFunc, 2000);

  $('.click').addEventListener('click', throttled);
});
