const cloneObject = (obj) => {
  let clone = {};
  for (var i in obj) {
    if (obj[i] != null &&  typeof(obj[i])=="object") {
      clone[i] = cloneObject(obj[i]);
    } else {
      clone[i] = obj[i];
    }
  }
  return clone;
};

export default cloneObject;
