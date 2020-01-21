module.exports = function StringToArray(arrayAsString) {
  return arrayAsString.split(",").map(tech => tech.trim());
};
