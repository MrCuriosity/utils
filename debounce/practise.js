document.addEventListener('DOMContentLoaded', function () {
  const type = source => Object.prototype.toString.call(source).split(' ')[1].slice(0, -1);

  const debounce = function(fn, timeout) {
    let self = null;
    let args = [];
    let func = null;
    let result = null;
    let timer = null;

    func = function() {
      self = this;
      args = arguments;
      clearTimeout(timer);
      timer = setTimeout(() => {
        result = fn.apply(self, args);
        timer = null;
        return result;
      }, timeout);
    }

    return func;
  };

  const testFunc = param => console.log('clicked param: ', param);
  const debounced = debounce(testFunc, 1000);

  document.querySelector('.btn-primary').addEventListener('click', debounced);
});
