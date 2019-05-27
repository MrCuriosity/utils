document.addEventListener('DOMContentLoaded', function () {
  const $ = selector => document.querySelector(selector);
  const _debounce = function (func, wait) {
    let timer = null;
    let context = null;
    let args = null;
    let result = null;
    const later = function () {
      timer = null;
      result = func.apply(context, args);
    }

    return function () {
      context = this;
      args = arguments;
      clearTimeout(timer);
      timer = setTimeout(later, wait);
      return result;
    }
  };

  const debounce = function (func, wait) {
    let context = null;
    let args = null;
    let timer = null;
    let result = null;

    return function () {
      context = this;
      args = arguments;

      clearTimeout(timer);

      timer = setTimeout(() => {
        timer = null;
        result = func.call(context, args);
      }, wait);

      return result;
    };
  };
  const testFunc = param => {
    if (param) {
      console.log(`type: ${typeof param}`, param);
    } else {
      console.log('no param specified');
    }
  };
  const debounced = debounce(testFunc, 2000);

  $('.click').addEventListener('click', debounced);
});
