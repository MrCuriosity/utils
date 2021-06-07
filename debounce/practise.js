document.addEventListener('DOMContentLoaded', function () {
  const debounce = function(fn, timeout) {
    let timer = null;
    let context = null;

    const debouncedFunction = function(...args) {
      context = this;
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        fn && fn.call(context, ...args)
        timer = null;
      }, timeout);
    }

    debouncedFunction.displayName = 'debouncedFunction';
    return debouncedFunction;
  };

  const testFunc = param => console.log('clicked param: ', param.target);
  const debounced = debounce(testFunc, 1000);

  document.querySelector('.btn-primary').addEventListener('click', debounced);
  document.querySelector('.btn-secondary').addEventListener('click', debounced);
});
