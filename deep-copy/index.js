export const type = (input) => Object.prototype.toString.call(input).split(' ')[1].slice(0, -1).toLowerCase();

export const deepCopy = (source) => {
  if (type(source) === 'array') {
    return source.map(v => deepCopy(v));
  }

  if (type(source) === 'object') {
    return Object.entries(source).reduce((acc, ckv) => {
      const [key, value] = ckv;
      acc[key] = deepCopy(value);
      return acc;
    }, {});
  }

  return source;
}
