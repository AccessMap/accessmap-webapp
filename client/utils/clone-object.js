const cloneObject = (obj) => {
  const clone = {};
  Object.keys(obj).forEach((key) => {
    if (obj[key] != null && typeof (obj[key]) === 'object') {
      clone[key] = cloneObject(obj[key]);
    } else {
      clone[key] = obj[key];
    }
  });
  return clone;
};

export default cloneObject;
